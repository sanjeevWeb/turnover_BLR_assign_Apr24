const User = require("../models/user.model");

const verifyEmailHandler = async (req, res) => {
    const email = req.query.email;

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            res.send(`
                <form action="http://localhost:5000/api/v1/verifyotp?email=${email}" method="POST">
                    <input type="text" name="otp" placeholder="enter your otp">
                    <input type="submit">
                </form>
            `);
        } else {
            return res.json({ err: 'you are not a registered user' });
        }
    } catch (error) {
        console.log(error);
        return res.json({ err: 'something went wrong, please retry' });
    }
}

const verifyOTPHandler = async (req, res) => {
    const email = req.query.email;
    const { otp } = req.body;

    try {
        if (otp === '12345678') {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.json({ msg: 'not a registered user' });
            }

            await user.update({ emailVerified: true });

            return res.send('<p>you are a verified user now, please Login to your account</p>');
        } else {
            return res.json({ err: 'invalid OTP, please retry' });
        }
    } catch (error) {
        console.log(error);
        return res.json({ err: 'something went wrong, please retry' });
    }
}

module.exports = {
    verifyEmailHandler,
    verifyOTPHandler
}
