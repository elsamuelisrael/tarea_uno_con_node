'use strict';

const Empleado = require('../models/empleados.model.js');

exports.contarEmpleados = function (req, res) {
    Empleado.contarEmpleados(function (err, empleado) {

        console.log('controlador contarEmpleados')

        if (err)
            res.send(err);

        console.log('res', empleado);
        res.send(empleado);

    });
};

exports.todoslosEmpleados = function (req, res) {
    Empleado.todoslosEmpleados(function (err, empleado) {

        console.log('controlador todoslosEmpleados')

        if (err)
            res.send(err);

        console.log('res', empleado);
        res.send(empleado);

    });
};

exports.empleadoPorId = function (req, res) {
    Empleado.empleadoPorId(req.params.elid, function (err, empleado) {
        if (err)
            res.send(err);
        res.json(empleado);
    });
};

exports.buscarPorNombre = function (req, res) {
    Empleado.buscarPorNombre(req.params.cadena, function (err, empleado) {
        if (err)
            res.send(err);
        res.json(empleado);
    });
};

exports.buscarPorPuesto = function (req, res) {
    Empleado.buscarPorPuesto(req.params.elid, function (err, empleado) {
        if (err)
            res.send(err);
        res.json(empleado);
    });
};

exports.nuevo = function (req, res) {

    const nuevo_empleado = new Empleado(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Los datos no estan completos' });
    } else {
        Empleado.nuevo(nuevo_empleado, function (err, empleado) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "El empleado se agrego correctamente!", data: empleado });
        });
    }
};

exports.empleadosPaginacion = function (req, res) {
    Empleado.empleadosPaginacion(req.params.cuantos, function (err, empleado) {
        if (err)
            res.send(err);
        res.json(empleado);
    });
}

exports.editar = function (req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {

        res.status(400).send({ error: true, message: 'Los datos no estan completos' });

    } else {

        Empleado.update(req.params.elid, new Empleado(req.body), function (err, empleado) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'El empleado se actualizo correctamente' });
        });

    }

};

exports.borrar = function (req, res) {

    //console.log(Object.keys(req.body).length)

    Empleado.eliminar(req.params.elid, function (err) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'El empleado se elimino correctamente' });
    });
    
};