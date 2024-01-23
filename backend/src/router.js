const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import Controllers
const userControllers = require("./controllers/userControllers");
const verifyToken = require("./middlewares/verifyToken");
const videosControllers = require("./controllers/videosControllers");
const playlistsControllers = require("./controllers/playlistsControllers");
const playlistsMapControllers = require("./controllers/playlistsMapControllers");
const commentControllers = require("./controllers/commentControllers");

// USERS MANAGEMENT
router.get("/users", verifyToken, userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.post("/login", userControllers.login);

// VIDEOS MANAGEMENT
router.get("/videos", videosControllers.browse);
router.get("/videos/:id", videosControllers.read);
router.get("/videos/:id/field", videosControllers.read);
router.put("/videos/:id", videosControllers.edit);
router.post("/videos", videosControllers.add);
router.delete("/videos/:id", videosControllers.destroy);

// PLAYLISTS MANAGEMENT
router.get("/playlists", playlistsControllers.browse);
router.get("/playlists/:id", playlistsControllers.read);
router.get("/playlists/:id/field", playlistsControllers.read);
router.put("/playlists/:id", playlistsControllers.edit);
router.post("/playlists", playlistsControllers.add);
router.delete("/playlists/:id", playlistsControllers.destroy);

// PLAYLISTMAP MANAGEMENT
router.get("/playlists_maps", playlistsMapControllers.browse);
router.get("/playlists_maps/:id", playlistsMapControllers.read);
router.get("/playlists_maps/:id/field", playlistsMapControllers.read);
router.put("/playlists_maps/:id", playlistsMapControllers.edit);
router.post("/playlists_maps", playlistsMapControllers.add);
router.delete("/playlists_maps/:id", playlistsMapControllers.destroy);

// COMMENTS MANAGEMENT
router.get("/comments", commentControllers.browse);
router.get("/comments/:id", commentControllers.read);
router.get("/comments/:id/field", commentControllers.read);
router.put("/comments/:id", commentControllers.edit);
router.post("/comments", commentControllers.add);
router.delete("/comments/:id", commentControllers.destroy);

/* ************************************************************************* */

module.exports = router;
