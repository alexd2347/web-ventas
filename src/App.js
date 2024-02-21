import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';


import './App.css';

import Header from './components/header/Header';
import Welcome from './components/componente-default/Welcome';
import Footer from './components/footer/Footer';


import CrearCuenta from './components/crear-cuenta/CrearCuenta';
import ProductDetails from './components/product-details/ProductDetails';

import ProductForm from './components/nuevo-producto/ProductForm';
import ModificarProductos from './components/modificar-productos/ModificarProductos';
import ModificarProducto from './components/modificar-productos/ModificarProducto';


function App() {
  const [version, setVersion] = useState('1.1.1');

  useEffect(() => {
    const checkAndReload = async () => {
      const latestVersion = '1.1.1';
      console.log("Version actual: " + version + " Ultima version: " + latestVersion);

      if (latestVersion !== version) {
        setVersion(latestVersion);
        window.location.reload(true);
      }
    };

    // Verifica y recarga inmediatamente al montar el componente.
    checkAndReload();

    // Establece un intervalo para verificar cada 10 minutos (600,000 milisegundos).
    const intervalId = setInterval(checkAndReload, 10000);

    // Limpia el intervalo al desmontar el componente.
    return () => clearInterval(intervalId);
  }, [version]);


  return (
    <div className="app-main">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/bienvenido" />} />
        <Route path="/bienvenido" element={<Welcome />} />
        <Route path="/details/:productId" element={<ProductDetails />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/nuevo-producto" element={<ProductForm />} />
        <Route path="/modificar-productos" element={<ModificarProductos />} />
        <Route path="/modificar/:productId" element={<ModificarProducto />} />
      </Routes>
      <Footer />
      <div className='version'>V {version}</div>
    </div>
  );
}

export default App;
