var express = require('express');
var router = express.Router();
var cursosApp = require("../apps/cursos/controller/ctlCursos");

// Função para evitar que usuários não autenticados acessem o sistema
function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login");
    }
    next();
}

/* GET métodos */
router.get('/ManutCursos', authenticationMiddleware, cursosApp.manutCursos);
router.get('/InsertCursos', authenticationMiddleware, cursosApp.insertCursos);
router.get('/ViewCursos/:id', authenticationMiddleware, cursosApp.ViewCursos);
router.get('/UpdateCursos/:id', authenticationMiddleware, cursosApp.UpdateCurso);

/* POST métodos */
router.post('/InsertCursos', authenticationMiddleware, cursosApp.insertCursos);
router.post('/UpdateCursos', authenticationMiddleware, cursosApp.UpdateCurso);
router.post('/DeleteCursos', authenticationMiddleware, cursosApp.DeleteCurso);

module.exports = router;