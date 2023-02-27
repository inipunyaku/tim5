var express = require("express");
var router = express.Router();
const { db } = require("../dbcon/dbcon");

/* GET participants listling*/
router.get("/", function(req, res, next) {
    const querySql = "SELECT * FROM participants";
    db.query(querySql, (err, rows, field) => {
        //error handling
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

/*POST participants listling*/
router.post("/", function(req, res, next) {
    const { contest_id, name, phone, birth, gender, address, mail_address } =
    req.body;

    const querySql =
        "INSERT INTO `participants` (`contest_id`, `name`, `phone`, `birth`, `gender`, `address`, `mail_address`, `id`) VALUES ('" +
        contest_id +
        "','" +
        name +
        "', '" +
        phone +
        "', '" +
        birth +
        "', '" +
        gender +
        "', '" +
        address +
        "', '" +
        mail_address +
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


/* DELETE participants listling*/
router.delete("/:id", function(req, res, next) {
    const id = req.params.id;
    const querySearch =
        "SELECT * FROM `participants` WHERE `id` = '" + id + "'";
    const queryDelete =
        "DELETE FROM `participants` WHERE `id` = '" + id + "'";

    // jalankan query untuk melakukan pencarian data
    db.query(querySearch, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: "Ada kesalahan", error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length > 0) {
            console.log(rows.length);
            // jalankan query delete
            db.query(queryDelete, (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: "Ada kesalahan", error: err });
                }

                // jika delete berhasil
                res.status(200).json({
                    id: id,
                    status: "Deleted",
                    message: "Berhasi Hapus data",
                    methode: req.method,
                    url: req.url,
                });
            });
        } else {
            return res.status(404).json({
                message: "Data tidak ditemukan!",
                id: id,
                methode: req.method,
                url: req.url,
            });
        }
    });
});

router.put("/:id", function(req, res) {
    const id = req.params.id;
    const { contest_id, name, phone, birth, gender, address, mail_address } = req.body;


    const querySql =
        "UPDATE `participants` SET `contest_id` = '" +
        contest_id +
        "', `name` = '" +
        name +
        "', `phone` = '" +
        phone +
        "', `birth` = '" +
        birth +
        "', `gender` = '" +
        gender +
        "', `address` = '" +
        address +
        "', `mail_address` = '" +
        mail_address +
        "' WHERE `id` = '" +
        id +
        "';";
    const querySearch =
        "SELECT * FROM `participants` WHERE `id` = '" + id + "'";

    db.query(querySearch, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: "Ada kesalahan", error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query update
            db.query(querySql, (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: "Ada kesalahan", error: err });
                }

                // jika update berhasil
                res.status(200).json({
                    id: id,
                    status: "Edited",
                    message: "Data berhasil diedit",
                    methode: req.method,
                    url: req.url,
                });
            });
        } else {
            return res.status(404).json({
                id: id,
                message: "Data tidak ditemukan!",
                methode: req.method,
                url: req.url,
            });
        }
    });
});
module.exports = router;