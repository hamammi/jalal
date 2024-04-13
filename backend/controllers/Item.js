const pool = require("../models/db");

const createNewItem = (req, res) => {
  const {quantity, notes, orderId, productId, color} = req.body;
  pool
    .query(
      `INSERT INTO "items" (Quantity, Description, OrderID, ProductID, Color) VALUES ($1,$2,$3,$4,$5);`,
      [quantity, notes, orderId, productId, color]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "Item created",
        Item: result.rows,
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

const getAllItemByOrderId = (req, res) => {
  const orderID  = req.params.orderID;
  pool
  .query(`SELECT "items".*, "products".* FROM "public"."items" JOIN "public"."products" ON "items"."productid" = "products"."productid" WHERE "items"."orderid" = ${orderID} LIMIT 100;`)
  .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get all Item by order id",
        Productss: result.rows,
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
const getItemBYId = (req, res) => {
    const ItemId  = req.params.ItemId;
    pool
    .query(`SELECT * FROM Item WHERE ItemID = ${ItemId}`)
    .then((result) => {
        res.status(200).json({
          success: true,
          mesasge: "get Item by id",
          Productss: result.rows,
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
    createNewItem,
    getAllItemByOrderId,
    getItemBYId
};
