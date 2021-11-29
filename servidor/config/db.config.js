'user strict';

const mysql = require('mysql');

const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'balmendra',
  password : 'balmendra33?',
  database : 'unir_tarea_uno'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("DB Conectada!");
});
module.exports = dbConn;