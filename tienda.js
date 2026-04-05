// ============================
// 🧠 CONFIG
// ============================
const TELEFONO = "59800000000";

// ============================
// 🌿 PRODUCTOS
// ============================
const PRODUCTOS = [
    // 🌱 INTERIOR
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

    // 🌳 EXTERIOR
    { nombre: "Pata de Elefante", precio: 790, categoria: "exterior", imagen: "../img/plantas/patadeelefante.png" },
    { nombre: "Shiflera", precio: 250, categoria: "exterior", imagen: "../img/plantas/shiflera.png" },
    { nombre: "Chamadorea", precio: 430, categoria: "exterior", imagen: "../img/plantas/chamadorea.png" },
    { nombre: "Croton", precio: 600, categoria: "exterior", imagen: "../img/plantas/croton.png" },
    { nombre: "Ficus Elastica", precio: 1200, categoria: "exterior", imagen: "../img/plantas/ficuselastica.png" },

    // 🌺 EXÓTICAS
    { nombre: "Aglonema", precio: 590, categoria: "exoticas", imagen: "../img/plantas/anglomena.png" },
    { nombre: "Aglonema Premium", precio: 790, categoria: "exoticas", imagen: "../img/plantas/aglonemapremium.png" },
    { nombre: "Singonium Rosa", precio: 590, categoria: "exoticas", imagen: "../img/plantas/singoniumrosa.png" },
    { nombre: "Alocasia Picoliny", precio: 720, categoria: "exoticas", imagen: "../img/plantas/alocasiapicoliny.png" },
    { nombre: "Alocasia Black Velvet", precio: 490, categoria: "exoticas", imagen: "../img/plantas/alocasiablackvelvet.png" },
    { nombre: "Alocasia Crupea", precio: 750, categoria: "exoticas", imagen: "../img/plantas/alocasiacrupea.png" },
    
    // 🪴 INSUMOS
{ nombre: "Regador de jardín", precio: 1500, categoria: "insumos", imagen: "./img/insumos/regador.png" },
{ nombre: "Fibra de coco 180g", precio: 250, categoria: "insumos", imagen: "./img/insumos/fibracoco.png" },
{ nombre: "Tierra 15kg", precio: 250, categoria: "insumos", imagen: "./img/insumos/bolsadetierra.png" },
{ nombre: "Maceta 1", precio: 200, categoria: "insumos", imagen: "./img/insumos/maceta1.png" },
{ nombre: "Maceta 2", precio: 250, categoria: "insumos", imagen: "./img/insumos/maceta2.png" },
{ nombre: "Maceta 3", precio: 500, categoria: "insumos", imagen: "./img/insumos/maceta3.png" },
{ nombre: "Tutores mix", precio: 200, categoria: "insumos", imagen: "./img/insumos/tutores.png" },

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
            <img src="${prod.imagen}" alt="${prod.nombre}" 
                 onerror="this.src='../img/plantas/default.jpg'">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar">Agregar</button>
        `;

        contenedor.appendChild(card);
    });

    activarEventos();
}

// ============================
// 🛠 ACTIVAR EVENTOS
// ============================
function activarEventos() {
    const btnsAgregar = document.querySelectorAll(".btn-agregar");
    btnsAgregar.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            agregarAlCarrito(index);
        });
    });

    btnWhatsapp.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "Carrito vacío",
                text: "Agrega productos antes de enviar tu pedido",
                icon: "warning",
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        let mensaje = "Hola! Quiero hacer un pedido de PlantStore:\n\n";
        carrito.forEach(item => {
            mensaje += `- ${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}\n`;
        });
        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        mensaje += `\nTotal: $${total}`;

        const url = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    });
}

// ============================
// 🛒 AGREGAR AL CARRITO
// ============================
function agregarAlCarrito(index) {
    const producto = PRODUCTOS[index];

    const existe = carrito.find(item => item.nombre === producto.nombre);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();

    if (typeof Swal !== "undefined") {
        Swal.fire({
            title: "Agregado al carrito",
            text: `${producto.nombre} se ha agregado correctamente`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    }
}

// ============================
// 🛒 RENDER CARRITO
// ============================
function renderCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío 🌿</p>";
        return;
    }

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");

        div.innerHTML = `
            <div class="item-info">
                <span class="nombre">${item.nombre}</span>
                <span class="precio">$${item.precio}</span>
            </div>
            <div class="item-cantidad">
                <button class="restar" data-index="${index}">-</button>
                <span class="cantidad">${item.cantidad}</span>
                <button class="sumar" data-index="${index}">+</button>
            </div>
            <button class="eliminar" data-index="${index}">X</button>
        `;

        listaCarrito.appendChild(div);
    });

    // Total
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const divTotal = document.createElement("div");
    divTotal.classList.add("total-carrito");
    divTotal.textContent = `Total: $${total}`;
    listaCarrito.appendChild(divTotal);

    activarBotonesCarrito();
}

function activarBotonesCarrito() {
    // Botón eliminar
    listaCarrito.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
        });
    });

    // Botón sumar
    listaCarrito.querySelectorAll(".sumar").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            carrito[index].cantidad += 1;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
        });
    });

    // Botón restar
    listaCarrito.querySelectorAll(".restar").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad -= 1;
            } else {
                carrito.splice(index, 1); // si llega a 0, elimina el producto
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
        });
    });
}

// ============================
// ⬆ BOTÓN VOLVER ARRIBA
// ============================
window.addEventListener("DOMContentLoaded", () => {
    const btnTop = document.getElementById("btn-top");
    if (!btnTop) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            btnTop.classList.add("show");
        } else {
            btnTop.classList.remove("show");
        }
    });

    btnTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});