const logger = require("./logger");
const functions = require("./functions");
const User = require("../models/user");
const Session = require("../models/session");

const requestLogger = (request, response, next) => {
  if (!process.env.NODE_ENV === "test") {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (!process.env.NODE_ENV === "test") {
    logger.error(error.message);
  }

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
  
    case "ValidationError":
    case "TypeError":
    case "SequelizeValidationError":
    case "SequelizeDatabaseError":
      return response.status(400).json({ error: error.message });
  
    default:
      console.log("Uncatched error in errorHandler middleware", error.name);
      next(error);
  }
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
};

const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = functions.authentication(token);
  if (decodedToken) {
    const user = await User.findByPk(decodedToken.id,{
      include:{
        model:Session,
      }
    });
 
    if (user.disabled){
      return response.status(401).send({ error: "your account is disabled. Contact the admins." });
    }
    if (token !== user.session.token){
      return response.status(401).send({ error: "you are trying to access resources with cancelled token. Try to relog" });
    }

    request.user = user;
  } else {
    return response.status(401).send({ error: "token missing or expired" });
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
