const mongoose = require('mongoose');

// The Schema defines the structure of a document or a type of document inside our database
const Schema = mongoose.Schema

const workoutSchema = new Schema({ // We pass an object saying what a typical workout object should look like.
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    }, 
    load: {
        type: Number,
        required: true
    },
    user_id : {
        type: String,
        required: true
    }
}, {timestamps: true});

// Apply the Schema to a particular model, then we use the model to interact with a collection of that name
module.exports = mongoose.model("Workout", workoutSchema); // Singular because it pluralizes and creates a collection automatically for us
// Use the imported Workout model to interact with Workouts collection