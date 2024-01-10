const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // The C of CRUD - Create operation
  async create(user) {
    const { firstname, lastname, pseudoname, mail, birthdate, password } = user;

    const rolesId = 1;

    const logdate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, pseudoname, mail, birthdate, logdate, password, roles_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        pseudoname,
        mail,
        birthdate,
        logdate,
        password,
        rolesId,
      ]
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id, field) {
    if (field) {
      const [rows] = await this.database.query(
        `SELECT ?? FROM ${this.table} WHERE id = ?`,
        [field, id]
      );

      if (rows.length === 0) {
        return null;
      }

      return rows[0][field];
    }

    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async getByMail(mail) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE mail = ?`,
      [mail]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, user) {
    const { firstname, lastname, mail, password } = user;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, mail = ?, password = ? WHERE id = ?`,
      [firstname, lastname, mail, password, id]
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = UserManager;
