const express = require("express");
const router = express.Router();
const fs = require("fs");

let jsonData = JSON.parse(fs.readFileSync("./data.json", "utf-8")); // Reading the data from the JSON file and parsing it into a JavaScript object

router.get("/posts", (req, res) => {
  const posts = jsonData.map((post) => ({
    // Mapping the JSON data to a new array of posts
    creationTime: post.creationTime,
    id: post.postId,
    postText: post.postText,
  }));
  res.json(posts); // Sending the posts as a JSON response
});

router.get("/users", (req, res) => {
  const users = jsonData.map((post) => post.userData);
  res.json(users);
});

router.get("/posts/location", (req, res) => {
  const locationGroups = {}; // Creating an empty object to store the location groups
  jsonData.forEach((post) => {
    const location = post.userData.Location; // Extracting the location of the post
    if (!locationGroups[location]) {
      // Checking if the location group already exists
      locationGroups[location] = []; // Creating a new location group if it doesn't exist
    }
    locationGroups[location].push(post);
  });
  res.json(locationGroups);
});

router.get("/post/:id", (req, res) => {
  const post = jsonData.find((p) => p.postId === req.params.id); // Finding the post with the given ID
  res.json(post || {}); // Sending the post as a JSON response or an empty object if no post was found
});

router.get("/user/:name", (req, res) => {
  const user = jsonData.find((p) => p.userData.Name === req.params.name); // Finding the user with the given name
  res.json(user ? user.userData : {}); // sending the user data as a JSON response or an empty object if no user was found
});

module.exports = router;
