import express from "express";
import { Drug } from "./Drug";
import fs from "fs";

const router = express.Router();


router.get("/", (req, res) => {
  res.status(200).send("hello");
});



router.get("/drugs", (req, res) => {
  const data = fs.readFileSync("./drugs.json", "utf-8");
  res.status(200).send(JSON.parse(data));
});

router.get("/drugs/:id", (req, res) => {
  const stringData = fs.readFileSync("./drugs.json", "utf-8");
  const data = JSON.parse(stringData);
  const drug = data.find((obj: Drug) => obj.UUID === req.params.id);
  res.status(200).send(drug);
});

router.post("/drugs", (req, res) => {
  const stringData = fs.readFileSync("./drugs.json", "utf-8");
  let data = JSON.parse(stringData);

  if (!data.find((obj: Drug) => obj.UUID === req.body.UUID)) {
    data.push(req.body);

    fs.writeFileSync("./drugs.json", JSON.stringify(data));
    res.sendStatus(201);
  } else {
    res.status(422).send({
      message: "UUID number already exist",
    });
  }
});
router.delete("/books/:id", (req, res) => {
  const stringData = fs.readFileSync("./books.json", "utf-8");

  let data = JSON.parse(stringData);
  data = data.filter((obj: Drug) => obj.UUID !== req.params.id);
  fs.writeFileSync("./books.json", JSON.stringify(data));
  res.sendStatus(200);
});

router.put("/books/:id", (req, res) => {
  const stringData = fs.readFileSync("./books.json", "utf-8");
  let data = JSON.parse(stringData);

  const dataIndex = data.findIndex((obj: Drug) => obj.UUID === req.params.id);
  const newIndex = data.findIndex((obj: Drug) => obj.UUID === req.body.UUID);
  if (newIndex === dataIndex || newIndex === -1) {
    data[dataIndex] = req.body;
    fs.writeFileSync("./books.json", JSON.stringify(data));
    res.sendStatus(201);
  } else {
    res.status(422).send({
      message: "UUID number already exist",
    });
  }
});

export default router;
