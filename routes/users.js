var express = require('express');
var router = express.Router();
const users = require('../controllers/user.controller');


/* Create a new user */
router.post('/', users.create);

/* GET users listing. Uri: /users/ */

// router.get('/', function(req, res, next) {
//   // res.send('Réponse API pour /users');
//   res.json({ message: "JSON response pour /users/"});
// });

router.get('/', users.findAll);

/* GET all admin user(s) */
router.get("/admin", users.findAllAdminUser);

/* Get one user by id */
router.get('/:id', users.findOne);

/* PUT user by id */
router.put("/:id", users.update);

/* DELETE a user by id */
router.delete("/:id", users.delete);

/* DELETE all Users */
router.delete("/", users.deleteAll);



module.exports = router;
