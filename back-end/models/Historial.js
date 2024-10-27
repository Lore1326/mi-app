const {Schema, model} = require ( 'mongoose');


const HistoriaSchema = Schema({
    nombrePaciente: { 
        type: String, 
        required: true 
    },
    fecha: {
         type: Date, 
         required: true
    },
    archivoECG: {
        type: String,
        default: "default.ccv" 
    },
    ssn: { 
        type: String, 
        required: true 
    }, 
    pacientId: { 
        type: String, 
        required: true 
    }, 
    age: { 
        type: Number, 
        required: true 
    }, 
    curp: { 
        type: String, 
        required: true 
    }, 
    phone: { 
        type: String, 
        required: true 
    }, 
    gender: { 
        type: String, 
        required: true 
    } 
})

module.exports = model('Historial', HistoriaSchema, "Historiales");