const mysql = require("mysql");
const db = mysql.createPool({
    host: "5.181.216.42",
    user: "u1084987_kelompok_5",
    password: "8gwfyqbwgb",
    database: "u1084987_kelompok_5",
});

exports.db = db;