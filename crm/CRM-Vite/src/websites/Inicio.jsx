import { useEffect, useState } from "react"
import Cliente from "../components/Cliente"

const Inicio = () => {

  const [clientes, setClientes] = useState([])
/*
  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try{
        const url = import.meta.env.VITE_API_URL
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
      }catch(e){
        console.log("Error");
      } 
    }
    obtenerClientesAPI()
  }, [])*/

  useEffect(() => {
    const obtenerClientes = async () => {
      try{
        const url = "http://localhost:1337/api/clientes"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado.data)
      }catch(e){
        console.log("Error");
      } 
    }
    obtenerClientes()
  }, [])
  
  const handleEliminar = async (id) => {
    const confirmar = confirm('Deseas eliminar este cliente?')
    if(confirmar){
      try{
        const url = `http://localhost:1337/api/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        await respuesta.json()
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)
      }catch(e){
        console.log(e);
      }
    }
  }

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente.attributes}
              id={cliente.id}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Inicio