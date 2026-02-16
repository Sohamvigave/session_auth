const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function() {
   if (!this.isModified("password")) return;

   const salt = await bcrypt.genSalt(10);

   const hashed = await bcrypt.hash(this.password, salt);

   this.password = hashed;

});

userSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;