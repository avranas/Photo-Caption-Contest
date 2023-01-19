require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const initalizePassport = require("./passport-config");
const path = require("path");
const nodeEnv = process.env.NODE_ENV;

app.use(cors());
//This makes req.body.username work
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(express.static("public"));
initalizePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use("/images", express.static(__dirname + "/assets/images"));

//Serve static files from the React frontend app
console.log("nodeEnv:", nodeEnv);

if (nodeEnv === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use("/authenticated", require("./routes/authenticated.js"));
app.use("/captions", require("./routes/captions.js"));
app.use("/users", require("./routes/users.js"));
app.use("/server-images", require("./routes/images.js"));
app.use("/server-register", require("./routes/register.js"));
app.use("/server-login", require("./routes/login.js"));
app.use("/server-logout", require("./routes/logout.js"));

/*
  Error handling
  Leaving next as a param is neccessary because this is how express finds
  the error handler
*/
//eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!res.headersSent) {
    res.status(err.status || 500).send(err.message);
  }
  //Log requests method
  console.log(`${req.method} Request Received`);
  //Log stack trace for error
  console.error(err.stack);
  //Log error message
  console.log(err.message);
});

/*
  After defining your routes, anything that doesn't match what's above,
  we want to return index.html from our built React app
*/
if (nodeEnv === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

if (nodeEnv === "development") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/public/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Running Photo Caption Contest - Listening on port ${PORT}`);
});
