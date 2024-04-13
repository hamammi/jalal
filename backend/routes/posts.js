const express = require("express");
const authentication = require("../middleware/authentication");
const {
    getAllProductsByCategories,
  createNewProduct,
  updateProductById,
  hiddenProductById,
} = require("../controllers/Products");

const productsRouter = express.Router();

productsRouter.get('/categories/:CategorieId',getAllProductsByCategories)
productsRouter.post('/newProduct',createNewProduct)
productsRouter.put('/:ProductId',updateProductById)
productsRouter.put("/hidden/:productId", hiddenProductById)

module.exports = productsRouter;
