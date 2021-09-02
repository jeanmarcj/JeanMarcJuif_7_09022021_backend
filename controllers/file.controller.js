const uploadFile = require("../middleware/multer-config.js");
const fs = require('fs');
const path = require('path');

const upload = async (req, res) => {
  try {

        // console.log(req.file);

        await uploadFile(req, res);

        if (req.file == undefined) {
          return res.status(400).send({ message: "Sélectionner un fichier !" });
          }
        
        // Get the lastet file named
        const getMostRecentFile = (dir) => {
          const files = orderReccentFiles(dir);
          return files.length ? files[0] : undefined;
        };
      
        const orderReccentFiles = (dir) => {
            return fs.readdirSync(dir)
                .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
                .map(file => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
                .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
        };
      
        const dirPath = 'images';

        const filename = getMostRecentFile(dirPath);
        console.log('My file name ', filename);
        
        res.status(200).json({
          message: "Fichier téléchargé avec succés !",
          fileName: filename,
      });

        // res.status(200).send({
        //   message: "Fichier téléchargé avec succès: " + req.file.originalname,
        // });

      } catch (err) {
          res.status(500).send({
            message: `Impossible de télécharger le fichier : ${req.file.originalname}. ${err}`,
          });
      }
};

const getListFiles = (req, res) => {

    const directoryPath = __basedir + "/images/";
    const baseUrl = "http://localhost:3000/images/";

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Impossible de lire les fichiers !"
        });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  };


  const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/images/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Une erreur est intervenue pendant le téléchargement du fichier. Erreur : " + err
        });
      }
    });
  };

  module.exports = {
    upload,
    getListFiles,
    download,
  };