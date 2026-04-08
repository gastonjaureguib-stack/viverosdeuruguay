// ============================
// 🧠 CONFIG
// ============================
const TELEFONO = "59891602323";

// ============================
// 🌿 PRODUCTOS
// ============================
const PRODUCTOS = [
    { nombre: "Dracena", precio: 260, categoria: "interior", imagen: "../img/plantas/dracena.png" },
    { nombre: "Triostar", precio: 450, categoria: "interior", imagen: "../img/plantas/triostar.png" },
    { nombre: "Ficus Burgundy", precio: 1190, categoria: "interior", imagen: "../img/plantas/ficusburgundy.png" },
    { nombre: "Monstera Deliciosa", precio: 1290, categoria: "interior", imagen: "../img/plantas/monsteradeliciosa.png" },
    { nombre: "Pothos Brasil", precio: 490, categoria: "interior", imagen: "../img/plantas/pothosbrasil.png" },
    { nombre: "Calathea", precio: 650, categoria: "interior", imagen: "../img/plantas/calathea.png" },
    { nombre: "Diafenbachia Plata", precio: 650, categoria: "interior", imagen: "../img/plantas/diafenbachiaplata.png" },
    { nombre: "Monstera Adansoni", precio: 490, categoria: "interior", imagen: "../img/plantas/monsteraadansoni.png" },
    { nombre: "Philodendro Plata", precio: 790, categoria: "interior", imagen: "../img/plantas/philodendroplata.png" },
    { nombre: "Sanseveria", precio: 520, categoria: "interior", imagen: "../img/plantas/sanseveria.png" },
    { nombre: "Singonium", precio: 450, categoria: "interior", imagen: "../img/plantas/singoniumrosa.png" },
    { nombre: "Calathea Macoyana", precio: 650, categoria: "interior", imagen: "../img/plantas/calatheamacoyana.png" },
    { nombre: "Calathea Zebrina", precio: 550, categoria: "interior", imagen: "../img/plantas/calatheazebrina.png" },
    { nombre: "Ficus Tineke", precio: 1300, categoria: "interior", imagen: "../img/plantas/ficustineke.png" },
    { nombre: "Camila", precio: 490, categoria: "interior", imagen: "../img/plantas/camila.png" },
    { nombre: "Lirios de la Paz", precio: 680, categoria: "interior", imagen: "../img/plantas/liriosdelapaz.png" },
    { nombre: "Philodendro Guaimbe", precio: 690, categoria: "interior", imagen: "../img/plantas/philodendroguaimbe.png" },
    { nombre: "Philodendro Birkin", precio: 720, categoria: "interior", imagen: "../img/plantas/philodendrobirkin.png" },

    { nombre: "Pata de Elefante", precio: 790, categoria: "exterior", imagen: "../img/plantas/patadeelefante.png" },
    { nombre: "Shiflera", precio: 250, categoria: "exterior", imagen: "../img/plantas/shiflera.png" },
    { nombre: "Chamadorea", precio: 430, categoria: "exterior", imagen: "../img/plantas/chamadorea.png" },
    { nombre: "Croton", precio: 600, categoria: "exterior", imagen: "../img/plantas/croton.png" },
    { nombre: "Ficus Elastica", precio: 1200, categoria: "exterior", imagen: "../img/plantas/ficuselastica.png" },

    { nombre: "Aglonema", precio: 590, categoria: "exoticas", imagen: "../img/plantas/anglomena.png" },
    { nombre: "Aglonema Premium", precio: 790, categoria: "exoticas", imagen: "../img/plantas/aglonemapremium.png" },
    { nombre: "Singonium Rosa", precio: 590, categoria: "exoticas", imagen: "../img/plantas/singoniumrosa.png" },
    { nombre: "Alocasia Picoliny", precio: 720, categoria: "exoticas", imagen: "../img/plantas/alocasiapicoliny.png" },
    { nombre: "Alocasia Black Velvet", precio: 490, categoria: "exoticas", imagen: "../img/plantas/alocasiablackvelvet.png" },
    { nombre: "Alocasia Crupea", precio: 750, categoria: "exoticas", imagen: "../img/plantas/alocasiacrupea.png" }
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
// 🚀 INIT
// ============================
document.addEventListener("DOMContentLoaded", () => {
    renderProductos();
    renderCarrito();
    activarEventos();

    buscador.addEventListener("input", filtrarProductos);

    // 👉 aplicar vista guardada
    const saved = localStorage.getItem("viewMode") || "grid";
    setView(saved);
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

    Object.values(contenedores).forEach(c => c.innerHTML = "");

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

    // 👉 aplicar vista después de render
    const saved = localStorage.getItem("viewMode") || "grid";
    setView(saved);
}

// ============================
// 🔍 FILTRO
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
        exoticas: document.getElementById("productos-exoticas")
    };

    Object.values(contenedores).forEach(c => c.innerHTML = "");

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
            agregarAlCarrito(PRODUCTOS.indexOf(prod));
        });

        contenedor.appendChild(card);
    });

    // 👉 aplicar vista después de filtro
    const saved = localStorage.getItem("viewMode") || "grid";
    setView(saved);
}

// ============================
// 🪴 MODAL
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
// 🔲 VIEW TOGGLE
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
// 🛒 CARRITO
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

function renderCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío 🌿</p>";
        return;
    }

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            ${item.nombre} x${item.cantidad} - $${item.precio}
            <button onclick="eliminar(${index})">X</button>
        `;
        listaCarrito.appendChild(div);
    });
}

function eliminar(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// ============================
// 📲 WHATSAPP
// ============================
function activarEventos() {
    btnWhatsapp.addEventListener("click", () => {
        if (carrito.length === 0) return;

        let mensaje = "Pedido:\n";
        carrito.forEach(p => {
            mensaje += `${p.nombre} x${p.cantidad}\n`;
        });

        window.open(`https://wa.me/${TELEFONO}?text=${encodeURIComponent(mensaje)}`);
    });
}