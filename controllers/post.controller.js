const { sequelize } = require('../models');
const db = require('../models');
const Post = db.posts;
const User = db.users;
const Op = db.Sequelize.Op;


// Create and save a new Post
exports.create = (req, res) => {
    // res.json({ message: "[Posts] Requête API : create ctrl !"});

    // Validate the request
    if (!req.body.title || !req.body.slug) {
        res.status(400).send({
            message: "Title or Slug can not be empty !"
        });
        return;
    }

    // Create Post
    const post = {
        authorId: 1,
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
        console.log('New Post created with success !');
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the Post."
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
                console.log('No Posts found in DB !');
                res.json({ message: 'No Post(s) found in database'});
            } else {
                console.log('Posts find !');
                res.json(data);
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts !"
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
            console.log('This Post is not in DB !');
            res.json({ message: 'This Post is not in DB !'});
        } else {
            res.json(data);
            //Get the User record only
            // Console.log(data.user)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Post with id=" + id || err.message
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
            console.log("Post was updated successfully");
            res.json({ message: "Post was updated successfully" });
        } else {
            console.log(`Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty !`);
            res.json({ message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty !` });
        }
      })
      .catch(err => {
          console.log(err);
        res.status(500).send({
          message: err + " - Error updating Post with id=" + id
        });
      });
  };

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            console.log("Post was deleted successfully");
            res.json({ message: "Post was deleted successfully" });
        } else {
            console.log(`Cannot delete Post with id=${id}. Maybe Post was not found or req.body is empty !`);
            res.json({ message: `Cannot delete Post with id=${id}. Maybe Post was not found !` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Post with id=" + id
        });
      });
  };

// Delete all Posts from the database
exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
          console.log(`${num} Posts were deleted successfully`);
          res.json({ message: `${nums} Posts were deleted successfully` })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Posts."
        });
      });
  };

// Find all admin Posts isAdmin = true
exports.findPublishedPosts = (req, res) => {
    // res.send('Réponse de l\'API pour findPublishedPosts');
    Post.findAll(
        { attributes: ['id', 'authorId', 'title'] },
        { where: {published: true } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred when retrieving Posts."
            });
        });
};
