import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

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
  .catch((error) => {
    console.log(error);
  });
