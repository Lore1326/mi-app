import React from 'react'
import { NavLink } from 'react-router-dom'

export const HeaderNav = () => {
    return (

        <header className='header'>


            <nav>
                <ul>
                    <li>
                        <NavLink to="/inicio" className={({ isActive }) => isActive ? "active" : ""}>Inicio</NavLink>
                    </li>
                    <li>
                        Busqueda
                    </li>
                    <li>
                       <NavLink to="/historial" className={({isActive})=> isActive ? "active": ""}> Hitorial Pacinete</NavLink>
                    </li>
                    <li>
                        Reportes
                    </li>
                    <li>
                        Iniciar Sesion
                    </li>
                    <li>
                        Registrarse
                    </li>
                </ul>
            </nav>
        </header>
    )
}
