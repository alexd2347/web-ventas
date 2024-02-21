import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="Footer">
            <div className='Footer-container'>
                <div className="navigation">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="#/bienvenido">Inicio</a></li>
                        <li><a href="#/ofertas">Ofertas</a></li>
                        <li><a href="#/new">New</a></li>
                        <li><a href="#/ropa-hombre">Ropa Hombre</a></li>
                        <li><a href="#/ropa-mujer">Ropa Mujer</a></li>
                        <li><a href="#/zapatos">Zapatos</a></li>
                    </ul>
                </div>

                <div className="social-media">
                    <h4>Redes Sociales</h4>
                    <ul>
                        <li><a href="">Facebook</a></li>
                        <li><a href="">Instagram</a></li>
                    </ul>
                </div>
            </div>

            <div className="rights-reserved">
                <p>&copy; {currentYear} Todos los derechos reservados</p>
            </div>
        </div>
    );
};

export default Footer;
