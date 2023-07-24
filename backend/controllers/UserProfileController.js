const UserProfileModel = require('../models/UserProfile.js')

const secret = "sdiasggdaksdkas"


const profile = async (req, res) => {
    const token = req?.cookies?.token
    // console.log("token",typeof token," ",token);
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) res.status(500).json({ error: "Internal Server error" })
        res.json(info)
    })
}

module.exports = {profile}