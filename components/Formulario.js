import React, { useState, useContext } from 'react'
import appContext from '../context/app/appContext'

const Formulario = () => {

    // State del componente
    const [password, setPassword] = useState(false)

    // Acceder al state de context
    const AppContext = useContext(appContext)
    const { agregarPassword, agregarDescargas } = AppContext

    const mostrarPassword = () => {
        setPassword(!password)
    }

    return ( 
        <div className="w-full mt-10">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={ e => agregarDescargas(parseInt(e.target.value))}
                >
                    <option selected disabled>- Selecciona -</option>
                    <option value="1">1 descargar</option>
                    <option value="2">2 descargar</option>
                    <option value="3">3 descargar</option>
                    <option value="4">4 descargar</option>
                    <option value="5">5 descargar</option>
                    <option value="10">10 descargar</option>
                    <option value="15">15 descargar</option>
                    <option value="20">20 descargar</option>
                    <option value="25">25 descargar</option>
                </select>
            </div>
            <div className="mt-2">
                <div className="flex justify-start items-center">
                    <input 
                        type="checkbox"
                        className="mr-2"
                        onChange={ () => mostrarPassword() }
                        
                    />
                    <label className="text-lg text-gray-800 mr-2">Proteger con contraseña:</label>
                </div>
                {
                    password ? (
                        <input 
                            type="password"
                            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                            placeholder="Contraseña para proteger el archivo"
                            onChange={ e => agregarPassword(e.target.value) }
                        />
                    ) : null
                }
            </div>
        </div>
    )
}
 
export default Formulario