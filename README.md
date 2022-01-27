## tarea1aplicacionweb
tarea #1 para la materia Ingeniería y Desarrollo en la Web se uso nodejs, ejs, express y mariadb

### Author : Samuel Israel Azcarraga Velazquez

### `MariaDB configuración`
la configuración de la DB esta en  `config/db.config.js`

Para ejecutar el proyecto:

### `cd server, npm install`

Esto instalara las dependencias `node_modules`

### `node server.js` o `nodemon start` o `npm start`

la aplicacion se ejecutara en el puerto 5000 (http://localhost:5000)

#########################################################################

Pagina de la API

  https://cuatroymedio.net:5000/

Aplicación (cliente) desplegada en un servidor externo de AWS 

  https://cuatroymedio.net/test/maestria/ingydesweb/tarea1/clientenode/

Pruebas para obtener datos de la API desde el navegador y con CURL

  https://cuatroymedio.net:5000/api/v1/empleados

  curl -k -L -X GET 'https://cuatroymedio.net:5000/api/v1/empleados' --data-raw ''

Lista con los vídeos tutoriales de como usar el cliente (habilitar los subtítulos)

  https://www.youtube.com/watch?v=SpvZtwqHxcg&list=PLsHTh4h2CZ0-l58FOMO6dUcHD5p1ypZcX


