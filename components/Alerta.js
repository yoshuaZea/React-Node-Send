import React, { useEffect, useContext } from 'react'
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'

const Alerta = () => {
    // Acceder al state de context
    const AuthContext = useContext(authContext)
    const { mensaje } = AuthContext

    // Acceder al state de appcontext
  const AppContext = useContext(appContext)
  const { mensaje_archivo } = AppContext

    return ( 
        <div className="bg-red-500 px-4 py-2 w-full my-3 max-w-lg text-center text-white mx-auto rounded">
            { mensaje || mensaje_archivo }
        </div>
    )
}
 
export default Alerta