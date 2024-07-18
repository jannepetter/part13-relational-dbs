require("dotenv").config();

// TEST_POSTGRES_URL=postgres://postgres:somepassword@localhost:5432/test
// POSTGRES_URL=postgres://postgres:somepassword@localhost:5432/postgres
// TOKEN_SECRET=secret

let PORT = process.env.PORT || 3003;
const POSTGRES_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_POSTGRES_URL
    : process.env.POSTGRES_URL;

const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = {
  POSTGRES_URL,
  PORT,
  TOKEN_SECRET
};
