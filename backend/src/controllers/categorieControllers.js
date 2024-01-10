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

    const categorie = await tables.categories.read(id);

    if (field && categorie && categorie[field]) {
      res.json({ [field]: categorie[field] });
    } else if (categorie) {
      res.json(categorie);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const categorieId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "The request body is empty." });
    }

    const { name } = req.body;

    const affectedRows = await tables.categories.edit(categorieId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update failed" });
    }

    const editedCategorie = await tables.categories.read(categorieId);
    return res.json({
      message: "Successful update",
      categorie: editedCategorie,
    });
  } catch (error) {
    console.error("User update error", error);
    return res.status(500).json({ message: "User update error" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const categorie = req.body;

  try {
    const insertId = await tables.categories.create(categorie);

    res.status(201).json({ insertId });
  } catch (err) {
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
