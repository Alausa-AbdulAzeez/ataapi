const { default: mongoose } = require("mongoose");
const { Stocks, stocksSchema } = require("./stocksModel");

const dataSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true, unique: true },
    stocks: {
      type: stocksSchema,
      required: true,
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

// Create a model based on the data schema
const DataModel = mongoose.model("Data", dataSchema);

module.exports = DataModel;
