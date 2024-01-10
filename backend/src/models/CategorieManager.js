const AbstractManager = require("./AbstractManager");

class CategorieManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  // The C of CRUD - Create operation
  async create(categorie) {
    const { name } = categorie;
    const [result] = await this.database.query(
      `INSER INTO ${this.table} (name) VALUES (?)`,
      [name]
    );

    // Return the ID of the newly inserted categorie
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

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, categorie) {
    const { name } = categorie;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [name, id]
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CategorieManager;
