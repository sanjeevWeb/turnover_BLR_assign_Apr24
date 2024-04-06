const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const sendVerificationOTP = require("../utility/sendinbluMail");
const jwt = require('jsonwebtoken');
const UserChkProduct = require("../models/userChkProduct.model");

const getSignedUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({ error: 'All fields required' });
        }
        
        const salt = await bcrypt.genSalt(10); // salt means no of rounds in the algorithm
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({ name: username, email, password: hashedPassword });

        if (!user) {
            return res.json({ error: 'something broke, please retry' });
        }

        sendVerificationOTP(email);
        return res.json({ msg: 'you are a registered user now, please verify your email' });
    } catch (error) {
        console.log(error);
    }
}

const getLoggedIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ error: 'All fields required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.json({ error: 'you are not a registered user' });
        }

        if (user.emailVerified) {
            const isMatched = await bcrypt.compare(password, user.password);

            if (isMatched) {
                const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET_KEY);

                return res.json({ message: 'log in successful', token });
            } else {
                return res.json({ error: 'user not authorized' });
            }
        } else {
            return res.json({ error: 'email is not verified' });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSignedUp,
    getLoggedIn
}
