import React from 'react'
import { Routes, Route, BrowserRouter, NavLink, Navigate } from 'react-router-dom'
import { Inicio } from '../components/pages/Inicio'
import { HeaderNav } from '../components/layouts/HeaderNav'
import { HistorialPaciente } from '../components/pages/HistorialPaciente'


export const MisRutas = () => {
    return (
        <BrowserRouter>


            {/*Encabezado */}
            <HeaderNav/>
            {/*Contenido central */}
            <section className="content">

                <Routes>
                    <Route path="/" element={<Navigate to="/inicio" />} />
                    <Route path='/inicio' element={<Inicio/>} />
                    <Route path='/historial' element={<HistorialPaciente/>}/>
                    
                    <Route path="*" element={
                        <div className='page'>
                            <h1 className='heading'>Error 404</h1>
                        </div>
                    } />
                </Routes>

            </section>
        </BrowserRouter>
    )
}
