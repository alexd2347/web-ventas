import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Obtener datos de productos
        fetch('http://localhost:3001/api/v1/producto')
            .then(response => response.json())
            .then(data => {
                setProducts(data);

                // Obtener imágenes para cada producto
                data.forEach(product => fetchProductImages(product.id));
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const fetchProductImages = async (productId) => {
        console.log("buscando la imagen del id: " + productId);
        // Obtener imágenes del producto por ID
        try {
            const response = await fetch(`http://localhost:3001/api/v1/producto/upload/${productId}`);
            const data = await response.json();

            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    if (product.id === productId) {
                        // Replace backslashes with forward slashes in image URLs
                        const sanitizedImages = data.data.map(image => image.replace(/\\/g, '/'));
                        console.log(sanitizedImages);
                        return { ...product, images: sanitizedImages };
                    }
                    return product;
                });
            });
        } catch (error) {
            console.error(`Error fetching images for product ${productId}:`, error);
        }
    };

    return (
        <div className='main'>
            <div className='wel-product-list'>
                {products.map((product) => (
                    <Link className="wel-product-link" to={`/details/${product.id}`} key={product.id} >
                        <div className='wel-product'>
                            {product.promo !== 0 && (
                                <div className='wel-promotion-box'>
                                    <p className='wel-promotion-text'>{product.promo}%</p>
                                </div>
                            )}
                            {product.images && product.images.length > 0 && (
                                <div class="wel-product-image-container">
                                    <img
                                        src={`http://localhost:3001/uploads/${product.images[0]}`}
                                        alt={product.nombre_producto}
                                        className='wel-product-image'
                                    />
                                </div>
                            )}
                            <h3 className='wel-product-name'>{product.nombre_producto}</h3>
                            <p className='wel-product-description'>{product.descripcion_corta}</p>
                            <p className='wel-product-price'>${product.precio}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Welcome;
