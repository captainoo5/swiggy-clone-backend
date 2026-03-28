const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      veg: { type: Boolean, default: false }
    }
  ],
  amountDetails: {
    itemTotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    platformFee: { type: Number, required: true },
    gst: { type: Number, required: true },
    grandTotal: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Pending"
  },
  deliveryAddress: {
    type: String,
    default: "Alhajin Yaraa Plaza Tashan Dukku Gombe"
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
