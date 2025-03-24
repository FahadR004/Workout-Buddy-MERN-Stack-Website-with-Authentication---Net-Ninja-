const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    } 
});

// Each model comes with defined methods such as created, find etc. User-defined methods are called static methods.

userSchema.statics.signup = async function (email, password) {  // .this does not work with arrow functions
    // validation
    if (!email || !password) {
        throw Error("Fill all fields!")
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid Email!")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough!")
    }

    // Checking ourselves. 
    const dataExists = await this.findOne({email}); // Can't do User.<smth>  because we export that model below. It is not available to us. So, we use this.

    if (dataExists) {
        throw Error("Email is already registered!");
    }

    // Salt is a string of characters added to a password to prevent hackers from password matching if they are able to crack and use it to match to other passwords.   

    const salt  = await bcrypt.genSalt(10) ;// The higher the argument, which is the number of rounds, the longer it will take for hackers to crack the password and for users to signup. Find balance
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});

    return user;

}

// login static method
userSchema.statics.login = async function (email, password) {
     // validation
     if (!email || !password) {
        throw Error("Fill all fields!")
    }

    const user = await this.findOne({email}); // Can't do User.<smth>  because we export that model below. It is not available to us. So, we use this.

    if (!user) {  // If we can't find the email, hence '!'
        throw Error("User not Found!");
    }

    const match = await bcrypt.compare(password, user.password) // Compare the normal string with encrypted one

    if (!match) {
        throw Error("Incorrect password!")
    }

    return user;  // If both match, return the document retrieved
}

module.exports = mongoose.model("User", userSchema);


