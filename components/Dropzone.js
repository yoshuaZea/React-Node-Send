import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone'
import appContext from '../context/app/appContext'
import authContext from '../context/auth/authContext'
import Spinner from '../components/Spinner'
import Formulario from './Formulario'

const Dropzone = () => {

    // Acceder al state de context
    const AppContext = useContext(appContext)
    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext

    // Acceder al state de context de auth
    const AuthContext = useContext(authContext)
    const { usuario, autenticado } = AuthContext

    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir es 1MB, obten una cuenta para poder subir archivos más grandes.')
    }

    // Si hay token permitir hasta 10 MB
    const maxSize = autenticado ? (1024 * 1024 * 10) : (1024 * 1024)

    const onDropAccepted = useCallback( async (acceptedFiles) => {
        // console.log(acceptedFiles)
        // Crear un formData
        const formData = new FormData
        formData.append('archivo', acceptedFiles[0])
        
        subirArchivo(formData, acceptedFiles[0].path)
    })

    // Extraer contenido de dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize })

    const archivos = acceptedFiles.map( archivo => (
        <li 
            key={ archivo.lastModified }
            className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
        >
            <p className="font-bold text-xl">{ archivo.path }</p>
            <p className="text-sm text-gray-500">{ (archivo.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
        </li>
    ))

    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            { 
                acceptedFiles.length > 0 ? (
                    <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                        <ul>
                            { archivos }
                        </ul>

                        {
                            autenticado ? (
                                <Formulario />
                            ) : (
                                null
                            )
                        }

                        { 
                            cargando ? (
                                <>
                                    <Spinner />
                                    <p className="mt-3 mb-10 text-center text-gray-600">Subiendo archivo...</p>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className="bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800"
                                    onClick={ () => crearEnlace () }
                                >Crear enlace</button>
                            )
                        }

                        
                    </div>

                ) : (
                    <div {...getRootProps({ className: 'dropzone w-full py-32'})}>
                        <input 
                            className="h-100"
                            {...getInputProps()}
                        />
                            {
                                isDragActive ? 
                                    <p className="text-2xl text-gray-600 text-center">Suelta el archivo</p> 
                                : (
                                    <div className="text-center">
                                        <p className="text-2xl text-center text-gray-600">Selecciona o arrastra un archivo aquí</p>
                                        <button 
                                            type="button"
                                            className="bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800"
                                        >Selecciona archivos para subir</button>
                                    </div>
                                )
                            }
                    </div>
                )
            }

        </div>
    )
}
 
export default Dropzone;