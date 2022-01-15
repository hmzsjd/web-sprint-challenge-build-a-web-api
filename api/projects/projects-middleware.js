// add middlewares here related to actions
//const Action = require("./actions-model");
const Project = require("../projects/projects-model");

function checkProjectID(req, res, next) {
  Project.get(req.params.id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({ message: "Project with given ID does not exist." });
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

module.exports = { checkProjectID };
