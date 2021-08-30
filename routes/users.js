var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');
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

/* POST user login */
/* URI : /users/login/ */
router.post('/login', users.login);

/* POST user signup */
/* URI : /users/signup */
router.post('/signup', users.create);


/* Get one user by id */
router.get('/:id', auth, users.findOne);

/* PUT user by id */
router.put("/:id", auth, users.update);

/* DELETE a user by id */
router.delete("/:id", auth, users.delete);

/* DELETE all Users */
router.delete("/", auth, users.deleteAll);



module.exports = router;
