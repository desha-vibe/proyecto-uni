const LIMPIAR = "limpiar";
const HIDRATAR = "hidratar";
const PROTEGER = "proteger";
const TONIFICAR = "tonificar";

let pasoSeleccionado = TONIFICAR;

let productos = [
    {nombre: "Crema Hidratante", precio: 25.99, descripcion: "Hidrata y nutre tu piel todo el día.", paso: HIDRATAR},
    {nombre: "Sérum Antiedad", precio: 45.50, descripcion: "Reduce arrugas y mejora la elasticidad.", paso: TONIFICAR},
    {nombre: "Protector Solar SPF50", precio: 19.99, descripcion: "Protege tu piel de los rayos UV.", paso: PROTEGER},
    {nombre: "Limpiador Facial", precio: 15.75, descripcion: "Limpia profundamente sin resecar.", paso: LIMPIAR},
    {nombre: "Tónico Refrescante", precio: 12.30, descripcion: "Equilibra el pH y refresca la piel.", paso: TONIFICAR},
    {nombre: "Mascarilla de Arcilla", precio: 22.00, descripcion: "Desintoxica y purifica la piel.", paso: LIMPIAR},
    {nombre: "Crema Solar Facial", precio: 29.99, descripcion: "Protección solar ligera para el rostro.", paso: PROTEGER},
    {nombre: "Gel Hidratante", precio: 18.50, descripcion: "Hidratación ligera para pieles mixtas.", paso: HIDRATAR},
    {nombre: "Exfoliante Suave", precio: 14.20, descripcion: "Elimina células muertas y renueva la piel.", paso: LIMPIAR},
    {nombre: "Bruma Facial", precio: 16.80, descripcion: "Refresca e hidrata en cualquier momento.", paso: HIDRATAR},
    {nombre: "Crema de Noche Reparadora", precio: 34.99, descripcion: "Repara y regenera la piel mientras duermes.", paso: HIDRATAR},
    {nombre: "Spray Protector Solar", precio: 21.50, descripcion: "Fácil aplicación para protección rápida.", paso: PROTEGER},
];

function obtenerProductosPorPaso(paso) {
    return productos.filter(producto => producto.paso === paso);
};

function seleccionarPaso(paso) {
    pasoSeleccionado = paso;  
    return obtenerProductosPorPaso(pasoSeleccionado);
};

function obtenerIconoPaso(paso) {
    const iconos = {
        [LIMPIAR]: 'fa-soap',
        [HIDRATAR]: 'fa-tint',
        [PROTEGER]: 'fa-sun',
        [TONIFICAR]: 'fa-spray-can'
    };
    return iconos[paso] || 'fa-box';
}

function renderizarProductos(productosFiltrados) {
    const container = document.getElementById('productos-container');
    
    if (productosFiltrados.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-box-open" style="font-size:3rem;margin-bottom:1rem;display:block"></i>No hay productos en esta categoría</div>';
        return;
    }

    container.innerHTML = productosFiltrados.map(producto => `
        <div class="producto-card">
            <div class="producto-icon">
                <i class="fas ${obtenerIconoPaso(producto.paso)}"></i>
            </div>
            <div class="producto-paso">${producto.paso}</div>
            <h3 class="producto-nombre">${producto.nombre}</h3>
            <p class="producto-descripcion">${producto.descripcion}</p>
            <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
            <button class="btn-agregar" onclick="agregarAlCarrito('${producto.nombre}')">
                <i class="fas fa-shopping-cart"></i> Agregar al carrito
            </button>
        </div>
    `).join('');
};
const carrito = [];

