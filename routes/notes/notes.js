const express = require("express");
const router = express.Router();
const fs = require("fs");
const calculateStatistic = require("../../helpers/calculateStatistic");
const archiveUnarchiveNote = require("./archiveUnarchiveNote");
const deleteAllNotes = require("./deleteAllNotes");
const deleteById = require("./deleteById");
const noteSchema = require("./../../helpers/notesValidator");
const validateResourceMiddleware = require("./../../services/middleware/validateResource");

const path = __dirname + "/../../repositories/" + "notes.json";
const archivePath = __dirname + "/../../repositories/" + "archive.json";

router.get("/stats", function (req, res) {
  fs.readFile(path, "utf8", function (err, data) {
    try {
      const archivedEntries = JSON.parse(fs.readFileSync(archivePath, "utf8"));
      const statistic = calculateStatistic(JSON.parse(data), archivedEntries);
      res.end(JSON.stringify(statistic));
    } catch (err) {
      res.status(501).send(JSON.stringify(err));
    }
  });
});

router.get("/:id", function (req, res) {
  const correctPath = req.query?.archive === "true" ? archivePath : path;
  fs.readFile(correctPath, "utf8", function (err, data) {
    const notes = JSON.parse(data);
    if (notes.length < +req.params.id + 1)
      return res.status(404).end("No such Entry");
    res.end(JSON.stringify(notes[+req.params.id]));
  });
});

router.get("/", function (req, res) {
  const correctPath = req.query?.archive === "true" ? archivePath : path;
  fs.readFile(correctPath, "utf8", function (err, data) {
    res.end(data);
  });
});

router.delete("/archive/:id", function (req, res) {
  deleteById(archivePath, req, res);
});

router.delete("/archive", function (req, res) {
  deleteAllNotes(archivePath, req, res);
});

router.delete("/:id", function (req, res) {
  deleteById(path, req, res);
});

router.delete("/", function (req, res) {
  deleteAllNotes(path, req, res);
});

router.patch("/archive/:id", function (req, res) {
  archiveUnarchiveNote(path, archivePath, req, res);
});

router.patch("/unarchive/:id", function (req, res) {
  archiveUnarchiveNote(archivePath, path, req, res);
});

router.post("/", validateResourceMiddleware(noteSchema), function (req, res) {
  fs.readFile(path, "utf8", function (err, data) {
    const notes = JSON.parse(data);
    notes.push(req.body);
    fs.writeFile(path, JSON.stringify(notes), (err) => {
      if (err) return res.status(501).send(err);
      res.end(JSON.stringify(req.body));
    });
  });
});

router.patch(
  "/:id",
  validateResourceMiddleware(noteSchema),
  function (req, res) {
    fs.readFile(path, "utf8", function (err, data) {
      const notes = JSON.parse(data);
      if (notes.length < +req.params.id + 1)
        return res.status(404).end("No such Entry");
      notes[+req.params.id] = { ...notes[+req.params.id], ...req.body };
      fs.writeFile(path, JSON.stringify(notes), (err) => {
        if (err) return res.status(501).send(err);
        res.end(JSON.stringify(notes[+req.params.id]));
      });
    });
  }
);

module.exports = router;
