import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ModificarProductos.css'
const ModificarProductos = () => {
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
            <h2>Modificar Productos List</h2>
            <div className='mod-product-list'>
                {products.map((product) => (
                    <Link className="mod-product-link" to={`/modificar/${product.id}`} key={product.id} >
                        <div className='mod-product'>
                            {product.promo !== 0 && (
                                <div className='mod-promotion-box'>
                                    <p className='mod-promotion-text'>{product.promo}%</p>
                                </div>
                            )}
                            {product.images && product.images.length > 0 && (
                                <div class="mod-product-image-container">
                                    <img
                                        src={`http://localhost:3001/uploads/${product.images[0]}`}
                                        alt={product.nombre_producto}
                                        className='mod-product-image'
                                    />
                                </div>
                            )}
                            <h3 className='mod-product-name'>{product.nombre_producto}</h3>
                            <p className='mod-product-price'>${product.precio}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ModificarProductos;
