require("dotenv").config();
const express = require("express");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.set("view engine", "ejs");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for query parsing
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/myget", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.post("/mypost", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let file = req.files.samplefile;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "users",
  });

  console.log(result);
  const details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
  };
  res.send(details);
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
