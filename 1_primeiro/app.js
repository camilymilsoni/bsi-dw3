//@ Importa as bibliotecas
const express = require("express")
require("dotenv").config();

//@ Configura o servidor
const app = express();
const port = process.env.PORT;

//@ Cria uma rota para o endereço raiz.
app.get("/", (req, res) => {
    res.send("Hello DW3!")
})
app.get("/dw3", (req, res) => {
    res.send("Segunda rota!")
})

//@ Inicia o servidor
app.listen(port, () => {
    console.log("Executando a aplicação:", process.env.APP_NAME);
    console.log("Example app listening on port:", port);
})