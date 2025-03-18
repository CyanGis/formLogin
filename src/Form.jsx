import { yupResolver } from '@hookform/resolvers/yup'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export default function Form() {

    const [attempts, setAttempts] = useState(3);
    const [isLocked, setIsLocked] = useState(false);

    const schema =yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        email: yup.string().required("El correo es requerido").email(),
        age: yup.number().integer("El dato debe ser entero").required("La edad es requerida").min(18,"Debes ser mayor a 18").typeError(""),
        phoneNumber: yup.string().required("El numero es requerido"),
        pass: yup.string().required("La contrasena es requerida").min(4, "Debe de contener al menos 4 caracteres").max(10, "Solo se admiten hasta 10 caracteres"),
        confirmPass:yup.string().oneOf([yup.ref("pass"),null], "Las contrasenas deben de coincidir")
    })
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    function onSubmit(data){
        console.log(data)
        alert("Registro exitoso");
        setAttempts(3);//cuando hay logueo exitoso, reinicia los intentos
        
    }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Nombre Completo' {...register("name")}/>
        <p>{errors.name?.message}</p>
        <input type="text" placeholder='Ingresa Email' {...register("email")}/>
        <p>{errors.email?.message}</p>
        <input type="number" placeholder='Edad....' {...register("age")}/>
        <p>{errors.age?.message}</p>
        <input type="text" placeholder='Numero Telefonico....' {...register("phoneNumber")}/>
        <p>{errors.phoneNumber?.message}</p>
        <input type="password" placeholder='Ingresa Contraseña'{...register("pass")}/>
        <p>{errors.pass?.message}</p>
        <input type="password" placeholder='Confirma Contraseña'{...register("confirmPass")}/>
        <p>{errors.confirmPass?.message}</p>
        <input type='submit'/>
      </form>
    </div>
  )
}
