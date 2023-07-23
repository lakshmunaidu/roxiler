const axios = require("axios");
const ProductTransaction = require("../models/productTransaction");

exports.seedData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    await ProductTransaction.insertMany(data);
    res.send("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
    res.status(500).send("Error seeding database");
  }
};
