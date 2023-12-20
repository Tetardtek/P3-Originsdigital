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

    // Generating CATEGORIES columns
    const roles = [
      "INSERT INTO `roles` (name) VALUES ('utilisateur')",
      "INSERT INTO `roles` (name) VALUES ('modérateur')",
      "INSERT INTO `roles` (name) VALUES ('administrateur')",
    ];
    for (let i = 0; i < roles.length; i += 1) {
      queries.push(database.query(roles[i]));
    }

    // Generating VIDEOS columns
    const videos = [
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=iXuTu2U9l9o', 'Les requins sont-ils des sérial killers ? (Vous allez être surpris)', 'Les requins sont-ils des sérial killers ou des victimes de leur réputation ? Aujourd’hui, Jamy rétablit la vérité sur ces prédateurs.', 1, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=9MGGAZyq1Mw', '🌊 Pourquoi la mer est-elle salée ?', '🏖️ Qui va à la plage cet été ? Après avoir vu cette vidéo, si l’un de vos proches boit la tasse... vous saurez lui expliquer pourquoi la mer est salée ! Et pourquoi elle n’a pas le même goût partout 🤓', 1, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=fvrZrJhYGpA', 'Pourquoi le niveau de la mer monte ?', 'Pourquoi parle-t-on de la montée des eaux ? La fonte de la banquise est-elle vraiment liée ? Quelles parties de la France seront touchées d’ici 2050 ?', 1, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=b40htkjiAoI', 'Comment se forment les marées ? 🌊', 'Envie de connaître les marées « sur le bout du Gois » ? C’est pas la mer à boire ! Allez venez : direction la Vendée... sur l’île de Noirmoutier pour comprendre Comment se forment les marées ? 🌊', 1, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=E1S1_Wqqkhk', 'Triangle des Bermudes : mystère et disparition', 'Le triangle des Bermudes : mythe ou réalité ? Jamy vous embarque pour un voyage aux frontières du paranormal et de la science : nous allons tenter de résoudre ce mystère !', 1, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=OBCH6rfPvnA', '5 choses à savoir sur les tornades, les typhons, les tempêtes et les cyclones ?', 'Savez-vous comment les tempêtes se forment ? Pourquoi ont-elles des prénoms ?', 4, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=n7-9hIcxm6s', '5 Catastrophes naturelles qui pourraient vraiment nous arriver', 'Dignes de certains films catastrophes, voici un #top5 des catastrophes naturelles qui pourraient vraiment se produire : éruptions solaires, supervolcans, mégatsunami 🌊🌊🌊... 🤓', 4, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=SnhpVGLErEQ', 'C’est pas sorcier -INONDATIONS : sorciers prennent l’eau', 'En France, environ deux millions de personnes sont exposées à un risque d’inondation.', 4, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=YEmPmCEqEqE', 'ORAGES : Les sorciers ont le coup de foudre', 'Chaque année en France, les orages font  d’importants dégâts et environ une dizaine de personnes sont victimes de la foudre.', 4, false)",
      "INSERT INTO `videos` (link, title, description, categories_id, is_free) VALUES ('https://www.youtube.com/watch?v=4ZN_6cKyO-Q', 'La mer attaque la terre', 'Les communes du littoral français sont de plus en plus menacées par l’érosion marine.', 4, false)",
    ];
    for (let i = 0; i < videos.length; i += 1) {
      queries.push(database.query(videos[i]));
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
