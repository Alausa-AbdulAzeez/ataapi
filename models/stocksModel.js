const { default: mongoose } = require("mongoose");

const stocksSchema = new mongoose.Schema(
  {
    nigerianStocks: { type: String, default: "0%" },
    foriegnStocks: { type: String, default: "0%" },
    techStocks: { type: String, default: "0%" },
    emergingStocks: { type: String, default: "0%" },
    nigerianBonds: { type: String, default: "0%" },
    foriegnBonds: { type: String, default: "0%" },
    commodities: { type: String, default: "0%" },
    realEstate: { type: String, default: "0%" },
    tBills: { type: String, default: "0%" },
    alternative: { type: String, default: "0%" },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

// Define models and export
const Stocks = mongoose.model("Stocks", stocksSchema);

module.exports = { Stocks, stocksSchema };
