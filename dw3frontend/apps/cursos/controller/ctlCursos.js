const { Cookie } = require("express-session");
//const validate = require("../validate/vldAdminUser")
const axios = require("axios");

/*
const ManutUsers = async (req, res) =>
  (async () => {
    if (req.method == "POST") {
      const formData = req.body;
      if (!validate.Validar(formData)) {
        return res.status(400).json({ status: "error", msg: "Dados de entrada validados" });
      };

      const resp = await axios.post(process.env.SERVIDOR_SIADBack + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(error => {
        return res.status(400).json({ status: "error", msg: error.response.data.msg });
      });

      if (!resp.data) {
        return;
      }
      //console.log("[ctlLogin.js] Valor RESP.DATA:", resp.data);


      return res.json({ status: "ok", msg: "Login com sucesso!" });
    } else { //GET      
      var parametros = { title: "SIAD - Manutenção de usuários" }
      res.render("30100admin/30110adminUser/view/vwAdminUser.njk", { parametros });
    }
  })();
  */

const manutCursos = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCursos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error;
      }
      res.render("cursos/view/vwManutCursos.njk", {
        title: "Manutenção de cursos",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }

    res.render("cursos/view/vwManutCursos.njk", {
      title: "Manutenção de cursos",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertCursos = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      return res.render("cursos/view/vwFCrCursos.njk", {
        title: "Cadastro de cursos",
        data: null,
        erro: null,
        userName: null,
      });
    } else {
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertCursos", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000,
        });

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: response.data,
          erro: null,
        });
      }
    }
  })();

const ViewCursos = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getCursoByID",
          {
            cursoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status == "ok") {
          res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Visualização de cursos",
            data: response.data.registro[0],
            disabled: true,
            userName: userName,
          });
        } else {
          console.log("[ctlCursos|ViewCursos] ID de curso não localizado!");
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlCursos|ViewCursos] Curso não localizado!" });
      console.log("[ctlCursos.js|ViewCursos] Try Catch: Erro não identificado", erro);
    }
  })();

const UpdateCurso = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getCursoByID",
          {
            cursoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (response.data.status == "ok") {
          res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Atualização de dados de cursos",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlCursos|UpdateCurso] Dados não localizados!");
        }
      } else {
        const regData = req.body;
        const token = req.session.token;

        try {
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateCursos", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
          });

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlCursos.js|UpdateCurso] Erro ao atualizar dados de cursos no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlCursos.js|UpdateCurso] Curso não localizado!" });
      console.log(
        "[ctlCursos.js|UpdateCurso] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const DeleteCurso = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteCursos", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlCursos.js|DeleteCurso] Erro ao deletar dados de cursos no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: response.data,
        erro: null,
      });
    }
  })();

module.exports = {
  //ManutUsers,
  manutCursos,
  insertCursos,
  ViewCursos,
  UpdateCurso,
  DeleteCurso
};