const AbstractManager = require("./AbstractManager");

class PlaylistManager extends AbstractManager {
  constructor() {
    super({ table: "playlists" });
  }

  // The C of CRUD - Create operation
  async create(playlist) {
    const { link, title, description, categories_id: categoriesId } = playlist;
    const [result] = await this.database.query(
      `insert into ${this.table} (link, title, description, categories_id) values (?, ?, ?, ?)`,
      [link, title, description, categoriesId]
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
    const { link, title, description, categories_id: categoriesId } = playlist;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET link = ?, title = ?, description = ?, categoriesId = ? WHERE id = ?`,
      [link, title, description, categoriesId, id]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = PlaylistManager;
