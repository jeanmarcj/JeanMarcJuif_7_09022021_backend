const db = require('../models');
const Like = db.postsLikes;
const Op = db.Sequelize.Op;

// Create and save a new Like
// Uri : /likes/
exports.create = (req, res) => {
    // res.json({ message: "[Like/Dislike] Requête API : create ctrl !"});

    // Create Like
    const like = {
        userId: req.body.userId, 
        postId: req.body.postId,
        isLiked: req.body.isLiked,
        isDisliked: req.body.isDisliked
    };
    // console.log(like.postId);
    
    // Check if the User has already like/dislike this Post
    Like.findAll({
        where: {
            postId: like.postId,
            userId: like.userId }
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            console.log('*** - This post is not liked/disliked by the User. Save in DB - ***');

            // Save Like/Dislike in db
            Like.create(like)
            .then(data => {
                console.log('*** - New Like/Dislike created with success ! - ***');
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message + ". Some error occured while creating the Like/Dislike."
                });
            });
            
        } else {
            console.log('*** - This post is already Liked/Disliked by the User !');
            // res.json({ message: 'Post Already Liked/Disliked by this User -> update !'});

            Like.update(req.body, {
                where: {
                    postId: like.postId,
                    userId: like.userId
                 }
            })
            .then(num => {
                if (num == 1) {
                    // TODO: if dislike=false and like=false delete in DB
                    // TODO: return sum like dislike
                    console.log("*** - Like/Dislike updated successfully - ***");
                    res.json({ message: "Like/Dislike updated successfully by the User for this Post" });
                } else {
                    console.log('Cannot update Like/Dislike for this Post. !');
                    res.json({ message: 'Cannot update Like/Dislike for this Post !' });
                }
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message + ". Some error occurred while retrieving a Like/Dislike !"
        });
    });
};

// Get all Likes Listing. Uri : /likes/
exports.findAll = (req, res) => {
    // res.json({ message: "[Like/Dislike] Requête API : findAll ctrl !"});

    Like.findAll({
        attributes: ['id', 'isLiked', 'isDisliked'],
        include: ["user", "post"],
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            console.log('*** - No Likes/Dislikes found in database ! - ***')
            res.json({ message: 'No Likes/Dislikes found in the database !'});
        } else {
            console.log('Likes/Dislikes found !');
            res.json(data);
        }
    })
    .catch(err => { res.status(500).send(
        { message: err.message + ". Some error occurred while retrieving Likes/Dislikes !"}
        )
    });
};

// Get all Likes from the database with an post id
// uri: /likes/post/:id/liked
exports.findAllLikedByPost = (req, res) => {
    // res.send('Réponse de l\'API pour findAll');
    // res.json({ message: "[Likes/Dislike] Requête API : findAllByPost ctrl !"});
    
    const id = req.params.id;

    Like.findAndCountAll({
        attributes: ['id','isLiked'],
        where: {
            postId: id,
            isLiked: true
        },
        // include: ["post", "user"]

    })
        .then(data => {
            if (Object.keys(data).length === 0) {
                console.log('*** - No Like(s) found in DB for this Post ! - ***');
                res.json({ message: 'No Like(s) found in database for this Post.'});
            } else {
                console.log(`*** - ${data.count} Like(s) found ! - ***`);
                res.json({
                    Total_liked: data.count,
                    // Rows: data.rows
                })
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message + ". Some error occurred while retrieving Likes/Dislikes !"
            });
        });
};

// Get all Dislike(s) from the database with an post id
// uri: /likes/post/:id/disliked
exports.findAlldisLikedByPost = (req, res) => {
    // res.send('Réponse de l\'API pour findAll');
    // res.json({ message: "[Likes/Dislike] Requête API : findAllByPost ctrl !"});
    
    const id = req.params.id;

    Like.findAndCountAll({
        attributes: ['id','isDisliked'],
        where: {
            postId: id,
            isDisliked: true
        },
        // include: ["post", "user"]

        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                console.log('*** - No Dislike(s) found in DB for this Post ! - ***');
                res.json({ message: 'No Dislike(s) found in database for this Post.'});
            } else {
                console.log(`*** - ${data.count} Dislike(s) found ! - ***`);
                res.json({
                    Total_disLiked: data.count,
                    // Rows: data.rows
                })
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message + ". Some error occurred while retrieving Dislikes !"
            });
        });
};

