const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const Session = require("../models/session")
const config = require("../utils/config")

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({where:{username:username}});
    const passwordOK = await bcrypt.compare(password, user.password);
  if (user.disabled){
    return response.status(401).json({
      error: "your account is disabled. Please contact the admins.",
    });
  }
  if (user && passwordOK) {
    const userForToken = {
      username: user.username,
      id: user.id,
    };
    const options = {
      expiresIn: 300,
    };
    const token = jwt.sign(userForToken, config.TOKEN_SECRET, options);
    const [session,_] = await Session.findOrCreate({
      where:{userId:user.id}
    })
    session.token = token
    await session.save()

    return response.status(200).send({ token, user: user.name, id: user.id });
  }

  return response.status(401).json({
    error: "invalid username or password",
  });
});


module.exports = loginRouter;