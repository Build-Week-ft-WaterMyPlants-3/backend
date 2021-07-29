const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./users-model");
const mw = require("../middleware/middleware");
const { jwtSecret } = require("../../config/secret");

//TokenMaker
const makeToken = (user) => {
  const payload = {
    subject: user.UserId,
    username: user.Username,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, jwtSecret, options);
};

//ENDPOINTS
//[GET] All Users
router.get("/", (req, res) => {
  Users.getAllUsers()
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//[GET] User By UserId
router.get("/:UserId", mw.userIdExists, (req, res) => {

  Users.getUserByUserId(req.params.UserId)
      .then((specificUser) => {
        res.status(200).json(specificUser);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
});

// middleware suggested for router.post /register: middleware.checkRegisterPayload, middleware.usernameUnique
//[POST] Register As A User
router.post("/register", mw.checkRegisterPayload, (req, res) => {
  let credentials = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(credentials.password, rounds);
  credentials.password = hash;

  Users.createUser(credentials)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// middleware suggested for router.post /login: middleware.checkLoginPayload, middleware.usernameExists,
//[POST] Login As A User
router.post("/login", mw.checkLoginPayload, mw.usernameExists, (req, res) => {
  let { User_name, password } = req.body;

  Users.getBy({ User_name })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          user: user,
          message: `Welcome, ${user.User_rname}`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

//[PUT] Update User By UserId
router.put("/:UserId", (req, res) => {
  const updatedUser = req.body;

  if (updatedUser.User_name) {
    if (typeof updatedUser.UserId === "number") {
      Users.updateUserByUserId(updatedUser)
        .then((update) => {
          res.status(200).json(update);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(406).json({ message: "UserId Must Be A Number" });
    }
  } else {
    res.status(406).json({ message: "Name is Required" });
  }
});

//[DELETE] Delete User By UserId
router.delete("/:UserId", (req, res) => {
  const { UserId } = req.params;

  Users.deleteUserByUserId(UserId)
    .then((resolution) => {
      res.status(200).json(resolution);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
