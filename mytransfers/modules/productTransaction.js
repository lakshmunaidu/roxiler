const mongoose = require("mongoose");

const productTransactionSchema = new mongoose.Schema({
  dateOfSale: Date,
  category: String,
  itemName: String,
  price: Number,
  isSold: Boolean,
});

const ProductTransaction = mongoose.model(
  "ProductTransaction",
  productTransactionSchema
);

module.exports = ProductTransaction;
