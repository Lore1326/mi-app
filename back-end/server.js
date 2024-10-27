const {conexion} = require( './database/connexion')
const express = require('express')
const cors = require('cors')

///inicializar app
console.log("App inicializada ...............") 

//conexion
conexion()

//Creacion de servidor de NodeJS
const app = express()
const port= 3900

//configurar cors
app.use(cors())

// Convertir body a onjeto Json
app.use(express.json())
app.use(express.urlencoded({extended: true}));


//* uso de rutas */
const rutas_hitorial = require('./routes/HistorialRutas');
//cargando rutas
app.use("/api", rutas_hitorial)
/*Fin de rutas */


///Escuchar peticione http://localhost

app.listen(port, ()=>{
    console.log(`El server esta funcionando en el puerto    ${port}`);
});

