import React, {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';
import Spinner from './Spinner';

const Productos = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
    }, [])

    const productos = useSelector((state) => state.productos.productos)
    const error = useSelector((state) => state.productos.error)
    const cargando = useSelector((state) => state.productos.cargando)



    return ( 
        <>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>Se ha producido un error</p> : null}
            {cargando ? <Spinner/> : (
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? <tr><td><p>No hay productos</p></td></tr> : (
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
            )}
            
        </>
     );
}
 
export default Productos;