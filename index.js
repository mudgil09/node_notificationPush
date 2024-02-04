const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();


app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);


app.post("/subscribe", (req, res) => {
  
  const subscription = req.body;

  
  res.status(201).json({});

  
  const payload = JSON.stringify({ title: "test on notification sending" });

  
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 7700;

app.listen(port, () => console.log(`Server started on port ${port}`));
