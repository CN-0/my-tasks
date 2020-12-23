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

router.patch("/change-status", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.body.task.id);
    task.status = req.body.task.status;
    await task.save();
    res.status(200).json({ task });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
