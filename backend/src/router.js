const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");

// Route to get a list of users/videos
router.get("/users", userControllers.browse);
router.get("/videos", videoControllers.browse);

// Route to get a specific user/video by ID
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.get("/videos/:id", videoControllers.read);
router.get("/videos/:id/field", videoControllers.read);

router.put("/users/:id", userControllers.edit);
router.put("/videos/:id", videoControllers.edit);

// Route to add a new user/vide
router.post("/users", userControllers.add);
router.post("/videos", videoControllers.add);

// Route to delete an user/video by ID
router.delete("/users/:id", userControllers.destroy);
router.delete("/videos/:id", videoControllers.destroy);

/* ************************************************************************* */

module.exports = router;
