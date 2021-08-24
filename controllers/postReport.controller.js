const db = require('../models');
const Report = db.postsReport;
const Op = db.Sequelize.Op;


// Create and save a new Report
// /report/
exports.create = (req, res) => {
    // res.json({ message: "[Reports] Requête API : create ctrl !"});

    // Create Report
    const report = {
        userId: req.body.userId, // Should be dynamic
        postId: req.body.postId, // Should be dynamic
        isReported: req.body.isReported
    };
    console.log(report.postId);
    
    // Check if the User has already report this Post
    Report.findAll({
        where: { postId: report.postId, userId: report.userId }
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            console.log('*** - This post is not reported by the User. Save in DB - ***');
            
            // Save Report in the db
            Report.create(report)
            .then(data => {
                console.log('*** - New Report created with success ! - ***');
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message + ". Some error occured while creating the Report."
                });
            });
            
        } else {
            console.log('*** - This post is already reported by the User !');
            res.json({ message: 'Post Already reported !'});
            // res.json(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message + ". Some error occurred while retrieving a Report !"
        });
    });
};

// Get all Reports Listing. Uri /
exports.findAll = (req, res) => {
    // res.json({ message: "[Reports] Requête API : findAll ctrl !"});

    Report.findAll({
        attributes: ['id'],
        include: ["user", "post"],
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            console.log('*** - No Reports found in database ! - ***')
            res.json({ message: 'No Reports found in the database !'});
        } else {
            console.log('Reports found !');
            res.json(data);
        }
    })
    .catch(err => { res.status(500).send(
        { message: err.message + ". Some error occurred while retrieving Reports !"}
        )
    });
};

// Get all Reports from the database with an post id
// uri: /reports/post/:id
exports.findAllByPost = (req, res) => {
    // res.send('Réponse de l\'API pour findAll');
    // res.json({ message: "[Reports] Requête API : findAllByPost ctrl !"});
    
    const id = req.params.id;
    // console.log(id);
    // let condition = title ? { title: { [Op.like]: `%${title}%`} } : null;
    // console.log(condition);

    Report.findAll({
        include: ["post", "user"],
        where: { postId: id }
    })
        .then(data => {
            if (Object.keys(data).length === 0) {
                console.log('*** - No Report(s) found in DB for this Post ! - ***');
                res.json({ message: 'No Report(s) found in database for this Post.'});
            } else {
                console.log('Report(s) found !');
                res.json(data);
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message + ". Some error occurred while retrieving Reports !"
            });
        });
};

// Get one Report with an id
// uri: reports/:id
exports.findOne = (req, res) => {
    // res.send('Réponse de l\'API pour findOne');
    // res.json({ message: "[reports] Requête API : findOne id: " + req.params.id });

    const id = req.params.id;

    Report.findOne({
        include: ["post", "user"],
        where: { id: id }
    })
    .then(data => {
        //Get the Report with User & Post datas included
        if (data === null) {
            console.log('*** - This Report is not in DB ! - ***');
            res.json({ message: 'This Report is not in the database !'});
        } else {
            console.log('*** - Report found ! - ***');
            //Get the User record only
            // console.log(data.user);
            res.json(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message + ". Error retrieving Report with id=" + id
        });
    })
};

// Update a Report with an id in the request
// uri: /reports/id
exports.update = (req, res) => {
    // res.json({ message: "[reports] Requête API : update id: " + req.params.id });
    const id = req.params.id;
  
   Report.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

            // TODO: The report ligne for this report should be erased
            console.log("*** - Report updated successfully - ***");
            res.json({ message: "Report updated successfully" });
        } else {
            console.log(`Cannot update Report with id=${id}. Maybe this Report was not found or req.body is empty !`);
            res.json({ message: `Cannot update Report with id=${id} !` });
        }
      })
      .catch(err => {
          console.log(err);
        res.status(500).send({
          message: err + ". Error updating Report with id=" + id
        });
      });
  };

// Delete a Report with the specified id in the request
// uri: /reports/id
exports.delete = (req, res) => {
    // res.json({ message: "[reports] Requête API : delete id: " + req.params.id });
    
    const id = req.params.id;

    Report.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            console.log("*** - Report deleted successfully ! - ***");
            res.json({ message: "The Report deleted successfully !" });
        } else {
            console.log(`*** - Cannot delete this Report with id=${id}. Maybe this Comment was not found or req.body is empty ! - ***`);
            res.json({ message: `Cannot delete this Report with id=${id} !` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete this Report with id=" + id
        });
      });
  };

// Delete all Reports from the database
exports.deleteAll = (req, res) => {
    res.json({ message: "[reports] Requête API : deleteAll - This option is not available ! " });

    // Report.destroy({
    //   where: {},
    //   truncate: false
    // })
    //   .then(nums => {
    //       console.log(`*** - ${num} Reports were deleted successfully - ***`);
    //       res.json({ message: `${nums} Reports were deleted successfully` })
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message + ". Some error occurred while removing all Reports."
    //     });
    //   });
  };

// Find all Reports for an User id
// uri : /reports/user/:userId

exports.findUserReports = (req, res) => {
    
    const userId = req.params.userId;
    console.log(userId);

    // res.json( {message: '[reports] Réponse de l\'API pour findUserReports userId: ' + userId });

    Report.findAll(
            {   attributes: ['id','isReported', 'postId'],
                include: ["post", "user"],
                where: {
                    userId: userId,
                    isReported: true
                }
            }
        )
        .then(data => {
            if (data === null) {
                console.log(`*** - No Reports found for this user ! - ***`);
                res.json({ message: 'No Report(s) found for this User !'});
            } else {
                console.log(`*** - Report(s) found for this user ! - ***`); 
                res.json(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred when retrieving Reports for this User."
            });
        });
};
