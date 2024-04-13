const express = require("express");
const {
    createNewOrder,
    getAllOrder,
    getOrderBYId,
    changeStatusOrder
} = require("../controllers/Order");

const orderRouter = express.Router();

orderRouter.post('/',createNewOrder)
orderRouter.get('/',getAllOrder)
orderRouter.get('/:orderId',getOrderBYId)
orderRouter.put('/:orderId',changeStatusOrder)

module.exports = orderRouter;
