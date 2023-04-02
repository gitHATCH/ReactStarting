import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {crearNuevoProductoAction} from '../actions/productoActions';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = ({history}) => {


    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const cargando = useSelector((state) => state.productos.loading)
    const error = useSelector((state) => state.productos.error)
    const alerta = useSelector((state) => state.alerta.alerta)


    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));
    const mostrarAlerta = (alerta) => dispatch(mostrarAlertaAction(alerta));
    const ocultarAlerta = () => dispatch(ocultarAlertaAction());


    const handleSubmit = (e) => {

        e.preventDefault();
        
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            mostrarAlerta(alerta)
            setTimeout(() => {
                ocultarAlerta()
            }, 3000);
            return;
        }
        
        ocultarAlerta()
        agregarProducto({
            nombre,
            precio
        });
        
        navigate("/")

    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className='alert alert-danger p2 mt-4 text-center'>Se ha encontrado un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;