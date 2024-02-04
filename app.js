const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

// Cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-cookie", "new-user=true")

  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("You got the cookies!");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
