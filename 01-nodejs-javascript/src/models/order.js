const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: String,
            amount: Number,
            image: String,
            price: Number,
            discount: Number,
            sizeSelected: String,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        },
    ],
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        phone: Number,
    },
    paymentMethod: String,
    itemsPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    isPaid: Boolean,
    paidAt: Date,
    isDelivered: Boolean,
    deliveredAt: Date,
    status: {
        type: Number,
        default: 1,
    },
},
    {
        timestamps: true,
    }
);
const Order = mongoose.model('order', orderSchema);
module.exports = Order