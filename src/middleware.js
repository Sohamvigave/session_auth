const isAuthenticated = (req, res, next) => {
    if(!req.session.userId) {
        res.send("you must be logged in to access this route!");
        return;
    }
    next();
};

module.exports = {isAuthenticated};