import express from "express";
import { Drug } from "./Drug";
import WebSocket from "ws";
import fs from "fs";

const router = express.Router();
const wss = new WebSocket.Server({
  port: 8080,
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
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data));
    });
    fs.writeFileSync("./drugs.json", JSON.stringify(data));
    res.sendStatus(201);

  } else {
    res.status(422).send({
      message: "UUID number already exist",
    });
  }
});
router.delete("/drugs/:id", (req, res) => {
  const stringData = fs.readFileSync("./drugs.json", "utf-8");

  let data = JSON.parse(stringData);
  data = data.filter((obj: Drug) => obj.UUID !== req.params.id);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data));
  });
  fs.writeFileSync("./drugs.json", JSON.stringify(data));
  res.sendStatus(200);
});

router.put("/drugs/:id", (req, res) => {
  const stringData = fs.readFileSync("./drugs.json", "utf-8");
  let data = JSON.parse(stringData);

  const dataIndex = data.findIndex((obj: Drug) => obj.UUID === req.params.id);
  const newIndex = data.findIndex((obj: Drug) => obj.UUID === req.body.UUID);
  if (newIndex === dataIndex || newIndex === -1) {
    data[dataIndex] = req.body;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data));
    });
    fs.writeFileSync("./drugs.json", JSON.stringify(data));
    res.sendStatus(201);
  } else {
    res.status(422).send({
      message: "UUID number already exist",
    });
  }
});

export default router;
