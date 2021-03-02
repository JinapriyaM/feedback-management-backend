const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const commentRoutes = require("./routes/comments");
const propertyRoutes = require("./routes/property");

app.use(bodyParser.json());

app.use(cors());

app.use("/comment", commentRoutes);

app.use("/property", propertyRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect("mongodb://localhost/feedbackdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
