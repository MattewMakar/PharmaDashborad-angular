import express from "express";
import { Drug } from "./Drug";
import WebSocket from "ws";
import fs from "fs";

const router = express.Router();
const wss = new WebSocket.Server({
  port: 8080,
});



// the "/drugs" with the get method will send all drugs available 
router.get("/drugs", (req, res) => {
  const data = fs.readFileSync("./drugs.json", "utf-8");
  res.status(200).send(JSON.parse(data));
});

// the "/drugs/:id" with the get method will receive the drug's UUID in the request and the send the drug info that matches the UUID back
router.get("/drugs/:id", (req, res) => {
  const stringData = fs.readFileSync("./drugs.json", "utf-8");
  const data = JSON.parse(stringData);
  const drug = data.find((obj: Drug) => obj.UUID === req.params.id);
  res.status(200).send(drug);
});

// the "/drugs" with the post method will receive the the drug information and check if the UUID already exist it will return UUID already exist and send the an error response 422 if it doesn't exist it sends a 201 response and add the drug to the database and then broadcast it to all open socket connections 
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


// the "/drugs/:id" with the delete method will receive the drug's UUID in the request url and delete the drug that matches the sent UUID and then broadcast it to all open socket connections 
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

// the "/drugs/:id" with the put method will receive the drug's UUID in the request url and update the drug that matches the sent UUID if the user changed the UUID to an already existed drug it will send back already exist error and 422 response code and then broadcast it to all open socket connections 
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
