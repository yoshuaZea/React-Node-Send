import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OCULTAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types/index'

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case LOGIN_EXITOSO:
            // Almacenar el token en localStorage
            localStorage.setItem('rns-token', action.payload)
            return {
                ...state,
                token: action.payload,
                autenticado: true,
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION: 
            // Eliminar token del localstorage
            localStorage.removeItem('rns-token')
            return {
                ...state,
                autenticado: null,
                usuario: null,
                token: null,
            }
        default:
            return state
    }
}