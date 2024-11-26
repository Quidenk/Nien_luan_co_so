// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema(
//     {
//         name: String,
//         image: String,
//         type: String,
//         price: Number,
//         discount: Number,
//         countInStock: Number,
//         rating: Number,
//         description: String,
//         selled: Number,
//     },          
//     {
//         timestamps: true,
//     }
// );

// const Product = mongoose.model('product', productSchema);

// module.exports = Product;


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        // Thay đổi 'image' thành một mảng lưu nhiều ảnh
        image: [String], // Mảng lưu nhiều đường dẫn đến ảnh
        type: String,
        price: Number,
        discount: Number,
        countInStock: Number,
        rating: Number,
        description: String,
        selled: Number,
        // Thêm trường 'size' để lưu nhiều kích cỡ của sản phẩm
        size: [String], // Mảng lưu các kích cỡ sản phẩm
    },          
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
