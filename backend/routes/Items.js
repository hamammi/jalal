const express = require("express");
const {
    createNewItem,getAllItemByOrderId,getItemBYId
} = require("../controllers/Item");

const itemRouter = express.Router();

itemRouter.post('/',createNewItem)
itemRouter.get('/byOrder/:orderID',getAllItemByOrderId)
itemRouter.get('/:ItemId',getItemBYId)

module.exports = itemRouter;
