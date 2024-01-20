const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const riskToleranceRoutes = require("./routes/riskToleranceRoutes.js");
const cors = require("cors");

// INITIALIZE APP
const app = express();

// .ENV CONFIG, IF REMOVED VARIABLES IN .ENV WILL BE UNACCESSIBLE
dotenv.config();

// PORT USED
const PORT = process.env.PORT || 8080;

// OTHER CONFIGS
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/tolerance/", riskToleranceRoutes);

// CONNECT TO DB, THEN SERVER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB connection successful, server connected to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
