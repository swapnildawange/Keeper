const express = require("express");
const router = express.Router();
const NoteBook = require("../model/NoteBook");

router.get("/", (req, res) => {
  NoteBook.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error", daerrorta);
    });
});

router.post("/delete", (req, res) => {
  console.log(req.body);

  NoteBook.findOneAndDelete({ id: req.body.id }, (err, note) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }
    return res.status(200).json({ success: true, data: note });
  }).catch((err) => {
    console.log(err);
  });
});

router.post("/save", (req, res) => {
  const data = req.body;
  const note = new NoteBook(data);
  console.log(data);
  note.save((error) => {
    if (error) {
      res.status(500).json({
        msg: "Sorry,Internal server error",
      });
      return;
    }
    return res.json({
      msg: "Your data has been saved",
    });
  });
});

module.exports = router;
