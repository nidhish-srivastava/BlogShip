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
            password: bcrypt.hashSync(password, salt),
        })

        const usersList = await UserProfileModel.findOne()
        usersList.users.push(username)
        await usersList.save()

        res.json(userDoc)

    } catch (error) {
        res.status(400).json(error);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const userInfo = await UserModel.findOne({ username });
    bcrypt.compare(password, userInfo?.password, function (err, info) {
        if (err) return res.status(400).json("password doesnt match")
        if (info) {
            jwt.sign({ username, id: userInfo._id}, secret, {}, (err, token) => {
                if (err) res.status(500).json({ error: "Internal Server error", msg: "Wrong Credentials" })
                else {
                    res.cookie('token', token).json({
                        id: userInfo?._id,
                        username,
                    });
                }
            });
        }
    })
}




const logout = async (req, res) => {
    res.cookie('token', '').json('ok')
}




module.exports = { login, register,  logout }