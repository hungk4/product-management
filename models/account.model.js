const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  token: String,
  avatar: String,
  role_id: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
    timestamps: true
})

const Account = mongoose.model("Account", productSchema, "accounts");
    
module.exports = Product;


