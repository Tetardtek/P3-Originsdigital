const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");
const playlistControllers = require("./controllers/playlistControllers");
const categorieControllers = require("./controllers/categorieControllers");

// Route to get a list of users/videos/categories/playlists
router.get("/users", userControllers.browse);
router.get("/videos", videoControllers.browse);
router.get("/playlists", playlistControllers.browse);
router.get("/categories", categorieControllers.browse);

// Route to get a specific user/video/categorie/playlist by ID
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.get("/videos/:id", videoControllers.read);
router.get("/videos/:id/field", videoControllers.read);
router.get("/playlists/:id", playlistControllers.read);
router.get("/playlists/:id/field", playlistControllers.read);
router.get("/categories/:id", categorieControllers.read);
router.get("/categorie/:id/field", categorieControllers.read);

// Route to edit user/video/categorie/playlist by ID
router.put("/users/:id", userControllers.edit);
router.put("/videos/:id", videoControllers.edit);
router.put("/playlists/:id", playlistControllers.edit);
router.put("/categories/:id", categorieControllers.edit);

// Route to add a new user/video/categorie/playlist
router.post("/users", userControllers.add);
router.post("/videos", videoControllers.add);
router.post("/playlists", playlistControllers.add);
router.post("/categories", categorieControllers.add);

// Route to delete an user/video/categorie/playlist by ID
router.delete("/users/:id", userControllers.destroy);
router.delete("/videos/:id", videoControllers.destroy);
router.delete("/playlists/:id", playlistControllers.destroy);
router.delete("/categories/:id", categorieControllers.destroy);


/* ************************************************************************* */

module.exports = router;