function renderizarCarrito() {
    const carritoContainer = document.getElementById('carrito-items');
    const totalContainer = document.getElementById('carrito-total');
    const cantidadBadge = document.getElementById('carrito-cantidad');
    
    if (carrito.length === 0) {
        carritoContainer.innerHTML = '';
        totalContainer.innerHTML = '<span class="carrito-total-label">Total:</span><span class="carrito-total-monto">$0.00</span>';
        cantidadBadge.textContent = '0';
        return;
    }

    carritoContainer.innerHTML = carrito.map((item, index) => `
        <div class="carrito-item">
            <div class="carrito-item-info">
                <div class="carrito-item-nombre">${item.nombre}</div>
                <div class="carrito-item-precio">$${item.precio.toFixed(2)}</div>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})" title="Eliminar">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    totalContainer.innerHTML = `
        <span class="carrito-total-label">Total:</span>
        <span class="carrito-total-monto">$${total.toFixed(2)}</span>
    `;
    cantidadBadge.textContent = carrito.length;
}

function filtrarYMostrar(paso) {
    // Actualizar estado activo de botones
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filtrar y renderizar
    const productosFiltrados = seleccionarPaso(paso);
    renderizarProductos(productosFiltrados);
}

window.addEventListener('DOMContentLoaded', () => {
    const productosIniciales = seleccionarPaso(TONIFICAR);
    renderizarProductos(productosIniciales);
    renderizarCarrito();

    document.querySelector('.filter-buttons button:nth-child(4)').classList.add('active');
});


function agregarAlCarrito(nombreProducto) {
    const producto = productos.find(p => p.nombre === nombreProducto);
    if (producto) {
        carrito.push(producto);
        renderizarCarrito();
        
        // Animación visual de feedback
        const mensaje = document.createElement('div');
        mensaje.style.cssText = 'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:15px 20px;border-radius:8px;z-index:9999;animation:slideIn 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.2)';
        mensaje.innerHTML = `<i class="fas fa-check-circle"></i> "${nombreProducto}" agregado al carrito`;
        document.body.appendChild(mensaje);
        
        setTimeout(() => {
            mensaje.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => mensaje.remove(), 300);
        }, 2000);
    }
}

function eliminarDelCarrito(index) {
    const productoEliminado = carrito[index];
    carrito.splice(index, 1);
    renderizarCarrito();
    
    // Feedback visual
    const mensaje = document.createElement('div');
    mensaje.style.cssText = 'position:fixed;top:20px;right:20px;background:#ff6b6b;color:white;padding:15px 20px;border-radius:8px;z-index:9999;animation:slideIn 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.2)';
    mensaje.innerHTML = `<i class="fas fa-trash"></i> "${productoEliminado.nombre}" eliminado`;
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => mensaje.remove(), 300);
    }, 1500);
}

function vaciarCarrito() {
    if (carrito.length === 0) return;
    
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito.length = 0;
        renderizarCarrito();
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos para continuar.');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    const listaProductos = carrito.map(item => `• ${item.nombre} - $${item.precio.toFixed(2)}`).join('\n');
    
    alert(`🎉 ¡Compra realizada con éxito!\n\nProductos:\n${listaProductos}\n\nTotal: $${total.toFixed(2)}\n\n¡Gracias por tu compra!`);
    
    carrito.length = 0;
    renderizarCarrito();
}

// Inicializar con filtro desde URL si existe
function inicializarDesdeFiltroURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filtro = urlParams.get('filtro');
    
    const filtrosValidos = [LIMPIAR, HIDRATAR, PROTEGER, TONIFICAR];
    
    if (filtro && filtrosValidos.includes(filtro)) {
        pasoSeleccionado = filtro;
        filtrarYMostrar(filtro);
        
        // Resaltar el botón de filtro activo
        const botones = document.querySelectorAll('.filter-buttons button');
        botones.forEach(btn => {
            const textoBoton = btn.textContent.toLowerCase();
            if (textoBoton.includes(filtro)) {
                btn.style.backgroundColor = '#B90DE2';
                btn.style.color = 'white';
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', inicializarDesdeFiltroURL);

// Inicializar con filtro desde URL si existe
function inicializarDesdeFiltroURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filtro = urlParams.get('filtro');
    
    // Validar que el filtro sea válido
    const filtrosValidos = [LIMPIAR, HIDRATAR, PROTEGER, TONIFICAR];
    
    if (filtro && filtrosValidos.includes(filtro)) {
        // Aplicar el filtro automáticamente
        pasoSeleccionado = filtro;
        filtrarYMostrar(filtro);
        
        // Resaltar visualmente el botón de filtro activo
        const botones = document.querySelectorAll('.filter-buttons button');
        botones.forEach(btn => {
            const textoBoton = btn.textContent.toLowerCase();
            if (textoBoton.includes(filtro)) {
                btn.style.backgroundColor = '#B90DE2';
                btn.style.color = 'white';
            }
        });
    }
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', inicializarDesdeFiltroURL);