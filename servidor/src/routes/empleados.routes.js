const express = require('express')
const router = express.Router()
const empleadoController = require('../controllers/empleados.controller');

router.get('/', empleadoController.todoslosEmpleados);
router.get('/:elid', empleadoController.empleadoPorId);
router.get('/buscarpornombre/:cadena', empleadoController.buscarPorNombre);
router.get('/buscarporpuesto/:elid', empleadoController.buscarPorPuesto);
router.get('/cuentaempleados/:str', empleadoController.contarEmpleados);
router.get('/paginacion/:cuantos', empleadoController.empleadosPaginacion);

router.put('/:elid', empleadoController.editar);
router.delete('/:elid', empleadoController.borrar);

router.post('/', empleadoController.nuevo);


module.exports = router