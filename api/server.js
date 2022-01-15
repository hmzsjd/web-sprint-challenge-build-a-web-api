const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();
server.use(express.json())


server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>SPRINT CHALLENGE</h>
    <p>Welcome to the SPRINT CHALLENGE API</p>
  `)
})

module.exports = server;



// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!


// const express = require('express')
// const adoptersRouter = require('./adopters/adopters-router')
// const dogsRouter = require('./dogs/dogs-router')

// const server = express()
// server.use(express.json())

// server.use('/api/adopters', adoptersRouter)
// server.use('/api/dogs', dogsRouter)

// server.get('/', (req, res) => {
//   res.send(`
//     <h2>Shelter API</h>
//     <p>Welcome to the Shelter API</p>
//   `)
// })

// module.exports = server
