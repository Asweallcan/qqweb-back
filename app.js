var express = require("express");
var app = express();
var Router = require("./router/router.js");
var session = require("express-session");
var cors = require("cors");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
);
io.on("connection", socket => {
    socket.on("sendPrivateMessage", msg => {
        Router.privateMessage(io, msg);
    });
    socket.on("sendGroupMessage", msg => {
        Router.groupMessage(io, msg);
    });
});
app.use("/api", express.static("./public"));
app.use(express.static("./view"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(Router.router);
http.listen(8088);
