const Users = require('../users/users-model');


const checkRegisterPayload = (req, res, next) => {
    if(!req.body.User_name || !req.body.password || !req.body.phoneNumber) {
        res.status(400).json({ message: 'Username, Password, And PhoneNumber Are Required' })
    } else {
        next();
    }
}

const checkLoginPayload = (req, res, next) => {
    if(!req.body.User_name || !req.body.password) {
        res.status(400).json({ message: 'Username And Password Required' })
    } else {
        next();
    }
}

const userIdExists = (req, res, next) => {
    if(!req.body.UserId) {
        res.status(400).json({ message: 'Incomplete Request'})
        //Don't Want To Reveal Id Issue Explicitly
    }
}

const usernameExists = async (req, res, next) => {
    try {
        const rows = await Users.getUserByUserId({ User_name: req.body.User_name })
        if(rows.length) {
            next()
        } else {
            res.status(400).json({ message: 'Username Does Not Exist' })
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

// const usernameUnique = async (req, res, next) => {
//     try {
//         const rows = await Users.getByUserId({ User_name: req.body.User_name })
//         if(!rows.length) {
//             next()
//         } else {
//             res.status(401).json({ message: 'Username Already Taken' })
//         }
//     } catch(error) {
//         res.status(500).json({ message: error.message })
//     }
// }

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        res.status(401).json({ message: 'Token Required' })
    } else {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if(error) {
                res.status(401).json({ message: 'Token Invalid' })
            } else {
                req.decodedToken = decoded;
                next();
            }
        })
    }
}

module.exports = {
    makeToken,
    checkRegisterPayload,
    checkLoginPayload,
    userIdExists,
    usernameExists,
    restricted
}