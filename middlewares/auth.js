import jwt from "jsonwebtoken"

const auth = (req, res, next) => {

    try {

        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid Authentication!!" })
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: "Authorization not valid " })
            req.user = user;
            next();

        })
    }
    catch (error) {
        return res.status(500).json({ errormsg: error.message })
    }
}

export default auth;