// Get one Like with an id
// uri: likes/:id
exports.findOne = (req, res) => {
    // res.send('Réponse de l\'API pour findOne');
    // res.json({ message: "[Like/Dislike] Requête API : findOne id: " + req.params.id });

    const id = req.params.id;

    Like.findOne({
        include: ["post", "user"],
        where: { id: id }
    })
    .then(data => {
        //Get the Report with User & Post datas included
        if (data === null) {
            console.log('*** - This Like/Dislike is not in DB ! - ***');
            res.json({ message: 'This Like/Dislike is not in the database !'});
        } else {
            console.log('*** - Like/Dislike found ! - ***');
            //Get the User record only
            // console.log(data.user);
            res.json(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message + ". Error retrieving Like/Dislike with id=" + id
        });
    })
};

// Update a Like with an id in the request
// uri: /likes/id
exports.update = (req, res) => {
    // res.json({ message: "[Like/Dislike] Requête API : update id: " + req.params.id });
    const id = req.params.id;
  
   Like.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

            // TODO: The like/dislike ligne for this like/dislike should be deleted
            console.log("*** - Like/Dislike updated successfully - ***");
            res.json({ message: "Like/Dislike updated successfully" });
        } else {
            console.log(`Cannot update this like/dislike with id=${id}. Maybe this Report was not found or req.body is empty !`);
            res.json({ message: `Cannot update this Like/Dislike with id=${id} !` });
        }
      })
      .catch(err => {
          console.log(err + '*** - Error updating this Like/Dislike - ***');
        res.status(500).send({
          message: err + ". Error updating this Like/Dislike with id=" + id
        });
      });
  };

// Delete a Like with the specified id in the request
// uri: /likes/id
exports.delete = (req, res) => {
    // res.json({ message: "[Likes/Dislikes] Requête API : delete id: " + req.params.id });
    
    const id = req.params.id;

    Like.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            console.log("*** - Like/Dislike ligne deleted successfully ! - ***");
            res.json({ message: "The Like/Dislike deleted successfully !" });
        } else {
            console.log(`*** - Cannot delete this Like/Dislike with id=${id}. Maybe this Like/Dislike was not found or req.body is empty ! - ***`);
            res.json({ message: `Cannot delete this Like/Dislike with id=${id} !` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete this Like/Dislike with id=" + id
        });
      });
  };

// Delete all Likes/Dislikes from the database
exports.deleteAll = (req, res) => {
    res.json({ message: "[Likes/Dislikes] Requête API : deleteAll - This option is not available ! " });

    // Like.destroy({
    //   where: {},
    //   truncate: false
    // })
    //   .then(num => {
    //       console.log(`*** - ${num} Likes/Dislikes were deleted successfully - ***`);
    //       res.json({ message: `${num} Likes/Dislikes were deleted successfully` })
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message + ". Some error occurred while removing all Likes/Dislikes."
    //     });
    //   });
  };

// Find all Likes for an User id
// uri : /likes/user/:userId

exports.findUserLikes = (req, res) => {
    
    const userId = req.params.userId;
    // console.log(userId);

    // res.json( {message: '[Likes/Dislikes] Réponse de l\'API pour findUserLikes userId: ' + userId });

    Like.findAndCountAll(
            {   attributes: ['id','isLiked', 'isDisliked'],
                include: ["post", "user"],
                where: {
                    userId: userId,
                    isLiked: true
                }
            }
        )
        .then(data => {
            if (data === null) {
                console.log(`*** - No Like(s) found for this user ! - ***`);
                res.json({ message: 'No Likes(s) found for this User !'});
            } else {
                console.log(`*** - ${data.count} Like(s) found for this user ! - ***`); 
                // res.json(data);
                res.json({
                    Nb_of_Likes: data.count,
                    Rows: data.rows
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred when retrieving Like(s) for this User."
            });
        });
};
