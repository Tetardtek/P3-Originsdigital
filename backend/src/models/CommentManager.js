const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "comments" });
  }

  // The C of CRUD - Create operation
  async create(comment) {
    // Execute the SQL INSERT query to add a new comment to the "comment" table
    const [result] = await this.database.query(
      `insert into ${this.table} (id, content, date) values (?, ?, ?)`,
      [comment.id, comment.content, comment.date]
    );

    // Return the ID of the newly inserted comment
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id, field) {
    // Si un champ spécifique est demandé, exécutez une requête SQL SELECT pour récupérer uniquement ce champ
    if (field) {
      const [rows] = await this.database.query(
        `SELECT ?? FROM ${this.table} WHERE id = ?`,
        [field, id]
      );

      if (rows.length === 0) {
        return null; // Commentaire non trouvé
      }

      return rows[0][field];
    }

    // Sinon, exécutez la requête SQL SELECT pour récupérer le commentaire complet
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null; // Commentaire non trouvé
    }

    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all comments from the "comment" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, comment) {
    // Extract fields from the user object
    const { content, date } = comment;

    // Execute the SQL UPDATE query to modify an existing comment in the "comments" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET content = ?, date = ? WHERE id = ?`,
      [content, date, id]
    );

    // Return the number of affected rows (0 if no comment was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the comment with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CommentManager;
