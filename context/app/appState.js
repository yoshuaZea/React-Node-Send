import React, { useReducer } from 'react'
import appContext from './appContext'
import appReducer from './appReducer'
import clienteAxios from '../../config/axios'
import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
    
} from '../../types/index'

const AppState = ({ children }) => {
    // Definir el state initial
    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: false,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    // FUNCIONES
    // Muestra una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        // Ocultar alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

    // Sube los archivos al servidor
    const subirArchivo = async (file, name) => {
        dispatch({
            type: SUBIR_ARCHIVO
        })

        try {
            const response = await clienteAxios.post('/api/archivos', file)
            // console.log(response)

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: response.data.archivo,
                    nombre_original: name,
                }
            })

        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // Función para crear el enlace una vez subido el archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const response = await clienteAxios.post('/api/enlaces', data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: CREAR_ENLACE_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // Reiniciar el state de app
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    // Agregar password al state
    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    // Agregar número de descargas
    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(appReducer, initialState)

    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            { children }
        </appContext.Provider>
    )
}

export default AppState