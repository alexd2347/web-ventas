import React, { useState } from 'react';

import './CrearCuenta.css';
const CrearCuenta = () => {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí puedes agregar la lógica para enviar la información de la cuenta al servidor o realizar otras acciones necesarias
        console.log('Usuario:', usuario);
        console.log('Correo Electrónico:', email);
        console.log('Contraseña:', password);

        // Puedes reiniciar los estados después de enviar el formulario
        setUsuario('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className='main'>
            <h2 className='crear-cuenta-titulo'>Crear Cuenta</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre de Usuario:
                    <input type="text" value={usuario} onChange={handleUsuarioChange} />
                </label>
                <br />
                <label>
                    Correo Electrónico:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Crear Cuenta</button>
            </form>
        </div>
    );
};

export default CrearCuenta;
