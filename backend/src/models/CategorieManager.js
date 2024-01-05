const AbstractManager = require("./AbstractManager");

class CategorieManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categories" as configuration
    super({ table: "categories" });
  }

  // The C of CRUD - Create operation
  async create(categorie) {
    const { name } = categorie;
    // Execute the SQL INSERT query to add a new categorie to the "categorie" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [name]
    );

    // Return the ID of the newly inserted categorie
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
        return null; // Utilisateur non trouvé
      }

      return rows[0][field];
    }

    // Sinon, exécutez la requête SQL SELECT pour récupérer l'utilisateur complet
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null; // Utilisateur non trouvé
    }

    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of categories
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, categorie) {
    // Extract fields from the categorie object
    const { name } = categorie;

    // Execute the SQL UPDATE query to modify an existing categorie in the "categories" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [name, id]
    );

    // Return the number of affected rows (0 if no categorie was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the categorie with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CategorieManager;
