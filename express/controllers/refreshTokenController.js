const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');
//  const { json } = require('express/lib/response');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies)
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log(refreshToken);

    // check for valid user
   const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
   if (!foundUser) return res.sendStatus(403); // Forbidden

   // evaluate jwt
   jwt.verify(
       refreshToken,
       process.env.REFRESH_TOKEN_SECRET,
       (err, decoded) => {
           if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
           const accessToken = jwt.sign(
               { "username" : decoded.username },
               process.env.ACCESS_TOKEN_SECRET,
               { expiresIn: '30s'}
           );
           res.json({ accessToken })
       }
   );
}

    module.exports = { handleRefreshToken };