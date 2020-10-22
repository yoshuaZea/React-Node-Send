import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'
import { useRouter } from 'next/router'

const Header = () => {
    // Acceder al state de context
    const AuthContext = useContext(authContext)
    const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext

    // Context de la aplicación
    const AppContext = useContext(appContext)
    const { limpiarState } = AppContext

    // Hook router de next
    const router = useRouter()

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    const redireccionar = () => {
        limpiarState()
        router.push('/')
    }
    
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img 
                onClick={ () => redireccionar() }
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" />

            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                            <p className="mr-2">Hola { usuario.nombre }</p>
                            <button
                                type="button"
                                className="bg-red-500 mr-2 px-3 py-1 rounded text-white font-bold uppercase"
                                onClick={ () => cerrarSesion() }
                            >Cerrar sesion</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a 
                                    className="bg-red-500 mr-2 px-3 py-1 rounded text-white font-bold uppercase"
                                >Iniciar sesión</a>
                            </Link>
                            <Link href="/crear-cuenta">
                                <a 
                                    className="bg-black px-3 py-1 rounded text-white font-bold uppercase"
                                >Crear cuenta</a>
                            </Link>
                        </>
                    )
                }
                
            </div>
        </header>
    )
}
 
export default Header