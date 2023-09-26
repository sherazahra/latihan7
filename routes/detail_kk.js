const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");

const connect = require('../config/db.js');

router.get("/", (req, res) => {
  connect.query(
    "SELECT * FROM detail_kk INNER JOIN kartu_keluarga ON detail_kk.no_kk = kartu_keluarga.no_kk INNER JOIN ktp ON detail_kk.nik = ktp.nik",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Detail KK",
          payload: rows,
        });
      }
    }
  );
});

router.post(
  "/store",
  [
    body("no_kk").notEmpty(),
    body("nik").notEmpty(),
    body("status_hubungan_dalam_keluarga").notEmpty(),
    body("ayah").notEmpty(),
    body("ibu").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let data = {
      no_kk: req.body.no_kk,
      nik: req.body.nik,
      status_hubungan_dalam_keluarga: req.body.status_hubungan_dalam_keluarga,
      ayah: req.body.ayah,
      ibu: req.body.ibu,
    };
    connect.query("INSERT INTO detail_kk SET ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Berhasil Ditambahkan",
          payload: data,
        });
      }
    });
  }
);

router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    `SELECT * FROM detail_kk INNER JOIN kartu_keluarga ON detail_kk.no_kk = kartu_keluarga.no_kk 
    INNER JOIN ktp ON detail_kk.nik = ktp.nik WHERE id_detail='${id}'`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Detail KK",
          payload: rows,
        });
      }
    }
  );
});

router.patch("/update/(:id)", [body("status_hubungan_dalam_keluarga").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }
  let id = req.params.id;
  let data = {
    status_hubungan_dalam_keluarga: req.body.status_hubungan_dalam_keluarga
  };
  connect.query(
    `UPDATE detail_kk SET ? WHERE id_detail='${id}'`,
    data,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data detail KK berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});

router.delete("/delete/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    `DELETE FROM detail_kk WHERE id_detail='${id}'`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data detail KK berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;