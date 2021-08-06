'use strict'
import express from 'express';
import exphbs from 'express-handlebars';
//import * as vehicles from './data.js';
import { Car } from './models/data-model.js';


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());
app.engine('handlebars', exphbs({defaultLayout: "main.handlebars"})); //Set up handlebars
app.set("view engine", "handlebars");

app.get('/', (req,res,next) => {
    Car.find({}).lean()
        .then((cars) => {
            console.log(cars);
            res.render('home', {cars});
        })
    .catch(err => next(err));
    // res.type('text/html');
    // res.render('home', {vehicles: vehicles.getAll()});
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.sendFile('/CodeLibrary/Code Projects/Seattle Central/it122/public/about/about.html');
    //Why does this have to be an absolute path?
    //I'd assume I could store my root path as a variable somehow so that I don't have to customize it for each machine.
});

app.get('/detail', (req,res,next) => {
    Car.findOne({"model": req.query.model}).lean()
        .then((cars) => {
            console.log(cars);
            res.render("details", {cars});
        })
    .catch(err => next(err));
    
    // let carResult = vehicles.getItem(req.query.model);
    // res.render("details", { model: req.query.model, carResult });
});

app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'), () => {
    console.log('Express started');
});
