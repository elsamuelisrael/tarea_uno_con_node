'use strict';

const Puesto = require('../models/puesto.model');

exports.todoslosPuestos = function (req, res) {
    Puesto.todoslosPuestos(function (err, puesto) {

        console.log('controller')

        if (err)
            res.send(err);

        console.log('res', puesto);
        res.send(puesto);

    });
};