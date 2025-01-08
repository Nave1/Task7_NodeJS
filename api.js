// Created By Yarden Halely & Nave Shitrit
const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
// Reading the Json File function
const data = JSON.parse(fs.readFileSync(__dirname + `/data/users.json`));
// Serve static files from the "styles" folder
app.use("/styles", express.static("styles"));
// Function to show users
function showAllUsers(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `<ul>${key}: ${value} </ul>`)
    .join("");
}
app.get("/api/users/filter", function (req, res) {
  const minAge = parseInt(req.query.minAge, 10); // Parse the minAge from the query string
  const maxAge = parseInt(req.query.maxAge, 10); // Parse the maxAge from the query string
  // Filter the users based on the age range provided
  filteredUsers = data.filter((user) => {
    return (
      (isNaN(minAge) || user.age >= minAge) && // Check if user's age >= minAge
      (isNaN(maxAge) || user.age <= maxAge) // Check if user's age <= maxAge
    );
  });
  res.send(filteredUsers);
});
// Fixed
app.get("/api/users", function (req, res) {
  res.send(data);
});
// Fixed
app.get("/api/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10); // Parse the product ID from the route
  const currentUser = data.find((user) => user.id === id); // Find the product by ID
  if (currentUser) {
    res.send(currentUser);
  } else {
    res.status(404).json({
      "User Not Found": `The User's Id #${id} Doesnt Exist`,
    });
  }
});

// FIXED!
app.get("/user/:id", function (req, res) {
  const id = parseInt(req.params.id, 10); // Parse the product ID from the route
  const currentUser = data.find((user) => user.id === id); // Find the product by ID
  if (currentUser) {
    res.send(
      `<html>
      <head>
        <link rel="stylesheet" href="/styles/style.css">
      </head>
      <body>
        <h1>User #${id}</h1>
        <h2>${showAllUsers(currentUser)}</h2>
      </body>
    </html>`
    );
  } else {
    res.status(404).send(
      `<html>
      <head>
      <link rel="stylesheet" href="/styles/style.css">
      </head>
      <body>
      <h1>User ${id}</h1>
      <h2> Doesnt exist in the database.</h2>
      </body>
      </html>`
    );
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Users API listening on port ${port}`);
});
