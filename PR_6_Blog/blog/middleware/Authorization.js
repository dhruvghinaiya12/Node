const checkRole = (req, res, next) => {
    const role = req.cookies.role;
console.log(role);

    if (role !=="admin") {
        return res.send("You are not authorized to access this page."); 
    }

    next();
};

module.exports = checkRole;
