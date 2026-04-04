// ============================
// 🧠 CONFIG
// ============================
const TELEFONO = "59800000000"; // CAMBIAR

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
// 🚀 INIT
// ============================
document.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
    activarEventos();
});

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