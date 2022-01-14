const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

// GET ALL PROJECTS
router.get("/", (req, res) => {
  Projects.get()
    .then((projArray) => {
      res.status(200).json(projArray);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the projects",
      });
    });
});

// GET PROJECT BY ID
router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((proj) => {
      if (proj) {
        res.status(200).json(proj);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the adopter",
      });
    });
});

// CREATE A NEW PROJECT
router.post('/', (req, res) => {
    const {name, description, completed} = req.body;

    if (!name || !description) {
        res.status(400).json({ message: 'Please provide name and description for the project' })
      } else {
        Projects.insert({name, description, completed})
        .then(newProject => {
            return Projects.get(newProject.id)
        })
        .then(newP => {
            res.status(201).json(newP)
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error while saving the post to the database',
                err: err.message
              })
            
        })
      }
     
  })

module.exports = router;
