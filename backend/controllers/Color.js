const pool = require("../models/db");


   
const createNewColor = (req, res) => {
  const [colorName,ColorRGB] = req.body;
  pool
    .query(
      `INSERT INTO Color (colorName,ColorRGB) VALUES ($1,$2);`
      [colorName,ColorRGB]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "color created",
        color: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};



const getColorBYId = (req, res) => {
  const ColorId  = req.params.colorId;
  pool
  .query(`SELECT * FROM Products WHERE ColorID = ${ColorId}`)
  .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get color By Id",
        color: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const getAllColor = (req, res) => {
    pool
    .query(`SELECT * FROM Color`)
    .then((result) => {
        res.status(200).json({
          success: true,
          mesasge: "get all color",
          color: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
          err: err.message,
        });
      });
  };



  

module.exports = {
  createNewColor,
  getAllColor,
  getColorBYId
};
