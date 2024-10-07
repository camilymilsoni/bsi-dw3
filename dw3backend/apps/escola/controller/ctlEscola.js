const mdlEscola = require("../model/mdlEscola");

const getAllEscolas = (req, res) =>
  (async () => {
    let registro = await mdlEscola.GetAllEscolas();
    res.json({ status: "ok", "registro": registro });
  })();

const getEscolaByID = (req, res) =>
  (async () => {
    const escolaID = parseInt(req.body.escolaid);
    let registro = await mdlEscola.GetEscolaByID(escolaID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertEscola = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const escolaREG = request.body;    
    let { msg, linhasAfetadas } = await mdlEscola.InsertEscola(escolaREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateEscola = (request, res) =>
  (async () => {
    const escolaREG = request.body;
    let  { msg, linhasAfetadas } = await mdlEscola.UpdateEscola(escolaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteEscola = (request, res) =>
  (async () => {
    const escolaREG = request.body;
    let { msg, linhasAfetadas } = await mdlEscola.DeleteEscola(escolaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllEscolas,
  getEscolaByID,
  insertEscola,
  updateEscola,
  DeleteEscola
};