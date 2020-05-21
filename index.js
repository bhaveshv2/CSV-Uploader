const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');


//Middleware to parse the form data
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));             //the first '/uploads' is route and the 2nd one is used to join the folder with current directory where the root or this file is existed.

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//use express layouts
app.use(expressLayouts);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
