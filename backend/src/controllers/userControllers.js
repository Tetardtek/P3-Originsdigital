const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const secretKey = process.env.APP_SECRET;

const saltRounds = 10;

const login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await tables.users.getByMail(mail);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ user: user.id }, secretKey);

    return res.status(200).json({
      message: "Login successful",
      user: { ...user, pseudoname: user.pseudoname },
      token,
    });
  } catch (error) {
    console.error("Error logging in user", error);
    return res.status(500).json({ message: "Error logging in user" });
  }
};
// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const user = await tables.users.read(id);

    if (field && user && user[field]) {
      res.json({ [field]: user[field] });
    } else if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const userId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { firstname, lastname, mail, password } = req.body;

    const affectedRows = await tables.users.edit(userId, {
      firstname,
      lastname,
      mail,
      password,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedUser = await tables.users.read(userId);
    return res.json({ message: "Updated", user: editedUser });
  } catch (error) {
    console.error("Error updating user", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    const { firstname, lastname, pseudoname, mail, birthdate, password } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {
      firstname,
      lastname,
      pseudoname,
      mail,
      birthdate,
      password: hashedPassword,
      logdate: new Date(),
    };

    const insertId = await tables.users.create(user);

    const token = jwt.sign({ user: user.id }, secretKey);

    res.status(201).json({ insertId, token });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.users.delete(req.params.id);

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
  login,
};
