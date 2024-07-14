const path = require('path');
const { body } = require('express-validator');

	const validarFallaMiddleware = [
	body('marca').notEmpty().withMessage('Escribe una marca'),
	body('modelo').notEmpty().withMessage('Escribe un modelo'),
	body('falla').notEmpty().withMessage('Describe la falla'),
	body('solucion').notEmpty().withMessage('Especifica la solución'),
	body('fecha').notEmpty().withMessage('Confirma la fecha')
	
]
module.exports = validarFallaMiddleware;