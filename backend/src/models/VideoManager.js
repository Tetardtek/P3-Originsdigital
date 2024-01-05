const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  // The C of CRUD - Create operation
  async create(video) {
    const {
      link,
      title,
      description,
      categories_id: categoriesId,
      is_free: isFree,
    } = video;
    const [result] = await this.database.query(
      `insert into ${this.table} (link, title, description, categories_id, is_free) values (?, ?, ?, ?, ?)`,
      [link, title, description, categoriesId, isFree]
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
  async edit(id, video) {
    const {
      link,
      title,
      description,
      categories_id: categoriesId,
      is_free: isFree,
    } = video;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET link = ?, title = ?, description = ?, categories_id = ?, is_free = ? WHERE id = ?`,
      [link, title, description, categoriesId, isFree, id]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = VideoManager;
