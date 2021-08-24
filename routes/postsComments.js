var express = require('express');
var router = express.Router();
const comments = require('../controllers/postComment.controller');

/* Create a new Comment */
router.post('/', comments.create);

/* GET Comments listing. Uri: /comments/post/1 */
router.get("/post/:id", comments.findAllByPost);

/* GET all Comments */
router.get("/", comments.findAll);

/* GET all published Comment(s) */
router.get("/published/:postId", comments.findPublishedComments);

/* Get one Comment by id */
router.get('/:id', comments.findOne);

/* PUT (update) a comment by id */
router.put("/:id", comments.update);

/* DELETE a Comment by id */
router.delete("/:id", comments.delete);

/* DELETE all Comments */
router.delete("/", comments.deleteAll);

module.exports = router;