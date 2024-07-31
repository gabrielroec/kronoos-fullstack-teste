const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const csvRoutes = require("./routes/csvRoutes.route");

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

mongoose
  .connect(
    "mongodb+srv://roecwebdev:asuh1@kronoos-test-cluster.kvrjc4x.mongodb.net/?retryWrites=true&w=majority&appName=KRONOOS-TEST-CLUSTER"
  )
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error: any) => {
    console.log(error);
  });

app.use("/api/csv", csvRoutes);
