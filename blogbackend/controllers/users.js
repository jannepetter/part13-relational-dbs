const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const {User,Blog,UserBlogs }= require("../models");

usersRouter.get("/", async (request, response) => {
  const users = await User.findAll({
    attributes:{
      exclude:["password"]
    },
    include:{
      model:Blog,
      attributes:{exclude:["userId"]}
    }
  })
  
  response.json(users);
});


usersRouter.get("/:id", async (request, response) => {
  const userId = request.params.id;
  const readParam = request?.query?.read

  const user = await User.findByPk(userId,
    {
    attributes:{
      exclude:["password","id","createdAt","updatedAt"]
    },
    include:{
      model:Blog,
      as:"readings",
      attributes:{
        exclude:["userId","createdAt","updatedAt"],
      },
      through: readParam?{ attributes: ["read","id"], as:"readinglist", where:{read:readParam}}:
      { attributes: ["read","id"], as:"readinglist"},
    },
  })
  
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length < 4) {
    return response
      .status(400)
      .json({ error: "password needs to be at least 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    username,
    name,
    password:passwordHash,
    })
  const newUser = user.toJSON()
  delete newUser.password
  response.status(201).send(newUser)
});

usersRouter.put("/:username", async (request, response) => {
  const username = request.params.username;
  const newUsername = request.body.username
  await User.update(
    {username:newUsername},
    {where:{username:username}},
    )
  const updatedUser = await User.findOne({
    where:{username:newUsername},
    attributes:{exclude:["password"]}
    })
  response.status(200).json(updatedUser)
});

module.exports = usersRouter;
