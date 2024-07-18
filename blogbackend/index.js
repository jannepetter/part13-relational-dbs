const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const { connectToDatabase } = require("./utils/db")
const PORT = config.PORT;

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
