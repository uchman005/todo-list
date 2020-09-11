const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
let items = [];
app.get('/', (req, res) => {
  let today = new Date();
  let options = {weekday: 'long'};
  let day = today.toLocaleDateString("en-US", options);
  res.render('index', {dayOfWeek: day, newListItems: items})
});


app.post('/',(req, res)=> {
  let item = req.body.newItem;
  items.push(item);
  console.log(items);
  res.redirect('/');
});



app.listen(port, ()=>console.log(`Server is live at port ${port}`));
