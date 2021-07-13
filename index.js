import * as vehicles from './data.js';
import { parse } from "querystring";
import http from "http";
import fs from "fs";
http.createServer((req,res) => {
    let url = req.url.split("?");
    let query = parse(url[1]);
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            fs.readFile("home.html", (err, data) => {
                if (err) return console.error(err);
                // res.writeHead(200, {'Content-Type': 'text/html'});
                // res.end(data.toString());
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(JSON.stringify(vehicles.getAll()));
            });
            break;
        case '/about':
            fs.readFile("about.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;
        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(JSON.stringify(vehicles.getItem(query)));
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);