var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const posts = require('../controllers/post.controller');



/* Create a new Post */
router.post('/', posts.create);

/* GET Posts listing. Uri: /posts/ */

// router.get('/', function(req, res, next) {
//   // res.send('Réponse API pour /users');
//   res.json({ message: "JSON response pour /users/"});
// });

router.get("/", posts.findAll);

/* GET all published post(s) */
router.get("/published", posts.findPublishedPosts);

/* GET the number total of published posts in DataBase. */
//URI /posts/totalpublishedposts/
router.get('/totalpublishedposts', posts.getTotalPublishedPosts);

// * GET last 3 posts published in the database */
router.get('/lastpublishedposts', posts.getLastPublishedPosts);

/* Get one post by id */
router.get('/:id', posts.findOne);

/* PUT post by id */
router.put("/:id", posts.update);

/* DELETE a post by id */
router.delete("/:id", posts.delete);

/* DELETE all Posts */
// router.delete("/", posts.deleteAll);



module.exports = router;
