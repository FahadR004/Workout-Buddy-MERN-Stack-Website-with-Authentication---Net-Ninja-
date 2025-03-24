const express = require("express");
const {createWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout} = require("..//controller/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router(); // We use router since we can't use app.get, app.delete here because we don't have access to app here.
router.use(requireAuth); // Firing this function , before any of the routes, to protect them from unauthenticated users. If unauthenticated, they would just be send back and not access these.

// GET request
router.get('/', getWorkouts);

// GET a single request
router.get('/:id', getWorkoutById);

// POST request
router.post('/', createWorkout)

// DELETE request 
router.delete('/:id', deleteWorkout);

// PATCH request (partial update)
router.patch('/:id', updateWorkout);

module.exports = router;