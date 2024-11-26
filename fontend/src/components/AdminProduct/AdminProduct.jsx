import React, { useEffect, useRef, useState } from 'react';
import { ButtonAdd, ButtonAntD, ButtonUpload, FormStyle, WrapperHeader } from './style';
import TableComponent from '../TableComponent/TableComponent';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Space, Tag, Upload } from 'antd'; // Thêm Upload
import { getBase64, renderOptions } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { CreateProductApi, DeleteProductApi, GetProductApi, GetProductDetailApi, UpdataProductApi } from '../../util/productService';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ModelComponent from '../ModalComponent/ModelComponent';
import { GetTypeProduct } from '../../util/api';

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdata, setIsLoadingUpdata] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isTypeProduct, setIsTypeProduct] = useState([])

    const inittial = () => ({
        name: '',
        size: [],
        price: '',
        discount: '',
        description: '',
        rating: '',
        image: [],
        type: '',
        countInStock: '',
        newType: '',
    })

    const searchInput = useRef(null);
    const [stateProduct, setStateProduct] = useState(inittial());

    const [stateProductDetail, setStateProductDetail] = useState(inittial());



    // const [form] = Form.useForm();
    const [form] = Form.useForm();


    const GetALLProduct = async() => {
        const res = await GetProductApi();
        // console.log('..................',res.result)
        return res
    }

    const GetProductDetail = async(id) => {
        const res = await GetProductDetailApi(id);
        if(res) {
            setStateProductDetail({
                name: res?.name,
                size: res?.size,
                image: res?.image,
                type: res?.type,
                price: res?.price,
                discount: res?.discount,
                countInStock: res?.countInStock,
                description: res?.description,
            })
        }
        setIsLoadingUpdata(false)
        // console.log('stateProductDetail', stateProductDetail)
        // return res
    }

    useEffect(() => {
        if(!isModalOpen){
            form.setFieldsValue(stateProductDetail);
        }else {
            form.setFieldsValue(inittial());
        }
    }, [stateProductDetail, form, isModalOpen]);

    useEffect(() => {
        if(rowSelected) {
            setIsLoadingUpdata(true)
            GetProductDetail(rowSelected)
        }
    },[rowSelected])

    useEffect(() => {
        console.log('Updated isTypeProduct:', isTypeProduct);
    }, [isTypeProduct]);

    const handleDetailProduct = () => {
        setIsOpenDrawer(true)
    }

    const mutation = useMutationHooks(CreateProductApi);
    const mutationUpdata = useMutationHooks(
        (data) => {
            const {
                id,
                ...dataUpdata} = data
            const res = UpdataProductApi(
                id,
                {...dataUpdata})
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const {id} = data
            const res = DeleteProductApi(id)
            return res
        }
    )

    const fetchTypeProduct = async () => {
        const res = await GetTypeProduct()
        setIsTypeProduct(res)
        return res
    }


    useEffect(() => {
        fetchTypeProduct()
    }, [])

    const { data, isPending, isSuccess, isError } = mutation;
    const { data: dataUpdated, isPending : isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdata;
    const { data: dataDelete, isPending : isPendingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete;
    
    const queryProduct = useQuery({
        queryKey: ['products'], // Khóa để xác định query
        queryFn: GetALLProduct, // Hàm gọi API
    })
    const typeProduct = useQuery({ 
        queryKey: ['type-product'], 
        queryFn: fetchTypeProduct 
    })

    const {isloading : isLoadingProducts, data : products} = queryProduct

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '25px', cursor: 'pointer'}} onClick={() => {setIsModalOpenDelete(true)}}/>
                <EditOutlined style={{ color: 'orange', fontSize: '25px', cursor: 'pointer'}} onClick={handleDetailProduct}/>
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
      };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
      };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              {/* <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button> */}
              {/* <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button> */}
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
      });

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          render: (text) => <a>{text}</a>,
          sorter: (a, b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name')
        },
        {
          title: 'Price',
          dataIndex: 'price',
          sorter: (a, b) => a.price - b.price,
          filters: [
            {
                text: '> 50000',
                value: '>'
            },
            {
                text: '<= 50000',
                value: '<='
            },
          ],
          onFilter: (value, record) => {
            if(value === '>') {
                return record.price > 50000
            }
            return record.price <= 50000
          },
        },
        // {
        //   title: 'Type',
        //   dataIndex: 'type',
        //   sorter: (a, b) => a.type.length - b.type.length,
        //   filters: [
        //         (isTypeProduct?.map((type) => {
        //             return (
        //                 {
        //                     text: {type},
        //                     value: {type}
        //                 }
        //             )
        //         }))
        //     // {
        //     //     text: 'male',
        //     //     value: 'male'
        //     // },
        //     // {
        //     //     text: 'female',
        //     //     value: 'female'
        //     // },
        //   ],
        //   onFilter: (value, record) => {
        //     if(value === 'male') {
        //         return record.type === 'male'
        //     }
        //     return record.type === 'female'
        //   },
        // },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            filters: isTypeProduct?.map((type) => ({
                text: type,      // Đặt giá trị trực tiếp
                value: type
            })),
            onFilter: (value, record) => record.type === value,
        },
        {
          title: 'Count In Stock',
          dataIndex: 'countInStock',
          sorter: (a, b) => a.countInStock - b.countInStock
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          render: renderAction,
        },
    ];
    const dataTable = products?.result?.length && products?.result?.map((product) => {
        return {...product, key: product._id}
    })


    console.log('>>>>> ', dataUpdated)
    useEffect(() => {
        if (isSuccess && data) {
            message.success('Product created successfully!');
            handleCancel();
        } else if (isError) {
            message.error('Error creating product.');
        }
    }, [isSuccess, isError, data]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated) {
            message.success('Product updata successfully!');
            handleCloseProductDetail()
        } else if (isErrorUpdated) {
            message.error('Error updata product.');
        }
    }, [isSuccessUpdated, isErrorUpdated, dataUpdated]);

    useEffect(() => {
        if (isSuccessDelete && dataDelete) {
            message.success('Product updata successfully!');
            handleCancelDelete()
        } else if (isErrorDelete) {
            message.error('Error updata product.');
        }
    }, [isSuccessDelete, isErrorDelete, dataDelete]);

    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            size: stateProduct.size,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            discount: stateProduct.discount
          }
        mutation.mutate(params,
        { onSettled: () => {
            queryProduct.refetch()
            }
        })
        console.log('Finish: ', { ...stateProduct});
    };

    const onUpdataProduct = () => {
        mutationUpdata.mutate({id: rowSelected, ...stateProductDetail}, 
        { onSettled: () => {
            queryProduct.refetch()
            }
        })
        console.log('Finish: ', stateProductDetail);
    }

    const handleOk = () => {
        onFinish();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            size: [],
            image: [], 
            type: '', 
            price: '',
            discount: '', 
            countInStock: '', 
            description: '',
        });
        form.resetFields()
    };

    const handleCancelDelete = () =>{
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDelete.mutate({id: rowSelected},
        { onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCloseProductDetail = () => {
        setIsOpenDrawer(false);
        setStateProductDetail({
            name: '',
            image: [], 
            size: [],
            type: '', 
            price: '',
            discount: '', 
            countInStock: '', 
            description: '',
        });
        form.resetFields()
    };


    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };
    
    // console.log('stateProductDetail', stateProductDetail)

    const handleOnChangeDetail = (e) => {
        const { name, value } = e.target;
        console.log('checkkk:   ', e.target.name, e.target.value)
        setStateProductDetail((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleOnChangeImage = async ({ fileList }) => {
    //     const file = fileList[0]
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj)
    //     }
    //     setStateProduct({
    //         ...stateProduct, 
    //         image: file.preview
    //     })
    // };

    const handleOnChangeImage = async ({ fileList }) => {
        // Duyệt qua từng file trong danh sách
        const images = await Promise.all(
            fileList.map(async (file) => {
                // Nếu ảnh chưa có URL hoặc preview, tạo preview
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                return file.preview; // Trả về URL hoặc preview
            })
        );
    
        // Cập nhật trạng thái với mảng ảnh mới
        setStateProduct({
            ...stateProduct,
            image: images, // Lưu toàn bộ ảnh vào mảng
        });
    };

    // const handleOnChangeImageDetail = async ({ fileList }) => {
    //     const file = fileList[0]
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj)
    //     }
    //     setStateProductDetail({
    //         ...stateProductDetail, 
    //         image: file.preview
    //     })
    // };

    const handleOnChangeImageDetail = async ({ fileList }) => {
        // Chuyển đổi tất cả các file thành base64 hoặc URL
        const images = await Promise.all(
            fileList.map(async (file) => {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj); // Chuyển thành base64 nếu chưa có URL hoặc preview
                }
                return file.preview; // Trả về URL hoặc preview
            })
        );
    
        // Cập nhật mảng image trong state
        setStateProductDetail((prev) => ({
            ...prev,
            image: images, // Lưu toàn bộ danh sách ảnh
        }));
    };
    

    const handleChangeSelectDetail = (value) => {
        setStateProductDetail({
          ...stateProductDetail,
          type: value
        })
    }
    

    const handleChangeSelect = (value) => {
        setStateProduct({
          ...stateProduct,
          type: value
        })
    }

    // Thêm một state tạm để lưu giá trị người dùng nhập vào
    const [newSize, setNewSize] = useState('');

    // Hàm xử lý thay đổi khi người dùng nhập vào ô size
    const handleSizeInputChange = (e) => {
        setNewSize(e.target.value);
    };

    // Hàm thêm kích cỡ vào mảng size
    // Hàm thêm kích cỡ vào mảng size
    const handleAddSize = () => {
        if (newSize && !stateProduct.size.includes(newSize)) {
            const updatedSize = [...stateProduct.size, newSize]; // Tạo mảng mới trước
            setStateProduct(prevState => ({
                ...prevState,
                size: updatedSize, // Cập nhật trạng thái với mảng mới
            }));
            setNewSize(''); // Reset ô nhập sau khi thêm kích cỡ
        }
    };
    
    
    // Hàm xóa kích cỡ khỏi mảng
    const handleRemoveSize = (sizeToRemove) => {
        setStateProduct(prevState => ({
            ...prevState,
            size: prevState.size.filter(size => size !== sizeToRemove), // Loại bỏ kích cỡ khỏi mảng
        }));
    };


    // Hàm thêm kích cỡ vào mảng size
    const handleAddSizeDetail = () => {
        console.log('newSize', newSize)
        if (newSize && !stateProductDetail.size.includes(newSize)) {
            const updatedSize = [...stateProductDetail.size, newSize]; // Tạo mảng mới trước
            setStateProductDetail(prevState => ({
                ...prevState,
                size: updatedSize, // Cập nhật trạng thái với mảng mới
            }));
            setNewSize(''); // Reset ô nhập sau khi thêm kích cỡ
        }
    };
    
    
    // Hàm xóa kích cỡ khỏi mảng
    const handleRemoveSizeDetail = (sizeToRemove) => {
        setStateProductDetail(prevState => ({
            ...prevState,
            size: prevState.size.filter(size => size !== sizeToRemove), // Loại bỏ kích cỡ khỏi mảng
        }));
    };
    
    
    console.log('stateProduct', stateProductDetail)

    return (
        <div>
            <WrapperHeader>
                <h2 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '30px' }}>
                    QUẢN LÝ SẢN PHẨM
                </h2>
                <div style={{ marginTop: '10px' }}>
                    <ButtonAdd onClick={() => setIsModalOpen(true)}>
                        <PlusOutlined />
                    </ButtonAdd>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <TableComponent columns={columns} isloading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) =>{
                        return {
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        }
                    }}/>
                </div>

                <ModelComponent 
                    forceRender
                    title="Thêm sản phẩm mới" 
                    open={isModalOpen} 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    confirmLoading={isPending} 
                    footer={null}
                >
                    <LoadingComponent isLoading={isPending}>
                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            onFinish={onFinish}
                            autoComplete="on"
                            form = {form}
                        >
                            <Form.Item
                                label="Name Product"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name product!' }]}
                            >
                                <Input value={stateProduct.name} onChange={handleOnChange} name='name' />
                            </Form.Item>

                            <Form.Item
                                label="Type Product"
                                name="type"
                                rules={[{ required: true, message: 'Please input your type product!' }]}
                            >
                                <Select
                                    name="type"
                                    // defaultValue="lucy"
                                    // style={{ width: 120 }}
                                    value={stateProduct.type}
                                    onChange={handleChangeSelect}
                                    options={renderOptions(typeProduct?.data)}
                                    />
                                </Form.Item>
                                {stateProduct.type === 'add_type' && (
                                    <Form.Item
                                        label='New type'
                                        name="newType"
                                        rules={[{ required: true, message: 'Please input your type!' }]}
                                    >
                                        <Input value={stateProduct.newType} onChange={handleOnChange} name="newType" />
                                    </Form.Item>
                                )}

                            {/* <Form.Item
                                label="Size"
                                name="size"
                                rules={[{ required: true, message: 'Please input your size!' }]}
                            >
                                <Input value={stateProduct.size} onChange={handleOnChange} name='size' />
                            </Form.Item> */}

                            <Form.Item
                                label="Size"
                                name="size"
                            >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Input
                                        value={newSize}  // Giá trị tạm thời của ô nhập
                                        onChange={handleSizeInputChange}
                                        placeholder="Add size (e.g., S, M, L)"
                                    />
                                    <Button type="dashed" onClick={handleAddSize}>
                                        Add Size
                                    </Button>
                                    <div style={{ marginTop: 10 }}>
                                        {stateProduct.size.map((size) => (
                                            <Tag
                                                key={size} // Key dựa trên giá trị kích cỡ (unique)
                                                closable
                                                onClose={() => handleRemoveSize(size)}
                                                style={{ marginBottom: 8 }}
                                            >
                                                {size}
                                            </Tag>
                                        ))}

                                    </div>
                                </Space>
                            </Form.Item>


                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your price!' }]}
                            >
                                <Input value={stateProduct.price} onChange={handleOnChange} name='price' />
                            </Form.Item>

                            <Form.Item
                                label="Discount"
                                name="discount"
                                rules={[{ required: true, message: 'Please input your discount!' }]}
                            >
                                <Input value={stateProduct.discount} onChange={handleOnChange} name='discount' />
                            </Form.Item>

                            <Form.Item
                                label="Count In Stock"
                                name="countInStock"
                                rules={[{ required: true, message: 'Please input your count in stock!' }]}
                            >
                                <Input value={stateProduct.countInStock} onChange={handleOnChange} name='countInStock' />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input your description!' }]}
                            >
                                <Input value={stateProduct.description} onChange={handleOnChange} name='description' />
                            </Form.Item>

                            {/* <Form.Item
                                label="Image"
                                name="image"
                                rules={[{ required: true, message: 'Please upload an image!' }]}
                            >
                                <div>
                                    <Upload 
                                        listType="picture" 
                                        onChange={handleOnChangeImage} 
                                        maxCount={10}
                                        // fileList={fileList} 
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                            <ButtonUpload type="primary">Select file</ButtonUpload>
                                            {/* fileList.lengthfileList[0].preview */}
                                            {/*{ stateProduct?.image && (
                                                <img 
                                                    src={stateProduct?.image} 
                                                    style={{
                                                        height: '150px',
                                                        width: '150px',
                                                        borderRadius: '30px',
                                                        border: '2px solid rgb(241, 94, 44)',
                                                        objectFit: 'cover',
                                                        marginLeft: '10px'
                                                    }} 
                                                    alt="" 
                                                />
                                            )}
                                        </div>
                                    </Upload>
                                </div>
                            </Form.Item> */}

                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[{ required: true, message: 'Please upload an image!' }]}
                            >
                                <div>
                                    <Upload 
                                        listType="picture" 
                                        onChange={handleOnChangeImage} 
                                        maxCount={10}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                            <ButtonUpload type="primary">Select file</ButtonUpload>
                                        </div>
                                    </Upload>

                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        {stateProduct.image.map((img, index) => (
                                                <img 
                                                    key={index}
                                                    src={img}
                                                    style={{
                                                        height: '100px',
                                                        width: '100px',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgb(241, 94, 44)',
                                                        objectFit: 'cover',
                                                    }} 
                                                    alt={`uploaded-${index}`} 
                                                />
                                            ))}
                                        </div>
                                </div>
                            </Form.Item>



                            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                                <ButtonAntD type="primary" htmlType="submit">
                                    Submit
                                </ButtonAntD>
                            </Form.Item>
                        </Form>
                    </LoadingComponent>
                </ModelComponent>

                <DrawerComponent title='Chi tiết sản phẩm' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='50%'>
                    <LoadingComponent isLoading={isLoadingUpdata || isPendingUpdated}>
                        <FormStyle
                            name="basic"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                            onFinish={onUpdataProduct}
                            autoComplete="on"
                            form = {form}
                        >
                            <Form.Item
                                label="Name Product"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name product!' }]}
                            >
                                <Input value={stateProductDetail.name} onChange={handleOnChangeDetail} name='name' />
                            </Form.Item>

                            {/* <Form.Item
                                label="Type Product"
                                name="type"
                                rules={[{ required: true, message: 'Please input your type product!' }]}
                            >
                                <Input value={stateProductDetail.type} onChange={handleOnChangeDetail} name='type' />
                            </Form.Item> */}

                            <Form.Item
                                label="Type Product"
                                name="type"
                                rules={[{ required: true, message: 'Please input your type product!' }]}
                            >
                                <Select
                                    name="type"
                                    // defaultValue={stateProductDetail}
                                    // style={{ width: 120 }}
                                    value={stateProductDetail.type}
                                    onChange={handleChangeSelectDetail}
                                    options={renderOptions(typeProduct?.data)}
                                    />
                                </Form.Item>
                                {stateProductDetail.type === 'add_type' && (
                                    <Form.Item
                                        label='New type'
                                        name="newType"
                                        rules={[{ required: true, message: 'Please input your type!' }]}
                                    >
                                        <Input value={stateProductDetail.newType} onChange={handleOnChangeDetail} name="newType" />
                                    </Form.Item>
                                )}

                            <Form.Item
                                label="Size"
                                name="size"
                            >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Input
                                        value={newSize}  // Giá trị tạm thời của ô nhập
                                        onChange={handleSizeInputChange}
                                        placeholder="Add size (e.g., S, M, L)"
                                    />
                                    <Button type="dashed" onClick={handleAddSizeDetail}>
                                        Add Size
                                    </Button>
                                    <div style={{ marginTop: 10 }}>
                                        {stateProductDetail.size.map((size) => (
                                            <Tag
                                                key={size} // Key dựa trên giá trị kích cỡ (unique)
                                                closable
                                                onClose={() => handleRemoveSizeDetail(size)}
                                                style={{ marginBottom: 8 }}
                                            >
                                                {size}
                                            </Tag>
                                        ))}

                                    </div>
                                </Space>
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your price!' }]}
                            >
                                <Input value={stateProductDetail.price} onChange={handleOnChangeDetail} name='price' />
                            </Form.Item>

                            <Form.Item
                                label="Discount"
                                name="discount"
                                rules={[{ required: true, message: 'Please input your discount!' }]}
                            >
                                <Input value={stateProductDetail.discount} onChange={handleOnChangeDetail} name='discount' />
                            </Form.Item>

                            <Form.Item
                                label="Count In Stock"
                                name="countInStock"
                                rules={[{ required: true, message: 'Please input your count in stock!' }]}
                            >
                                <Input value={stateProductDetail.countInStock} onChange={handleOnChangeDetail} name='countInStock' />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input your description!' }]}
                            >
                                <Input value={stateProductDetail.description} onChange={handleOnChangeDetail} name='description' />
                            </Form.Item>

                            {/* <Form.Item
                                label="Image"
                                name="image"
                                rules={[{ required: true, message: 'Please upload an image!' }]}
                            >
                                <div>
                                    <Upload 
                                        listType="picture" 
                                        onChange={handleOnChangeImageDetail} 
                                        maxCount={10}
                                        // fileList={fileList} 
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                            <ButtonUpload type="primary">Select file</ButtonUpload>
                                            { stateProductDetail?.image && (
                                                <img 
                                                    src={stateProductDetail?.image} 
                                                    style={{
                                                        height: '150px',
                                                        width: '150px',
                                                        borderRadius: '30px',
                                                        border: '2px solid rgb(241, 94, 44)',
                                                        objectFit: 'cover',
                                                        marginLeft: '10px'
                                                    }} 
                                                    alt="" 
                                                />
                                            )}
                                        </div>
                                    </Upload>
                                </div>
                            </Form.Item> */}

                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[{ required: true, message: 'Please upload at least one image!' }]}
                            >
                                <div>
                                    <Upload 
                                        listType="picture"
                                        onChange={handleOnChangeImageDetail}
                                        maxCount={10} // Tối đa 10 ảnh
                                        multiple // Cho phép tải nhiều ảnh
                                    >
                                        <ButtonUpload type="primary">Select files</ButtonUpload>
                                    </Upload>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                        {stateProductDetail.image.map((img, index) => (
                                            <img 
                                                key={index}
                                                src={img}
                                                alt={`uploaded-${index}`}
                                                style={{
                                                    height: '100px',
                                                    width: '100px',
                                                    borderRadius: '8px',
                                                    border: '1px solid rgb(241, 94, 44)',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Form.Item>



                            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                                <ButtonAntD type="primary" htmlType="submit">
                                    Apply
                                </ButtonAntD>
                            </Form.Item>
                        </FormStyle>
                    </LoadingComponent>
                </DrawerComponent>

                <ModelComponent 
                    title="Xóa sản phẩm" 
                    open={isModalOpenDelete} 
                    onOk={handleDeleteProduct} 
                    onCancel={handleCancelDelete}
                    confirmLoading={isPendingDelete} 
                >
                    <LoadingComponent isLoading={isPending}>
                        <div>Bạn có chắc xóa sản phẩm {rowSelected} không?</div>
                    </LoadingComponent>
                </ModelComponent>

            </WrapperHeader>
        </div>
    );
};

export default AdminProduct;
