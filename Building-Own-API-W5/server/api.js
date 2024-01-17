/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

const router = express.Router();

// we haven't set up user login yet, so just
// use a hardcoded name for now
// TODO (step2) change to a unique name for workshop
const myName = "Miranda Liu";

const data = {
  stories: [
    {
      _id: 0,
      creator_name: "Tony Cui",
      content: "Send it or blend it?",
    },
    // TODO-1 (step1) Add new story!
    {
      _id: 1,
      creator_name: "Miranda Liu",
      content: "yayyy!",
    },
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Stanley Zhao",
      parent: 0,
      content: "Both!",
    },
  ],
};

// an example GET route
router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API!" });
});

// TODO-2 (step1) Add get stories endpoint
router.get("/stories", (req, res) => {
  res.send(data.stories);
});

// TODO-3 (step1) Add get comments endpoint
router.get("/comment", (req, res) => {
  const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent); // double = bc req.query is string while comment.parent is int -> == compares different types for equality
  res.send(filteredComments);
});

// adding post story endpoint (step 2)
router.post("/story", (req, res) => {
  const newStory = {
    _id: data.stories.length,
    creator_name: myName,
    content: req.body.content,
  };

  data.stories.push(newStory);
  res.send(newStory);
});

// adding post comment endpoint (step 2)
router.post("/comment", (req, res) => {
  const newComment = {
    _id: data.comments.length,
    creator_name: myName,
    parent: req.body.parent,
    content: req.body.content,
  };

  data.comments.push(newComment);
  res.send(newComment);
});

// put handling missing API routes below all other API routes or it'll overwrite the others
router.all("*", (req, res) => {
  console.log(`API Router not found: ${req.method} $req.url`); // backend now aware of failing api accesses
  res.status(404).send({ message: "API Route not found" });
});

module.exports = router;
