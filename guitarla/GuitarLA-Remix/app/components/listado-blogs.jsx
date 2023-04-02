import Blog from '~/components/blog'

export default function ListadoBlogs({blogs}) {
  console.log(blogs[0].attributes);
  return (
    <>
        <h2 className="heading">Blog</h2>
        <div className="blog">
            {blogs.map(blog => (
            <Blog
                key={blog?.id}
                blog={blog?.attributes}
            />
            ))}
        </div>
    </>
  )
}
