import React, { useState } from 'react';
import axios from 'axios';

export const FormularioHistorial = () => {
    const [formData, setFormData] = useState({
        nombrePaciente: '',
        fecha: '',
        ssn: '',
        pacientId: '',
        age: '',
        curp: '',
        phone: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convertir la fecha a formato ISO y asegurarte de que age sea un número
        const dataToSend = {
            ...formData,
            fecha: new Date(formData.fecha).toISOString(),
            age: Number(formData.age), // Asegúrate de que sea un número
        };
    
        console.log(dataToSend); // Ver los datos que se están enviando
    
        try {
            const response = await axios.post('http://localhost:3900/api/crearhistorial', dataToSend);
            console.log('Datos guardados con éxito:', response.data);
            alert('Historial guardado exitosamente.');
            // Limpiar el formulario después de guardar
            setFormData({
                nombrePaciente: '',
                fecha: '',
                ssn: '',
                pacientId: '',
                age: '',
                curp: '',
                phone: '',
                gender: '',
            });
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            alert('Error al guardar los datos. Inténtelo de nuevo.');
        }
    };

    return (
        <div className='page'>
            <div className="menu-container">
                <h1>Historial para Electrocardiograma</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field-container">
                        <label>Nombre del Paciente:</label>
                        <input
                            type="text"
                            name="nombrePaciente"
                            value={formData.nombrePaciente}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field-container">
                        <label>Fecha:</label>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field-container">
                        <label>Número de Seguro Social (SSN):</label>
                        <input
                            type="text"
                            name="ssn"
                            value={formData.ssn}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field-container">
                        <label>ID de Paciente:</label>
                        <input
                            type="text"
                            name="pacientId"
                            value={formData.pacientId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field-container">
                        <label>Edad:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field-container">
                        <label>CURP:</label>
                        <input
                            type="text"
                            name="curp"
                            value={formData.curp}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field-container">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field-container">
                        <label>Sexo:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>

                    <button type="submit">Guardar Datos</button>
                </form>
            </div>
        </div>
    );
};