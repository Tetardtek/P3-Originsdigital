// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all categories from the database
    const categories = await tables.categories.readAll();
    // Respond with the categories in JSON format
    res.json(categories);
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

    // Fetch a specific categorie from the database based on the provided ID
    const categorie = await tables.categories.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && categorie && categorie[field]) {
      res.json({ [field]: categorie[field] });
    } else if (categorie) {
      // If the categorie is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the categorie in JSON format
      res.json(categorie);
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
  const categorieId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Le corps de la requête est vide." });
    }

    const { name } = req.body;

    // Edit categorie information directly using categorieManager
    const affectedRows = await tables.categories.edit(categorieId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "La mise à jour a échoué" });
    }

    // Fetch and return the updated categorie
    const editedCategorie = await tables.categories.read(categorieId);
    return res.json({
      message: "Mise à jour réussie",
      categorie: editedCategorie,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the categorie data from the request body
  const categorie = req.body;

  try {
    // Insert the categorie into the database
    const insertId = await tables.categories.create(categorie);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted categorie
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the categorie from the database
    await tables.categories.delete(req.params.id);

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
