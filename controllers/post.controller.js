const fs = require('fs');
const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create and save a new Post
exports.create = (req, res) => {
    // res.json({ message: "[Posts] Requête API : create ctrl !"});

    // Validate the request
    if (!req.body.title || !req.body.slug) {
        res.status(400).send({
            message: "Le titre ou le slug n'est pas indiqué !"
        });
        return;
    }

    // Create Post
    const post = {
        authorId: req.body.userId,
        userId: req.body.userId,
        title: req.body.title,
        media: req.body.media,
        content: req.body.content,
        slug: req.body.slug,
        published: true,
        publishedAT: new Date().getTime()
    };

    // Save User in the db
    Post.create(post)
    .then(data => {
        console.log('Nouveau Message crée avec succès !');
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Une erreur est survenue losr de la cration du message. " + err.message
        });
    });
};

// Get all Posts from the database
// Get all Posts with uri: /posts?title=information
exports.findAll = (req, res) => {
    // res.send('Réponse de l\'API pour findAll');
    // res.json({ message: "[Posts] Requête API : findAll ctrl !"});

    const title = req.query.title;
    console.log(title);
    let condition = title ? { title: { [Op.like]: `%${title}%`} } : null;
    console.log(condition);

    Post.findAll({
        include: ["user"],
        where: condition
    })
        .then(data => {
            if (Object.keys(data).length === 0) {
                console.log('Aucun message trouvé dans la base de donnée !');
                res.json({ message: 'Aucun message trouvé dans la base de donnée !'});
            } else {
                // console.log('Messages trouvés!');
                res.json(data);
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    "Une erreur est apparue lors de la réception des messages. "+ err.message
            });
        });
};

// Get one Post with an id
exports.findOne = (req, res) => {
    // res.send('Réponse de l\'API pour findOne');
    // res.json({ message: "Requête API : findOne " + req.params.id });

    const id = req.params.id;

    Post.findOne({
        include: ["user"],
        where: { id: id }
    })
    .then(data => {
        //Get the Post with User datas included
        // console.log(data);
        if (data === null) {
            console.log("Ce message n'est pas dans la base de données !");
            res.json({ message: "Ce message n'est pas dans la base de données !"});
        } else {
            res.json(data);
            //Get the User record only
            // Console.log(data.user)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Une erreur est apparue lors de la réception des messages. "+ err.message
        });
    })
};

// Update a Post with an id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            console.log("Message mis à jour !");
            res.json({ message: "Message mis à jour !" });
        } else {
            console.log(`Imposible de mettre à jour ce message.`);
            res.json({ message: `Imposible de mettre à jour ce message` });
        }
      })
      .catch(err => {
          console.log(err);
        res.status(500).send({
          message: "Imposible de mettre à jour ce message ! " + Error
        });
      });
  };

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.findOne({
        where: { id: id }
    })
    .then(post => {
        const mediaUrl = post.media.split('/images/')[1];
        console.log(mediaUrl);
        // console.log(fs);

        try {
            fs.unlink(`images/${mediaUrl}`, () =>{
                console.log('File deleted');
            })

            Post.destroy({
                where: {id: id}
            })
            .then(num => {
                if (num == 1) {
                    console.log('Message effacé !')
                    res.status(200).json({
                        message: "Message effacé"
                    })
                } else {
                    console.log("Le message n'a pas pu être effacé !")
                }
            })
            .then(err => {
                res.status(500).send("Ce message n'a pas été effacé !")
            })
            
        } catch (error) {
            console.log(error)
        }
        
        // fs.unlink(`images/${mediaUrl}`, () => {
        //     Post.destroy({
        //         where: {id: id}
        //     })
        //     .then(num => {
        //         if (num == 1) {
        //             console.log("Message effacé!")
        //         } else {
        //             console.log("Le message n'a pas pu être effacé ! ")
        //         }
        //     })
        //     .catch(err => {
        //         res.status(500).send('Ce message n\'a pas été effacé !')
        //     })
        // })
    })
    .catch(error => res.status(500).json({ error}))

};

// Delete all Posts from the database
exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
          console.log(`${num} Messages effacés avec succès !`);
          res.json({ message: `${nums} Messages effacés avec succès !` })
      })
      .catch(err => {
        res.status(500).send({
          message:
            "Some error occurred while removing all Posts. " + err.message
        });
      });
  };

// Find all admin Posts isAdmin = true
// uri : /posts/published
exports.findPublishedPosts = (req, res) => {
    // res.send('Réponse de l\'API pour findPublishedPosts');
    Post.findAll({
            // attributes: ['Post.*', [sequelize.fn('COUNT', 'comments.id'), 'CommentsCount']],
            include: ["user", "comments"],
            where: { published: true },
            order: [['publishedAt', 'DESC']]
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Une erreur est apparu lors de la réception des messages !" + err.message
            });
        });
};

// Get the number of total published posts in the database
// uri : /posts/totalpublishedposts/
exports.getTotalPublishedPosts = (req, res) => {
    // res.send('Réponse de l\'API pour findPublishedPosts');
    Post.findAndCountAll({
        attributes: ['id','published'],
        where: {
            published: true
        },
        // include: ["post", "user"]
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            console.log('*** Aucun message trouvé dans la base de données - ***');
            res.json({ totalPublishedPost: 0 });
        } else {
            console.log(`*** - ${data.count} messages publiés trouvés - ***`);
            res.json({
                totalPublishedPost: data.count,
                // Rows: data.rows
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            "Une erreur est apparu lors de la réception des messages !" + err.message
        });
    });
};

// Get the number of total published posts in the database
// uri : posts/lastpublishedposts
exports.getLastPublishedPosts = (req, res) => {
    // res.send('Réponse de l\'API pour findPublishedPosts');
    Post.findAll({
        attributes: ['id', 'title'],
        where: {
            published: true
        },
        include: ["user"],
        limit: 3,
        order: [['publishedAt', 'DESC']]
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            console.log('*** Aucun message trouvé ! - ***');
            res.json({ totalPublishedPost: 0 });
        } else {
            console.log(`*** - Messages publiés trouvés ! - ***`);
            res.json(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            "Une erreur est apparu lors de la réception des messages !" + err.message
        });
    });
};
