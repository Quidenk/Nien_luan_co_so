const path = require("path");
const Product = require("../models/product");
require('dotenv').config()
const fs = require('fs');
const Uploads = require("../middleware/uploads")


const createProductService = async (name, image, type, price, discount, countInStock, rating, description) => {
    try {
        //check product exist
        const product = await Product.findOne({name});
        if(product) {
            console.log(`>>> product exist, ${product} đã tồn tại `)
            return {
                EC: 1,
                MESS: 'Sản phẩm đã tồn tại'
            };
        }
        //create product
        let result = await Product.create({
            name, image, type, price, discount, countInStock, rating, description, 
        })
        return result;  
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            MESS: 'Lỗi tạo sản phẩm'
        };
    }
}

// const getProductService = async (limit, page, sort, filter) => {
//     try{
//         const totalProduct = await Product.countDocuments()

//         //FILTER
//         if (filter) {
//             const label = filter[0];
//             console.log('filter', filter)
//             const result
//             if (label == 'type'){
//                 const result = await Product.find({ [label]: { '$regex': filter[1]} })
//             }
//             if (label == 'name'){
//                 const result = await Product.find({ [label]: { '$regex': filter[1]} })
//                 console.log('result', result)
//             }
//             return {
//                 total: totalProduct,
//                 pageCurrent: page+1,
//                 totalPage: Math.ceil(totalProduct/limit),
//                 result,
//             }
//         }

//         //SORT
//         if (sort) {
//             const objectSort = {}
//             objectSort[sort[1]] = sort[0]
//             const result = await Product.find().limit(limit).skip( page*limit ).sort(objectSort)
//             return {
//                 total: totalProduct,
//                 pageCurrent: page+1,
//                 totalPage: Math.ceil(totalProduct/limit),
//                 result,
//             }
//         }

//         const result = await Product.find().limit( limit ).skip( limit * page )
//         return {
//             total: totalProduct,
//             pageCurrent: page+1,
//             totalPage: Math.ceil(totalProduct/limit),
//             result,
//         }
//     }catch (error) {
//         console.log(error);
//         return null;
//     }
// }

const getProductService = async (limit, page, sort, filter) => {
    try {
        console.log('limit, page', limit, page)
        const totalProduct = await Product.countDocuments();
        let result; // Khai báo result ở đây

        // FILTER
        if (filter) {
            const label = filter[0];
            if (label === 'type') {
                result = await Product.find({ [label]: { '$eq': filter[1] } }).limit(limit).sort({createdAt: -1, updatedAt: -1});
            } else if (label === 'name') {
                result = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).sort({createdAt: -1, updatedAt: -1});
                console.log('result', result);
            }
        } 
        // SORT
        else if (sort) {
            const objectSort = {};
            objectSort[sort[1]] = sort[0];
            result = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({createdAt: -1, updatedAt: -1});
        } 
        // DEFAULT
        else {
            result = await Product.find().limit(limit).skip(limit * page).sort({createdAt: -1, updatedAt: -1});
        }

        return {
            total: totalProduct,
            pageCurrent: page + 1,
            totalPage: Math.ceil(totalProduct / limit),
            result,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};


const getTypeProductService = async () => {
    try{
        const allTypeProduct = await Product.distinct('type')
        return allTypeProduct
    }catch (error) {
        console.log(error);
        return null;
    }
}

const getOneProductService = async (id) => {
    try{
        //check id
        const product = await Product.findOne({ _id: id})
        if(product === null){
            console.log(`>>> product not exist, ${id} không tồn tại `)
            return null;
        }
        // const result = await Product.find({id});
        return product
    }catch (error) {
        console.log(error);
        return null;
    }
}

const removeProductService = async (id) => {
    try{
        try{
            //check id
            const product = await Product.findOne({ _id: id})
            if(product === null){
                console.log(`>>> product not exist, ${id} không tồn tại `)
                return null;
            }

            if (product.image) {
                const imagePath = path.join(__dirname, '..', 'uploads', product.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Error deleting old image file: ${err}`);
                    } else {
                        console.log(`Old image file deleted: ${product.image}`);
                    }
                });
            }

            const result = await Product.findByIdAndDelete(id);
            return result
        }catch (error) {
            console.log(error);
            return null;
        }
    }catch (error) {
        console.log(error);
        return null;
    }
}

const updataProductService = async (id, data) => {
    try{
        //check id
        const product = await Product.findOne({ _id: id});
        if(product === null){
            console.log(`>>> product not exist, ${id} không tồn tại `)
            return null;
        }

        // if (file_img) {
        //     // Remove the old image file
        //     if (product.image) {
        //         const imagePath = path.join(__dirname, '..', 'uploads', product.image);
        //         fs.unlink(imagePath, (err) => {
        //             if (err) {
        //                 console.error(`Error deleting old image file: ${err}`);
        //             } else {
        //                 console.log(`Old image file deleted: ${product.image}`);
        //             }
        //         });
        //     }
        // }

        // const newData = {
        //     data,
        //     image: file_img ? img : product.image
        // };

        const result = await Product.findByIdAndUpdate(id, data, {new: true});
        return result
    }catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createProductService,
    getProductService,
    getOneProductService,
    removeProductService,
    updataProductService,
    getTypeProductService,
}