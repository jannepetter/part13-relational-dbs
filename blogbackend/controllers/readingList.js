const readingListRouter = require("express").Router();
const {UserBlogs }= require("../models");

readingListRouter.post("/", async (request, response) => {
  const userblog = await UserBlogs.create({...request.body,userId:request.user.id})
  response.status(201).json(userblog);
});

readingListRouter.put("/:id", async (request, response) => {
  const itemId = request.params.id;
  const userblog = await UserBlogs.findByPk(itemId)
  const updated = await userblog.update(request.body)
  response.status(200).json(updated);
});


module.exports = readingListRouter;