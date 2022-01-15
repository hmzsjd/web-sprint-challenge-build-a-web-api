// add middlewares here related to actions
const Action = require("./actions-model");
const Project = require("../projects/projects-model");

function checkActionID(req, res, next) {
  Action.get(req.params.id)
    .then((action) => {
      if (!action) {
        res
          .status(404)
          .json({ message: "Action with specified ID not found." });
      } else {
        req.verifiedID = action.id;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error checking action." });
    });
}

function checkProjectID(req, res, next) {
  Project.get(req.body.project_id)
    .then((project) => {
      if (!project) {
        res
          .status(400)
          .json({ message: "Cannot add action to nonexistent project." });
      } else {
        req.verifiedProjectID = project.id;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error checking project." });
    });
}

module.exports = { checkActionID, checkProjectID };
