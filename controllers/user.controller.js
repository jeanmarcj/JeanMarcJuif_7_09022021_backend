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
            message: "Veuillez saisir un email !"
        });
        return;
    }
    // Validate paswword from the requests
    if(!req.body.passwordPlainText) {
        res.status(400).send({
            message: "Veuillez saisir un mot de passe !"
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
            passwordPlainText: '',
            registeredAT: new Date().getTime(),
            isAdmin: false,
            isOnline: true,
            isActive: true
        };
        
        // Save User in database
        User.create(user)
        .then(data => {
            console.log('Nouvel utilisateur créé !');
            res.status(201).json({data})
        })
        .catch(err => res.status(400).json({
            message: "Une erreur est intervenue à la création d'un utilisateur. " + err.message
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
            console.log('Utilisateur introuvable dans la base de données !');
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
                message: 'Erreur dans le mot de passe ! ' + err.message }));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Une erreur est intervenue ! " + err.message
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
            console.log('Utilisateurs trouvés !');
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                "Une erreur est intervenue  !" + err.message
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
                message: "Une erreur est intervenue ! "
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
            console.log("Utilisateur mis à jour !");
            res.json({ message: "Utilisateur mis à jour !" });
        } else {
            console.log("Une erreur est intervenue pour retrouver cet utilisateur");
            res.json({ message: "Une erreur est intervenue pour retrouver cet utilisateur" });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Une erreur est intervenue pendant la mise à jour de cet utilisateur"
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
            console.log("Utilisateur effacé !");
            res.json({ message: "Utilisateur effacé !" });
        } else {
            console.log("Une erreur est intervenue lors de la suppression de cet utilisateur !");
            res.json({ message: "Une erreur est intervenue lors de la suppression de cet utilisateur !" });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Une erreur est intervenue lors de la suppression de cet utilisateur !"
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
          console.log(`${num} Utilisateurs effacés !`);
          res.json({ message: `${nums} Utilisateurs effacés !` })
      })
      .catch(err => {
        res.status(500).send({
          message:
            "Une erreur est intervenue lors de l'effacement de tous les utilisateurs " + err.message
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
                message: "Une erreur est intervenue !"
            });
        });
};
