const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");
const categorieControllers = require("./controllers/categorieControllers");

// Route to get a list of users/videos/categories
router.get("/users", userControllers.browse);
router.get("/videos", videoControllers.browse);
router.get("/categories", categorieControllers.browse);

// Route to get a specific user/video/categorie by ID
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.get("/videos/:id", videoControllers.read);
router.get("/videos/:id/field", videoControllers.read);
router.get("/categories/:id", categorieControllers.read);
router.get("/categorie/:id/field", categorieControllers.read);

router.put("/users/:id", userControllers.edit);
router.put("/videos/:id", videoControllers.edit);
router.put("/categories/:id", categorieControllers.edit);

// Route to add a new user/video/categorie
router.post("/users", userControllers.add);
router.post("/videos", videoControllers.add);
router.post("/categories", categorieControllers.add);

// Route to delete an user/video/categorie by ID
router.delete("/users/:id", userControllers.destroy);
router.delete("/videos/:id", videoControllers.destroy);
router.delete("/categories/:id", categorieControllers.destroy);

/* ************************************************************************* */

module.exports = router;
