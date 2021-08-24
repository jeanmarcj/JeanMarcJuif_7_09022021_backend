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
            message: "The Comment content can not be empty !"
        });
        return;
    }

    // Create Comment
    const comment = {
        userId: req.body.userId, // Should be dynamic
        postId: req.body.postId, // Should be dynamic
        content: req.body.content,
        published: true
    };

    // Save Comment in the db
    Comment.create(comment)
    .then(data => {
        console.log('*** - New Comment created with success ! - ***');
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message +". Some error occured while creating the Comment."
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
                console.log('*** - No Comments found in DB for this Post ! - ***');
                res.json({ message: 'No Comments(s) found in database for this Post.'});
            } else {
                console.log('*** - Comments found ! - ***');
                res.json(data);
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message + ". Some error occurred while retrieving Comments !"
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
            console.log('*** - No Comments found in database ! - ***')
            res.json({ message: 'No Comments found in the database !'});
        } else {
            console.log('Comments found !');
            res.json(data);
        }
    })
    .catch(err => { res.status(500).send(
        { message: err.message + ". Some error occurred while retrieving Comments !"}
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
            console.log('*** - This Comment is not in DB ! - ***');
            res.json({ message: 'This Comment is not in DB !'});
        } else {
            //Get the User record only
            // console.log(data.user);
            res.json(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message + ". Error retrieving Post with id=" + id
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
            console.log("*** - Comment was updated successfully - ***");
            res.json({ message: "Comment was updated successfully" });
        } else {
            console.log(`*** - Cannot update Comment with id=${id}. Maybe this Comment was not found or req.body is empty ! - ***`);
            res.json({ message: `Cannot update Comment !` });
        }
      })
      .catch(err => {
          console.log(err);
        res.status(500).send({
          message: err + ". Error updating Comment with id=" + id
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
            console.log("*** - Comment was deleted successfully - ***");
            res.json({ message: "The Comment has been deleted successfully !" });
        } else {
            console.log(`*** - Cannot delete this Comment with id=${id}. Maybe this Comment was not found or req.body is empty ! - ***`);
            res.json({ message: `Cannot delete this Comment !` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete this Comment with id=" + id
        });
      });
  };

// Delete all Comments from the database
exports.deleteAll = (req, res) => {
    res.json({ message: "[Comments] Requête API : deleteAll. This functionnality doesn't work !" });

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
        {   attributes: ['id','content', 'published'],
            include: ["post", "user"],
            where: {
                postId: postId,
                published: true
            }
        }
        )
        .then(data => {
            if (data === null) {
                console.log('*** - No published Comment(s) found in the database !');
                res.json({ message: "No published comment(s) found in the database !" })
            } else {
                console.log('*** - Published comments found ! - ***');
                res.json(data);
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Some error occurred when retrieving Posts."
            });
        });
};
