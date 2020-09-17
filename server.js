const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes/api");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));
app.use(cors());
app.use("/api", routes);
const {MONGODB_URI} =require('./config/keys')
const PORT = process.env.PORT || 8080;
// "mongodb://localhost:27017/notebookDB
mongoose.connect(
  MONGODB_URI ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB is Hot");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));
