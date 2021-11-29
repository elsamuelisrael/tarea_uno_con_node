'user strict';
var dbConn = require('./../../config/db.config');

var Puesto = function(puesto){
    this.nombre         = puesto.nombre;
    this.creado         = new Date();
    this.actualizado    = new Date();
};

Puesto.todoslosPuestos = function (result) {
    dbConn.query("SELECT * FROM puestos ORDER BY nombre", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('puestos : ', res);  
            result(null, res);
        }
    });   
};

module.exports = Puesto;