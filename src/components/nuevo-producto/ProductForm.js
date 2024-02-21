import React, { useState } from 'react';
import './ProductForm.css'
const ProductForm = () => {
    const [formData, setFormData] = useState({
        nombre_producto: '',
        descripcion_corta: '',
        descripcion_larga: '',
        tallas: [],
        cantidades: [],
        precio: 0,
        promo: 0,
        tags: '',
        numero_vendidos: 0,
    });

    const [imagenes, setImagenes] = useState([]);
    const [productoAgregado, setProductoAgregado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImagenes([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/v1/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tallas: formData.tallas.split(",").map(talla => talla.trim()),
                    cantidades: formData.cantidades.split(",").map(cantidad => parseInt(cantidad.trim(), 10)),
                }),
            });

            if (response.ok) {
                console.log('Producto agregado exitosamente');
                setProductoAgregado(true);
            } else {
                console.error('Error al agregar el producto');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
        for (let i = 0; i < imagenes.length; i++) {
            handleFileUpload(imagenes[i]);
        }
    };

    const formDataToFormData = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    };

    const handleFileUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file); // Aquí debes asegurarte de usar 'file' como key, ya que es como lo estás enviando en Postman.

            const response = await fetch('http://localhost:3001/api/v1/producto/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Imagen subida exitosamente');
            } else {
                console.error('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className='main'>
            {!productoAgregado ? (
                <form className='product-form-container' onSubmit={handleSubmit} >
                    <label className='product-form-label'>
                        Nombre del Producto:
                        <input
                            type="text"
                            name="nombre_producto"
                            value={formData.nombre_producto}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Descripción Corta:
                        <input
                            type="text"
                            name="descripcion_corta"
                            value={formData.descripcion_corta}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Tallas (separadas por comas):
                        <input
                            type="text"
                            name="tallas"
                            value={formData.tallas}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Cantidades (separadas por comas):
                        <input
                            type="text"
                            name="cantidades"
                            value={formData.cantidades}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Precio:
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Promo (porcentaje de descuento):
                        <input
                            type="number"
                            name="promo"
                            value={formData.promo}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Tags:
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Número Vendidos:
                        <input
                            type="number"
                            name="numero_vendidos"
                            value={formData.numero_vendidos}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='product-form-label'>
                        Descripción Larga:
                        <textarea
                            name="descripcion_larga"
                            value={formData.descripcion_larga}
                            onChange={handleChange}
                            className='product-form-text-area'
                        />
                    </label>
                    <label className='product-form-label'>
                        Imágenes:
                        <input
                            type="file"
                            name="imagenes"
                            accept="image/*"
                            onChange={handleFileChange}
                            multiple
                        />
                    </label>
                    <div className='product-form-buton-container'>
                        <button className='product-form-buton' type="submit">Agregar Producto</button>
                    </div>
                </form>
            ) : (
                <div className='producto-agregado-mensaje'>
                    Producto agregado correctamente
                </div>
            )}
        </div>

    );
};

export default ProductForm;
