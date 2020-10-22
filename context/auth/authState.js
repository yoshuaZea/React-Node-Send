import React, { useReducer } from 'react'
import authContext from './authContext'
import authReducer from './authReducer'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OCULTAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types/index'

const AuthState = ({ children }) => {
    // Definir el state initial
    const initialState = {
        autenticado: null,
        mensaje: null,
        token: typeof window !== 'undefined' ? localStorage.getItem('rns-token') : '',
        usuario: null,
    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState)

    // FUNCIONES
    // Registrar nuevos usuarios
    const registrarUsuario = async datos => {

        try {
            const response = await clienteAxios.post('/api/usuarios', datos)
            
            // Ejecutar el dispatch
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data.msg
            })

            
        } catch (error) {
            // console.log(error.response)
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        // Limpiar una alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)
    }

    // Iniciar sesión 
    const iniciarSesion = async datos => {
        try {
            const response = await clienteAxios.post('/api/auth', datos)

            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data.token
            })
        } catch (error) {
            // console.log(error.response)
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        // Limpiar una alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)
    }

    // Cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    // Usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('rns-token')
        if(token) tokenAuth(token)

        try {
            const response = await clienteAxios.get('/api/auth')

            if(response.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: response.data.usuario
                })
            }

        } catch (error) {
            // console.log(error.response)
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }


    return (
        <authContext.Provider
            value={{ 
                autenticado: state.autenticado,
                mensaje: state.mensaje,
                token: state.token,
                usuario: state.usuario,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
             }}
        >
            { children }
        </authContext.Provider>
    )
}

export default AuthState