import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import Spinner from "../components/Spinner"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import Tarea from "../components/Tarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Alerta from "../components/Alerta"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import io from 'socket.io-client'

let socket;

const Proyecto = () => {

    const params = useParams()
    const {obtenerProyecto, proyecto, cargando, eliminarProyecto, handleModalTarea, alerta, setAlerta, submitTareasProyecto, submitEliminarTareas, submitEditarTareas, submitCambiarEstado} = useProyectos()
    const admin = useAdmin()

    useEffect(() => {
        setAlerta({})
        obtenerProyecto(params.id)
    }, [])

    //Socket Con
    useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URI)
      socket.emit('abrir proyecto', params.id)
    }, [])

    //Esperando res
    useEffect(() => {
      socket.on('tarea agregada', tareaNueva => {
        if(tareaNueva.proyecto === proyecto._id){
          submitTareasProyecto(tareaNueva)
        }
      })
      socket.on('tarea eliminada', tareaEliminada => {
        if(tareaEliminada.proyecto === proyecto._id){
          submitEliminarTareas(tareaEliminada)
        }
      })
      socket.on('tarea editada', tareaEditada => {
        if(tareaEditada.proyecto._id === proyecto._id){
          submitEditarTareas(tareaEditada)
        }
      })
      socket.on('nuevo estado', nuevoEstadoTarea => {
        if(nuevoEstadoTarea.proyecto._id === proyecto._id){
          submitCambiarEstado(nuevoEstadoTarea)
        }
      })
    })
    
    
    const handleClick = () => {
      if(confirm('Deseas eliminar este proyecto?')){
        eliminarProyecto(params.id)
      }
    }

    const {nombre} = proyecto
    const {msg} = alerta

  return (
    
      cargando ? <Spinner/> : 
      <>
        <div className="md:flex justify-between">
          <h1 className="font-black text-4xl">{nombre}</h1>
          {admin && (
            <div className="flex items-center">
              <div className="flex items-center mr-10 text-gray-400 hover:text-black gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <Link
                  to={`/proyectos/editar/${params.id}`}
                  className="uppercase font-bold"
                >Editar</Link>
              </div>
              <div className="flex items-center text-gray-400 hover:text-red-400 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  <button
                    className="uppercase font-bold"
                    onClick={handleClick}
                  >Eliminar</button>
              </div>
            </div>
          )}
        </div>
        {admin && (
          <button
            type="button"
            className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-600 text-white text-center mt-5 flex gap-2 items-center justify-center"
            onClick={handleModalTarea}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
            </svg>
            Nueva Tarea</button>
        )}
          <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
          
          <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.tareas?.length ? proyecto.tareas?.map(tarea => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
              />
            )) : 
            <p className="text-center my-5 p-10">Todavía no hay tareas en este proyecto</p>}
          </div>
          {admin && (
            <>
              <div className="md:flex justify-between items-center mt-10">
                <p className="font-bold text-xl">Colaboradores</p>
                <Link
                  to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                  className="text-gray-400 hover:text-black uppercase font-bold"
                >Añadir</Link>
              </div>
              <div className="bg-white shadow mt-10 rounded-lg">
                {proyecto.colaboradores?.length ? proyecto.colaboradores?.map(colaborador => (
                  <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                  />
                )) : 
                <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>}
              </div>
            </>
          )}

            <ModalFormularioTarea/>
            <ModalEliminarTarea/>
            <ModalEliminarColaborador/>

      </>

    
  )
}

export default Proyecto