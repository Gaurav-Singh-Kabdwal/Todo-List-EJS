const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const items = [];
const workItems = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {

    res.render("list", { ejsTitle: date.getDate(), ejsItemList: items });

});

app.get("/work", (req, res) => {
    res.render("list", { ejsTitle: "Work", ejsItemList: workItems });
});

app.post("/", (req, res) => {

    const item = req.body.item;

    if (req.body.button === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }

});




app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000!");
});
