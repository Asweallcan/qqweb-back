var express = require("express");
var db = require("../model/db.js");
var crypto = require("crypto");
var router = express.Router();
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");

function encode(str) {
    return crypto
        .createHash("md5")
        .update(str)
        .digest("base64");
}

router.post("/api/doregist", async function(req, res) {
    try {
        var data = req.body;
        console.log(data.qq);
        var password = encode(data.password);
        var user = await db.find(`SELECT * FROM user where qq="${data.qq}"`) || [];
        console.log(user);
        if (user.length > 0) {
            res.send("-1");
            return;
        }
        await db.insert(`user`, `(qq,password) VALUES ("${data.qq}","${password}")`);
        await db.insert(`user_detail`, `(question,answer,nickname,sex,place,signature,qq,age) VALUES ("${data.question}","${data.answer}","${data.nickname}","${data.sex}","${data.place}","${data.signature}","${data.qq}","${data.age}")`);
        res.send("1");
    } catch (err) {
        res.send("-2");
        console.log(err);
    }
});

router.get("/api/getques", async function(req, res) {
    try {
        const qq = req.query.qq;
        var user = await db.find(`SELECT question FROM user_detail WHERE qq="${qq}"`) || [];
        console.log(user);
        if (user.length < 1) {
            res.send("-1");
            return;
        }
        res.send(user[0].question);
    } catch (err) {
        console.log(err);
        res.send("-2");
    }
});

router.post("/api/setnewpwd", async function(req, res) {
    try {
        var data = req.body;
        var user = await db.find(`SELECT answer FROM user_detail WHERE qq="${data.qq}"`);
        if (user[0].answer !== data.answer) {
            res.send("-1");
            return;
        } else {
            var newpwd = encode(data.newpwd);
            await db.update("user", `qq="${data.qq}"`, `password="${newpwd}"`);
            res.send("1");
        }
    } catch (err) {
        console.log(err);
        res.send("-2");
    }
});

router.post("/api/dologin", async function(req, res) {
    try {
        var data = req.body;
        var user = await db.find(`SELECT * FROM user WHERE qq="${data.qq}"`) || [];
        if (user.length < 1) {
            return res.send("-1");
        }
        if (user[0].password != encode(data.password)) {
            return res.send("-2");
        }
        var userinfo = await db.find(`SELECT * FROM user_detail WHERE qq=${data.qq}`);
        req.session.user = userinfo[0];
        req.session.login = true;
        res.send(userinfo[0]);
    } catch (err) {
        console.log(err);
    }
});

router.get("/api/getfriends", async function(req, res) {
    try {
        var friends = await db.find(`SELECT qq,avatar,nickname,signature FROM user_detail`);
        res.send(friends);
    } catch (err) {
        console.log(err);
    }
});

router.get("/api/getprofile", async function(req, res) {
    try {
        var user = await db.find(`SELECT * FROM user_detail WHERE qq="${req.query.qq}"`);
        user = user || [];
        res.send(user[0]);
    } catch (err) {
        console.log(err);
    }
});

router.post("/api/dologout", async function(req, res) {
    req.session.user = "";
    req.session.login = false;
    res.send("1");
});

router.post("/api/dosetting", async function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/temp");
    form.parse(req, function(err, fields, files) {
        const userinfo = fields;
        if (files.avatar.name) {
            var avataroldpath = files.avatar.path;
            var avatarextname = path.extname(files.avatar.name);
            var avatarnewpath = path.normalize(__dirname + "/../public/avatar/" + req.session.user.qq + avatarextname);
            fs.rename(avataroldpath, avatarnewpath, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        if (files.background.name) {
            var backgroundoldpath = files.background.path;
            var backgroundextname = path.extname(files.background.name);
            var backgroundnewpath = path.normalize(__dirname + "/../public/background/" + req.session.user.qq + backgroundextname);
            fs.rename(backgroundoldpath, backgroundnewpath, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        var avatar = avatarextname ? req.session.user.qq + avatarextname : req.session.user.avatar;
        var background = backgroundextname ? req.session.user.qq + backgroundextname : req.session.user.background;
        db
            .update("user_detail", `qq="${req.session.user.qq}"`, `nickname="${userinfo.nickname}",signature="${userinfo.signature}",age="${userinfo.age}",place="${userinfo.place}",question="${userinfo.question}",answer="${userinfo.answer}",avatar="${avatar}",background="${background}"`)
            .then(() => {
                res.redirect("/#/message");
            })
            .catch(err => {
                console.log(err);
            });
    });
});

router.get("/api/getgroupmessage", async function(req, res) {
    let messages = await db.find(`SELECT message,time,from_user,avatar,nickname FROM message_group,user_detail WHERE qq=from_user ORDER BY time`);
    res.send(messages);
});

router.get("/api/getprivatemessage", async function(req, res) {
    let qq1 = req.query.qq_1;
    let qq2 = req.query.qq_2;
    let messages = await db.find(`SELECT from_user,message,time,avatar as from_user_avatar FROM message_user,user_detail WHERE (from_user="${qq1}" AND to_user="${qq2}" OR from_user="${qq2}" AND to_user="${qq1}") AND from_user=qq ORDER BY time`);
    res.send(messages);
});

router.get("/api/updatemessage", async function(req, res) {
    let to_user = req.query.to_user;
    let from_user = req.query.from_user;
    await db.update("message_user", `from_user="${from_user}" and to_user="${to_user}"`, "isread=1");
    res.send("1");
});

router.get("/api/getunread", async function(req, res) {
    let qq = req.query.qq;
    let messages = await db.find(`SELECT message,isread,from_user,nickname as from_user_nickname,avatar as from_user_avatar FROM message_user,user_detail WHERE to_user="${qq}" AND isread=0 AND from_user=qq`);
    res.send(messages);
});

exports.groupMessage = async function(io, msg) {
    await db.insert("message_group", `(from_user,message,time) VALUES ("${msg.from_user}","${msg.message}",${msg.time})`);
    io.emit("groupMessage", msg);
};

exports.privateMessage = async function(io, msg) {
    await db.insert("message_user", `(to_user,from_user,message,time,isread) VALUES ("${msg.to_user}","${msg.from_user}","${msg.message}",${msg.time},0)`);
    io.emit("privateMessage", msg);
};

exports.router = router;