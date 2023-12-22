// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.users.readAll();
    // Respond with the users in JSON format
    res.json(users);
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

    // Fetch a specific user from the database based on the provided ID
    const user = await tables.users.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && user && user[field]) {
      res.json({ [field]: user[field] });
    } else if (user) {
      // If the user is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the user in JSON format
      res.json(user);
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
  const userId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Le corps de la requête est vide." });
    }

    const { firstname, lastname, mail, password } = req.body;

    // Edit user information directly using UserManager
    const affectedRows = await tables.users.edit(userId, {
      firstname,
      lastname,
      mail,
      password,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "La mise à jour a échoué" });
    }

    // Fetch and return the updated user
    const editedUser = await tables.users.read(userId);
    return res.json({ message: "Mise à jour réussie", user: editedUser });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.users.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the user from the database
    await tables.users.delete(req.params.id);

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
