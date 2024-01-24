// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const categories = await tables.categories.readAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const category = await tables.categories.read(id);

    if (field && category && category[field]) {
      res.json({ [field]: category[field] });
    } else if (category) {
      res.json(category);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const categoryId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { title, description } = req.body;

    const category = await tables.categories.read(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedFields = {};

    if (title !== undefined) {
      updatedFields.title = title;
    }
    if (description !== undefined) {
      updatedFields.description = description;
    }

    const affectedRows = await tables.categories.edit(
      categoryId,
      updatedFields
    );

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedPlaylist = await tables.categories.read(categoryId);
    return res.json({ message: "Success Update", playlist: editedPlaylist });
  } catch (error) {
    console.error("Error on category update", error);
    return res.status(500).json({ message: "Error on category update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const category = {
      title,
      description,
    };

    const insertId = await tables.categories.create(category);

    res.status(201).json({ id: insertId, ...category });
  } catch (err) {
    console.error("Error on category creation", err);
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.categories.delete(req.params.id);

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
