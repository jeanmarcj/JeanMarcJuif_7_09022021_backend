const db = require('../models');
const Comment = db.postComments;
const Op = db.Sequelize.Op;


// Create and save a new Comment
// /comments/
exports.create = (req, res) => {
    // res.json({ message: "[Comments] Requête API : create ctrl !"});

    // Validate the request
    if (!req.body.content) {
        res.status(400).send({
            message: "Le contenu de votre commentaire est vide !"
        });
        return;
    }

    // Create Comment
    const comment = {
        userId: req.body.userId, // Should be dynamic
        postId: req.body.postId, // Should be dynamic
        content: req.body.content,
        published: req.body.published
    };

    // Save Comment in the db
    Comment.create(comment)
    .then(data => {
        // console.log('*** - Nouveau commentaire créé ! - ***');
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message +". Une erreur est intervenue lors de la création de ce commentaire."
        });
    });
};

// Get all Comments from the database
// uri: /comments/post/:id
exports.findAllByPost = (req, res) => {
    // res.send('Réponse de l\'API pour findAll');
    // res.json({ message: "[Comments] Requête API : findAll ctrl !"});
    
    const id = req.params.id;
    console.log(id);
    // let condition = title ? { title: { [Op.like]: `%${title}%`} } : null;
    // console.log(condition);

    Comment.findAll({
        include: ["post", "user"],
        where: { postId: id }
    })
        .then(data => {
            if (Object.keys(data).length === 0) {
                console.log('*** - Aucun commentaire pour ce message (post) ! - ***');
                res.json({ message: 'Aucun commentaire pour ce message (post) !'});
            } else {
                // console.log('*** - Commentaires récupérés ! - ***');
                res.json(data);
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message + ". Une erreur est intervenue lors de la réception des commentaires !"
            });
        });
};

// Get all Comments Listing. Uri "/"
exports.findAll = (req, res) => {
    // res.json({ message: "[Reports] Requête API : findAll ctrl !"});

    Comment.findAll({
        include: ["user", "post"],
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            console.log('*** - Aucun commentaires dans la base de données ! - ***')
            res.json({ message: 'Aucun commentaires dans la base de données !'});
        } else {
            // console.log('Comments found !');
            res.json(data);
        }
    })
    .catch(err => { res.status(500).send(
        { message: err.message + ". Une erreur est intervenue lors de la récupération des commentaires !"}
        )
    });
};

// Get one Comment with an id
// uri: comments/:id
exports.findOne = (req, res) => {
    // res.send('Réponse de l\'API pour findOne');
    // res.json({ message: "[comments] Requête API : findOne id: " + req.params.id });

    const id = req.params.id;

    Comment.findOne({
        include: ["user"],
        where: { id: id }
    })
    .then(data => {
        //Get the Comment with User datas included
        if (data === null) {
            console.log('*** - Ce commentaire n\'est pas dans la base de donnée ! - ***');
            res.json({ message: 'Ce commentaire n\'est pas dans la base de donnée !'});
        } else {
            //Get the User record only
            // console.log(data.user);
            res.json(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message + ". Une erreur est intervenue pour récupérer ce commentaire !"
        });
    })
};

// Update a Comment with an id in the request
// uri: /comments/id
exports.update = (req, res) => {
    // res.json({ message: "[comments] Requête API : update id: " + req.params.id });
    const id = req.params.id;
  
   Comment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            // console.log("*** - Le commentaire a été mis à jour - ***");
            res.json({ message: "Le commentaire a été mis à jour" });
        } else {
            console.log(`*** - La mise à jour de ce commentaire a échouée pour id=${id} - ***`);
            res.json({ message: `La mise à jour de ce commentaire a échouée !` });
        }
      })
      .catch(err => {
          console.log(err);
        res.status(500).send({
          message: err + ". La mise à jour a échouée id=" + id
        });
      });
  };

// Delete a Post with the specified id in the request
// uri: /comments/id
exports.delete = (req, res) => {
    // res.json({ message: "[comments] Requête API : delete id: " + req.params.id });
    
    const id = req.params.id;

    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            console.log("*** - Le commentaire a été effacé ! - ***");
            res.json({ message: "Le commentaire a été effacé !" });
        } else {
            console.log(`*** - Impossible d'effacer le commentaire id=${id} - ***`);
            res.json({ message: `Impossible d'effacer le commentaire !` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "La suppression de ce commentaire a échouée ! id=" + id
        });
      });
  };

// Delete all Comments from the database
exports.deleteAll = (req, res) => {
    res.json({ message: "[Comments] Requête API : deleteAll. Cette fonctionnalité est désactivée !" });

    // Comment.destroy({
    //   where: {},
    //   truncate: false
    // })
    //   .then(nums => {
    //       console.log(`*** - ${num} Comments were deleted successfully - ***`);
    //       res.json({ message: `${nums} Comments were deleted successfully` })
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message + ". Some error occurred while removing all Comments."
    //     });
    //   });
  };

// Find all Comments with published = true
// uri : /comments/published/:postId

exports.findPublishedComments = (req, res) => {
    const postId = req.params.postId;

    // res.json( {message: '[comments] Réponse de l\'API pour findPublishedComments postId: ' + postId });

    Comment.findAll(
        {   attributes: ['id','content', 'published', 'createdAt'],
            include: ["post", "user"],
            where: {
                postId: postId,
                published: true
            }
        }
        )
        .then(data => {
            if (data === null) {
                console.log('*** - Aucun commentaire(s) publiés trouvés pour ce message ! - ***');
                res.json({ message: "Aucun commentaire(s) publiés trouvés pour ce message !" })
            } else {
                // console.log('*** - Published comments found ! - ***');
                res.json(data);
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Une erreur est intervenue lors de la récupération des messages !."
            });
        });
};

// Count all Comments with published = true
// uri : /comments/published/count/:postId
exports.countPublishedComments = (req, res) => {
    const postId = req.params.postId;

    Comment.findAndCountAll(
        {   attributes: ['id','content', 'published'],
            include: ["post", "user"],
            where: {
                postId: postId,
                published: true
            }
        }
        )
        .then(data => {
            if (Object.keys(data).length === 0) {
                // console.log('*** - Aucun commentaire !');
                res.json({ totalPublishedComments: 0 })
            } else {
                console.log(`*** - ${data.count} commentaires publiés touvés - ***`);
                res.json({
                    totalPublishedComments: data.count,
                    // Rows: data.rows
                })
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Une erreur est intervenue lors de la récupération des commentaires !"
            });
        });
};
