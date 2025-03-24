
// Import statements
// dotenv loads the environment variables from env file into the process.env
require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes") // No need to put in extension
const userRoutes = require("./routes/userRoutes")
const mongoose = require("mongoose");

const cors = require("cors");

// express app
const app = express();
app.use(cors());

// middleware // Global middleware that runs for every request
app.use(express.json()); // Any request with a body is passed and attached to the request object
app.use((req, res, next) => {  // next object is for going to the next piece of middleware
    console.log(req.path, req.method);
    next();
}) 

// Routes
app.use('/api/workout', workoutRoutes);  // Same as below. Attaches the routes to app. Now with t

app.use('/api/auth', userRoutes)

// app.get('/', (req, res) => {
//     res.json({message: "Welcome to this MERN Stack Website!"})
// })

// Connect to the database
mongoose.connect(process.env.mongoDb)
    .then(() => {
            console.log("Database is connected!")
        // Listen for requests only when database is connected!
            app.listen(process.env.PORT, () => {
                console.log(`The server is running on port ${process.env.PORT} !`);
            })
    })
    .catch((error) => {
        console.log(error)
    })

