import React, { useEffect } from 'react'
import './styles/Login.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required("El correo es requerido").email("Correo no válido"),
   pass: yup.string().required("La contraseña es requerida").min(4, "Debe de contener al menos 4 caracteres").max(10, "Solo se admiten hasta 10 caracteres"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {

    const data = localStorage.getItem("user")
  })
  
  function onSubmit(data) {
    console.log("datos",data);
    alert("Registro exitoso");
    navigate('/profile');
}

  return (
    <div className='wrapper'>
      <div className='container-login'>
        <h1 className='title'>Inicio de sesion</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='form-login'>
          <div className='info'>
            <label  htmlFor="correo">Correo</label>
            <input type="text"  {...register("email")} />
            <div>
            <p style={{color: 'red'}}>{errors.email?.message}</p>
            </div>
          
          </div>
          <div className='info'>
            <label htmlFor="password">Contraseña</label>
            <input type="password"  {...register("pass")} />
            <p style={{color: 'red'}}>{errors.pass?.message}</p>
          </div>
          <div className='btn-wrapper'>
            <input className='btn-login' type="submit" value="Ingresar" />

          </div>

        </form>
      </div>
    </div>
  )
}

export default Login
