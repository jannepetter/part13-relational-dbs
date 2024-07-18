const logoutRouter = require("express").Router();

logoutRouter.post("/", async (request, response) => {
  const session = request.user.session
  session.token = null
  await session.save()

  return response.status(204).send();

});

module.exports = logoutRouter;