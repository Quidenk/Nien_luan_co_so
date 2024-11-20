const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        type: String,
        price: Number,
        discount: Number,
        countInStock: Number,
        rating: Number,
        description: String,
        selled: Number,
    },          
    {
        timestamps: true,
    }
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
