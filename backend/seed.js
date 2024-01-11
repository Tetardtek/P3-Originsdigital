// eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}]

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const insertRoles = async () => {
  return database.query(`
  INSERT INTO roles (role) VALUES
  ('user'),
  ('moderator'),
  ('administrator')
  `);
};

const insertUsers = async () => {
  return database.query(`
  INSERT INTO users (firstname, lastname, nickname, mail, birthdate, logdate, password, roles_id) VALUES
  ('Admin', 'istrator', 'Administrator', 'administrator@email.com', '2000-01-01', '2000-01-02', '$2b$10$4VWdZ7SANvRr7qn3k6LAEu6eGApGQUvPOqcCCmgzVLKNlSpBL0rGa', 3),
  ('Mode', 'rator', 'Moderator', 'moderator@email.com', '2010-01-01', '2010-01-02', '$2b$10$c4u.4Q1LzVQBKm.SKX2nPuWEZ/I3jiMUygxr.mMZK4MVJilKYX0rC', 2)
  `);
};

const insertCategories = async () => {
  return database.query(`
  INSERT INTO categories (title, description) VALUES
  ('Mer', 'Les vidéos de Jamy sur la mer'),
  ('Animaux', 'Les vidéos de Jamy sur les animaux'),
  ('Légendes', 'Les vidéos de Jamy sur les légendes'),
  ('Climat', 'Les vidéos de Jamy sur le climat'),
  ('Géographie', 'Les vidéos de Jamy sur la géographie')
  `);
};

