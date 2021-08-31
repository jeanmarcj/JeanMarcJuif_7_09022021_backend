var express = require('express');
var router = express.Router();

const multer = require('../middleware/multer-config');
const files = require('../controllers/file.controller');

/* POST upload a file. */
// uri : /files/upload
router.post('/upload', files.upload);

/* GET list files */
// uri : /files/files
router.get('/files', files.getListFiles);

/* Get [fileName]: download. */
// uri : /files/:name
router.get('/:name', files.download);


module.exports = router;