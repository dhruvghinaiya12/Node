const validateTask = (req, res, next) => {
    const { taskName, status,description } = req.body;
    
    if (!taskName || !description) {
        return res.status(400).json({ message: 'All field is required' });
    }

    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    next();
};

module.exports = validateTask;
