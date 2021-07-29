const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/secret');

module.exports = function (user) {
    const payload = {
      subject: user.UserId,
      User_name: user.User_name,
      password: user.password,
    };
    const options = {
      expiresIn: "1h",
    };
    return jwt.sign(
      payload, 
      JWT_SECRET, 
      options,
    )
};