import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const editarProducto = (producto) => dispatch(editarProductoAction(producto));
    const productoEditar = useSelector((state) => state.productos.productoEditar)

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    useEffect(() => {
        setNombre(productoEditar.nombre)
        setPrecio(productoEditar.precio)
    }, [productoEditar])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(nombre.trim() === '' || precio <= 0){
            return;
        }
        editarProducto({
            ...productoEditar,
            nombre,
            precio
        })
        navigate('/')
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
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
                                    onChange={e => setPrecio(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;