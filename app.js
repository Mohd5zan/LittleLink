require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 4000;

const path = require("path");

const connectiondb = require("./connectiondb");
connectiondb(process.env.MONGO_URI)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("error:", err);
  });

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const staticrouter = require("./routes/static");
const userrouter = require("./routes/user");
const urlrouter = require("./routes/url");

app.use("/", staticrouter);
app.use("/user", userrouter);
app.use("/url", urlrouter);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("Server running at PORT:4000");
});
