const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();

const items = ["Wake up very early around 5am", "Read your books till it's dawn (8am)", "Go to the gym(8-11am)", "Shower after coming back from the gym(11am-12pm)", "Fix yourself something to eat(12pm)", "Rest for a few hours(1-2:30pm)", "Start your coding exercise till evening (3pm-7pm)", "Get soemthing light for dinner before 8pm (fruits and light protein will do)", "Take sometime out and come home to rest before 12am"];
const workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {

const day = date.getDate();

res.render("list", { listTitle: day, newListItems: items});


  });

  app.post("/", function (req, res) {

const item = req.body.newItem;

if (req.body.list === "Work") {
  workItems.push(item);
res.redirect("/work");
}
else {
  items.push(item);
    res.redirect("/");

}



});

app.get("/work", function (req, res) {
res.render("list", {listTitle: "Work list", newListItems: workItems});
});
app.get("/about", function (req, res) {
res.render("about");
})

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})


app.listen(3000, function () {
  console.log("Server now running on port 3000");
});
