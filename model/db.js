
var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "qqweb",
    port: 3306
});

function connect() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(connection);
        });
    });
}

exports.find = async function(query) {
    try {
        var db = await connect();
        return new Promise((resolve, reject) => {
            db.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                if (result.length < 1) {
                    db.release();
                    resolve(null);
                    return
                }
                const data = JSON.parse(JSON.stringify(result));
                db.release();
                resolve(data);
            });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.insert = async function(table, config) {
    try {
        var db = await connect();
        return new Promise((resolve, reject) => {
            db.query(`insert into ${table} ${config}`, function(err, result, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                db.release();
                resolve("success");
            });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.update = async function(table, where, update) {
    try {
        var db = await connect();
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${table} SET ${update} WHERE ${where}`, function(err, result, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                db.release();
                resolve("success");
            });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.delete = async function(table, where) {
    try {
        var db = await connect();
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${table} WHERE ${where}`, function(err, result, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                db.release();
                resolve("success");
            });
        });
    } catch (err) {
        console.log(err);
    }
};