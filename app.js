const express = require('express');
const app = express();
const path = require('path');

const userModle = require('./module/user');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/create", async (req, res) => {
  let { name, email, imageurl } = req.body;
  let user = await userModle.create({
    name: name,
    email: email,
    imageurl: imageurl,
  });
  res.redirect("/read");
});

app.get("/read", async (req, res) => {
    const alluser = await userModle.find();
    res.render("read.ejs", {users: alluser});
})

app.get("/edit/:userid", async (req, res) => {
    let user = await userModle.findOne({_id : req.params.userid});
    res.render("edit.ejs", { user: user });
})

app.post("/update/:userid", async (req, res) => {
    let { name, email, imageurl } = req.body;
    let user = await userModle.findOneAndUpdate({ _id: req.params.userid }, {name, email, imageurl}, {new: true});
    res.redirect("/read");
})

app.get("/delete/:id", async (req, res) => {
    let user = await userModle.findOneAndDelete({_id : req.params.id});
    res.redirect("/read");
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})



