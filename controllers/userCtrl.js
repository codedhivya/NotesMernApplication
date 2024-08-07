import Users from '../models/userModels.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userCtrl = {
    registerUser: async (req, res) => {
        try {

            const { username, email, password } = req.body;

            const user = await Users.findOne({ email: email });
            if (user) return res.status(400).json({ msg: "Email Already exists!!" })

            const passwordHashed = await bcrypt.hash(password, 10);
            const newUser = new Users({
                username,
                email,
                password: passwordHashed
            })
            await newUser.save();
            res.json({ msg: "User Registerd !!~" })

        }
        catch (err) {
            res.status(500).json({ errormsg: err.message })
        }
    },
    loginUser: async (req, res) => {

        try {

            const { email, password } = req.body;
            const user = await Users.findOne({ email: email });
            if (!user) return res.status(400).json({ msg: "User does not exists!!" })
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Password Icorrect !!" })

            //User success create token
            const payload = { id: user._id, name: user.username };
            const token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "1d" })
            res.json({ token });

        }
        catch (error) {
            res.status(500).json({ errormsg: error.message })
        }

    },
    verifiedToken: async (req, res) => {

        try {
            const token = req.header("Authorization")
            if (!token) return res.status(400).json({ msg: "Invalid Authentication!!" })
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, verified) => {
                if (err) return res.status(400).json({ msg: "Authorization not valid " })
                const user = await Users.findById(verified.id);
                if (!user) return res.send(false);
                return res.send(true);
            })

        }
        catch (error) {
            return res.status(500).json({ errormsg: error.message })
        }

    }

}

export default userCtrl;