const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var apiRoutes = require("./routes/api.routes");
app.use(express.static(__dirname + '/public'));

app.use("/api", apiRoutes);

app.use(function (req, res, next) {
    res.status(404);
    res.json({
        status: '404',
        message: 'Not Found'
    })
});


app.listen(port, () => {
    console.log('app is started at 3000');
});