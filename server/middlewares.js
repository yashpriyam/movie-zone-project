const jwt = require('jsonwebtoken')
const JWT_SECRET = 'noauthrequested'

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization || ''
    const tokenIsValid = jwt.verify(token, JWT_SECRET)
    if (!tokenIsValid) {
        return response.status(403).json({ error: "Unauthorized" });
    }
    req.tokenIsValid = tokenIsValid
    next()
}

module.exports = { verifyToken };