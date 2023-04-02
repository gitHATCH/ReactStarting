export async function getBlogs() {
    const respuesta = await fetch(`${process.env.API_URL}/blogs?populate=imagen`)
    const resultado = await respuesta.json()
    return resultado
}
export async function getBlog(url) {
    const respuesta = await fetch(`${process.env.API_URL}/blogs?filters[url]=${url}&populate=imagen`)
    const resultado = await respuesta.json()
    return resultado
}