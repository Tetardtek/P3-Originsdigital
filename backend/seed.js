/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating CATEGORIES columns
    const categories = [
      "INSERT INTO `categories` (name) VALUES ('mer')",
      "INSERT INTO `categories` (name) VALUES ('animaux')",
      "INSERT INTO `categories` (name) VALUES ('légendes')",
      "INSERT INTO `categories` (name) VALUES ('climat')",
      "INSERT INTO `categories` (name) VALUES ('géographie')",
    ];
    for (let i = 0; i < categories.length; i += 1) {
      queries.push(database.query(categories[i]));
    }
    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
