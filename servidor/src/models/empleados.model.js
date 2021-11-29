'user strict';
var dbConn = require('../../config/db.config');

var Empleado = function(empleado){
    this.nombre         = empleado.nombre;
    this.ap             = empleado.ap;
    this.am             = empleado.am;
    this.email          = empleado.email;
    this.puesto         = empleado.puesto;
    this.creado         = new Date();
    this.actualizado    = new Date();
};

Empleado.contarEmpleados = function (result) {

    var laq = `
        SELECT
            count(E.id) as cuantos
        FROM empleados E
    `;

    dbConn.query(laq, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('empleados : ', res);  
            result(null, res);
        }
    });   
};

Empleado.todoslosEmpleados = function (result) {
    
    var laq = `
        SELECT E.*,
            (SELECT nombre FROM puestos WHERE id = E.puesto) as nombrepuesto 
        FROM empleados E WHERE status = 1 ORDER BY nombre
    `;

    dbConn.query(laq, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('empleados : ', res);  
            result(null, res);
        }
    });   
};

Empleado.empleadoPorId = function (elid, result) {
    dbConn.query("SELECT * FROM empleados WHERE id = ? AND status = 1", elid, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Empleado.buscarPorNombre = function (cadena, result) {

    var laq = `
        SELECT E.*, 
            (SELECT nombre FROM puestos WHERE id = E.puesto) as nombrepuesto 
        FROM empleados E 
        WHERE (nombre LIKE '%${cadena}%' OR ap LIKE '%${cadena}%' OR am LIKE '%${cadena}%') AND status = 1
        ORDER BY nombre
    `;

    dbConn.query(laq, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Empleado.buscarPorPuesto = function (elid, result) {

    var laq = `
        SELECT E.*, 
            (SELECT nombre FROM puestos WHERE id = E.puesto) as nombrepuesto 
        FROM empleados E 
        WHERE E.puesto = ? AND status = 1
        ORDER BY nombre
    `;

    dbConn.query(laq, elid, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Empleado.nuevo = function (nuevoEmpleado, result) {

    console.log(nuevoEmpleado)

    dbConn.query("INSERT INTO empleados set ?", nuevoEmpleado, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });

};

Empleado.empleadosPaginacion = function (cuantos, result) {

    var laq = `
        SELECT 
	        E.*, 
	        (SELECT nombre FROM puestos WHERE id = E.puesto) as nombrepuesto 
        FROM empleados E WHERE status = 1 ORDER BY nombre LIMIT ${cuantos}, 5
    `;

    dbConn.query(laq, cuantos, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Empleado.update = function (elid, empleado, result) {
    dbConn.query("UPDATE empleados SET nombre=?,ap=?,am=?,email=?,puesto=? WHERE id = ? AND status = 1", [empleado.nombre, empleado.ap, empleado.am, empleado.email, empleado.puesto, elid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Empleado.eliminar = function (elid, result) {
    dbConn.query("DELETE FROM empleados WHERE id = ? AND status = 1", [elid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Empleado;