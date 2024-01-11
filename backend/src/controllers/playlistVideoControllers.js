// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const playlists = await tables.playlists_videos.readAll();
    res.json(playlists);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const playlist = await tables.playlists_videos.read(id);

    if (field && playlist && playlist[field]) {
      res.json({ [field]: playlist[field] });
    } else if (playlist) {
      res.json(playlist);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const playlistId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { title, link, description } = req.body;

    const affectedRows = await tables.playlists_videos.edit(playlistId, {
      title,
      link,
      description,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedplaylist = await tables.playlists_videos.read(playlistId);
    return res.json({ message: "Success Update", playlist: editedplaylist });
  } catch (error) {
    console.error("Error on playlist update", error);
    return res.status(500).json({ message: "Error on playlist update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const playlist = req.body;

  try {
    const insertId = await tables.playlists_videos.create(playlist);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.playlists_videos.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
