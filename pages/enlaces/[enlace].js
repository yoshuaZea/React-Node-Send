import React, { useState, useContext } from 'react'
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'
import appContext from '../../context/app/appContext'
import Alerta from '../../components/Alerta'

// Los statics props son los atributos del elemento
// getServerSideProps o getStaticProps 
export async function getStaticProps ({ params }){
    
    const { enlace } = params
    const response = await clienteAxios.get(`/api/enlaces/${enlace}`)

    // console.log(response)

    return {
        props: {
            enlace: response.data
        }
    }
}

// El static paths es el routing dinámico
// getServerSidePaths o getStaticPaths
export async function getStaticPaths(){
    const response = await clienteAxios.get('/api/enlaces')
    // console.log(response.data)

    return {
        paths: response.data.enlaces.map(enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}

export default ({ enlace }) => {
    // Acceder al state de appcontext
    const AppContext = useContext(appContext)
    const { mostrarAlerta, mensaje_archivo } = AppContext

    // State del enlace
    const [tienePassword, setTienePassword] = useState(enlace.password)
    const [password, setPassword] = useState('')

    const verificarPassword = async e => {
        e.preventDefault()

        const data = {
            password
        }
       
        try {
            const response = await clienteAxios.post(`/api/enlaces/${enlace.archivo}`, data)

            setTienePassword(response.data.password)

        } catch (error) {
            mostrarAlerta(error.response.data.msg)
            setPassword('')
        }
    }

    return (
        <Layout>
            {
                tienePassword ? (
                    <>
                        <div className="flex justify-center">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ e => verificarPassword(e) }
                                >
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Este enlace está protegido por un password, colócalo a continuación:</label>
                                        <input 
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Ingresa la contraseña del enlace"
                                            id="password"
                                            value={password}
                                            onChange={ e => setPassword(e.target.value) }
                                        />
                                    </div>

                                    { mensaje_archivo && <Alerta /> }
    
                                    <input 
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white font-bold uppercase cursor-pointer rounded"
                                        value="Validar contraseña"
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                download
                            >Aquí</a>
                        </div>
                    </>
                )
            }
        </Layout>
    )
}