// ============================
// 🧠 CONFIG
// ============================
const TELEFONO = "59800000000"; // CAMBIAR

// ============================
// 🌿 PRODUCTOS
// ============================
const PRODUCTOS = [
    // 🌱 INTERIOR
    { nombre: "Dracena", precio: 260, categoria: "interior" },
    { nombre: "Triostar", precio: 450, categoria: "interior" },
    { nombre: "Ficus Burgundy", precio: 1190, categoria: "interior" },
    { nombre: "Monstera Deliciosa", precio: 1290, categoria: "interior" },
    { nombre: "Pothos Brasil", precio: 490, categoria: "interior" },
    { nombre: "Calathea", precio: 650, categoria: "interior" },
    { nombre: "Diafenbachia Plata", precio: 650, categoria: "interior" },
    { nombre: "Monstera Adansoni", precio: 490, categoria: "interior" },
    { nombre: "Philodendro Plata", precio: 790, categoria: "interior" },
    { nombre: "Sanseveria", precio: 520, categoria: "interior" },
    { nombre: "Singonium", precio: 450, categoria: "interior" },
    { nombre: "Calathea Macoyana", precio: 650, categoria: "interior" },
    { nombre: "Calathea Zebrina", precio: 550, categoria: "interior" },
    { nombre: "Ficus Tineke", precio: 1300, categoria: "interior" },
    { nombre: "Camila", precio: 490, categoria: "interior" },
    { nombre: "Lirios de la Paz", precio: 680, categoria: "interior" },
    { nombre: "Philodendro Guaimbe", precio: 690, categoria: "interior" },
    { nombre: "Philodendro Birkin", precio: 720, categoria: "interior" },

    // 🌳 EXTERIOR
    { nombre: "Pata de Elefante", precio: 790, categoria: "exterior" },
    { nombre: "Shiflera", precio: 250, categoria: "exterior" },
    { nombre: "Chamadorea", precio: 430, categoria: "exterior" },
    { nombre: "Croton", precio: 600, categoria: "exterior" },
    { nombre: "Ficus Elastica", precio: 1200, categoria: "exterior" },

    // 🌺 EXÓTICAS
    { nombre: "Aglonema", precio: 590, categoria: "exoticas" },
    { nombre: "Aglonema Premium", precio: 790, categoria: "exoticas" },
    { nombre: "Singonium Rosa", precio: 590, categoria: "exoticas" },
    { nombre: "Alocasia Picoliny", precio: 720, categoria: "exoticas" },
    { nombre: "Alocasia Black Velvet", precio: 490, categoria: "exoticas" },
    { nombre: "Alocasia Crupea", precio: 750, categoria: "exoticas" }
];

// ============================
// 🛒 ESTADO
// ============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ============================
// 📦 SELECTORES
// ============================
const listaCarrito = document.getElementById("lista-carrito");
const btnWhatsapp = document.getElementById("btn-whatsapp");
const buscador = document.getElementById("buscador");

// ============================
// 🚀 INIT (ARREGLADO)
// ============================
document.addEventListener("DOMContentLoaded", () => {
    renderProductos();
    renderCarrito();
});

