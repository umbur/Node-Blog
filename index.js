// code away!
const postDb = require("./data/helpers/postDb");
const userDb = require("./data/helpers/userDb");

const express = require('express');
const server = express();
const helmet = require("helmet");

server.use(express.json());
server.use(helmet())

// Users Endpoint
server.get("/api/users", (req, res) => {
    userDb
      .get()
      .then(users => res.status(200).json(users))
      .catch(err => {
          res.status(500).json({ error: 'The user information could not be retrieved.' })
      })
      
  })
  









server.listen(5000, () => {
    console.log('\n* Server Running on http://localhost:5000 *\n');
  });
   