const express = require ("express");

const path = require("path");
const adminControllers = require("../controllers/adminControllers");
const usuarioLogueadoMiddleware = require('../middlewares/usuarioLogueadoMiddleware');
const validarFallaMiddleware = require('../middlewares/validarFallaMiddleware');


const router = express.Router();


// *********************** Crear una foto **************************
router.get("/creacionFoto", usuarioLogueadoMiddleware, adminControllers.creacionFalla);
router.post("/creacionFoto", usuarioLogueadoMiddleware , validarFallaMiddleware,  adminControllers.procesoCreacion);

// ************************** Editar una foto **************************
//Renderiza la pagina de editar foto
router.get ('/edicionFoto/:id', usuarioLogueadoMiddleware,  adminControllers.edicionFalla);
//Procesa la edicion de la foto
router.put('/edicionFoto/:id',  usuarioLogueadoMiddleware,  adminControllers.procesoEdicion);

// ************************** Eliminar una foto **************************
//Elimina la foto
router.delete('/delete/:id', usuarioLogueadoMiddleware,  adminControllers.delete); //<-----  solo el administrador ingresa

// *********************** Mostrar la lista de fotos **********************
router.get("/verlista",usuarioLogueadoMiddleware,adminControllers.verlista);











module.exports = router;