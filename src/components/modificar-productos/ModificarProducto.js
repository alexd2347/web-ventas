import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ModificarProducto.css';

const ModificarProducto = () => {
    //codigo para mostrar los datos del producto/

    const [imagenes, setImagenes] = useState([]);

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
    const handleFileChange = (e) => {
        setImagenes([...e.target.files]);
    };
    return (
        <div className='main'>
            <form className='mod-product-form-container'>
                <label className='mod-product-form-label'>
                    Nombre del Producto:
                    <input
                        type="text"
                        name="nombre_producto"
                        value={product.nombre_producto}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Descripción Corta:
                    <input
                        type="text"
                        name="descripcion_corta"
                        value={product.descripcion_corta}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Tallas (separadas por comas):
                    <input
                        type="text"
                        name="tallas"
                        value={product.tallas}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Cantidades (separadas por comas):
                    <input
                        type="text"
                        name="cantidades"
                        value={product.cantidades}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Precio:
                    <input
                        type="number"
                        name="precio"
                        value={product.precio}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Promo (porcentaje de desc):
                    <input
                        type="number"
                        name="promo"
                        value={product.promo}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Tags:
                    <input
                        type="text"
                        name="tags"
                        value={product.tags}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Número Vendidos:
                    <input
                        type="number"
                        name="numero_vendidos"
                        value={product.numero_vendidos}
                    />
                </label>

                <label className='mod-product-form-label'>
                    Descripción Larga:
                    <textarea
                        name="descripcion_larga"
                        value={product.descripcion_larga}
                        className='mod-product-form-text-area'
                    />
                </label>

                <label className='product-form-label'>
                    Agregar nuevas imagenes:
                    <input
                        type="file"
                        name="imagenes"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                    />
                </label>

                <div className='product-form-buton-container'>
                    {images.map((imagen, index) => (
                        <div key={index} className="mod-img-container">
                            <img
                                src={`http://localhost:3001/uploads/${imagen}`}
                                alt={`Imagen ${index + 1}`}
                                className="mod-img"
                                onClick={() => handleMiniaturaClick(imagen)}
                            />
                            <div className="mod-img-overlay">Eliminar</div>
                        </div>
                    ))}
                </div>
                <div className='product-form-buton-container'>
                    <button className='product-form-buton eliminar' type="submit">Eliminar producto</button>
                    <button className='product-form-buton' type="submit">Actualizar producto</button>

                </div>
            </form>
        </div>
    );
};

export default ModificarProducto;
