import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import {useLocation,Link} from 'react-router-dom'

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  const location = useLocation()

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:1337/api/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado.data);
      } catch (e) {
        console.log("Error");
      }
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente: {cliente.attributes.nombre}
      </h1>
      <p className="mt-3">Informacion del cliente</p>
      {cliente.attributes.nombre && (
        <p className="text-4xl text-gray-600 mt-10">
          <span className="text-gray-800 uppercase font-bold">Cliente: </span>
          {cliente.attributes.nombre}
        </p>
      )}

      {cliente.attributes.email && (
        <p className="text-2xl text-gray-600 mt-10">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {cliente.attributes.email}
        </p>
      )}

      {cliente.attributes.telefono && (
        <p className="text-2xl text-gray-600 mt-10">
          <span className="text-gray-800 uppercase font-bold">Telefono: </span>
          {cliente.attributes.telefono}
        </p>
      )}

      {cliente.attributes.empresa && (
        <p className="text-2xl text-gray-600 mt-10">
          <span className="text-gray-800 uppercase font-bold">Empresa: </span>
          {cliente.attributes.empresa}
        </p>
      )}

      {cliente.attributes.notas && (
        <p className="text-2xl text-gray-600 mt-10">
          <span className="text-gray-800 uppercase font-bold">Notas: </span>
          {cliente.attributes.notas}
        </p>
      )}
      <div>
        <button className="">
          <Link 
            to="/clientes/"
            className={`text-blue-300 text-2xl block mt-2 hover:text-blue-600`}
          >Volver</Link>
        </button>
      </div>
      
    </div>
  );
};

export default VerCliente;
