//const express = require('express');
import express from "express";
import ejs from "ejs";
//const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));

let items = ["Welcome to your to-do list", "Click the ➕ button to add new items", "Check the checkbox to remove to-dos"];

let dynamicItems = ["Custom to-do list"];

let day = "Today";

app.get('/', (req, res) => {
    // let today = new Date();
    // let options = {weekday: 'long'};
    // let day = today.toLocaleDateString("en-US", options);
    res.render('index', { listTitle: day, newListItems: items });
});

app.post('/', (req, res) => {
    let item = req.body.newItem;

    if (req.body.list == "Today") {
        items.push(item);
        res.redirect('/');
    } else {
        dynamicItems.push(item);
        res.redirect('/work')
    }

});

app.get("/:work", (req, res) => {
    res.render('index', { listTitle: req.params.work, newListItems: dynamicItems })
});



app.listen(3000, () => console.log(`Server is live at port 3000`));


/*const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/listsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const listSchema = {
name: String
};

const List =  mongoose.model("list", listSchema );

const list1 = new List({
  name: "New to-do list"
});

const list2 = new List({
  name: "Click to add to-do"
});

const list3 = new List({
  name: "Check to cancel to-do"
})

List.insertMany([list1,list2,list3], (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Successfully added items to database");
  }
})
List.find(function(err, lists){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    lists.forEach((list)=>console.log(list.name))
  }
});
*/