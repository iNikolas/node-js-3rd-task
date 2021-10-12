const fs = require("fs");

function deleteAllNotes(correctPath, req, res) {
  if (req.query?.all !== "true")
    return res.status(400).end("Please clarify correct query parameters");
  fs.writeFile(correctPath, JSON.stringify([]), (err) => {
    if (err) return res.status(501).send(err);
    res.end(JSON.stringify([]));
  });
}

module.exports = deleteAllNotes;
