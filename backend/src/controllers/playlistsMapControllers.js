// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const playlistsMaps = await tables.playlists_maps.readAll();
    res.json(playlistsMaps);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const playlistsMap = await tables.playlists_maps.read(id);

    if (field && playlistsMap && playlistsMap[field]) {
      res.json({ [field]: playlistsMap[field] });
    } else if (playlistsMap) {
      res.json(playlistsMap);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const playlistsMapId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { playlists_id: playlistsId, videos_id: videosId } = req.body;

    const playlistsMap = await tables.playlists_maps.read(playlistsMapId);

    if (!playlistsMap) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const updatedFields = {};

    if (playlistsId !== undefined) {
      updatedFields.playlists_id = playlistsId;
    }
    if (videosId !== undefined) {
      updatedFields.videos_id = videosId;
    }

    const affectedRows = await tables.playlists_maps.edit(
      playlistsMapId,
      updatedFields
    );

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedPlaylistsMap = await tables.playlists_maps.read(playlistsMapId);
    return res.json({
      message: "Success Update",
      playlistsMap: editedPlaylistsMap,
    });
  } catch (error) {
    console.error("Error on playlistMap update", error);
    return res.status(500).json({ message: "Error on playlistMap update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { playlists_id: playlistId, videos_id: videoId } = req.body;

    const playlistsMap = {
      playlists_id: playlistId,
      videos_id: videoId,
    };

    const insertId = await tables.playlists_maps.create(playlistsMap);

    res.status(201).json({ message: "Success", id: insertId });
  } catch (err) {
    console.error("Error on playlist creation", err);
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.playlists_maps.delete(req.params.id);

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
