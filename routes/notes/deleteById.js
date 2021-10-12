fs = require("fs");

function deleteById(correctPath, req, res) {
  fs.readFile(correctPath, "utf8", function (err, data) {
    const notes = JSON.parse(data);
    if (notes.length < +req.params.id + 1)
      return res.status(404).end("No such Entry");
    const deletedNote = notes.splice(+req.params.id, 1);
    fs.writeFile(correctPath, JSON.stringify(notes), (err) => {
      if (err) return res.status(501).send(err);
      res.end(JSON.stringify(deletedNote));
    });
  });
}

module.exports = deleteById;
