const AbstractManager = require("./AbstractManager");

class PlaylistManager extends AbstractManager {
  constructor() {
    super({ table: "playlists" });
  }

  // The C of CRUD - Create operation
  async create(playlist) {
    const { title, link, description } = playlist;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, link, description) values (?, ?, ?)`,
      [title, link, description]
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
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, playlist) {
    const { title, link, description } = playlist;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, link = ?, description = ? WHERE id = ?`,
      [title, link, description, id]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = PlaylistManager;
