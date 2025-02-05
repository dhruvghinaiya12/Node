const Role = (req, res, next, roles = []) => {
    
    if (!req.user || !Array.isArray(roles)) {
        return res.status(400).send("Invalid request");
    }

    let role = req.user.role;
    if (roles.includes(role)) {
        next();
    } else {
        return res.status(403).send("You are not authorized to perform this action");
    }
}