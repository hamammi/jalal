const express = require("express");
const authentication=require('../middleware/authentication')
const {
    createNewColor,getAllColor,getColorBYId
} = require("../controllers/Color");

const colorRouter = express.Router();

colorRouter.post('/',authentication,createNewColor)
colorRouter.get('/',getAllColor)
colorRouter.get('/:colorId',getColorBYId)

module.exports = colorRouter;
