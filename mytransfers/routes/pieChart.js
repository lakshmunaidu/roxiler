const express = require("express");
const router = express.Router();
const ProductTransaction = require("../models/productTransaction");

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    const pieChartData = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month, 10)] },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    res.json(pieChartData);
  } catch (err) {
    console.error("Error fetching pie chart data:", err);
    res.status(500).json({ error: "Error fetching pie chart data" });
  }
});

module.exports = router;
