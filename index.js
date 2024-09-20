const express = require("express");
const app = express();
app.use(express.json())

const PORT = 8080;

//Db connection
const connection = require("./config/db");

//Router 
const movieRouter = require("./routes/movie.route");
//Middleware
app.use("/" , movieRouter)

app.listen(PORT, async () => {
  await connection;
  console.log(`Server is started on ${PORT} and connected to DB`);
});
