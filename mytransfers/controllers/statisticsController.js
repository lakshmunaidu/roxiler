const ProductTransaction = require("../models/productTransaction");

exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const totalSaleAmount = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month, 10)] },
          isSold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSaleAmount: 1,
        },
      },
    ]);

    const totalSoldItems = await ProductTransaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month, 10)] },
      isSold: true,
    });

    const totalNotSoldItems = await ProductTransaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month, 10)] },
      isSold: false,
    });

    res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    res.status(500).json({ error: "Error fetching statistics" });
  }
};
