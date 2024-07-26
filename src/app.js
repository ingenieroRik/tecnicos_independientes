const express = require ("express");
const session = require('express-session');
require('dotenv').config();
const app = express();

const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE

const cors = require ('cors'); // <--------- para que puedan ver los datos de nuestra api  hacer  --> npm i cors


// Configurar la sesión
app.use(session({
    secret: 'tu_secreto', // Cambia esto por una cadena secreta
    resave: false,
    saveUninitialized: false
}));

app.use(cors());
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
app.use(express.urlencoded({extended:false})); // MUY IMPORTANTE!!!  para usar el metodo POST Para parsear bodies de formularios
app.use(express.json()); // MUY IMPORTANTE!!!  para usar el metodo POST


// indicamos a express usar la plantilla EJS que esta en carpeta views.
app.set('view engine', 'ejs');

//si la ruta por defecto no es /views debemos decirle a node que la carpeta se encuentra
// en otra ruta, para ello usamos:
app.set('views', './src/views');


// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));


/* En la constante "db_fotos" ya tenemos los fotos que están 
guardados en la carpeta data como Json (un array de objetos literales) */

const adminRoutes = require ("./routes/adminRoutes.js");
const mainRoutes = require ("./routes/mainRoutes.js");

app.use (adminRoutes);
app.use (mainRoutes);


/*************************probamos conexion  con la base de datos REMOTA *********************/

 var mysql = require('mysql'); //<----- npm install mysql 

var conexion = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER_BD,
    password: process.env.PASSWORD});
  
    try {
        conexion.connect(function (error) {
            if (error) {
                console.error("Error conectando a la base de datos:", error);
                // Handle the connection error here
            } else {
                console.log("Conecto con éxito la base de datos remota");
                // Perform any database operations here
                conexion.end();
            }
        });
    
        conexion.on('error', function (err) {
            console.error("Error de conexión a la base de datos:", err);
            // Handle the error or attempt to reconnect
        });
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);
        // Handle the connection error here
    }

/*****************************************************************************/
/*************************probamos conexion  con la base de datos local *********************/
 
/*
var mysql2 = require('mysql2'); //<----- npm install mysql2 

var conexion = mysql2.createConnection({
    host:'localhost',
    database:'fallas_db',
    user:'root',
    password:'master4'});
  
    conexion.connect (function (error){
        if (error){
            throw error;
        } else { console.log("Conecto con éxito la base de Datos local")}
    });
    conexion.end(); 
   */ 
/***************************************************************************** */

// ponemos a escuchar el servidor
app.listen(process.env.PORT || 3042, () =>  // si subimos a un hosting este nos dará el puerto, sinó sera 3042
console.log('Servidor corriendo en http://localhost:3042')
);
