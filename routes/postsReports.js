var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');
const reports = require('../controllers/postReport.controller');

/* Create a new Report */
router.post('/', reports.create);

/* GET all Reports listing */
router.get("/", reports.findAll);

/* GET Reports by Post listing. Uri: /reports/post/1 */
router.get("/post/:id", reports.findAllByPost);

/* GET all Reports for an User. Uri /reports/user/1 */
router.get("/user/:userId", reports.findUserReports);

/* Get one Report by id */
router.get('/:id', reports.findOne);

/* PUT (update) a Report by id */
router.put("/:id", reports.update);

/* DELETE a Report by id */
router.delete("/:id", reports.delete);

/* DELETE all Reports */
router.delete("/", reports.deleteAll);

module.exports = router;