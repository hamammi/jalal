const pool = require("../models/db");


   
const createNewOrder = (req, res) => {
  const {phoneNumber,fullName} = req.body;
  const Status = `لم يتم تأكيد الطلب`
  pool
    .query(
      `INSERT INTO "orders" (PhoneNumber,FullName,Status) VALUES ($1,$2,$3) RETURNING * ;`,
      [phoneNumber,fullName,Status]
    )
    .then((result) => {
        res.status(200).json({
        success: true,
        mesasge: "order created",
        order: result.rows,
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

const getAllOrder = (req, res) => {
  pool
  .query(`SELECT * FROM Order Status = new`)
  .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get all orders",
        orders: result.rows,
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
const getOrderBYId = (req, res) => {
    const id = req.params.orderId;
    pool
    .query(`SELECT * FROM "Order" WHERE id = ${id}`)
    .then((result) => {
        res.status(200).json({
          success: true,
          mesasge: "get order by id",
          order: result.rows,
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
const changeStatusOrder = (req, res) => {
  const id = req.params.orderId;
  const query = `UPDATE Order SET Status = complete WHERE OrderID = $1 RETURNING *;`;

  pool
    .query(query, [id])
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: "Product updated to inactive",
          product: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
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
    createNewOrder,
    getAllOrder,
    getOrderBYId,
    changeStatusOrder
};
