const util = require('util');
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const maxSize = 2 * 1024 * 1024;


/**
 * Configuration de multer pour le téléchargement d'images
 */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        // console.log(file.originalname);
        // const name = file.originalname.split(' ').join('_');
        // const extension = MIME_TYPES[file.mimetype];
        // callback(null, name + Date.now() + '.' + extension);
        callback(null, `${Date.now()}-jmj-${file.originalname}`);
    }
});

// util.promisify() makes the exported middleware object can be used with async-await

let uploadFile = multer({
    storage: storage,
    limits: { filesize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

// module.exports = multer({ storage }).single('file');
module.exports = uploadFileMiddleware;
// module.exports = uploadFile;
