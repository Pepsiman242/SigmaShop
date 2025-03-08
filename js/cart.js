// carrito.js

// Verificar si ya hay un carrito en localStorage o inicializar uno vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        // Solo se actualiza la cantidad sin mostrar la alerta
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
        alert(`${nombre} se agregó al carrito`);  // Muestra mensaje solo cuando el producto es nuevo
    }

    actualizarLocalStorage();
    mostrarCarrito();  // Actualizar la vista del carrito
}

// Función para restar una unidad o eliminar si queda una sola
function restarDelCarrito(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            carrito = carrito.filter(item => item.id !== id);
        }
        actualizarLocalStorage();
        mostrarCarrito();
    }
}

// Función para eliminar un producto del carrito completamente
function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarLocalStorage();
    mostrarCarrito();
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarLocalStorage();
    mostrarCarrito();
}

// Función para actualizar el LocalStorage
function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para calcular y mostrar el total
function mostrarTotal() {
    const totalElemento = document.getElementById('total');
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });

    totalElemento.innerText = `$${total.toLocaleString()}`;
}

// Función para mostrar el carrito en carrito.html
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
        document.getElementById('total').innerText = '$0';
        return;
    }

    carrito.forEach(producto => {
        carritoContainer.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: auto;">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')">+</button>
                <button onclick="restarDelCarrito(${producto.id})">-</button>
                <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </div>
        `;
    });

    mostrarTotal(); // Mostrar total al renderizar el carrito
}

// Cargar carrito al cargar la página en carrito.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('carrito.html')) {
        mostrarCarrito();
    }
});





