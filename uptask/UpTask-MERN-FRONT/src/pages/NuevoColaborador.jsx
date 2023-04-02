import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import Alerta from "../components/Alerta"

const NuevoColaborador = () => {

  const {obtenerProyecto, proyecto, cargando, colaborador, cargandoColab, agregarColaborador, alerta, setColaborador} = useProyectos()
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  if(!proyecto?._id && !cargando && alerta.msg) return <Alerta alerta={alerta}/>

  return (
    cargando ? <Spinner/> :
    <>
        
        <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>
        <div className="mt-10 flex justify-center">
            <FormularioColaborador/>
        </div>
        {cargandoColab ? <Spinner/> : colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">Resultado: </h2>
              <div className="flex justify-between items-center">
                <p className="text-bold text-black text-xl">{colaborador.nombre}</p>
                <button
                  type="button"
                  className="bg-slate-500 hover:bg-slate-600 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() => agregarColaborador({
                    email: colaborador.email
                  })}
                >Agregar al Proyecto</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default NuevoColaborador