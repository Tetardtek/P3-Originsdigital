// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const videos = await tables.videos.readAll();
    res.json(videos);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const video = await tables.videos.read(id);

    if (field && video && video[field]) {
      res.json({ [field]: video[field] });
    } else if (video) {
      res.json(video);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const videoId = req.params.id;

  try {
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

    const editedvideo = await tables.videos.read(videoId);
    return res.json({ message: "Success Update", video: editedvideo });
  } catch (error) {
    console.error("Error on video update", error);
    return res.status(500).json({ message: "Error on video update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const video = req.body;

  try {
    const insertId = await tables.videos.create(video);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.videos.delete(req.params.id);

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
