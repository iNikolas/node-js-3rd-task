const fs = require("fs");

function archiveUnarchiveNote(originPath, targetPath, req, res) {
  fs.readFile(originPath, "utf8", function (err, data) {
    const notes = JSON.parse(data);
    if (notes.length < +req.params.id + 1)
      return res.status(404).end("No such Entry");
    const deletedNote = notes.splice(+req.params.id, 1);
    try {
      const archivedValues = JSON.parse(fs.readFileSync(targetPath, "utf8"));
      archivedValues.push(deletedNote[0]);
      fs.writeFileSync(targetPath, JSON.stringify(archivedValues));
      fs.writeFileSync(originPath, JSON.stringify(notes));
      res.end(JSON.stringify(deletedNote[0]));
    } catch (err) {
      res.status(501).send(JSON.stringify(err));
    }
  });
}

module.exports = archiveUnarchiveNote;
