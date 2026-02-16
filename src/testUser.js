require("dotenv").config();   
const connectDB = require("./config/db.js");
const User = require("./models/user.js");

const test = async () => {
    await connectDB();

    const newUser = new User({
        username: "om@1721",
        email: "omvigave@gmail.com",
        password: "hello",
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    process.exit();
};

// test();

const login = async () => {
    await connectDB();
    const user = await User.findOne({email: "omvigave@gmail.com"});
    console.log(user);
    const a = await user.comparePassword("hello")   // should be true
    const b = await user.comparePassword("wrong")   // should be false
    console.log(a, b);
};

// login();