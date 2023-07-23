const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// ... The rest of your code

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
