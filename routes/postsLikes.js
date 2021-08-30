var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');
const likes = require('../controllers/postLike.controller');

/* Create a new Like/Dislike */
router.post('/', likes.create);

/* GET all Reports listing */
router.get("/", likes.findAll);

/* GET Reports by Post listing. Uri: /reports/post/1 */
// router.get("/post/:id", likes.findAllByPost);

// uri: /likes/post/:id/isLiked
router.get("/post/:id/liked", likes.findAllLikedByPost);

// uri: /likes/post/:id/isdiliked
router.get("/post/:id/disliked", likes.findAlldisLikedByPost);

/* GET all Reports for an User. Uri /reports/user/1 */
router.get("/user/:userId", likes.findUserLikes);

/* Get one Report by id */
router.get('/:id', likes.findOne);

/* PUT (update) a Report by id */
router.put("/:id", likes.update);

/* DELETE a Report by id */
router.delete("/:id", likes.delete);

/* DELETE all Reports */
router.delete("/", likes.deleteAll);

module.exports = router;