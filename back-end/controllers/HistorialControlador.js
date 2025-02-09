const fs = require('fs');
const path = require('path');
const Historial = require('../models/Historial')
const {validarHistorial} = require('../helper/Validar')


//Metodo para peticion de prueba
const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador"
    });
};

/*Motodos */

//Metodo de creacion de hitorial
const crearHistorial = async (req, res) => {
    try {
        let parametros = req.body;

        // Validar datos 
        const validacion = validarHistorial(parametros);
        if (!validacion.success) {
            return res.status(400).json({
                status: "Error",
                mensaje: validacion.message || "Faltan datos por enviar"
            });
        }

        if (typeof parametros.fecha === 'string') {
            const fechaConvertida = new Date(parametros.fecha);
            if (isNaN(fechaConvertida.getTime())) {
                return res.status(400).json({
                    status: "Error",
                    mensaje: "La fecha proporcionada es inválida."
                });
            }
            parametros.fecha = fechaConvertida;
        }

        // Crear una nueva instancia de Historial
        const historial = new Historial(parametros);
        const historialGuardado = await historial.save();

        return res.status(200).json({
            status: "OK",
            historial: historialGuardado,
            mensaje: "Historial creado con éxito"
        });
    } catch (error) {
        console.error("Error al guardar el historial:", error);
        return res.status(500).json({
            status: "Error",
            mensaje: "No se pudo guardar el historial"
        });
    }
};

//listar historial
const listarHistorial = async (req, res)=>{
    ///simular una espera de 5 segundos 
    setTimeout(async ()=>{
        try {
            ///Consultar hitorial los registros 
            const historial = await Historial.find({}).sort({fecha: -1}).exec();

            //Verificar si no se encontraron los historiales
            if (!historial || historial.length === 0) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No hay historiales registrados"
                });
            }

            //Retornar los historiales
            return res.status(200).json({
                status: "OK",
                parametros: req.params.ultimos,
                historiales: historial,
                mensaje: "Historiales listados con éxito"
            });
        } catch (error) {
             // Manejar cualquier error que ocurra
             console.error("Error al obtener los artículos:", error);
             return res.status(500).json({
                 status: "Error",
                 mensaje: "Hubo un problema al obtener los artículos"
             });
        }
    }, 1000)
}

/// mostrar un istorial
/*metodo pasa solo mostrar un elemento de la base datos */

const mostrarUno = async (req, res) => {
    try {
        // Recoger un ID por la URL
        let id = req.params.id;

        // Buscar el artículo por su ID
        const historial = await Historial.findById(id);

        // Si no se encuentra el artículo
        if (!historial) {
            return res.status(404).json({
                status: "Error",
                mensaje: "No se ha encontrado el artículo"
            });
        }

        // Si se encuentra el artículo, devolverlo
        return res.status(200).json({
            status: "OK",
            articulo: historial
        });
    } catch (error) {
        console.error("Error al buscar el artículo:", error);
        return res.status(500).json({
            status: "Error",
            mensaje: "Hubo un error al buscar el artículo"
        });
    }
};

//Metodo para eliminar un historial

// Subir imagen

/*Metodo para subir imagen  */

const subirImagen = async (req, res) => {
    try {
        // Verificar si el archivo se ha cargado correctamente
        if (!req.file) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Petición inválida: No se ha proporcionado ningún archivo"
            });
        }

        // Obtener el nombre del archivo y su extensión
        const nombreArchivo = req.file.originalname;
        const archivoSplit = nombreArchivo.split(".");
        const extension = archivoSplit[archivoSplit.length - 1];

        // Verificar si la extensión del archivo es válida
        if (extension !== "csv") {
            // Borrar el archivo no válido
            fs.unlink(req.file.path, (error) => {
                if (error) {
                    console.error("Error al borrar el archivo:", error);
                }
            });
            // Responder con un mensaje de error
            return res.status(400).json({
                status: "Error",
                mensaje: "La extensión del archivo no es válida"
            });
        } else {
            // Recoger el ID del artículo a editar
            const articulo_id = req.params.id;

            // Buscar el artículo por su ID
            const articulo = await Historial.findById(articulo_id);

            // Verificar si se encontró el artículo
            if (!articulo) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se encontró el artículo para actualizar"
                });
            }

            // Actualizar el artículo con la nueva imagen
            articulo.archivoECG = req.file.filename;

            // Guardar el artículo actualizado en la base de datos
            const articuloActualizado = await articulo.save();

            // Devolver respuesta con el artículo actualizado
            return res.status(200).json({
                status: "OK",
                articulo: articuloActualizado,
                mensaje: "Artículo actualizado con éxito"
            });
        }
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return res.status(500).json({
            status: "Error",
            mensaje: "Hubo un problema al subir la imagen"
        });
    }
};


module.exports ={
    prueba,
    crearHistorial,
    listarHistorial,
    mostrarUno,
    subirImagen
}