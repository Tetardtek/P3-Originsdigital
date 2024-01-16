require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const tables = require("../tables");

const secretKey = process.env.APP_SECRET;
const resetTokenSecret = process.env.RESET_TOKEN_SECRET;
const saltRounds = 10;

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateResetToken = (user) => {
  const resetToken = jwt.sign({ user: user.id }, resetTokenSecret, {
    expiresIn: "1h",
  });

  const tokenWithoutDots = resetToken.replace(/\./g, "-");

  return tokenWithoutDots;
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const mailOptions = {
    from: "origin.digital@outlook.com",
    to: user.mail,
    subject: "Password reset",
    text: `Click on the following link to reset your password: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

const forgottenPassword = async (req, res) => {
  const { mail } = req.body;

  try {
    const user = await tables.users.getByMail(mail);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateResetToken(user);

    await sendPasswordResetEmail(user, resetToken);

    return res.status(200).json({ message: "Password reset e-mail sent" });
  } catch (error) {
    console.error("Error sending password reset e-mail:", error);
    return res.status(500).json({
      message: "Error sending password reset e-mail",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;

  const resetToken = decodeURIComponent(req.params.token.replace(/-/g, "."));

  try {
    const decodedToken = jwt.verify(resetToken, resetTokenSecret);

    const user = await tables.users.read(decodedToken.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!password) {
      return res.status(400).json({ message: "New password missing" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await tables.users.edit(user.id, { password: hashedPassword });

    return res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({
      message: "Password reset error",
      error,
    });
  }
};

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
      console.error("Empty body");
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      currentPassword,
      firstname,
      lastname,
      mail,
      newPassword,
      pseudoname,
    } = req.body;

    const user = await tables.users.read(userId);

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword !== undefined && newPassword.trim() !== "") {
      const passwordMatch =
        currentPassword &&
        user.password &&
        (await bcrypt.compare(currentPassword.trim(), user.password.trim()));

      if (!passwordMatch) {
        console.error("Incorrect current password");
        return res.status(401).json({ message: "Incorrect current password" });
      }
    }

    const updatedFields = {};

    if (firstname !== undefined) {
      updatedFields.firstname = firstname;
    }

    if (lastname !== undefined) {
      updatedFields.lastname = lastname;
    }

    if (pseudoname !== undefined) {
      updatedFields.pseudoname = pseudoname;
    }

    if (mail !== undefined) {
      updatedFields.mail = mail;
    }

    if (newPassword !== undefined && newPassword.trim() !== "") {
      updatedFields.password = await bcrypt.hash(
        newPassword.trim(),
        saltRounds
      );
    }

    const affectedRows = await tables.users.edit(userId, updatedFields);

    if (affectedRows === 0) {
      console.error("Update fail");
      return res.status(500).json({ message: "Update fail" });
    }

    const editedUser = await tables.users.read(userId);

    return res.json({ message: "Updated", user: editedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user", error });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { firstname, lastname, pseudoname, mail, birthdate, password } =
      req.body;

    const existingUser = await tables.users.getByMail(mail);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

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

  return null;
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
  forgottenPassword,
  resetPassword,
};
