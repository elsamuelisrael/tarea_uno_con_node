const express = require('express')
const router = express.Router()
const puestoController = require('../controllers/puesto.controller');

router.get('/', puestoController.todoslosPuestos);

module.exports = router