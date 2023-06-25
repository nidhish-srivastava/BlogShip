const UserModel = require('../models/User.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret = "sdiasggdaksdkas"
const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)

    } catch (error) {
        res.status(400).json(error);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await UserModel.findOne({ username });
    const passOk = bcrypt.compare(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('wrong credentials');
    }
}

const profile = async (req, res) => {
    const { token } = req.cookies
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) res.json("Please Login to continue")
            res.json(info)
        })
}

const logout = async (req, res) => {
    res.cookie('token','').json('ok')
}



module.exports = { login, register, profile, logout }