const insertVideos = async () => {
  return database.query(`
  INSERT INTO videos (link, title, description, is_free) VALUES
  ("https://www.youtube.com/watch?v=iXuTu2U9l9o", "Les requins sont-ils des sérial killers ? (Vous allez être surpris)", "Les requins sont-ils des sérial killers ou des victimes de leur réputation ? Aujourd’hui, Jamy rétablit la vérité sur ces prédateurs", false),
  ("https://www.youtube.com/watch?v=9MGGAZyq1Mw", "🌊 Pourquoi la mer est-elle salée ?", "🏖️ Qui va à la plage cet été ? Après avoir vu cette vidéo, si l’un de vos proches boit la tasse... vous saurez lui expliquer pourquoi la mer est salée ! Et pourquoi elle n’a pas le même goût partout 🤓", false),
  ("https://www.youtube.com/watch?v=fvrZrJhYGpA", "Pourquoi le niveau de la mer monte ?", "Pourquoi parle-t-on de la montée des eaux ? La fonte de la banquise est-elle vraiment liée ? Quelles parties de la France seront touchées d’ici 2050 ?", false),
  ("https://www.youtube.com/watch?v=b40htkjiAoI", "Comment se forment les marées ? 🌊", "Envie de connaître les marées « sur le bout du Gois » ? C’est pas la mer à boire ! Allez venez : direction la Vendée... sur l’île de Noirmoutier pour comprendre Comment se forment les marées ? 🌊", false),
  ("https://www.youtube.com/watch?v=E1S1_Wqqkhk", "Triangle des Bermudes : mystère et disparition", "Le triangle des Bermudes : mythe ou réalité ? Jamy vous embarque pour un voyage aux frontières du paranormal et de la science : nous allons tenter de résoudre ce mystère !", false),
  ("https://www.youtube.com/watch?v=LBb3HWtEL64", "Les animaux les plus DANGEREUX du monde", "Prenez votre courage à deux mains, nous partons à l’aventure en terre hostile ! Nous vous présentons notre #TOP5 des animaux les plus dangereux de la monde !", false),
  ("https://www.youtube.com/watch?v=bPT3rFalapc", "5 animaux quasi immortels | TOP 5", "Résistance jusqu’à -273°C, longévité accrue, régénération... Les animaux quasi immortels, ça existe ? Eh oui ! Voici un #TOP5 des animaux qui résistent à tout ! On vous présente le tardigrade, le ratel, la méduse ou Turritopsis Nutricula, la praire d’Islande, la planaire.", false),
  ("https://www.youtube.com/watch?v=NeBKbJ-4TOA", "5 animaux avec des SUPER-POUVOIRS 🦸 | TOP 5", "Un poisson cracheur de feu ? 🔥🐟 Une pieuvre caméléon ? 🐙 Un lézard qui marche sur l’eau ? 🦎 Les animaux avec des super-pouvoirs, ça existe ? Eh oui ! Voici mon #TOP5 des animaux avec des super-pouvoirs.", false),
  ("https://www.youtube.com/watch?v=71isRf1N2wo", "Le moustique est-il utile ?", "Exterminer les moustiques et plus largement les insectes, bonne idée ? Il est temps de changer notre regard sur les insectes ! Aujourd’hui dans #chezjamy on s’attaque aux rôles clés des insectes dans l’équilibre de notre biodiversité !", false),
  ("https://www.youtube.com/watch?v=Pript1xTdl0", " 7 réponses sur les animaux • FAQ #DisJamy", "Vous m’avez posé de nombreuses questions sur les animaux 🐴  Comme je suis à cheval sur le lien qui nous unit... je les ai réunies ici 🤓", false),
  ("https://www.youtube.com/watch?v=uS_FdlQTzDY", "3 MONSTRES DE LÉGENDE : mythes ou histoires vraies ?", "Le monstre du Loch Ness, le Yéti ou encore le Kraken... Des créatures devenues populaires grâce aux mystères qui les entourent. Découvrons ensemble la vérité qui se cache derrière ses mythes 🔎😉", false),
  ("https://www.youtube.com/watch?v=HqsP6U9FouY", "Comment estimer l’âge des DINOSAURES ? 🦕", "🦴 OSerez-vous me suivre parmi ces dinosaures dans #ChezJamy ? J’ai eu la chance de rentrer au Muséum national d’Histoire naturelle 🤓 Voici donc comment estimer l’âge des dinosaures.", false),
  ("https://www.youtube.com/watch?v=Q9yIutVqMwk", "Île de Pâques : le mystère des statues géantes enfin résolu ?", "Comment sont-elles arrivées là ? Qui les a taillées ? Comment ont-elles été transportées ? Aujourd’hui Jamy perce le mystère ! ", false),
  ("https://www.youtube.com/watch?v=JF0C_2Mxk7k", "Les gaulois ressemblaient-ils à Astérix et Obélix ?", "Étaient-ils aussi indisciplinés qu’on le prétend, analphabètes et bagarreurs? ", false),
  ("https://www.youtube.com/watch?v=ux2JuPglPhU", "🥇 La drôle d’histoire des JO (Jeux Olympiques)", "🥇 De l’Antiquité à Tokyo, en passant par Paris ou encore Chamonix, je vous raconte l’histoire « or » du commun des J.O. Vous êtes prêts ? Dans les starting blocks ? C’est parti 🏃🤓", false),
  ("https://www.youtube.com/watch?v=OBCH6rfPvnA", "5 choses à savoir sur les tornades, les typhons, les tempêtes et les cyclones ?", "Savez-vous comment les tempêtes se forment ? Pourquoi ont-elles des prénoms ?", false),
  ("https://www.youtube.com/watch?v=n7-9hIcxm6s", "5 Catastrophes naturelles qui pourraient vraiment nous arriver", "Dignes de certains films catastrophes, voici un #top5 des catastrophes naturelles qui pourraient vraiment se produire : éruptions solaires, supervolcans, mégatsunami 🌊🌊🌊... 🤓", false),
  ("https://www.youtube.com/watch?v=SnhpVGLErEQ", "C’est pas sorcier -INONDATIONS : sorciers prennent l’eau", "En France, environ deux millions de personnes sont exposées à un risque d’inondation.", false),
  ("https://www.youtube.com/watch?v=YEmPmCEqEqE", "ORAGES : Les sorciers ont le coup de foudre", "Chaque année en France, les orages font  d’importants dégâts et environ une dizaine de personnes sont victimes de la foudre.", false),
  ("https://www.youtube.com/watch?v=4ZN_6cKyO-Q", "La mer attaque la terre", "Les communes du littoral français sont de plus en plus menacées par l’érosion marine.", false),
  ("https://www.youtube.com/watch?v=e1i4KGI5Ag0", "La Camargue", "Fred, Jamy et Sabine sont partis à la découverte de la Camargue.", false),
  ("https://www.youtube.com/watch?v=Sg4zYbaFYwE", "L’ascension du Mont-Blanc", "Fred et Jamy prennent la direction de Chamonix pour faire l’ascension du Mont-Blanc.", false),
  ("https://www.youtube.com/watch?v=8PMYjn838FA", "La Réunion; dans les entrailles du volcan", "Comment l’île de la Réunion est-elle sortie de l’Océan Indien il y a 3 millions d’années ?", false),
  ("https://www.youtube.com/watch?v=7VYel9qtZ1w", "Le mystère des grottes de l’Ardèche", "Les grottes sont intimement liées à l’histoire de nos rivières", false),
  ("https://www.youtube.com/watch?v=HmGe2B8YQj0", "L’Islande : une île qui souffle le chaud et le froid", "L’Islande se situe à quelques encablures du cercle polaire. Reykjavik est la capitale la plus au nord de la planète.", false)
  `);
};

