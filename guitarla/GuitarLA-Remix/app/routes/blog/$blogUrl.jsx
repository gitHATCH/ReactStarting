import {useLoaderData,Link} from '@remix-run/react'
import {getBlog} from '../../models/blogs.server'
import {formatearFecha} from '../../utils/helpers'

export async function loader({params}){
    const {blogUrl} = params;
    const blog = await getBlog(blogUrl)
    if(blog.data.length === 0){
        throw new Response('',{
            status: 404,
            statusText: 'blog No Encontrado'
        })
    }
    return blog
}

export function meta({data}) {
    if(!data){
        return {
            title: `GuitarLA - blog No Encontrado`,
            description: "Blog del mundo de las guitarras, blog no encontrado"
        }
    }
    return {
        title: `GuitarLA - ${data.data[0].attributes.titulo}`,
        description: "Blog del mundo de las guitarras, blog ${data.data[0].attributes.titulo}"
    } 
  }

function blogUrl() {
    const blog = useLoaderData()
    const {titulo,contenido,imagen,publishedAt} = blog.data[0].attributes
  return (
    <article className='post mt-3'>
        <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`} />
        <div className='contenido'>
            <h3>{titulo}</h3>
            <p className='fecha'>{formatearFecha(publishedAt)}</p>
            <p className='texto'>{contenido}</p>
            <div>
                <Link className='enlace' to={'/blog'}>Regresar</Link>
            </div>
        </div>
    </article>
  )
}

export default blogUrl