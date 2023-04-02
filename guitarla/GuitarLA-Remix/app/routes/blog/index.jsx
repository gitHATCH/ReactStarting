import {useLoaderData, Link} from '@remix-run/react'
import {getBlogs} from '~/models/blogs.server'
import ListadoBlogs from '~/components/listado-blogs'

export function meta() {
  return {
      title: 'GuitarLA - Nuestro Blog',
      description: "Blog del mundo de las guitarras"
  } 
}

export async function loader(){
  const blogs = await getBlogs()
  return blogs.data
}

function Blog() {
  const blogs = useLoaderData()
  return (
    <>
      <ListadoBlogs
          blogs={blogs}
      />
      <div>
        <Link className='enlace' to={'/'}>Regresar</Link>
      </div>
    </>
     
  )
}

export default Blog