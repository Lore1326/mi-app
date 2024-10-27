const validator = require("validator");

const validarHistorial = (parametros) => {
    // Convertir fecha a objeto Date si está en formato de cadena
    if (typeof parametros.fecha === 'string') {
        parametros.fecha = new Date(parametros.fecha);
    }

    // Verificar que cada campo requerido esté definido y sea del tipo adecuado
    if (
        typeof parametros.nombrePaciente !== 'string' ||
        !(parametros.fecha instanceof Date) ||
        isNaN(parametros.fecha.getTime()) ||  // Verificar si la fecha es válida
        typeof parametros.ssn !== 'string' ||
        typeof parametros.pacientId !== 'string' ||
        typeof parametros.age !== 'number' ||
        typeof parametros.curp !== 'string' ||
        typeof parametros.phone !== 'string' ||
        typeof parametros.gender !== 'string'
    ) {
        return { success: false, message: "Algunos datos del historial son inválidos o están ausentes." };
    }

    // Validar que los parametros recibidos no estén vacíos, excepto archivoECG
    parametros.nombrePaciente = validator.trim(parametros.nombrePaciente);
    parametros.ssn = validator.trim(parametros.ssn);
    parametros.pacientId = validator.trim(parametros.pacientId);
    parametros.curp = validator.trim(parametros.curp);
    parametros.phone = validator.trim(parametros.phone);
    parametros.gender = validator.trim(parametros.gender);

    if (
        validator.isEmpty(parametros.nombrePaciente) ||
        validator.isEmpty(parametros.ssn) ||
        validator.isEmpty(parametros.pacientId) ||
        validator.isEmpty(parametros.curp) ||
        validator.isEmpty(parametros.phone) ||
        validator.isEmpty(parametros.gender)
    ) {
        return { success: false, message: "Faltan datos por enviar" };
    }

    

    // Validar la longitud del SSN
    if (!validator.isLength(parametros.ssn, { min: 9, max: 9 })) {
        return { success: false, message: "El SSN debe tener 9 caracteres" };
    }

    // Si todas las validaciones se cumplen
    return { success: true };
};

module.exports = {
    validarHistorial
};