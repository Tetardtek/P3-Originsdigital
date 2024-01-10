const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  // The C of CRUD - Create operation
  async create(comment) {
    const [result] = await this.database.query(
      `INSER INTO ${this.table} (id, content, date) VALUES (?, ?, ?)`,
      [comment.id, comment.content, comment.date]
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

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, comment) {
    const { content, date } = comment;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET content = ?, date = ? WHERE id = ?`,
      [content, date, id]
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CommentManager;
