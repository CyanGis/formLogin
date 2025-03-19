import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import '../../src/index.css'
import * as yup from 'yup'
import "./styles/Form.css";
import './styles/Login.css'



export default function Form() {
    const navigate = useNavigate()
    const [attempts, setAttempts] = useState(3);
    const [isLocked, setIsLocked] = useState(false);
    const [myData, setMyData] = useState(null);

    const schema = yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        email: yup.string().required("El correo es requerido").email("Correo no válido"),
        age: yup.number().integer("El dato debe ser entero").required("La edad es requerida").min(18, "Debes ser mayor a 18").typeError("Debe ser un número"),
        phoneNumber: yup.string().required("El número es requerido"),
        pass: yup.string().required("La contraseña es requerida").min(4, "Debe de contener al menos 4 caracteres").max(10, "Solo se admiten hasta 10 caracteres"),
        confirmPass: yup.string().oneOf([yup.ref("pass"), null], "Las contraseñas deben de coincidir")
    });



    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

  
    function onSubmit(data) {
        console.log("datos",data);
        alert("Registro exitoso");
        setMyData(data);
        localStorage.setItem("user", JSON.stringify(data))
        setAttempts(3);
        navigate('/login')
       
      // Cuando hay registro exitoso, reinicia los intentos
       
        
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    function handleFailedSubmit() {
        if (attempts > 1) {
            setAttempts(attempts - 1);
        } else {
            setIsLocked(true);
            alert("Has alcanzado el número máximo de intentos, intenta más tarde");
        }
    }


    return (
        <div className='forms_container'>
            <div className='form-card'>
            <h1 className='h1' >Registro</h1>
            <p className='h1'>Intentos: {attempts}</p>
            {isLocked ? (
                <p style={{ color: "red" }} className='h1'>Formulario bloqueado</p>
            ) : (
                
                <form onSubmit={handleSubmit(onSubmit, handleFailedSubmit)}>
                    <input type="text" placeholder="Nombre Completo" {...register("name")} />
                    <p className='error'>{errors.name?.message}</p>
                    <br />
                    <input   type="text" placeholder="Ingresa Email" {...register("email")} />
                    <p className='error'>{errors.email?.message}</p>
                    <br />
                    <input type="number" placeholder="Edad...." {...register("age")} />
                    <p className='error'>{errors.age?.message}</p>
                    <br />
                    <input type="number" placeholder="Numero...." {...register("phoneNumber")} />
                    <p className='error'> {errors.phoneNumber?.message}</p>
                    <br />
                    <input type="password" placeholder="Ingresa Contraseña" {...register("pass")} />
                    <p className='error'>{errors.pass?.message}</p>
                    <br />
                    <input type="password" placeholder="Confirma Contraseña" {...register("confirmPass")} />
                    <p className='error'>{errors.confirmPass?.message}</p>
                    <br />
                    <button type="submit" className='btn1'>Registrar</button>
                </form>
            )}  
                
            </div>
       
        </div>
    );
}
