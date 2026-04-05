
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    if (!req.cookies) {
        console.error("Cookie-parser is not initialized!");
        return res.redirect('/');
    }
    const token = req.cookies.token;

    if (req.session.user && token) {
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded; // Attach the decoded user info to the request
                return next(); // Proceed to the controller (e.g., render store)
            } catch (err) {
                console.error("JWT Verify Error:", err);
                return res.redirect('/');
            }
        }
        return next();
    }

    res.redirect('/');
};

// 2. For routes that FORBID a logged-in user (Login, Signup)
const isGuest = (req, res, next) => {
    const token = req.cookies?.token;
    if (token) {
        // Instead of redirecting, we send a 400 so React knows 
        // the user is already authenticated
        return res.status(400).json({ message: "Already logged in" });
    }
    next();
};

module.exports = { protect, isGuest };