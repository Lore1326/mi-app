import React from 'react'

export const HistorialPaciente = () => {
    return (
        <div className='page'>
            <div className="historial-container"> {/* Contenedor del historial de pacientes */}
                <h2>Historial de Pacientes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>ID</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    {/*<tbody>
                        {historial.map((entry) => (
                            <tr>
                                <td>nombrePaciente</td>
                                <td>idPaciente</td>
                                <td>
                                    <button>PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>*/}
                </table>
                <button >Exportar a Excel</button>
            </div>
        </div>
    )
}
