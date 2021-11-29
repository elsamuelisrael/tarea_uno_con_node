const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors')

var fs = require('fs');
var https = require('https');

// express app
const app = express();

// puerto
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use(cors())

// ruta raiz
app.get('/', (req, res) => {
  res.send("Hola! yo soy la API en Node.js");
});

// rutas
const puestoRoutes = require('./src/routes/puesto.routes')
const empleadosRoutes = require('./src/routes/empleados.routes')

app.use('/api/v1/puestos', puestoRoutes)
app.use('/api/v1/empleados', empleadosRoutes)

// LOCAL
app.listen(port, () => {
  console.log(`Servidor http correindo en el puerto ${port}`);
});

// REMOTO 
/*https.createServer({
  cert: fs.readFileSync('../testgo/cert.pem'),
  key: fs.readFileSync('../testgo/privkey.pem')
},app).listen(port, function(){
       console.log(`Servidor https correindo en el puerto ${port}`);
});*/

