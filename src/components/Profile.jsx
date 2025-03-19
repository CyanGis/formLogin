import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        
        
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
            console.log(userData)

        } else {
            alert("No hay datos de usuario. Redirigiendo al registro...");
            navigate('/'); 
        }
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem("user");
        navigate('/');
    }

    function onSubmit(data) {
        console.log("datos",data);
        localStorage.setItem("user", JSON.stringify(data))
        alert("Registro exitoso");
        navigate('/profile')
    }
  return (
        <div className='wrapper'style={{backgroundColor: 'white'}}>
            <div>
                <h2>Perfil de Usuario</h2>
                {userData ? (
                <div>
                    <p><strong>Nombre:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Edad:</strong> {userData.age}</p>
                    <p><strong>Teléfono:</strong> {userData.phoneNumber}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
            </div>
            
            
        </div>
            
        
  )
}
