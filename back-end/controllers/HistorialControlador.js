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

module.exports ={
    prueba,
    crearHistorial,
    listarHistorial
}