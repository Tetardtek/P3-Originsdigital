const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");
const commentControllers = require("./controllers/commentControllers");
const playlistControllers = require("./controllers/playlistControllers");
const categorieControllers = require("./controllers/categorieControllers");
const verifyToken = require("./middlewares/verifyToken");
const playlistVideoControllers = require("./controllers/playlistVideoControllers");

// Route to get a list of users/videos/categories/playlists/comments

router.get("/users", verifyToken, userControllers.browse);
router.get("/videos", videoControllers.browse);
router.get("/comments", commentControllers.browse);
router.get("/playlists", playlistControllers.browse);
router.get("/categories", categorieControllers.browse);
router.get("/playlists_videos", playlistVideoControllers.browse);

// Route to get a specific user/video/categorie/playlist/comment by ID
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.get("/videos/:id", videoControllers.read);
router.get("/videos/:id/field", videoControllers.read);
router.get("/comments/:id", commentControllers.read);
router.get("/comments/:id/field", commentControllers.read);
router.get("/playlists/:id", playlistControllers.read);
router.get("/playlists/:id/field", playlistControllers.read);
router.get("/categories/:id", categorieControllers.read);
router.get("/categories/:id/field", categorieControllers.read);
router.get("/playlists_videos/:id", playlistVideoControllers.read);
router.get("/playlists_videos/:id/field", playlistVideoControllers.read);

// Route to edit user/video/categorie/playlist/comment by ID
router.put("/users/:id", userControllers.edit);
router.put("/videos/:id", videoControllers.edit);
router.put("/comments/:id", commentControllers.edit);
router.put("/playlists/:id", playlistControllers.edit);
router.put("/categories/:id", categorieControllers.edit);
router.put("/playlists_videos/:id", playlistVideoControllers.edit);

// Route to add a new user/video/categorie/playlist/comment
router.post("/users", userControllers.add);
router.post("/forgot-password", userControllers.forgottenPassword);
router.post("/reset-password/:token", userControllers.resetPassword);
router.post("/videos", videoControllers.add);
router.post("/comments", commentControllers.add);
router.post("/playlists", playlistControllers.add);
router.post("/categories", categorieControllers.add);
router.post("/login", userControllers.login);
router.post("/playlists_videos", playlistVideoControllers.add);

// Route to delete an user/video/categorie/playlist/comments by ID
router.delete("/users/:id", userControllers.destroy);
router.delete("/videos/:id", videoControllers.destroy);
router.delete("/comments/:id", commentControllers.destroy);
router.delete("/playlists/:id", playlistControllers.destroy);
router.delete("/categories/:id", categorieControllers.destroy);
router.delete("/playlists_videos/:id", playlistVideoControllers.destroy);

/* ************************************************************************* */

module.exports = router;
