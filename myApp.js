require("dotenv").config();
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
console.log("Hello World");

app.get("/", (req, res) => {
  res.send("Hello Express");
});
//show html on local host
absolutePath = __dirname + "/views/index.html";
app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});
cssPath = __dirname + "/public";
app.use("/public", express.static(cssPath));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});
app.get("/name", (req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/name", (req, res) => {
  const { first: firstName, last: lastName } = req.body;
  res.json({ name: `${firstName} ${lastName}` });
});
module.exports = app;
