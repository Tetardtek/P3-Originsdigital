// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all playlists from the database
    const playlists = await tables.playlists.readAll();
    // Respond with the videos in JSON format
    res.json(playlists);
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
    const playlist = await tables.playlists.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && playlist && playlist[field]) {
      res.json({ [field]: playlist[field] });
    } else if (playlist) {
      // If the playlist is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the playlist in JSON format
      res.json(playlist);
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
  const playlistId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { link, title, description, categories_id: categoriesId } = req.body;

    // Edit video information directly using videoManager
    const affectedRows = await tables.videos.edit(playlistId, {
      link,
      title,
      description,
      categories_id: categoriesId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated playlist
    const editedplaylist = await tables.playlists.read(playlistId);
    return res.json({ message: "Success Update", playlist: editedplaylist });
  } catch (error) {
    console.error("Error on playlist update", error);
    return res.status(500).json({ message: "Error on playlist update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the playlist data from the request body
  const playlist = req.body;

  try {
    // Insert the playlist into the database
    const insertId = await tables.playlists.create(playlist);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted playlist
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the playlist from the database
    await tables.playlists.delete(req.params.id);

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
