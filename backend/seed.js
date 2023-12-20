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
    queries.push(
      database.query(
        `INSERT INTO categories (name) VALUES
      ('mer'),
      ('animaux'),
      ('légendes'),
      ('climat'),
      ('géographie')`
      )
    );

    // Generating ROLES columns
    queries.push(
      database.query(
        `INSERT INTO roles (name) VALUES
      ('utilisateur'),
      ('moderateur'),
      ('administrateur')`
      )
    );

    // Generating VIDEOS columns
    queries.push(
      database.query(
        `INSERT INTO videos (link, title, description, categories_id, is_free) VALUES
      ("https://www.youtube.com/watch?v=iXuTu2U9l9o", "Les requins sont-ils des sérial killers ? (Vous allez être surpris)", "Les requins sont-ils des sérial killers ou des victimes de leur réputation ? Aujourd’hui, Jamy rétablit la vérité sur ces prédateurs.", 1, false),
      ("https://www.youtube.com/watch?v=9MGGAZyq1Mw", "🌊 Pourquoi la mer est-elle salée ?", "🏖️ Qui va à la plage cet été ? Après avoir vu cette vidéo, si l’un de vos proches boit la tasse... vous saurez lui expliquer pourquoi la mer est salée ! Et pourquoi elle n’a pas le même goût partout 🤓", 1, false),
      ("https://www.youtube.com/watch?v=fvrZrJhYGpA", "Pourquoi le niveau de la mer monte ?", "Pourquoi parle-t-on de la montée des eaux ? La fonte de la banquise est-elle vraiment liée ? Quelles parties de la France seront touchées d’ici 2050 ?", 1, false),
      ("https://www.youtube.com/watch?v=b40htkjiAoI", "Comment se forment les marées ? 🌊", "Envie de connaître les marées « sur le bout du Gois » ? C’est pas la mer à boire ! Allez venez : direction la Vendée... sur l’île de Noirmoutier pour comprendre Comment se forment les marées ? 🌊", 1, false),
      ("https://www.youtube.com/watch?v=E1S1_Wqqkhk", "Triangle des Bermudes : mystère et disparition", "Le triangle des Bermudes : mythe ou réalité ? Jamy vous embarque pour un voyage aux frontières du paranormal et de la science : nous allons tenter de résoudre ce mystère !", 1, false),
      ("https://www.youtube.com/watch?v=uS_FdlQTzDY", "3 MONSTRES DE LÉGENDE : mythes ou histoires vraies ?", "Le monstre du Loch Ness, le Yéti ou encore le Kraken... Des créatures devenues populaires grâce aux mystères qui les entourent. Découvrons ensemble la vérité qui se cache derrière ses mythes 🔎😉", 3, false),
      ("https://www.youtube.com/watch?v=HqsP6U9FouY", "Comment estimer l’âge des DINOSAURES ? 🦕", "🦴 OSerez-vous me suivre parmi ces dinosaures dans #ChezJamy ? J’ai eu la chance de rentrer au Muséum national d’Histoire naturelle 🤓 Voici donc comment estimer l’âge des dinosaures.", 3, false),
      ("https://www.youtube.com/watch?v=Q9yIutVqMwk", "Île de Pâques : le mystère des statues géantes enfin résolu ?", "Comment sont-elles arrivées là ? Qui les a taillées ? Comment ont-elles été transportées ? Aujourd’hui Jamy perce le mystère ! ", 3, false),
      ("https://www.youtube.com/watch?v=JF0C_2Mxk7k", "Les gaulois ressemblaient-ils à Astérix et Obélix ?", "Étaient-ils aussi indisciplinés qu’on le prétend, analphabètes et bagarreurs? ", 3, false),
      ("https://www.youtube.com/watch?v=ux2JuPglPhU", "🥇 La drôle d’histoire des JO (Jeux Olympiques)", "🥇 De l’Antiquité à Tokyo, en passant par Paris ou encore Chamonix, je vous raconte l’histoire « or » du commun des J.O. Vous êtes prêts ? Dans les starting blocks ? C’est parti 🏃🤓", 3, false),
      ("https://www.youtube.com/watch?v=OBCH6rfPvnA", "5 choses à savoir sur les tornades, les typhons, les tempêtes et les cyclones ?", "Savez-vous comment les tempêtes se forment ? Pourquoi ont-elles des prénoms ?", 4, false),
      ("https://www.youtube.com/watch?v=n7-9hIcxm6s", "5 Catastrophes naturelles qui pourraient vraiment nous arriver", "Dignes de certains films catastrophes, voici un #top5 des catastrophes naturelles qui pourraient vraiment se produire : éruptions solaires, supervolcans, mégatsunami 🌊🌊🌊... 🤓", 4, false),
      ("https://www.youtube.com/watch?v=SnhpVGLErEQ", "C’est pas sorcier -INONDATIONS : sorciers prennent l’eau", "En France, environ deux millions de personnes sont exposées à un risque d’inondation.", 4, false),
      ("https://www.youtube.com/watch?v=YEmPmCEqEqE", "ORAGES : Les sorciers ont le coup de foudre", "Chaque année en France, les orages font  d’importants dégâts et environ une dizaine de personnes sont victimes de la foudre.", 4, false),
      ("https://www.youtube.com/watch?v=4ZN_6cKyO-Q", "La mer attaque la terre", "Les communes du littoral français sont de plus en plus menacées par l’érosion marine.", 4, false),
      ("https://www.youtube.com/watch?v=e1i4KGI5Ag0", "La Camargue", "Fred, Jamy et Sabine sont partis à la découverte de la Camargue.", 5, false),
      ("https://www.youtube.com/watch?v=Sg4zYbaFYwE", "L’ascension du Mont-Blanc", "Fred et Jamy prennent la direction de Chamonix pour faire l’ascension du Mont-Blanc.", 5, false),
      ("https://www.youtube.com/watch?v=8PMYjn838FA", "La Réunion; dans les entrailles du volcan", "Comment l’île de la Réunion est-elle sortie de l’Océan Indien il y a 3 millions d’années ?", 5, false),
      ("https://www.youtube.com/watch?v=7VYel9qtZ1w", "Le mystère des grottes de l’Ardèche", "Les grottes sont intimement liées à l’histoire de nos rivières", 5, false),
      ("https://www.youtube.com/watch?v=HmGe2B8YQj0", "L’Islande : une île qui souffle le chaud et le froid", "L’Islande se situe à quelques encablures du cercle polaire. Reykjavik est la capitale la plus au nord de la planète.", 5, false)`
      )
    );
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
