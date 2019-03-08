const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");

app.use(express.static("public"));
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/pieces"),
  //create custom helpers
  helpers: {
    calculation: function(value) {
      return value * 2;
    },
    list: function(value, options) {
      //value = people
      let out = "<ul>";
      for (let i = 0; i < value.length; i++) {
        out = out + "<li>" + options.fn(value[i]) + "</li>";
      }
      return out + "</ul>";
    }
  }
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//routing
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
    name: "Kyle Kinzey",
    style: "home.css",
    age: 26,
    isDisplayName: true,
    isAge: true,
    people: [
      { firstName: "kyle", lastName: "kinzey" },
      { firstName: "kyle1", lastName: "kinzey1" },
      { firstName: "kyle2", lastName: "kinzey2" }
    ],
    test: "<p>welcome to atlanta</p>"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    style: "about.css",
    description: "Student"
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    isList: true,
    style: "dashboard.css",
    author: {
      firstName: "kyle",
      lastName: "kinzey",
      project: {
        name: "express handlebars"
      }
    }
  });
});
app.get("/each/helper", (req, res) => {
  res.render("contact", {
    people: ["kyle", "kyle2", "kyle3", "kyle4"],
    user: { username: "failingcoast", age: 26, phone: 9897842 },
    lists: [
      { items: ["coconut", "strawberry", "pineapple"] },
      { items: ["sweet potato", "cornbread", "chicken"] }
    ]
  });
});

app.get("/look", (req, res) => {
  res.render("lookup", {
    user: { username: "failingcoast", age: 26, phone: 9897842 },
    people: ["kyle", "kyle2", "kyle3", "kyle4"]
  });
});

app.listen(8080, () => {
  console.log("server is listening at port", 8080);
});
