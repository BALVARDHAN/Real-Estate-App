const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
const RentDB = require("./RentDB.js");
const UserDb = require("./UserDB.js");
const UserDB = require("./UserDB.js");

mongoose.connect(
  "mongodb+srv://balvardhanparihar9:RaGV7bJrqAitEBH2@cluster0.q8bunjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "conntection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("THIS IS SERVER OF LALA RENTALS");
});

app.get("/rent", async (req, res) => {
  const result = await RentDB.find({});
  res.send(JSON.stringify(result));
});

app.post("/signup", async (req, res) => {
  const found = await UserDb.findOne({ email: req.body.email });
  if (found) {
    res.send(JSON.stringify({ status: "fail" }));
  } else {
    const newUser = new UserDb(req.body);
    await newUser.save();
    res.send(JSON.stringify({ status: "ok" }));
  }
});

app.post("/login", async (req, res) => {
  const result = await UserDb.findOne({ email: req.body.email });
  if (result) {
    if (req.body.password === result.password) {
      res.send(
        JSON.stringify({
          status: "ok",
          name: result.firstName + " " + result.lastName,
          email: result.email,
          wishlist: result.wishlist,
        })
      );
    } else {
      res.send(JSON.stringify({ status: "fail" }));
    }
  } else {
    res.send(JSON.stringify({ status: "invalid" }));
  }
});

app.post("/new-listing-image", upload.single("image"), async (req, res) => {
  res.json({ message: "File Uploaded Successfully" });
});

app.post("/new-listing-final", async (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString();
  req.body["postedOn"] = date;
  const data = new RentDB(req.body);
  data.save();
  res.json({ message: "Successfull" });
});

app.post("/show-property", async (req, res) => {
  const property = await RentDB.findOne({ _id: req.body.propertyId });
  res.send(JSON.stringify(property));
});

app.post("/wishlist", async (req, res) => {
  const { email, propertyId, isWishlisted } = req.body;
  const user = await UserDB.findOne({ email: email });
  if (isWishlisted) {
    user["wishlist"].push(propertyId);
  } else {
    const idx = user["wishlist"].indexOf(propertyId);
    if (idx > -1) user["wishlist"].splice(idx, 1);
  }
  await UserDB.updateOne(
    { email: email },
    { $set: { wishlist: [...user["wishlist"]] } }
  );
  res.send(
    JSON.stringify({
      wishlist: user.wishlist,
    })
  );
});

app.post("/property-delete", async (req, res) => {
  await RentDB.deleteOne({ _id: req.body.propertyId });
  res.send(JSON.stringify({ status: "ok" }));
});
//RaGV7bJrqAitEBH2
app.listen(4000, () => {
  console.log("Server is listening to 4000!!!");
});
