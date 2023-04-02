import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_ERROR,
    PRODUCTO_ELIMINAR_EXITO,
    COMENZAR_EDICION_PRODUCTO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
       dispatch(agregarProducto())
       try {
            await clienteAxios.post("/productos", producto)
            dispatch(agregarProductoExito(producto))
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )

       } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true))
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Se ha producido un error, intenta de nuevo'
            })
       }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos())
        try {
            const respuesta = await clienteAxios.get("/productos")
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError(true))
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = (estado) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
})

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError(true))
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
})
const eliminarProductoError = (estado) => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: estado
})

export function obtenerProductoEditarAction(producto){
    return (dispatch) => {
        dispatch(obtenerProductoEditar(producto))
    }
}

const obtenerProductoEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
            await clienteAxios.put(`/productos/${producto.id}`,producto)
            dispatch(editarProductoExito(producto))
            Swal.fire(
                'Producto Editado!',
                'El producto se editó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError(true))
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})
const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})
const editarProductoError = (estado) => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: estado
})