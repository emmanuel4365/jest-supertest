const app = require("./app.js");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");

// Setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

// Connecting to databse
connectDatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
