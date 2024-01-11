const AbstractManager = require("./AbstractManager");

class PlaylistVideoManager extends AbstractManager {
  constructor() {
    super({ table: "playlists_videos" });
  }

  // The C of CRUD - Create operation
  async create(playlist) {
    const { playlists_id: playlistId, videos_id: videosId } = playlist;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (playlists_id, videos_id) values (?, ?)`,
      [playlistId, videosId]
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
    const { playlists_id: playlistId, videos_id: videosId } = playlist;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET playlists_id = ?, videos_id = ? WHERE id = ?`,
      [playlistId, videosId, id]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = PlaylistVideoManager;
