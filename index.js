require("dotenv").config();
const express = require("express");
const fileupload = require("express-fileupload");

const app = express();

app.set("view engine", "ejs");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for query parsing
app.use(fileupload({
  useTempFiles: true,
  tempFileDir:"/tmp"
}));

app.get("/myget", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.post("/mypost", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.send(req.body);
});

app.get("/mygetform", (req, res) => {
  res.render("getForm");
});
app.get("/mypostform", (req, res) => {
  res.render("postForm");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running at port: ${process.env.PORT}`)
);
