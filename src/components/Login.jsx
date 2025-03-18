import React from 'react'
import './styles/Login.css'
const Login = () => {
  return (
    <div className='wrapper'>
      <div className='container-login'>
        <h1 className='title'>Inicio de sesion</h1>
        <form action="" className='form-login'>
          <div className='info'>
            <label style={{ marginRight: 35 }} htmlFor="correo">Correo</label>
            <input type="email" />
          </div>
          <div className='info'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" />
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
