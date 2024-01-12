// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const playlistsVideos = await tables.playlists_videos.readAll();
    res.json(playlistsVideos);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const playlistVideo = await tables.playlists_videos.read(id);

    if (field && playlistVideo && playlistVideo[field]) {
      res.json({ [field]: playlistVideo[field] });
    } else if (playlistVideo) {
      res.json(playlistVideo);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const playlistVideoId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { playlists_id: playlistsId, videos_id: videosId } = req.body;

    const playlistVideo = await tables.playlists_videos.read(playlistVideoId);

    if (!playlistVideo) {
      return res.status(404).json({ message: "PlaylistVideo not found" });
    }

    const updatedFields = {};

    if (playlistsId !== undefined) {
      updatedFields.playlists_id = playlistsId;
    }
    if (videosId !== undefined) {
      updatedFields.videos_id = videosId;
    }

    const affectedRows = await tables.playlists_videos.edit(
      playlistVideoId,
      updatedFields
    );

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedPlaylistVideo = await tables.playlists_videos.read(
      playlistVideoId
    );
    return res.json({
      message: "Success Update",
      playlist: editedPlaylistVideo,
    });
  } catch (error) {
    console.error("Error on playlist update", error);
    return res.status(500).json({ message: "Error on playlist update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { playlist_id: playlistId, videos_id: videoId } = req.body;

    const video = {
      playlist_id: playlistId,
      videos_id: videoId,
    };

    const insertId = await tables.playlists_videos.create(video);

    res.status(201).json({ message: "Success", id: insertId });
  } catch (err) {
    console.error("Error on playlist creation", err);
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
