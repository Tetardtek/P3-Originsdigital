const AbstractManager = require("./AbstractManager");

class PlaylistsVideosManager extends AbstractManager {
  constructor() {
    super({ table: "playlists_videos" });
  }

  // The C of CRUD - Create operation
  async create(playlist) {
    const { playlist_id: playlistId, videos_id: videoId } = playlist;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (playlists_id, videos_id) values (?, ?)`,
      [playlistId, videoId]
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
  async edit(id, updatedFields) {
    const allowedFields = ["playlists_id", "videos_id"];

    const fieldsToUpdate = Object.keys(updatedFields).filter((field) =>
      allowedFields.includes(field)
    );

    const updateValues = fieldsToUpdate.map((field) => updatedFields[field]);

    if (fieldsToUpdate.length === 0) {
      return 0;
    }

    const updateQuery = `UPDATE ${this.table} SET ${fieldsToUpdate
      .map((field) => `${field} = ?`)
      .join(", ")} WHERE id = ?`;

    updateValues.push(id);

    const [result] = await this.database.query(updateQuery, updateValues);

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = PlaylistsVideosManager;
