require("dotenv").config();
var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
var app = express();
const product = require("./api/product");
let cors = require("cors");
app.use(cors());

app.use(express.json({ extended: false }));

app.use("/api/product", product);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  next();
});

mongoose
  .connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => {
    console.log("DB NOT CONNECTED");
  });

const StudentSchema = new mongoose.Schema({
  student_name: { type: String, default: "unknown" },
  class: { type: String },
  contact: { type: Number },
  address: { type: String },
  school_name: { type: String },
});

const TeacherSchema = new mongoose.Schema({
  teacher_name: { type: String, default: "unknown" },
  highest_qualification: { type: String },
  contact: { type: Number },
  city: { type: String },
  expertise_subjects: { type: String },
});

const StudentModel = mongoose.model("Students", StudentSchema);
const TeacherModel = mongoose.model("Teachers", TeacherSchema);
const RatingModel = mongoose.model("Review", {
  star1: { type: Number },
  star2: { type: Number },
  star3: { type: Number },
  star4: { type: Number },
  name1: { type: String },
  name2: { type: String },
  name3: { type: String },
  name4: { type: String },
  description1: { type: String },
  description2: { type: String },
  description3: { type: String },
  description4: { type: String },
});

RatingModel.find({}, function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    reviewData = docs[0];
    app.get("/reviewdata", function (req, res) {
      res.json(reviewData);
    });
  }
});

StudentModel.find({}, function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    app.get("/studentenquiry", function (req, res) {
      res.json(docs);
    });
  }
});

TeacherModel.find({}, function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    app.get("/teacherenquiry", function (req, res) {
      res.json(docs);
    });
  }
});

app.post("/register/student", function (req, res) {
  // refresh
  // res.send("POST REQUEST SUCCESSFUL");
  // console.log(req.body);
  // res.setHeader("Content-Type", "application/json");
  // res.send(JSON.stringify({ hff: "value" }));
  res.json({ status: "success", ...req.body });
  storeDataStudent(req);
});

app.post("/register/teacher", function (req, res) {
  res.json({ status: "success", ...req.body });
  storeDataTeacher(req);
});

async function storeDataStudent(req) {
  await new StudentModel({
    student_name: req.body.name,
    class: req.body.class,
    contact: req.body.contact,
    address: req.body.address,
    school_name: req.body.school,
  }).save();
}

async function storeDataTeacher(req) {
  await new TeacherModel({
    teacher_name: req.body.name,
    highest_qualification: req.body.qualification,
    contact: req.body.contact,
    city: req.body.city,
    expertise_subjects: req.body.subjects,
  }).save();
}

app.listen(PORT, () => {
  console.log("server started");
});
