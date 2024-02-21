import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        // Obtener datos de productos

        //el productId es el parámetro de la URL
        console.log("id del producto: " + productId);
        //el productId es el ultimo numero de la actual url
        fetch(`http://localhost:3001/api/v1/producto/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);

                // Obtener las imagenes del producto
                fetchProductImages(productId);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const fetchProductImages = async (productId) => {
        console.log("buscando las imagenes del id: " + productId);
        // Obtener imágenes del producto por ID
        try {
            const response = await fetch(`http://localhost:3001/api/v1/producto/upload/${productId}`);
            const imageData = await response.json();
            const sanitizedImages = imageData.data.map(image => image.replace(/\\/g, '/'));

            setImages(sanitizedImages);
            setImagenSeleccionada(sanitizedImages[0]); // Establecer la primera imagen como seleccionada
        } catch (error) {
            console.error(`Error fetching images for product ${productId}:`, error);
        }
    };

    const handleMiniaturaClick = (imagen) => {
        setImagenSeleccionada(imagen);
    };

    return (
        <div className="main">
            <div className='product-container1'>
                <div className="imagenes-container">
                    {images.map((imagen, index) => (
                        <img
                            key={index}
                            src={`http://localhost:3001/uploads/${imagen}`}
                            alt={`Imagen ${index + 1}`}
                            className={`miniatura ${imagen === imagenSeleccionada ? 'seleccionada' : ''
                                }`}
                            onClick={() => handleMiniaturaClick(imagen)}
                        />
                    ))}
                </div>
                <div className="imagen-grande-container">
                    <img
                        src={`http://localhost:3001/uploads/${imagenSeleccionada}`}
                        alt="Imagen grande"
                        className="imagen-grande"
                    />
                </div>
                <div className='product-caracteristicas'>
                    <h2 className='product-title'>{product.nombre_producto}</h2>
                    <p className='product-price'>Precio: ${product.precio}</p>
                    <div className='products-tallas-container'>
                        <p className='product-tallas'>Tallas:</p>
                        {product.tallas && product.tallas.map((talla, index) => (
                            <div className='product-talla' key={index}>{talla}</div>
                        ))}
                    </div>
                    <div className='products-tallas-container'>
                        <p className='product-tallas'>Stock:</p>
                        {product.cantidades && product.cantidades.map((cantidad, index) => (
                            <div className='product-cantidad' key={index}>{cantidad}</div>
                        ))}
                    </div>
                    <p className='product-desc-corta'>{product.descripcion_corta}</p>

                    <button id="comprarAhora">Comprar Ahora</button>
                    <button id="anadirAlCarrito">Añadir al Carrito</button>

                </div>
            </div>
            <div className='product-container2'>
                <p className='product-desc-larga'>{product.descripcion_larga}</p>
                <p>{product.tags}</p>
                <p>ventas: {product.numero_vendidos}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
