const ProductTransaction = require("../models/productTransaction");

exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const barChartData = [];

    for (const range of priceRanges) {
      const count = await ProductTransaction.countDocuments({
        $expr: {
          $and: [
            { $eq: [{ $month: "$dateOfSale" }, parseInt(month, 10)] },
            { $gte: ["$price", range.min] },
            { $lt: ["$price", range.max] },
          ],
        },
      });

      barChartData.push({ range: `${range.min}-${range.max}`, count });
    }

    res.json(barChartData);
  } catch (err) {
    console.error("Error fetching bar chart data:", err);
    res.status(500).json({ error: "Error fetching bar chart data" });
  }
};
