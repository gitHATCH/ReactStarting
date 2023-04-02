import {useLoaderData} from '@remix-run/react'
import ListadoGuitarras from '~/components/listado-guitarras'
import ListadoBlogs from '~/components/listado-blogs'
import Curso from '~/components/curso'
import {getGuitarras} from '../models/guitarras.server'
import {getBlogs} from '../models/blogs.server'
import {getCurso} from '../models/curso.server'
import stylesGuitarras from '../styles/guitarras.css'
import stylesBlogs from '../styles/blog.css'
import stylesCurso from '../styles/curso.css'

export function meta() {
  return {
      title: 'GuitarLA',
      description: "Venta de guitarras, blogs y cursos!"
  } 
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesBlogs
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader(){
  const [guitarras,blogs,curso] = await Promise.all([
    getGuitarras(),
    getBlogs(),
    getCurso()
  ])
  return {
    guitarras: guitarras.data,
    blogs: blogs.data,
    curso: curso.data
  }
  }


function Index() {
  const {guitarras,blogs,curso} = useLoaderData()
  return (
    <>
      <main className='contenedor'>
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>
      <Curso
        curso={curso?.attributes}
      />
      <section className='contenedor'>
        <ListadoBlogs
          blogs={blogs}
        />
      </section>
    </>
  )
}

export default Index