import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import './Header.css';
const Header = () => {

    return (
        <header className="header">
            <div className='header-part-search'>
                <Link className="header-product-link" to="/bienvenido">
                    <h1 className='header-titulo'>
                        JVIS<span>clothes</span>
                    </h1>
                </Link>
                <input type="text" className='header-search'></input>

                <Link className="header-product-link" to="/iniciar-sesion">
                    <div className='header-link-2'>Iniciar sesión</div>
                </Link>
                <Link className="header-product-link" to="/mis-compras">
                    <div className='header-link-2'>Mis compras</div>
                </Link>
                <Link className="header-product-link" to="/mis-carrito">
                    <div className='header-link-2'>Mi carrito</div>
                </Link>

            </div>
            <div className='header-part-nav'>
                <Link className="header-product-link" to="/ofertas">
                    <div className='header-link'>Ofertas</div>
                </Link>
                <Link className="header-product-link" to="/new">
                    <div className='header-link'>New</div>
                </Link>
                <Link className="header-product-link" to="/ropa-hombre">
                    <div className='header-link'>Ropa hombre</div>
                </Link>
                <Link className="header-product-link" to="/ropa-mujer">
                    <div className='header-link'>Ropa mujer</div>
                </Link>
                <Link className="header-product-link" to="/nuevo-producto">
                    <div className='header-link'>Ingresar nuevo producto</div>
                </Link>
                
                <Link className="header-product-link" to="/modificar-productos">
                    <div className='header-link'>Modificar productos</div>
                </Link>
            </div>
        </header>
    );
};

export default Header;

