const IsLogin = (req, res, next) => {
    if (req.user) {
        return next();
    } else {
        res.status(401).json({ message: "Unauthorized, please login" });
    }
};

module.exports = IsLogin;
