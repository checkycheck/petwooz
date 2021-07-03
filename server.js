require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const mongoose = require('mongoose');

const errorHandler = require("./src/middleware/error");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/config/db.config");

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to petwooz  application." });
});

//routes
require("./src/routes/index.routes")(app);
app.use(errorHandler);

//Passport config
app.use(passport.initialize());
require('./src/config/passport.config')(passport);

// set port, listen for requests
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
 // server.close(() => process.exit(1));
 process.exit(0);

})
