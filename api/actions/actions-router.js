const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();

const { checkActionID, checkProjectID } = require("./actions-middlware");

// GET ALL ACTIONS
router.get("/", (req, res) => {
  Actions.get()
    .then((actionsArray) => {
      res.status(200).json(actionsArray);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the projects",
      });
    });
});

// GET ACTIONS BY ID
router.get("/:id", checkActionID, (req, res) => {
  Actions.get(req.verifiedID)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the projects",
      });
    });
});

// CREATE NEW ACTION
router.post("/", checkProjectID, (req, res) => {
  const project_id = req.verifiedProjectID;
  const { description, notes } = req.body;

  if (!project_id || !description || !notes) {
    res
      .status(400)
      .json({ message: "Please provide all required details for the action." });
  } else {
    Actions.insert({ project_id, description, notes })
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Action could not be created." });
      });
  }
});

// UPDATE ACTION BY ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes) {
    res
      .status(400)
      .json({ message: "Please provide all details to update action." });
  } else {
    Actions.update(id, { project_id, description, notes, completed })
      .then((updatedAction) => {
        res.status(201).json(updatedAction);
      })
      .catch((err) => {
        res.status(500).json({
          message: "The project information could not be updated",
          err: err.message,
        });
      });
  }
});

// DELETE ACTION BY ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then((toBeDeleted) => {
      if (!toBeDeleted) {
        res
          .status(404)
          .json({ message: "The action with the specified ID does not exist" });
      } else {
        Actions.remove(id)
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

module.exports = router;
