const User = require("../models/User");
const { generateTokenAndSetCookie } = require("../utils/token");


module.exports.register = async (req, res) => {

    const { username, email, password, age } = req.body
    console.log(req.body);

    try {
        const newUser = await User.create({ username, email, password, age })
        res.status(201).json({ success: true, newUser })

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: false, error })
    }
}


module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {

        const isUserExist = await User.findOne({ username: username });
        if (isUserExist) {

            const auth = await isUserExist.matchPassword(password)

            if (auth) {
                generateTokenAndSetCookie(res, isUserExist._id)
                res.status(200).json({ success: true, message: "Login successfull!" })
            } else {
                res.status(401).json({ success: false, message: "Incorrect password!" })
            }
        } else {
            res.status(404).json({ success: false, message: "User not found!" })
        }

    } catch (error) {
        res.status(500).json({ message: false, error })

    }
}