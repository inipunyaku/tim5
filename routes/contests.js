var express = require("express");
var router = express.Router();
const { db } = require("../dbcon/dbcon");

/* GET contests listing. */
router.get("/", function(req, res, next) {
    const querySql = "SELECT * FROM contests";

    db.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        res.json({
            status: "OK",
            data: rows,
        });
    });
});

router.post("/", function(req, res, next) {
    const { name, registration_fee, image, max_participants, description } =
    req.body;

    const querySql =
        "INSERT INTO `contests` (`name`, `restration_fee`, `image`, `max_participant`, `description`, `id`) VALUES ('" +
        name +
        "', '" +
        registration_fee +
        "', '" +
        image +
        "', '" +
        max_participants +
        "', '" +
        description +
        "', NULL);";

    db.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({
                message: "Ada kesalahan",
                error: err,
            });
        }
        // jika request berhasil
        res.json({
            status: "created",
            message: "Data berhasil disimpan",
            data: req.body,
        });
    });
});

module.exports = router;