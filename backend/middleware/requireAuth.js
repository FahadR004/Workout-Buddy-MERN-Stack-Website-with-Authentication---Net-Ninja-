// This middleware is for protecting the workouts data from unauthenticated users
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const requireAuth = async (req, res, next) => {  // Just defining the function
    // verify authentication
    const { authorization } = req.headers  // will be part of the headers containing the token

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required!"})
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET); // It returns the payload from the token which should have the id in it.

        req.user = await User.findOne({_id}).select('_id');  // We're the selecting id from the document and assigning it to a new key of user (can be called anything) in the request object. So, we can that in other controller functions to do something with it.
        // In the req object of the workout functions get etc, we would now have user object with id in it.

        next() // Fire the next handler function

    } catch (error) {
        res.status(401).json({error: "Request is not authorized!"}) // Meaning the token was not verified. Invalid token
        // Use bearer token with a random value to check in postman

    }

    // Authorization will look like 'Bearer ;aifdjqi2jr3moasdva.'
}

module.exports = requireAuth;