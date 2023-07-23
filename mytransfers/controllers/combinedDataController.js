const axios = require("axios");

exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    const [
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
      barChartData,
      pieChartData,
    ] = await Promise.all([
      axios.get(`http://localhost:3000/statistics?month=${month}`),
      axios.get(`http://localhost:3000/bar-chart?month=${month}`),
      axios.get(`http://localhost:3000/pie-chart?month=${month}`),
    ]);

    res.json({
      totalSaleAmount: totalSaleAmount.data.totalSaleAmount,
      totalSoldItems: totalSoldItems.data.totalSoldItems,
      totalNotSoldItems: totalNotSoldItems.data.totalNotSoldItems,
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
    });
  } catch (err) {
    console.error("Error fetching combined data:", err);
    res.status(500).json({ error: "Error fetching combined data" });
  }
};
