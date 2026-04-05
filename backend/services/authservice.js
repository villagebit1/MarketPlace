const jwt = require('jsonwebtoken');
const User = require('../models/user')

class AuthService {
    async login(email, password) {
        const user = await User.findOne(email, password);
        console.log(`We got into service: ${user}`)//template string

        if (!user) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { user, token };
    }

    async revokeToken(userId) {
        // This is where you'd add logic to invalidate a token in Redis/DB
        // For basic cookie/session logout, this might stay empty for now.
        return true;
    }
}

module.exports = new AuthService();

