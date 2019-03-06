const express = require("express");
const app = express();
// require('dotenv').config();
const mongoose = require("mongoose");
const passport = require('passport');
// const routes = require("./routes");
// const config = require('./config');
const PORT = process.env.PORT || 3001;

app.get('/', (req, res, next) => {
    try {
      res.json("hello heroku world")
    } catch (err) {
      next(err)
    }
  })

// // Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// // pass the passport middleware
// app.use(passport.initialize());

// // load passport strategies
// const localSignupStrategy = require('./passport/local-signup');
// const localLoginStrategy = require('./passport/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// // Add routes, both API and view
// app.use(routes);

// // Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/factified");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
