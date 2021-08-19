// const User = require('../models/User.model');
const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

// Create and save a new User
exports.create = (req, res) => {
    // Validate the request
    if (!req.body.email) {
        res.status(400).send({
            message: "Email can not be empty !"
        });
        return;
    }

    // Create User
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        passwordPlainText: req.body.passwordPlainText,
        registeredAT: new Date().getTime(),
        isAdmin: false,
        isOnline: false,
        isActive: true
    };

    // Save User in the db
    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the User."
        });
    });
};

// Get all Users from the database
exports.findAll = (req, res) => {
    // res.send('Réponse de l\'API pour findAll');
    // res.json({ message: "Requête API : findAll ctrl !"});

    const lastName = req.query.lastName;
    var condition = lastName ? { lastName: { [Op.like]: `${lastName}`} } : null;
    
    // console.log(lastName);

    User.findAll({ where: condition })
        .then(data => {
            console.log('Users find !');
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users !"
            });
        });
};

// Get one User with an id
exports.findOne = (req, res) => {
    // res.send('Réponse de l\'API pour findOne');
    // res.json({ message: "Requête API : findOne " + req.params.id });

    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data === null) {
                res.json({ message: "Utilisateur inconnu !" });
            }
            console.log('User find !');
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User with an id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            console.log("User was updated successfully");
            res.json({ message: "User was updated successfully" });
        } else {
            console.log(`Cannot update User with id=${id}. Maybe User was not found or req.body is empty !`);
            res.json({ message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty !` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            console.log("User was deleted successfully");
            res.json({ message: "User was deleted successfully" });
        } else {
            console.log(`Cannot delete User with id=${id}. Maybe User was not found or req.body is empty !`);
            res.json({ message: `Cannot delete User with id=${id}. Maybe User was not found !` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

// Delete all Users from the database
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
          console.log(`${num} Users were deleted successfully`);
          res.json({ message: `${nums} Users were deleted successfully` })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };

// Find all admin Users isAdmin = true
exports.findAllAdminUser = (req, res) => {
    // res.send('Réponse de l\'API pour findAllAdminUser');
    User.findAll(
        { attributes: ['id', 'firstName', 'lastName'] },
        { where: {isAdmin: true } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred when retrieving users."
            });
        });
};
