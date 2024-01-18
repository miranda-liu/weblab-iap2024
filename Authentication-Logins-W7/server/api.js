/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server. 
|
*/

const express = require("express");

// import models so we can interact with the database
const Story = require("./models/story");
const Comment = require("./models/comment");
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// we haven't set up user login yet, so just
// use a hardcoded name for now
// TODO change to a unique name for workshop
const MY_NAME = "Miranda Liu";

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  Story.find({}).then((stories) => res.send(stories));
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    creator_name: MY_NAME,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
    creator_name: MY_NAME,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});

// TODO: add POST /api/login and POST /api/logout

router.post("/login", auth.login);
router.post("/logout", auth.logout);

// implement such that returns user object if it exists, other return empty object 
// for checking users on refresh
router.get("/whoami", (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
  else {
    res.send({});
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
