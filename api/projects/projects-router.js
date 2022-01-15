const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

const { checkProjectID } = require("./projects-middleware");


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
router.get("/:id", checkProjectID, (req, res) => {
  Projects.get(req.verifiedProjectID)
    .then((proj) => {
        res.status(200).json(proj);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the adopter",
      });
    });
});

// CREATE A NEW PROJECT
router.post("/", (req, res) => {
  const { name, description, completed } = req.body;

  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please provide name and description for the project" });
  } else {
    Projects.insert({ name, description, completed })
      .then((newProject) => {
        return Projects.get(newProject.id);
      })
      .then((newP) => {
        res.status(201).json(newP);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          err: err.message,
        });
      });
  }
});

// UPDATE PROJECT BY ID
router.put("/:id", checkProjectID, async (req, res) => {
  const { name, description, completed } = req.body;

  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please provide name and description for the project" });
  } else {
    Projects.update(req.verifiedProjectID, { name, description, completed })
      .then((updatedP) => {
        res.status(201).json(updatedP);
      })
      .catch((err) => {
        res.status(500).json({
          message: "The project information could not be updated",
          err: err.message,
        });
      });
  }
});

// DELETE PROJECT BY ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then((toBeDeleted) => {
      if (!toBeDeleted) {
        res
          .status(404)
          .json({ message: "The project with the specified ID does not exist" });
      } else {
        Projects.remove(id)
        .then(() => {
          res.json();
        })
        .catch((err) => {
          res.status(500).json({
            message: "Post could not be deleted",
            err: err.message,
          });
        });
      }
      
    })
    .catch((err) => {
      res.status(500).json({
        message: "The post could not be removed",
        err: err.message,
      });
    });
});

// GET ACTIONS BY PROJECT ID
router.get("/:id/actions", (req, res) => {
    Projects.getProjectActions(req.params.id)
      .then((actions) => {
        if (actions) {
          res.status(200).json(actions);
        } else {
          res.status(404).json({ message: "Project with specified ID not found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the adopter",
        });
      });
  });

module.exports = router;
