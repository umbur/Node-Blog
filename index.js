// code away!
const postDb = require("./data/helpers/postDb");
const userDb = require("./data/helpers/userDb");

const express = require('express');
const server = express();
const helmet = require("helmet");

server.use(express.json());
server.use(helmet())

// Users Endpoint
// Getting all the users
server.get("/api/users", (req, res) => {
    userDb
      .get()
      .then(users => res.status(200).json(users))
      .catch(err => {
          res.status(500).json({ error: 'The user information could not be retrieved.' })
      })
      
  })
  
// Getting the user by id
 server.get('/api/users/:id', (req, res) => {
     const id = req.params.id

     userDb.getById(id)
     .then(user => {
        if(user){
            res.status(200).json(user);
        } else {
            res.status(400).json({ error: 'The user with the  specified ID does not exist.' })
        }
     })
     .catch(err =>
        res.status(500).json({ error: 'The user information could not be retrieved.' })
        )
    })

// Psting a new user
server.post("/api/users", (req, res) => {
    const userInfo = req.body;

    if (!userInfo.name) {
      return res
        .status(400)
        .json({
          errorMessage: "Please make sure the key for the new user in 'name'."
        });
    }
  
    userDb.insert(userInfo).then(result => {
      userDb.getById(result.id)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err =>
          res
            .status(500)
            .jason({
              error: "There was an error while saving the user to the database"
            })
        );
    });
  });





server.listen(5000, () => {
    console.log('\n* Server Running on http://localhost:5000 *\n');
  });
   