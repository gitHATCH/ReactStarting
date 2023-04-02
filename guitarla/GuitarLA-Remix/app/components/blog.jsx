import {Link} from '@remix-run/react'
import {formatearFecha} from '../utils/helpers'

export default function Blog({blog}) {
    const {contenido,imagen,titulo,url,publishedAt} = blog
    console.log("titulo");
  return (
    <article className='post'>
        <img className="imagen" src={imagen.data.attributes.formats.medium.url} alt={`Imagen blog ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className='fecha'>{formatearFecha(publishedAt)}</p>
            <p className='resumen'>{contenido}</p>
            <Link className='enlace' to={`/blog/${url}`}>Leer blog</Link>
        </div>
    </article>
  )
}