// ============================
// 🧱 RENDER PRODUCTOS
// ============================
function renderProductos() {

    const contenedores = {
        interior: document.getElementById("productos-interior"),
        exterior: document.getElementById("productos-exterior"),
        exoticas: document.getElementById("productos-exoticas")
    };

    PRODUCTOS.forEach(prod => {

        const contenedor = contenedores[prod.categoria];
        if (!contenedor) return;

        const card = document.createElement("article");
        card.classList.add("card-producto");

        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar">Agregar</button>
        `;

        contenedor.appendChild(card);
    });

    activarEventos(); // 🔥 importante
}

// ============================
// 🎯 EVENTOS
// ============================
function activarEventos() {

    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", agregarProducto);
    });

    if (btnWhatsapp) {
        btnWhatsapp.addEventListener("click", enviarPedido);
    }

    if (buscador) {
        buscador.addEventListener("input", filtrarProductos);
    }
}

// ============================
// ➕ AGREGAR PRODUCTO
// ============================
function agregarProducto(e) {

    const card = e.target.closest(".card-producto");

    const nombre = card.querySelector("h3").textContent;
    const precioTexto = card.querySelector("p").textContent;
    const precio = parseInt(precioTexto.replace("$", ""));

    const existente = carrito.find(p => p.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    renderCarrito();

    Swal.fire({
        title: "Agregado 🌿",
        text: nombre,
        icon: "success",
        timer: 900,
        showConfirmButton: false
    });
}

// ============================
// 🔄 RENDER CARRITO
// ============================
function renderCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
        return;
    }

    let total = 0;

    carrito.forEach((prod, index) => {

        total += prod.precio * prod.cantidad;

        const div = document.createElement("div");

        const nombre = document.createElement("span");
        nombre.textContent = prod.nombre;

        const controles = document.createElement("div");

        const btnMinus = document.createElement("button");
        btnMinus.textContent = "➖";
        btnMinus.addEventListener("click", () => restar(index));

        const qty = document.createElement("span");
        qty.textContent = prod.cantidad;

        const btnPlus = document.createElement("button");
        btnPlus.textContent = "➕";
        btnPlus.addEventListener("click", () => sumar(index));

        controles.append(btnMinus, qty, btnPlus);

        const precio = document.createElement("span");
        precio.textContent = `$${prod.precio * prod.cantidad}`;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "❌";
        btnDelete.addEventListener("click", () => eliminar(index));

        div.append(nombre, controles, precio, btnDelete);

        listaCarrito.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    listaCarrito.appendChild(totalDiv);
}

// ============================
// ➕ SUMAR
// ============================
function sumar(index) {
    carrito[index].cantidad++;
    guardarCarrito();
    renderCarrito();
}

// ============================
// ➖ RESTAR
// ============================
function restar(index) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    guardarCarrito();
    renderCarrito();
}

// ============================
// ❌ ELIMINAR
// ============================
function eliminar(index) {
    carrito.splice(index, 1);

    guardarCarrito();
    renderCarrito();

    Swal.fire({
        title: "Eliminado",
        icon: "warning",
        timer: 800,
        showConfirmButton: false
    });
}

// ============================
// 💾 LOCAL STORAGE
// ============================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ============================
// 🔍 BUSCADOR
// ============================
function filtrarProductos() {

    const texto = buscador.value.toLowerCase();
    const productos = document.querySelectorAll(".card-producto");

    let encontrados = 0;

    productos.forEach(prod => {

        const nombre = prod.querySelector("h3").textContent.toLowerCase();
        const info = prod.textContent.toLowerCase();

        if (nombre.includes(texto) || info.includes(texto)) {
            prod.style.display = "block";
            encontrados++;
        } else {
            prod.style.display = "none";
        }
    });

    mostrarSinResultados(encontrados);
}

// ============================
// ⚠️ SIN RESULTADOS
// ============================
function mostrarSinResultados(cantidad) {

    let mensaje = document.getElementById("sin-resultados");

    if (!mensaje) {
        mensaje = document.createElement("p");
        mensaje.id = "sin-resultados";
        mensaje.style.textAlign = "center";
        mensaje.style.marginTop = "20px";
        document.body.appendChild(mensaje);
    }

    mensaje.textContent =
        cantidad === 0 ? "No se encontraron productos 😢" : "";
}

// ============================
// 💬 WHATSAPP
// ============================
function enviarPedido() {

    if (carrito.length === 0) {
        Swal.fire("Carrito vacío", "Agregá productos", "error");
        return;
    }

    let mensaje = "🌿 *Pedido desde PlantStore* %0A%0A";
    let total = 0;

    carrito.forEach(p => {
        const subtotal = p.precio * p.cantidad;
        mensaje += `• ${p.nombre} x${p.cantidad} - $${subtotal}%0A`;
        total += subtotal;
    });

    mensaje += `%0A💰 *Total: $${total}*%0A`;
    mensaje += `%0AGracias!`;

    const url = `https://wa.me/${TELEFONO}?text=${mensaje}`;

    window.open(url, "_blank");
}