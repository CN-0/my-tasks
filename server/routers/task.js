const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/add", auth, (req, res) => {
  const task = new Task({ ...req.body.task, user: req.user.id });
  task
    .save()
    .then((result) => {
      req.user.tasks.push(task);
      req.user.save();
      res.status(201).json({ task });
    })
    .catch((e) => {
      res.status(500).json({ msg: e.message });
    });
});

module.exports = router;
