const express = require("express");
const User = require("../models/user.js");
const router = express.Router();  

router.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);

        let savedUser = await newUser.save();
        console.log(savedUser);

        res.status(201).json({message: "Registered successfully!"});
    } catch (err) {
        res.status(500).json({message: "Registration failed"});
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        // console.log(user);

        if(!user) {
            return res.status(401).json({message: "User not found"});
        };

        let isMatch = await user.comparePassword(req.body.password);
        // console.log(isMatch);

        if(!isMatch) {
            return res.status(404).json({message: "Invalid credentials"});
        };

        req.session.userId = user._id;
        
        res.status(200).json({message: "Login successful!"});
    } catch (err) {
        res.status(500).json({message: "Login failed"});
    }

});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({message: "LoggedOut successfully!"});
    });
});

module.exports = router;