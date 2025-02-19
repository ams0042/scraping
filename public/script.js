document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Cargar productos solo si estamos en index.html
        const contenedorProductos = document.querySelector(".productos");
        const searchInput = document.getElementById("searchInput");
        
        if (contenedorProductos) {
            const responseProductos = await fetch("http://localhost:3000/productos");
            if (!responseProductos.ok) {
                throw new Error("Error al obtener los productos");
            }
            const productos = await responseProductos.json();
            
            const mostrarProductos = (filtro = "") => {
                contenedorProductos.innerHTML = "";
                productos.filter(producto => producto.titulo.toLowerCase().includes(filtro.toLowerCase()))
                         .forEach(producto => {
                             const div = document.createElement("div");
                             div.classList.add("producto");
                             div.innerHTML = `
                                 <img src="${producto.imagen}" alt="${producto.titulo}">
                                 <h2>${producto.titulo}</h2>
                                 <p>${producto.precio}</p>
                             `;
                             contenedorProductos.appendChild(div);
                         });
            };
            
            mostrarProductos();
            
            searchInput.addEventListener("input", (event) => {
                mostrarProductos(event.target.value);
            });
        }

        // Cargar noticias RSS solo si estamos en noticias.html
        const contenedorNoticias = document.querySelector(".noticias");
        if (contenedorNoticias) {
            const responseNoticias = await fetch("http://localhost:3000/noticias");
            if (!responseNoticias.ok) {
                throw new Error("Error al obtener las noticias");
            }
            const noticias = await responseNoticias.json();

            noticias.forEach(noticia => {
                const div = document.createElement("div");
                div.classList.add("noticia");
                div.innerHTML = `
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descripcion}</p>
                    <a href="${noticia.link}" target="_blank">Leer más</a>
                `;
                contenedorNoticias.appendChild(div);
            });
        }

        // Cargar noticias ATOM solo si estamos en noticias_atom.html
        const contenedorNoticiasAtom = document.querySelector(".noticias-atom");
        if (contenedorNoticiasAtom) {
            const responseNoticiasAtom = await fetch("http://localhost:3000/noticias-atom");
            if (!responseNoticiasAtom.ok) {
                throw new Error("Error al obtener las noticias ATOM");
            }
            const noticiasAtom = await responseNoticiasAtom.json();

            noticiasAtom.forEach(noticia => {
                const div = document.createElement("div");
                div.classList.add("noticia-atom");
                div.innerHTML = `
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descripcion}</p>
                    <a href="${noticia.link}" target="_blank">Leer más</a>
                `;
                contenedorNoticiasAtom.appendChild(div);
            });
        }

    } catch (error) {
        console.error("Error cargando datos:", error);
    }
});
