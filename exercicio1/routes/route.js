const express = require("express");
const routerApp = express.Router();
const appCalculadora = require("../controller/calculadora");

routerApp.post("/calculadora", appCalculadora.fCalculo);

module.exports = routerApp;