const insertPlaylists = async () => {
  return database.query(`
  INSERT INTO playlists (title, description) VALUES
  ('Mer', 'Les vidéos de Jamy sur la mer'),
  ('Animaux', 'Les vidéos de Jamy sur les animaux'),
  ('Légendes', 'Les vidéos de Jamy sur les légendes'),
  ('Climat', 'Les vidéos de Jamy sur le climat'),
  ('Géographie', 'Les vidéos de Jamy sur la géographie')
  `);
};

const insertPlaylistsVideos = async () => {
  return database.query(`
  INSERT INTO playlists_videos (playlists_id, videos_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 6),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (3, 11),
  (3, 12),
  (3, 13),
  (3, 14),
  (3, 15),
  (4, 16),
  (4, 17),
  (4, 18),
  (4, 19),
  (4, 20),
  (5, 21),
  (5, 22),
  (5, 23),
  (5, 24),
  (5, 25)
  `);
};

const insertCategoriesPlaylists = async () => {
  return database.query(`
  INSERT INTO categories_playlists_videos (categories_id, playlists_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5)
  `);
};

const insertComments = async () => {
  return database.query(`
  INSERT INTO comments (users_id, videos_id, postDate, content) VALUES
  (1, 1, '2015-01-01', 'Super vidéo 1 signé Admin'),
  (1, 2, '2015-01-02', 'Super vidéo 2 signé Admin'),
  (1, 3, '2015-02-03', 'Super vidéo 3 signé Admin'),
  (1, 4, '2015-02-04', 'Super vidéo 4 signé Admin'),
  (1, 5, '2015-03-05', 'Super vidéo 5 signé Admin'),
  (1, 6, '2016-03-06', 'Super vidéo 6 signé Admin'),
  (1, 7, '2016-04-07', 'Super vidéo 7 signé Admin'),
  (1, 8, '2016-04-08', 'Super vidéo 8 signé Admin'),
  (1, 9, '2016-05-09', 'Super vidéo 9 signé Admin'),
  (1, 10, '2016-05-10', 'Super vidéo 10 signé Admin'),
  (2, 11, '2017-06-11', 'Super vidéo 11 signé Modo'),
  (2, 12, '2017-06-12', 'Super vidéo 12 signé Modo'),
  (2, 13, '2017-07-13', 'Super vidéo 13 signé Modo'),
  (2, 14, '2017-07-14', 'Super vidéo 14 signé Modo'),
  (2, 15, '2017-08-15', 'Super vidéo 15 signé Modo'),
  (2, 16, '2018-08-16', 'Super vidéo 16 signé Modo'),
  (2, 17, '2018-09-17', 'Super vidéo 17 signé Modo'),
  (2, 18, '2018-09-18', 'Super vidéo 18 signé Modo'),
  (2, 19, '2018-10-19', 'Super vidéo 19 signé Modo'),
  (2, 20, '2018-10-20', 'Super vidéo 20 signé Modo'),
  (1, 21, '2019-11-21', 'Super vidéo 21 signé Admin'),
  (1, 22, '2019-11-22', 'Super vidéo 22 signé Admin'),
  (1, 23, '2019-12-23', 'Super vidéo 23 signé Admin'),
  (1, 24, '2019-12-24', 'Super vidéo 24 signé Admin'),
  (1, 25, '2019-01-25', 'Super vidéo 25 signé Admin')
  `);
};

const seed = async () => {
  try {
    // Utilisation de transactions
    await database.query("START TRANSACTION");

    // Appels aux fonctions d'insertion

    await insertRoles();
    await insertUsers();
    await insertCategories();
    await insertVideos();
    await insertPlaylists();
    await insertPlaylistsVideos();
    await insertCategoriesPlaylists();
    await insertComments();

    // Commit de la transaction
    await database.query("COMMIT");

    // Fermeture de la connexion à la base de données
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    // Rollback en cas d'erreur
    await database.query("ROLLBACK");
    console.error("Error filling the database:", err.message);
  }
};

// Exécution de la fonction seed
seed();
