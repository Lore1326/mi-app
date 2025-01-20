const express = require('express');
const router = express.Router();
const HistorialControlador= require('../controllers/HistorialControlador');
const multer = require('multer');

// Configuración de almacenamiento para multer
const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './img/historiales/');
  },
  filename: function(req, file, cb) {
      cb(null, "historial" + Date.now() + file.originalname);
  }
});

const subidas = multer({ storage: almacenamiento });


//Rutas 

router.get("/prueba", HistorialControlador.prueba);
router.post("/crearHistorial", HistorialControlador.crearHistorial);
router.get("/listarHistorial", HistorialControlador.listarHistorial)
router.get("/mostrarUno/:id", HistorialControlador.mostrarUno)


// Ruta para subir la imagen
router.post("/subir-imagen/:id", subidas.single("archivo0"), HistorialControlador.subirImagen);

module.exports = router;