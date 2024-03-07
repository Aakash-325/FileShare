import express from "express";
import mongoose from "mongoose";
import Router from "./routes/route.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/", Router);

mongoose
  .connect(
    "mongodb+srv://akashchaurasiya04032003:Akash8488@cluster0.1vv4jig.mongodb.net/"
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Connected to Database and server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
