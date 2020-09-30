const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/listsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const listSchema = {
name: String
};

const List =  mongoose.model("list", listSchema );

const list = new List({
  name: "New to-do list"
});

// list.save();
List.find({name:"New to-do list"});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

let items = ["Welcome to your to-do list", "Click the ➕ button to add new items", "Check the checkbox to remove to-dos"];

app.get('/', (req, res) => {
  let today = new Date();
  let options = {weekday: 'long'};
  let day = today.toLocaleDateString("en-US", options);
  res.render('index', {dayOfWeek: day, newListItems: items})
});

app.post('/',(req, res)=> {
  let item = req.body.newItem;
  items.push(item);
  res.redirect('/');
});


app.listen(port, ()=>console.log(`Server is live at port ${port}`));
