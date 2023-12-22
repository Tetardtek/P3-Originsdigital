const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");

// Route to get a list of users
router.get("/users", userControllers.browse);

// Route to get a specific user by ID
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);

// Route to add a new user
router.post("/users", userControllers.add);

// Route to delete an user by ID
router.delete("/users/:id", userControllers.destroy);

/* ************************************************************************* */

module.exports = router;
