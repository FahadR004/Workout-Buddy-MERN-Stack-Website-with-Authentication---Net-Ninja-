const Workout = require("../models/workoutModels");
const mongoose = require("mongoose");    

// Get all workouts
const getWorkouts = async(req, res) => {
    try {
        const user_id = req.user._id
        const workouts = await Workout.find({ user_id }).sort({createdAt: -1});  // -1 for descending (newest first) and 1 for ascending (oldest first)
        res.status(200).json(workouts);
    } catch(error) {
        res.status(500).json({error: error.message});
    }

}

// Get a single workout
const getWorkoutById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "No such workout!"})
        }

        const workout = await Workout.findById(id); // No curly braces here

        if (!workout) {
            return res.status(404).json({message: "No such workout!"})
        }

        res.status(200).json({message: "Workout found successfully", workoutFound:workout})

    } catch(error) {

        res.status(500).json({error: error.message});
    }

}

// Create a workout
const createWorkout  = async (req, res) => {     
    try {
        const {title, reps, load} = req.body
        let emptyFields = []
        if (!title) {
            emptyFields.push("title")
        } 
        if (!reps) {
            emptyFields.push("reps")
        } 

        if (!load) {
            emptyFields.push("load");
        }

        if (emptyFields.length > 0) {
            return res.status(400).json({error: "Please fill in all the fields!", emptyFields})
        }
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id});
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

// Update a workout 
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "No such workout!"})
        }

        const workout = await Workout.findByIdAndUpdate(id, req.body, {new: true}); // findByOneAndUpdate(id, {...req.body})

        if (!workout) {
            return res.status(404).json({message: "No such workout!"})
        }

        res.status(200).json({message: "Workout updated successfully", workoutUpdated: workout})

    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

// Delete a workout

const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "No such workout!"})
        }

        const workout = await Workout.findByIdAndDelete(id); // No curly braces here. Or use findOneAndDelete({_id: id})

        if (!workout) {
            return res.status(404).json({message: "No such workout!"})
        }

        res.status(200).json({message: "Workout deleted successfully", workoutDeleted:workout})

    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout
}
