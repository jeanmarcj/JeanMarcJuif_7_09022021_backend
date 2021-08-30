const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(req.headers.authorization);
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SUPERSECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'The user Id is not available';
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};