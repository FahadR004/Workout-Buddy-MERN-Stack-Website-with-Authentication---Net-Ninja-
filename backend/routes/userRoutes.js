const express = require("express");

const router = express.Router();

const { loginUser, signupUser } = require("../controller/userController");

// login route
router.post('/login', loginUser);  // post request because we're sending data with the request


// signup route
router.post('/signup', signupUser)

module.exports = router;