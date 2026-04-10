// ============================
//  CONFIG
// ============================
const TELEFONO = "59891602323";

// ============================
// PRODUCTOS 
// ============================
let PRODUCTOS = [];

// ============================
// ESTADO
// ============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ============================
// SELECTORES
// ============================
const listaCarrito = document.getElementById("lista-carrito");
const btnWhatsapp = document.getElementById("btn-whatsapp");
const buscador = document.getElementById("buscador");

// ============================
// INIT 
// ============================
document.addEventListener("DOMContentLoaded", async () => {

    await cargarProductos();

    renderProductos();
    renderCarrito();
    activarEventos();
    activarBotonesInsumos(); // ✅ NUEVO

    if (buscador) {
        buscador.addEventListener("input", filtrarProductos);
    }

    const saved = localStorage.getItem("viewMode") || "grid";
    setView(saved);
});

// ============================
//PRODUCTOS
// ============================
async function cargarProductos() {
    try {
        const ruta = window.location.pathname.includes("pages")
            ? "../productos.json"
            : "productos.json";

        const res = await fetch(ruta);

        if (!res.ok) throw new Error("Error en fetch");

        PRODUCTOS = await res.json();

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar los productos"
        });
    }
}

// ============================
// RENDER PRODUCTOS
// ============================
function renderProductos() {
    const contenedores = {
        interior: document.getElementById("productos-interior"),
        exterior: document.getElementById("productos-exterior"),
        exoticas: document.getElementById("productos-exoticas"),
        insumos: document.getElementById("productos-insumos")
    };

    Object.values(contenedores).forEach(c => {
        if (c) c.innerHTML = "";
    });

    PRODUCTOS.forEach((prod, index) => {
        const contenedor = contenedores[prod.categoria];
        if (!contenedor) return;

        const card = document.createElement("article");
        card.classList.add("card-producto");

        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar">Agregar</button>
        `;

        card.addEventListener("click", () => abrirModal(prod));

        const btn = card.querySelector(".btn-agregar");
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            agregarAlCarrito(index);
        });

        contenedor.appendChild(card);
    });

    const saved = localStorage.getItem("viewMode") || "grid";
    setView(saved);
}

// ============================
// FILTRO
// ============================
function filtrarProductos(e) {
    const texto = e.target.value.toLowerCase();

    const filtrados = PRODUCTOS.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    renderLista(filtrados);
}

function renderLista(lista) {
    const contenedores = {
        interior: document.getElementById("productos-interior"),
        exterior: document.getElementById("productos-exterior"),
        exoticas: document.getElementById("productos-exoticas"),
        insumos: document.getElementById("productos-insumos")
    };

    Object.values(contenedores).forEach(c => {
        if (c) c.innerHTML = "";
    });

    lista.forEach(prod => {
        const contenedor = contenedores[prod.categoria];
        if (!contenedor) return;

        const card = document.createElement("article");
        card.classList.add("card-producto");

        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar">Agregar</button>
        `;

        card.addEventListener("click", () => abrirModal(prod));

        const btn = card.querySelector(".btn-agregar");
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const indexReal = PRODUCTOS.findIndex(p => p.nombre === prod.nombre);
            agregarAlCarrito(indexReal);
        });

        contenedor.appendChild(card);
    });

    const saved = localStorage.getItem("viewMode") || "grid";
    setView(saved);
}

// ============================
// MODAL
// ============================
function abrirModal(producto) {
    document.getElementById("modal-producto").style.display = "flex";

    document.getElementById("modal-img").src = producto.imagen;
    document.getElementById("modal-nombre").innerText = producto.nombre;
    document.getElementById("modal-precio").innerText = "$" + producto.precio;

    document.getElementById("modal-luz").innerText = "☀️ Luz: No especificado";
    document.getElementById("modal-riego").innerText = "💧 Riego: No especificado";
    document.getElementById("modal-desc").innerText = "Planta ideal para tu hogar 🌿";
}

function cerrarModal() {
    document.getElementById("modal-producto").style.display = "none";
}

// ============================
// VIEW TOGGLE
// ============================
function setView(mode) {
    const grids = document.querySelectorAll(".grid-productos");

    grids.forEach(container => {
        container.classList.remove("grid", "card");
        container.classList.add(mode);
    });

    localStorage.setItem("viewMode", mode);

    document.querySelectorAll(".view-toggle button").forEach(btn => {
        btn.classList.remove("active");
    });

    const btnActivo = document.querySelector(`.view-toggle button[onclick="setView('${mode}')"]`);
    if (btnActivo) btnActivo.classList.add("active");
}

// ============================
// CARRITO
// ============================
function agregarAlCarrito(index) {
    const producto = PRODUCTOS[index];

    const existe = carrito.find(item => item.nombre === producto.nombre);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();

    Swal.fire({
        title: "Agregado",
        text: producto.nombre,
        icon: "success",
        timer: 1200,
        showConfirmButton: false
    });
}

// ============================
// RENDER CARRITO + TOTAL
// ============================
function renderCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío 🌿</p>";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;

        const div = document.createElement("div");
        div.innerHTML = `
            <span>${item.nombre} - $${item.precio} x${item.cantidad}</span>
            
            <div>
                <button onclick="restar(${index})">➖</button>
                <button onclick="sumar(${index})">➕</button>
                <button onclick="eliminar(${index})">❌</button>
            </div>
        `;
        listaCarrito.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    listaCarrito.appendChild(totalDiv);
}

// ============================
// +- FUNCIONES
// ============================
function sumar(index) {
    carrito[index].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

function restar(index) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

function eliminar(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// ============================
// WHATSAPP
// ============================
function activarEventos() {
    if (!btnWhatsapp) return;

    btnWhatsapp.addEventListener("click", () => {
        if (carrito.length === 0) return;

        let mensaje = "Pedido:\n";
        carrito.forEach(p => {
            mensaje += `${p.nombre} x${p.cantidad}\n`;
        });

        window.open(`https://wa.me/${TELEFONO}?text=${encodeURIComponent(mensaje)}`);
    });
}

// ============================
// INSUMOS (HTML)
// ============================
function activarBotonesInsumos() {
    const insumos = document.querySelectorAll(".item-insumo");

    insumos.forEach(item => {
        const nombre = item.querySelector("h4").innerText;
        const precioTexto = item.querySelector("p").innerText;
        const precio = parseInt(precioTexto.replace(/\D/g, ""));

        const btn = item.querySelector(".btn-agregar");

        btn.addEventListener("click", () => {
            const existe = carrito.find(p => p.nombre === nombre);

            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push({
                    nombre,
                    precio,
                    cantidad: 1
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();

            Swal.fire({
                title: "Agregado",
                text: nombre,
                icon: "success",
                timer: 1200,
                showConfirmButton: false
            });
        });
    });
}
// ============================
// DESTACADOS INDEX
// ============================
document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".destacados .btn-agregar");

    botones.forEach((btn) => {

        btn.addEventListener("click", (e) => {

            const card = e.target.closest(".card-producto");

            const nombre = card.querySelector("h3").innerText;
            const precioTexto = card.querySelector("p").innerText;
            const precio = parseInt(precioTexto.replace(/\D/g, ""));

            const existe = carrito.find(p => p.nombre === nombre);

            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push({
                    nombre,
                    precio,
                    cantidad: 1
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();

            Swal.fire({
                title: "Agregado",
                text: nombre,
                icon: "success",
                timer: 1200,
                showConfirmButton: false
            });

        });

    });

});