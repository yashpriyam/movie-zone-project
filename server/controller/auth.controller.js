const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const client = require('../db/conn');
const JWT_SECRET = 'noauthrequested'

const generateAuthToken = (dataForToken) => jwt.sign({ username: dataForToken[0].username, userid: dataForToken[0].user_id }, JWT_SECRET, { expiresIn: "7d" })

const registerUser = async (request, response) => {
    const { user, password } = request.body
    try {
        const userAlreadyExists = await client.query(`select username from users where username = '${user}'`)
        if (userAlreadyExists.rows.length) {
            return response.status(409).json({ status: "error", message: "Conflict: User already exists" })
        }
        const createNewUser = (await client.query(`insert into users (username, password) values ($1, $2) returning username, user_id`, [user, password])).rows
        const token = generateAuthToken(createNewUser)
        response.status(200).json({ status: true, message: { token: token } })
    } catch (error) {
        response.status(500).json(error);
    }
}

const loginUser = async (request, response) => {
    const { user, password } = request.body
    try {
        const userExists = (await client.query(`select username, user_id, password from users where username = '${user}'`)).rows
        if (!userExists.length) {
            return response.status(401).json({ status: "error", message: "No User: User with this username does not exists" })
        }
        const userPasswordMatches = userExists[0].password == password
        if (!userPasswordMatches) {
            return response.status(401).json({ status: "error", message: "Wrong credentials: Username or password is incorrect" })
        }
        const token = generateAuthToken(userExists)
        response.status(200).json({ status: true, message: { token: token } })
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports = { loginUser, registerUser };