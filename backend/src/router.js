const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");
const commentControllers = require("./controllers/commentControllers");

// Route to get a list of users/videos
router.get("/users", userControllers.browse);
router.get("/videos", videoControllers.browse);
router.get("/comments", commentControllers.browse);

// Route to get a specific user/video by ID
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.get("/videos/:id", videoControllers.read);
router.get("/videos/:id/field", videoControllers.read);
router.get("/comments/:id", commentControllers.read);
router.get("/comments/:id/field", commentControllers.read);

router.put("/users/:id", userControllers.edit);
router.put("/videos/:id", videoControllers.edit);
router.put("/comments/:id", commentControllers.edit);

// Route to add a new user/vide
router.post("/users", userControllers.add);
router.post("/videos", videoControllers.add);
router.post("/comments", commentControllers.add);

// Route to delete an user/video by ID
router.delete("/users/:id", userControllers.destroy);
router.delete("/videos/:id", videoControllers.destroy);
router.delete("/comments/:id", commentControllers.destroy);

/* ************************************************************************* */

module.exports = router;
