const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, "/")));

// Endpoint to get the linkTo based on the link
app.get("/get-link", (req, res) => {
  const queryLink = req.query.link;

  // Read the JSON file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }

    const jsonData = JSON.parse(data);
    const entry = jsonData.find((item) => item.link === queryLink);

    if (entry) {
      res.json({ linkTo: entry.linkTo });
    } else {
      res.status(404).send("Link not found");
    }
  });
});

// Serve the index.html file for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
