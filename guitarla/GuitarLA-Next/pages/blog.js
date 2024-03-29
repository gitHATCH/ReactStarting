import Link from 'next/link'
import Layout from "../components/layout"
import Post from "../components/post"
import styles from '../styles/grid.module.css'

export default function Blog({posts}) {
  return (
    <Layout
      title={'Blog'}
      description="Blog de música, venta de guitarras, consejos, GuitarLA"
    >
        <main className="contenedor">
            <h1 className="heading">Blog</h1>
            <div className={styles.grid}>
                {posts?.map(post => (
                    <Post
                      key={post.id}
                      post={post.attributes}
                    />
                ))}
            </div>
            <Link href={`/`}>
              <a className='enlace'>
                  Regresar
              </a>
            </Link>
        </main>
    </Layout>
  )
}

 export async function getStaticProps() {
    const respuesta = await fetch(`${process.env.API_URL}/blogs?populate=imagen`)
    const {data: posts} = await respuesta.json() 
    return {
      props: {
        posts
      }
    }
}
