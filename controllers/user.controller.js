const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
// Hash password in DB
const bcrypt = require('bcrypt');
// Token Authentification
const jwt = require('jsonwebtoken');


// Create and save a new User
exports.create = (req, res) => {

    // Validate email from the request
    if (!req.body.email) {
        res.status(400).send({
            message: "Email can not be empty !"
        });
        return;
    }
    // Validate paswword from the requests
    if(!req.body.passwordPlainText) {
        res.status(400).send({
            message: "Password can not be empty !"
        });
        return;
    }

    bcrypt.hash(req.body.passwordPlainText, 10)
    .then(hash => {
        // Create User
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: hash,
            passwordPlainText: req.body.passwordPlainText,
            registeredAT: new Date().getTime(),
            isAdmin: false,
            isOnline: true,
            isActive: true
        };
        
        // Save User in database
        User.create(user)
        .then(data => {
            console.log('New User created with success !');
            res.status(201).json({data})
        })
        .catch(err => res.status(400).json({
            message: "Some error occured while creating the User." + err.message
        }));
    })
    .catch(err => res.status(500).json(err));

};

// POST User login
// URI /users/login
exports.login = (req, res) => {
    // res.json({ message: "[Users] login controller !"});
    // console.log(req.body);
    const userEmail = req.body.email;
    // console.log(userEmail);

    User.findOne({
        where: { email: userEmail }
    })
    .then(user => {
        if (user === null) {
            console.log('User not found in DB !');
            return res.status(401).json({ message: 'User not found !'
            });
        } 
        
        bcrypt.compare(req.body.passwordPlainText, user.passwordHash)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({message: "Wrong password !"});
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                            { id: user.id },
                            'RANDOM_TOKEN_SUPERSECRET',
                            { expiresIn: '24h' }
                        ),
                    firstName: user.firstName,
                    lastName : user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    avatar: user.avatar,
                    isOnline: true,
                    isActive: true
                });
            })
            .catch(err => res.status(500).json({
                message: 'Wrong Password ! ' + err.message }));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error retrieving User. " + err.message
        });
    })

};

// Get all Users from the database
// Get all Users with uri: /users?lastname=Durand
exports.findAll = (req, res) => {
    // res.send('Réponse de l\'API pour findAll');
    // res.json({ message: "Requête API : findAll ctrl !"});

    const lastName = req.query.lastName;
    var condition = lastName ? { lastName: { [Op.like]: `${lastName}`} } : null;
    
    // console.log(lastName);

    User.findAll({ where: condition })
        .then(data => {
            console.log('Users found !');
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
