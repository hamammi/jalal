const express = require("express");
const {
    register,
    login,
} = require("../controllers/Admin");

const AdminRouter = express.Router();

AdminRouter.post('/register',register);
AdminRouter.post('/login',login);

module.exports = AdminRouter;
