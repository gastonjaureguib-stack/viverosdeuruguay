// ============================
// 🧠 CONFIG
// ============================
const TELEFONO = "59800000000";

// ============================
// 🔧 HELPER IMG
// ============================
function getImg(nombre) {
    return `img/plantas/${nombre.toLowerCase().replaceAll(" ", "-")}.jpg`;
}

// ============================
// 🌿 PRODUCTOS
// ============================
const PRODUCTOS = [
    // 🌱 INTERIOR
    { nombre: "Dracena", precio: 260, categoria: "interior", imagen: "../img/plantas/dracena.png" },
    { nombre: "Triostar", precio: 450, categoria: "interior", imagen: "../img/plantas/triostar.png" }, // ⚠️ si no existe, cambiá nombre
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
    { nombre: "Shiflera", precio: 250, categoria: "exterior", imagen: "../img/plantas/shiflera.png" }, // ⚠️ si no existe
    { nombre: "Chamadorea", precio: 430, categoria: "exterior", imagen: "../img/plantas/chamadorea.png" },
    { nombre: "Croton", precio: 600, categoria: "exterior", imagen: "../img/plantas/croton.png" },
    { nombre: "Ficus Elastica", precio: 1200, categoria: "exterior", imagen: "../img/plantas/ficuselastica.png" },

    // 🌺 EXÓTICAS
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
                 onerror="this.src='img/plantas/default.jpg'">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar">Agregar</button>
        `;

        contenedor.appendChild(card);
    });

    activarEventos();
}