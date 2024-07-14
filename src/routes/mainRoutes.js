const express = require ("express");
const router = express.Router();

const mainControllers = require ("../controllers/mainController.js");
const adminControllers = require("../controllers/adminControllers");

const {  body } = require('express-validator');// para validaciones <---- validacionRegistro

const validarRegUsuario = [
	body('nombre').notEmpty().withMessage('Escribe un nombre'),
	body('email').notEmpty().withMessage('Tienes que escribir tu mail').bail()
			   .isEmail().withMessage('Escribe un formato de correo válido'),     
	body('clave').notEmpty().withMessage('Escribe tu clave'),
	body('confirmarClave').notEmpty().withMessage('Confirma tu clave')	
	
]



router.get("/", mainControllers.home);
//router.get("/api/fotos", mainControllers.fallas);


router.get("/verlogin", mainControllers.verlogin);
router.post("/login", mainControllers.login);

router.get("/verFormulario", mainControllers.verFormulario);
router.post("/regUsuario", validarRegUsuario,  mainControllers.crearUsuario);

router.get("/olvidoClave", mainControllers.olvidoClave);
router.post("/enviarMail", mainControllers.enviarMail);

// terminar sesion
router.get ('/logout', mainControllers.logout)

module.exports = router;