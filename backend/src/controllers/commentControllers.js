// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const comments = await tables.comments.readAll();
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const comment = await tables.comments.read(id);

    if (field && comment && comment[field]) {
      res.json({ [field]: comment[field] });
    } else if (comment) {
      res.json(comment);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const commentId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "The request body is empty." });
    }

    const { content, date } = req.body;

    const affectedRows = await tables.comments.edit(commentId, {
      content,
      date,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update failed" });
    }
    const editedComment = await tables.comments.read(commentId);
    return res.json({ message: "Update successful", comment: editedComment });
  } catch (error) {
    console.error("Error updating comment", error);
    return res.status(500).json({ message: "Error updating comment" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const comment = req.body;

  try {
    const insertId = await tables.comments.create(comment);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.comments.delete(req.params.id);

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
