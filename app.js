//mongoatlas
//anyankadiachenko
//TJtW1ZBIezb8xMw9
const mongoose = require('mongoose');
const {DB_HOST} = require ('./config.js')
mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
.then(() => console.log("Database connection successful"))
.catch (error => console.log(error.message))


const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
