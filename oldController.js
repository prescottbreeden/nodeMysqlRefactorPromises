const logger = require('../_helpers/logger');
const {database:connect} = require('../../config')['development'];
const mysql = require('mysql');
const db = mysql.createConnection(connect);

module.exports = {

  addAnswer: (req, res) => {
    const DATA = req.body;
    db.query(
      `SELECT u.user_id,
              f.faction_name,
              u.first_name,
              u.last_name,
              u.email,
              u.password,
              u.admin,
              u.profile_img,
              u.konami_unlock,
              u.user_created,
              u.user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT a.answer_id) AS answers,
              COUNT(DISTINCT fav.favorite_id) AS favorites
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS fav
           ON fav.user_id = u.user_id
        WHERE u.email = ?
     GROUP BY u.user_id`, [DATA], 
     
     function (error, results) {
      if (error) {
        logger.log('warn', `bugs.addAnswer(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    db.query(
      `SELECT u.user_id,
              f.faction_name,
              u.first_name,
              u.last_name,
              u.email,
              u.password,
              u.admin,
              u.profile_img,
              u.konami_unlock,
              u.user_created,
              u.user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT a.answer_id) AS answers,
              COUNT(DISTINCT fav.favorite_id) AS favorites
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS fav
           ON fav.user_id = u.user_id
        WHERE u.user_id = ?
     GROUP BY u.user_id`, [ID], 
     function(error, results) {
      if (error) {
        logger.log('warn', `bugs.getAnswer(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    })
  },

  updateAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    const {answer_content:answer} = req.body;
    db.query( 
      
      `SELECT u.user_id,
              f.faction_name,
              u.first_name,
              u.last_name,
              u.email,
              u.password,
              u.admin,
              u.profile_img,
              u.konami_unlock,
              u.user_created,
              u.user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT a.answer_id) AS answers,
              COUNT(DISTINCT fav.favorite_id) AS favorites
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS fav
           ON fav.user_id = u.user_id
        WHERE u.user_id = ?
     GROUP BY u.user_id`, [answer, ID], 
     function(error, results) {
      if (error) {
        logger.log('warn', `bug.update(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  acceptAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    const {accepted} = req.body;
    db.query(
      `SELECT u.user_id,
              f.faction_name,
              u.first_name,
              u.last_name,
              u.email,
              u.password,
              u.admin,
              u.profile_img,
              u.konami_unlock,
              u.user_created,
              u.user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT a.answer_id) AS answers,
              COUNT(DISTINCT fav.favorite_id) AS favorites
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS fav
           ON fav.user_id = u.user_id
        WHERE u.user_id = ?
     GROUP BY u.user_id`, [accepted, ID], 

     function (error, results) {
      if (error) {
        logger.log('warn', `bug.update(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

};