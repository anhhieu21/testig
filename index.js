require("dotenv").config();
const express = require("express");
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express();
const AppError = require("./utils/appError");
const pus = require("./api/router/router.pu");
const server = require('http').createServer(app);
//parser json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//statuc files
app.use(express.static(__dirname + '/public'));
// Configure template Engine and Main Template File
app.engine('.hbs', engine({ extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.json());
app.use('/upload', express.static('upload/images'));
app.use("/api/controllers", pus);
// const routes = require('./api/router/web');
// app.use('/', routes);

app.all('*', (req, res, next) => {
    throw new AppError(`Requested URL ${req.path} not found!`, 404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});