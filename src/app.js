require('dotenv').config();

const express = require("express");
const app = express();

const session = require("express-session");

const connectDB = require("./config/db");
connectDB();

const {isAuthenticated} = require("./middleware");

// app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
}));

const router = require("./routes/authRoutes.js");

app.use("/auth", router); // Route Mounting (all routes inside router are prefixed with /auth)

app.get("/", (req, res) => {
    console.log(req.session);
    res.send("Welcome to my website!");
});

app.get("/profile", isAuthenticated, (req, res) => {
    res.send("you are logged in!");
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});