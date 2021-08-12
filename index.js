'use strict'
import express from 'express';
import exphbs from 'express-handlebars';
//import * as vehicles from './data.js';
import { Car } from './models/data-model.js';
import cors from 'cors';
//import bodyParser from 'body-parser';


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());
app.use('/api', cors()); //CORS header for API
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/api/cars', (req,res,next) => {
    Car.find((err,results) =>{
        if (err || !results){
            res.status(404).json({"Message":"Not Found"});
        }else{
            res.json(results);
        }
    });
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.sendFile('/CodeLibrary/Code Projects/Seattle Central/it122/public/about/about.html');
    //TODO: Change about to route like other paths to hopefully remedy inconcistency
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

app.get('/api/cars/:model', (req,res,next) =>{
    let model = req.params.model;
    console.log(model);
    Car.findOne({model: model}, (err, result) => {
        if (err || !result){
            res.status(404).json({"Message": "Not Found"});
        }else{
            res.json(result);
        }
    });
});

app.post('/api/add', (req,res,next) => {
    console.log(req.body);
    //New doc else update existing doc
    if (!req.body._id) {
        let car = new Car({model:req.body.model, type:req.body.type, year:req.body.year, make:req.body.make, color:req.body.color, capacity:req.body.capacity, horsepower:req.body.horsepower});
        car.save((err,newCar) => {
            if (err) return next(err);
            console.log(newCar);
            res.json({updated: 0, _id: newCar._id});
        });
    }else{
        Car.updateOne({ _id: req.body._id}, {model:req.body.model, type:req.body.type, year:req.body.year, make:req.body.make, color:req.body.color, capacity:req.body.capacity, horsepower:req.body.horsepower}, (err,result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/delete/:id', (req,res,next) => {
    Car.deleteOne({"_id":req.params.id}, (err,result) => {
        if (err) return next(err);
        console.log(result);
        res.json({"deleted": result});
    });
});

app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'), () => {
    console.log('Express started');
});
