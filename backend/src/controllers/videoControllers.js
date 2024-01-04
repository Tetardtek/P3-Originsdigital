// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all videos from the database
    const videos = await tables.videos.readAll();
    // Respond with the videos in JSON format
    res.json(videos);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    // Fetch a specific video from the database based on the provided ID
    const video = await tables.videos.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && video && video[field]) {
      res.json({ [field]: video[field] });
    } else if (video) {
      // If the video is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the video in JSON format
      res.json(video);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const videoId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      link,
      title,
      description,
      categories_id: categoriesId,
      is_free: isFree,
    } = req.body;

    // Edit video information directly using videoManager
    const affectedRows = await tables.videos.edit(videoId, {
      link,
      title,
      description,
      categories_id: categoriesId,
      is_free: isFree,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated video
    const editedvideo = await tables.videos.read(videoId);
    return res.json({ message: "Success Update", video: editedvideo });
  } catch (error) {
    console.error("Error on video update", error);
    return res.status(500).json({ message: "Error on video update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the video data from the request body
  const video = req.body;

  try {
    // Insert the video into the database
    const insertId = await tables.videos.create(video);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted video
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the video from the database
    await tables.videos.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
