const DataModel = require("../models/DataModel");
const csv = require("csv-parser");
const fs = require("fs");

// CREATE ROLE
const createToleranceData = async (req, res) => {
  try {
    const { index, stocks } = req.body;

    // CHECK IF REQUIRED PARAMETERS ARE AVAILABLE
    if (!index || !stocks) {
      return res
        .status(400)
        .json({ error: "Please provide all required details" });
    }

    // CREATE NEW DATA ENTRY
    const newData = new DataModel({ index, stocks });

    // CHECK IF DATA ENTRY WAS CREATED SUCCESSFULLY
    if (!newData) {
      return res.status(400).json({ error: "Could not create data entry" });
    }

    // SAVE NEW DATA ENTRY
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL TOLERANCES

const getAllTolerance = async (req, res) => {
  try {
    const tolerances = await DataModel.find();
    res.status(200).json(tolerances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// INSERT FILE
const importCsvData = async (req, res) => {
  try {
    const { filePath } = req.body; // Assuming you send the file path in the request body
    const dataArray = [];

    if (!filePath) {
      return res.status(400).json({ error: "Please provide a file path" });
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row?.index !== "") {
          // Check if the 'index' field is not empty

          const transformedData = {
            index: Number(row.index),
            stocks: {
              nigerianStocks: row.nigerianStocks,
              foriegnStocks: row.foriegnStocks,
              techStocks: row.techStocks,
              emergingStocks: row.emergingStocks,
              nigerianBonds: row.nigerianBonds,
              foriegnBonds: row.foriegnBonds,
              commodities: row.commodities,
              realEstate: row.realEstate,
              tBills: row.tBills,
              alternative: row.alternative,
            },
          };
          dataArray.push(transformedData);
          console.log(dataArray);
        }
      })
      .on("end", async () => {
        // Check for existing data based on the 'index' field
        const existingIndexes = await DataModel.distinct("index", {
          index: { $in: dataArray.map((item) => item.index) },
        });

        // Filter out existing data
        const newDataArray = dataArray.filter(
          (item) => !existingIndexes.includes(item.index)
        );

        // Calculate number of exempted files
        const exemptedFiles = dataArray.length - newDataArray.length;

        // Insert new data
        const result = await DataModel.insertMany(newDataArray);

        res.status(201).json({
          message: `Data imported successfully. Imported ${newDataArray.length} new file, exempted ${exemptedFiles} files`,
        });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createToleranceData,
  getAllTolerance,
  importCsvData,
};
