const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projArray) => {
      console.log(projArray);
      res.status(200).json(projArray);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the projects",
      });
    });
});


module.exports = router;
