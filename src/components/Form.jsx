import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'


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
        navigate('/login')
        setAttempts(3); // Cuando hay registro exitoso, reinicia los intentos
        setMyData(data);
        
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
        <div>
            <h2>Registro</h2>
            <p>Intentos: {attempts}</p>
            {isLocked ? (
                <p style={{ color: "red" }}>Formulario bloqueado</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit, handleFailedSubmit)}>
                    <input type="text" placeholder="Nombre Completo" {...register("name")} />
                    <p>{errors.name?.message}</p>

                    <input type="text" placeholder="Ingresa Email" {...register("email")} />
                    <p>{errors.email?.message}</p>

                    <input type="number" placeholder="Edad...." {...register("age")} />
                    <p>{errors.age?.message}</p>
                    <input type="number" placeholder="Numero...." {...register("phoneNumber")} />
                    <p>{errors.phoneNumber?.message}</p>
                    <input type="password" placeholder="Ingresa Contraseña" {...register("pass")} />
                    <p>{errors.pass?.message}</p>

                    <input type="password" placeholder="Confirma Contraseña" {...register("confirmPass")} />
                    <p>{errors.confirmPass?.message}</p>

                    <button type="submit">Registrar</button>
                </form>
            )}
        </div>
    );
}
