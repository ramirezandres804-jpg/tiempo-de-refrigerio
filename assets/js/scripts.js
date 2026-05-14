// @ts-nocheck
// ============================================================
// TIEMPO DE REFRIGERIO - SCRIPTS UNIFICADOS (11 PÁGINAS)
// ============================================================

// ----- VARIABLES GLOBALES -----
const dominiosValidos = [
    'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com',
    'icloud.com','hotmail.es', 'outlook.es', 'live.com',
    'msn.com', 'live.com.co', 'yahoo.com.co', 'une.net.co',
    'etb.net.co', 'claro.com.co', 'movistar.com.co', 'tigo.com.co',
    'proton.me', 'protonmail.com', 'zoho.com', 'mail.com',
    'sena.edu.co', 'misena.edu.co', 'edu.co'
];

// ============================================================
// 🌙 LÓGICA DEL BOTÓN DE TEMA OSCURO / CLARO
// ============================================================
function inicializarTema() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Aplicar tema guardado al cargar la página
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️';
        themeToggle.setAttribute('data-tooltip', 'Modo claro');
    } else {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('data-tooltip', 'Modo oscuro');
    }

    // Alternar tema al hacer clic
    themeToggle.addEventListener('click', function() {
        const esOscuro = document.body.hasAttribute('data-theme');
        
        if (esOscuro) {
            // Cambiar a modo claro
            document.body.removeAttribute('data-theme');
            themeToggle.innerHTML = '🌙';
            themeToggle.setAttribute('data-tooltip', 'Modo oscuro');
            localStorage.setItem('tema', 'light');
        } else {
            // Cambiar a modo oscuro
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '☀️';
            themeToggle.setAttribute('data-tooltip', 'Modo claro');
            localStorage.setItem('tema', 'dark');
        }
    });
}
// ============================================================
// FIN LÓGICA DEL BOTÓN DE TEMA OSCURO / CLARO
// ============================================================

// ----- OFF CANVAS MENÚ -----
function toggleOffcanvas() {
    const menu = document.getElementById('offcanvasMenu');
    const overlay = document.getElementById('offcanvasOverlay');
    if (!menu || !overlay) return;
    const isOpen = menu.classList.toggle('show');
    overlay.classList.toggle('show');
    menu.setAttribute('aria-hidden', !isOpen);
}

// ============================================================
// BUSCADOR UNIVERSAL OPTIMIZADO
// ============================================================
function normalizar(texto) {
    return texto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .trim();
}

// Distancia de Levenshtein para sugerencias
function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
            else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
    }
    return matrix[b.length][a.length];
}

// Estructura de rutas con keywords principales + sinónimos + destinos internos
const rutasBusqueda = [
    {
        destino: 'index.html',
        principales: ['inicio', 'home', 'principal', 'portada'],
        sinonimos: ['pagina principal', 'pagina de inicio', 'landing', 'raiz'],
        internos: ['refrigerio', 'tiempo de refrigerio']
    },
    {
        destino: 'menu.html',
        principales: ['menu', 'carta', 'comida', 'productos', 'platos', 'alimentos'],
        sinonimos: ['nuestra carta', 'listado', 'catalogo', 'alimentacion', 'viandas'],
        internos: ['empanada', 'empanadas', 'bunuelo', 'bunuelos', 'arepa', 'arepas', 'pastel', 'yuca', 'avena', 'tinto', 'perico', 'gaseosa', 'combo', 'refrigerio']
    },
    {
        destino: 'pedidos.html',
        principales: ['pedidos', 'pedido', 'orden', 'ordenar', 'carrito', 'comprar', 'solicitar', 'domicilio', 'delivery'],
        sinonimos: ['hacer pedido', 'realizar pedido', 'encargar', 'pedir', 'llamanos pedir', 'whatsapp pedido'],
        internos: ['pedir ya', 'ordenar ahora', 'domicilios']
    },
    {
        destino: 'pago.html',
        principales: ['metodos', 'metodos de pago', 'pago', 'pagar', 'metodo'],
        sinonimos: ['forma de pago', 'pagos', 'tarjeta', 'credito', 'debito', 'nequi', 'daviplata', 'pse', 'transferencia'],
        internos: []
    },
    {
        destino: 'horarios.html',
        principales: ['horarios', 'horario', 'atencion', 'abierto', 'cerrado', 'jornada'],
        sinonimos: ['horario de atencion', 'dias', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'cuando abren'],
        internos: []
    },
    {
        destino: 'contactanos.html',
        principales: ['contactanos', 'contacto', 'contactar', 'telefono', 'llamar', 'ubicacion', 'direccion'],
        sinonimos: ['llamanos', 'sede', 'bosa', 'bogota', 'mapa', 'cl 56', 'visitanos', 'donde estan'],
        internos: []
    },
    {
        destino: 'trabaja.html',
        principales: ['trabaja', 'trabajo', 'empleo', 'vacante', 'vacantes', 'postular'],
        sinonimos: ['trabaja con nosotros', 'curriculum', 'hoja de vida', 'postularse', 'unete al equipo'],
        internos: []
    },
    {
        destino: 'chat.html',
        principales: ['chat', 'linea', 'online', 'asesor', 'soporte', 'consulta'],
        sinonimos: ['chat en linea', 'chatea', 'chatear', 'hablar', 'asistente', 'mensaje', 'chat en', 'linea chat'],
        internos: []
    },
    {
        destino: 'nosotros.html',
        principales: ['quienes', 'somos', 'nosotros', 'historia', 'mision', 'vision', 'esencia', 'tradicion', 'equipo', 'empresa'],
        sinonimos: ['quienes somos', 'sobre nosotros', 'acerca de', 'conocenos', 'origen'],
        internos: ['ano 2029', 'fundacion']
    },
    {
        destino: 'registrate.html',
        principales: ['registrate', 'registro', 'registrarse', 'cuenta', 'perfil', 'inscribirse'],
        sinonimos: ['crear cuenta', 'usuario nuevo', 'unirse', 'ser cliente', 'afiliacion'],
        internos: []
    },
    {
        destino: 'ayuda.html',
        principales: ['ayuda', 'faq', 'preguntas', 'buzon', 'quejas', 'reclamos', 'solucion', 'dudas'],
        sinonimos: ['preguntas frecuentes', 'asistencia', 'problema', 'ayda', 'aydua', 'auda'],
        internos: []
    }
];

function buscarSitio() {
    const input = document.getElementById('buscadorPrincipal');
    if (!input) return;
    const raw = input.value.trim();
    if (raw === '') { alert('Por favor escribe algo para buscar.'); return; }
    const q = normalizar(raw);
    const palabrasConsulta = q.split(/\s+/).filter(p => p.length > 0);

    // 1. Coincidencia exacta / parcial con principales u sinonimos (prioridad máxima)
    for (const ruta of rutasBusqueda) {
        const todasClaves = [...ruta.principales, ...ruta.sinonimos];
        for (const clave of todasClaves) {
            const cNorm = normalizar(clave);
            // Coincidencia exacta
            if (q === cNorm) {
                window.location.href = ruta.destino;
                return;
            }
            // Coincidencia si la consulta está contenida o viceversa
            if (cNorm.includes(q) || q.includes(cNorm)) {
                // Verificar que no sea una coincidencia parcial muy corta que cause falsos positivos (ej: "en")
                if (q.length >= 3 || cNorm.length <= 4) {
                    window.location.href = ruta.destino;
                    return;
                }
            }
            // Coincidencia por palabras en cualquier orden (solo si clave tiene más de una palabra)
            const palabrasClave = cNorm.split(/\s+/);
            if (palabrasClave.length > 1 && palabrasConsulta.length > 1) {
                const todasPresentes = palabrasConsulta.every(p => palabrasClave.includes(p));
                if (todasPresentes) {
                    window.location.href = ruta.destino;
                    return;
                }
            }
        }
    }

    // 2. Búsqueda en destinos internos (empanada, misión, etc.) sin coincidir con principales ya revisados
    for (const ruta of rutasBusqueda) {
        for (const interno of ruta.internos) {
            const iNorm = normalizar(interno);
            if (q === iNorm || iNorm.includes(q) || q.includes(iNorm)) {
                window.location.href = ruta.destino;
                return;
            }
            const palabrasInterno = iNorm.split(/\s+/);
            if (palabrasInterno.length > 1 && palabrasConsulta.length > 1) {
                const todasInterno = palabrasConsulta.every(p => palabrasInterno.includes(p));
                if (todasInterno) {
                    window.location.href = ruta.destino;
                    return;
                }
            }
        }
    }

    // 3. Sugerencia por error de digitación (Levenshtein)
    let mejorDistancia = Infinity;
    let mejorPalabra = '';
    let mejorDestino = '';
    const todasLasOpciones = [];
    rutasBusqueda.forEach(r => {
        [...r.principales, ...r.sinonimos, ...r.internos].forEach(p => {
            todasLasOpciones.push({ palabra: p, destino: r.destino });
        });
    });

    for (const opcion of todasLasOpciones) {
        const dist = levenshtein(q, normalizar(opcion.palabra));
        if (dist < mejorDistancia) {
            mejorDistancia = dist;
            mejorPalabra = opcion.palabra;
            mejorDestino = opcion.destino;
        }
    }

    // Umbral de sugerencia: máximo 2 diferencias para palabras cortas, 3 para largas
    const umbral = q.length <= 5 ? 2 : 3;
    if (mejorDistancia <= umbral && mejorPalabra) {
        if (confirm(`Quizás quisiste decir "${mejorPalabra}".\n¿Quieres ir allí?`)) {
            window.location.href = mejorDestino;
            return;
        }
    }

    alert("No encontramos resultados para '" + raw + "'.\nIntenta con el nombre de un botón o palabra clave.");
}

// Unificar texto del botón de búsqueda a "OK" y asegurar funcionalidad
function unificarBotonBusqueda() {
    // Busca cualquier botón que contenga el texto "Buscar", "De acuerdo", "Ok", etc., y lo unifica
    const posibleBoton = document.querySelector('button[onclick="buscarSitio()"]');
    if (posibleBoton) {
        posibleBoton.innerHTML = '🔍 OK';
    }
    // También por si el botón tiene otro selector (seguro extra)
    const botones = document.querySelectorAll('button');
    botones.forEach(btn => {
        if (btn.innerText.trim().toLowerCase().includes('buscar') || 
            btn.innerText.trim().toLowerCase().includes('de acuerdo') ||
            btn.innerText.trim().toLowerCase() === 'ok') {
            btn.innerHTML = '🔍 OK';
            btn.setAttribute('onclick', 'buscarSitio()'); // asegurar acción
        }
    });
    // Asegurar que el input lance búsqueda con Enter
    const input = document.getElementById('buscadorPrincipal');
    if (input && !input.hasAttribute('data-enter-bound')) {
        input.setAttribute('data-enter-bound', 'true');
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') buscarSitio();
        });
    }
}

// ============================================================
// MAPA DE UBICACIÓN REAL
// ============================================================
function enlazarMapaReal() {
    const iframeMapa = document.querySelector('iframe[src*="google.com/maps"]');
    if (iframeMapa) {
        const direccion = encodeURIComponent('CL 56G NO 90B 59 SUR, Bosa, Bogotá, Colombia');
        iframeMapa.src = `https://www.google.com/maps?q=${direccion}&output=embed`;
    }
}

// ----- BUZÓN DE OPINIONES -----
function generarPreguntasBuzon() {
    const contenedor = document.getElementById('preguntas-contenedor');
    if (!contenedor) return;
    const preguntas = ["Atención al Cliente", "Tiempo del Pedido", "Sabor de Productos", "Uso de la Plataforma", "Limpieza y Presentación"];
    let html = '';
    preguntas.forEach(function(pregunta, index) {
        const id = index + 1;
        html +=
            '<div class="pregunta-block" id="block-' + id + '">' +
            '<p>' + id + '. ' + pregunta + '</p>' +
            '<div class="stars-container">' +
            '<label onclick="setVoto(' + id + ', 5, \'Excelente\')">★</label>' +
            '<label onclick="setVoto(' + id + ', 4, \'Muy Bueno\')">★</label>' +
            '<label onclick="setVoto(' + id + ', 3, \'Regular\')">★</label>' +
            '<label onclick="setVoto(' + id + ', 2, \'Malo\')">★</label>' +
            '<label onclick="setVoto(' + id + ', 1, \'Muy Malo\')">★</label>' +
            '</div>' +
            '<span class="resultado-texto" id="txt-' + id + '"></span>' +
            '</div>';
    });
    contenedor.innerHTML = html;
}

function resetBuzon() {
    for (let i = 1; i <= 5; i++) {
        const bloque = document.getElementById('block-' + i);
        if (bloque) {
            bloque.classList.remove('sel-1', 'sel-2', 'sel-3', 'sel-4', 'sel-5');
            bloque.className = 'pregunta-block';
            const spanTexto = document.getElementById('txt-' + i);
            if (spanTexto) { spanTexto.innerText = ''; spanTexto.style.color = ''; }
        }
    }
    const textarea = document.getElementById('opinionTexto');
    if (textarea) textarea.value = '';
}

function toggleBuzon() {
    const buz = document.getElementById('miBuzon');
    if (!buz) return;
    if (buz.style.display === "block") { buz.style.display = "none"; }
    else { resetBuzon(); buz.style.display = "block"; }
}

function setVoto(pregId, valor, texto) {
    const bloque = document.getElementById('block-' + pregId);
    const spanTexto = document.getElementById('txt-' + pregId);
    if (!bloque || !spanTexto) return;
    bloque.classList.remove('sel-1', 'sel-2', 'sel-3', 'sel-4', 'sel-5');
    bloque.classList.add('pregunta-block', 'sel-' + valor);
    spanTexto.innerText = texto;
    const colores = { 5:'#2ecc71', 4:'#a2d149', 3:'#f1c40f', 2:'#e67e22', 1:'#e74c3c' };
    spanTexto.style.color = colores[valor];
}

function enviarEncuesta() {
    // ======= Validación: todas las preguntas (1-5) deben tener calificación =======
    for (let i = 1; i <= 5; i++) {
        const bloque = document.getElementById('block-' + i);
        if (!bloque) continue;
        const tieneVoto = bloque.className.split(/\s+/).some(cls => cls.startsWith('sel-'));
        if (!tieneVoto) {
            alert("Debes responder todas las preguntas antes de enviar la encuesta. Por favor, califica la pregunta " + i + ".");
            return;
        }
    }
    // NOTA: El campo de comentarios (opinionTexto) es OPCIONAL, no se valida.
    // =====================================================================
    const modal = document.getElementById('modalGracias');
    if (modal) modal.style.display = 'flex';
}

// ----- LOGIN -----
// ============================================================
// VALIDACIÓN DE INICIO DE SESIÓN (COHERENTE CON REGISTRO)
// Usuario: alfanumérico, 5-10 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número
// Contraseña: 8-10 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 carácter especial
// Después de iniciar sesión, los campos se limpian automáticamente.
// ============================================================

// ✅ FUNCIONALIDAD: RECORDAR CONTRASEÑA (localStorage)
function guardarCredenciales(usuario, password) {
    try {
        localStorage.setItem('recordar_usuario', usuario);
        localStorage.setItem('recordar_password', password);
    } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e);
    }
}

function cargarCredenciales() {
    try {
        const user = localStorage.getItem('recordar_usuario');
        const pass = localStorage.getItem('recordar_password');
        if (user && pass) {
            const userInput = document.getElementById('userInput');
            const passInput = document.getElementById('passInput');
            if (userInput) userInput.value = user;
            if (passInput) passInput.value = pass;
            // Marcar automáticamente el checkbox de recordar si hay datos
            const checkRecordar = document.getElementById('recordarContrasenaCheck');
            if (checkRecordar) checkRecordar.checked = true;
        }
    } catch (e) {
        console.warn('Error al leer localStorage:', e);
    }
}

function eliminarCredenciales() {
    try {
        localStorage.removeItem('recordar_usuario');
        localStorage.removeItem('recordar_password');
    } catch (e) {
        console.warn('Error al eliminar credenciales:', e);
    }
}

function manejarLogin() {
    const userInput = document.getElementById('userInput');
    const passInput = document.getElementById('passInput');
    if (!userInput || !passInput) return;
    const user = userInput.value.trim();
    const pass = passInput.value.trim();
    
    if (user === "" || pass === "") { 
        alert("Por favor completa todos los campos."); 
        return; 
    }

    // ✅ VALIDACIÓN DE USUARIO (idéntica a la del registro)
    // Solo letras y números (alfanumérico)
    if (!/^[a-zA-Z0-9]+$/.test(user)) {
        alert("El usuario solo puede contener letras y números (alfanumérico).");
        return;
    }
    // Longitud entre 5 y 10 caracteres
    if (user.length < 5) {
        alert("El usuario debe tener al menos 5 caracteres.");
        return;
    }
    if (user.length > 10) {
        alert("El usuario debe tener máximo 10 caracteres.");
        return;
    }
    // Al menos una mayúscula
    if (!/[A-Z]/.test(user)) {
        alert("El usuario debe contener al menos una letra mayúscula.");
        return;
    }
    // Al menos una minúscula
    if (!/[a-z]/.test(user)) {
        alert("El usuario debe contener al menos una letra minúscula.");
        return;
    }
    // Al menos un número
    if (!/[0-9]/.test(user)) {
        alert("El usuario debe contener al menos un número.");
        return;
    }

    // 👇 VALIDACIÓN DE CONTRASEÑA (idéntica a la del registro)
    // Lista de caracteres especiales permitidos (misma que en el registro)
    const caracteresEspeciales = "!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?";
    const tieneMayuscula = /[A-Z]/.test(pass);
    const tieneMinuscula = /[a-z]/.test(pass);
    const tieneNumero = /[0-9]/.test(pass);
    const tieneEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
    // Solo se permiten letras, números y los caracteres especiales definidos
    const soloValidos = new RegExp("^[A-Za-z0-9" + caracteresEspeciales.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "]+$");
    
    // Longitud mínima 8, máxima 10
    if (pass.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }
    if (pass.length > 10) {
        alert("La contraseña debe tener máximo 10 caracteres.");
        return;
    }
    if (!tieneMayuscula) {
        alert("La contraseña debe contener al menos una mayúscula.");
        return;
    }
    if (!tieneMinuscula) {
        alert("La contraseña debe contener al menos una minúscula.");
        return;
    }
    if (!tieneNumero) {
        alert("La contraseña debe contener al menos un número.");
        return;
    }
    if (!tieneEspecial) {
        alert("La contraseña debe contener al menos un carácter especial.\nAceptados: " + caracteresEspeciales.replace(/\\/g, ''));
        return;
    }
    if (!soloValidos.test(pass)) {
        alert("La contraseña contiene caracteres no permitidos.\nSolo se permiten letras, números y estos caracteres especiales: " + caracteresEspeciales.replace(/\\/g, ''));
        return;
    }

    // ✅ NUEVO: GUARDAR O ELIMINAR CREDENCIALES SEGÚN CHECKBOX "RECORDAR CONTRASEÑA"
    const checkRecordar = document.getElementById('recordarContrasenaCheck');
    if (checkRecordar && checkRecordar.checked) {
        guardarCredenciales(user, pass);
        // 🔥 AJUSTE SOLICITADO: NO limpiar los campos si se desea recordar
        // para que el usuario vea sus credenciales sin necesidad de refrescar.
    } else {
        eliminarCredenciales();
        // Limpiar campos solo si NO se marcó "recordar"
        userInput.value = '';
        passInput.value = '';
    }

    // Si todo es válido, mostrar bienvenida VIP
    const tituloVIP = document.getElementById('tituloVIP') || document.getElementById('vipSaludo');
    if (tituloVIP) tituloVIP.innerText = '¡BIENVENIDO, ' + user.toUpperCase() + '!';
    const msgVIP = document.getElementById('msgBienvenida');
    if (msgVIP) msgVIP.innerText = 'Es un honor tenerte de vuelta. Tu mesa VIP y los mejores sabores colombianos te están esperando.';
    const modalVIP = document.getElementById('modalBienvenida') || document.getElementById('modalVIP');
    if (modalVIP) modalVIP.style.display = 'flex';
}

function abrirModalRecuperar(tipo) {
    const titulo = document.getElementById('tituloRecuperar') || document.getElementById('tituloOlvido');
    const desc = document.getElementById('descRecuperar') || document.getElementById('descOlvido') || document.getElementById('instruccionRecuperar');
    if (titulo) titulo.innerText = (tipo === 'pass' || tipo === 'contraseña' || tipo === 'la contraseña') ? 'Olvidó su contraseña' : 'Olvidó su usuario';
    if (desc) desc.innerText = (tipo === 'pass' || tipo === 'contraseña' || tipo === 'la contraseña') ? 'No te preocupes, dinos tu correo y te ayudaremos a restablecer tu contraseña.' : 'Ingresa tu correo registrado y te enviaremos tu nombre de usuario.';
    const modal = document.getElementById('modalRecuperar') || document.getElementById('modalOlvido') || document.getElementById('modalRecuperacion');
    if (modal) modal.style.display = 'flex';
}
function abrirModalOlvido(tipo) { abrirModalRecuperar(tipo); }
function abrirRecuperacion(tipo) { abrirModalRecuperar(tipo); }
function abrirModalRecuperacion(tipo) { abrirModalRecuperar(tipo); }

// ----- VALIDACIÓN DE CORREO -----
function validarEmail(v) {
    v = v.trim();
    if (v === '') return { ok: false, msg: 'El correo es obligatorio.' };
    if (/\s/.test(v)) return { ok: false, msg: 'El correo no puede contener espacios.' };
    if (v.indexOf('@') === -1) return { ok: false, msg: 'Falta el símbolo @.' };
    if ((v.match(/@/g)||[]).length > 1) return { ok: false, msg: 'Solo un @.' };
    const partes  = v.split('@');
    const usuario = partes[0];
    const dominio = partes[1] || '';
    if (usuario.length === 0) return { ok: false, msg: 'Falta el usuario.' };
    if (usuario.length < 2) return { ok: false, msg: 'Usuario muy corto.' };
    if (/^[.\-_]/.test(usuario)) return { ok: false, msg: 'No empieza con punto/guion.' };
    if (/[.\-_]$/.test(usuario)) return { ok: false, msg: 'No termina con punto/guion.' };
    if (/\.{2,}/.test(usuario)) return { ok: false, msg: 'Puntos consecutivos.' };
    if (/[^a-zA-Z0-9.\-_+]/.test(usuario)) return { ok: false, msg: 'Caracteres no permitidos.' };
    if (dominio.length === 0) return { ok: false, msg: 'Falta dominio.' };
    if (dominio.indexOf('.') === -1) return { ok: false, msg: 'Sin extensión.' };
    if (/^\./.test(dominio)||/\.$/.test(dominio)) return { ok: false, msg: 'Dominio mal formado.' };
    if (/\.{2,}/.test(dominio)) return { ok: false, msg: 'Puntos consecutivos en dominio.' };
    if (/[^a-zA-Z0-9.\-]/.test(dominio)) return { ok: false, msg: 'Caracteres no permitidos en dominio.' };
    const ext = dominio.split('.').pop().toLowerCase();
    if (ext.length < 2 || ext.length > 6) return { ok: false, msg: 'Extensión no válida.' };
    const dominioLower = dominio.toLowerCase();
    const reconocido = dominiosValidos.some(function(d) { return dominioLower === d || dominioLower.endsWith('.' + d); });
    if (!reconocido) return { ok: false, msg: 'Dominio no oficial. Usa gmail.com, hotmail.com, etc.' };
    return { ok: true };
}

function enviarInstrucciones() {
    const emailInput = document.getElementById('emailRecuperar') || document.getElementById('emailRecuperacion');
    if (!emailInput) return;
    const email = emailInput.value.trim();
    const validacion = validarEmail(email);
    if (!validacion.ok) { alert(validacion.msg); return; }
    ['modalRecuperar','modalOlvido','modalRecuperacion'].forEach(function(id) {
        const m = document.getElementById(id);
        if (m) m.style.display = 'none';
    });
    const modalOk = document.getElementById('modalInstrucciones') || document.getElementById('modalConfirmacionEnvio') || document.getElementById('modalEnviado');
    if (modalOk) modalOk.style.display = 'flex';
    emailInput.value = "";
}
function procesarEnvioRecuperacion() { enviarInstrucciones(); }

function cerrarModal(id) {
    const m = document.getElementById(id);
    if (m) m.style.display = 'none';
    if (id === 'modalGracias') toggleBuzon();
}

// ----- VIP -----
function abrirExperienciaVIP() {
    const modalB = document.getElementById('modalBienvenida') || document.getElementById('modalVIP');
    const modalE = document.getElementById('modalExperienciaVIP');
    if (modalB) modalB.style.display = 'none';
    if (modalE) modalE.style.display = 'flex';
}

function cerrarExperienciaVIP() {
    const modalE = document.getElementById('modalExperienciaVIP');
    if (modalE) modalE.style.display = 'none';
}

function seleccionarOpcionVIP(opcion) {
    let titulo = "", mensaje = "";
    if (opcion === 1) { titulo = "🎟️ Descuentos VIP activos:"; mensaje = "• 20% en todos los combos\n• 15% en pedidos especiales\n• Válido solo para clientes registrados"; }
    else if (opcion === 2) { titulo = "⚡ Pedido Prioritario:"; mensaje = "• Tu orden se procesa primero\n• Entrega garantizada en menos de 20 minutos\n• Notificación en tiempo real"; }
    else if (opcion === 3) { titulo = "🎟️ Eventos Exclusivos:"; mensaje = "• Invitación a catas privadas\n• Eventos VIP mensuales\n• Acceso anticipado a nuevos sabores"; }
    alert(titulo + "\n" + mensaje + "\n\n✅ Puedes seguir mirando tus beneficios, en las otras dos opciones sin cerrar la ventana.");
}
function mostrarDetalleVIP(opcion) { seleccionarOpcionVIP(opcion); }

// ============================================================
// REDES SOCIALES → PÁGINAS REALES DE PRODUCTOS SIMILARES
// ============================================================
const redesSociales = {
    facebook: 'https://www.facebook.com/empanadascolombianas',
    instagram: 'https://www.instagram.com/empanadaselpuntazo_/',
    tiktok: 'https://www.tiktok.com/@empanadascolombia',
    whatsapp: 'https://wa.me/573138205720' // WhatsApp actual de la empresa
};

function configurarRedesSociales() {
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(link => {
        const href = link.getAttribute('href') || '';
        const imgAlt = link.querySelector('img')?.alt || '';
        
        // Determinar a qué red social pertenece el enlace
        if (href.includes('facebook') || imgAlt === 'FB') {
            link.href = redesSociales.facebook;
        } else if (href.includes('instagram') || imgAlt === 'IG') {
            link.href = redesSociales.instagram;
        } else if (href.includes('tiktok') || imgAlt === 'TK') {
            link.href = redesSociales.tiktok;
        } else if (href.includes('wa.me') || imgAlt === 'WA') {
            link.href = redesSociales.whatsapp;
        }
        
        // Abrir en nueva pestaña
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
}

// ============================================================
// 🆕 ACORDEÓN GLOBAL PARA CARRITOS DE COMPRA (3 páginas)
// Versión robusta: manipula display directamente
// ============================================================
function inicializarAcordeonCarritos() {
    const headers = document.querySelectorAll('.cart-header, .cart-header-pedidos');
    headers.forEach(header => {
        // Establecer que el encabezado es clickeable
        header.style.cursor = 'pointer';
        header.title = 'Clic para expandir/colapsar el carrito';

        // Agregar ícono de flecha si no existe
        if (!header.querySelector('.cart-toggle-icon')) {
            const icon = document.createElement('span');
            icon.className = 'cart-toggle-icon';
            icon.textContent = ' ▼';
            icon.style.fontSize = '12px';
            icon.style.marginLeft = 'auto';
            icon.style.transition = 'transform 0.3s ease';
            header.appendChild(icon);
        }

        // Función para alternar visibilidad
        header.addEventListener('click', function() {
            const cart = this.closest('.cart-card, .side-cart, .cart-box, .resumen-pedido');
            if (!cart) return;

            // Cambiar estado (colapsado/expandido)
            const estaColapsado = cart.classList.toggle('cart-collapsed');

            // Buscar cuerpo del carrito (posibles clases)
            const body = cart.querySelector('.cart-body, .cart-items, .cart-list');
            // Buscar footer del carrito
            const footer = cart.querySelector('.cart-total-footer, .cart-total-box');

            // Aplicar display según estado
            if (body) body.style.display = estaColapsado ? 'none' : '';
            if (footer) footer.style.display = estaColapsado ? 'none' : '';

            // Rotar la flechita
            const icon = this.querySelector('.cart-toggle-icon');
            if (icon) {
                icon.style.transform = estaColapsado ? 'rotate(-90deg)' : 'rotate(0deg)';
            }
        });
    });
}

// ============================================================
// ✨ BOTÓN ASESOR VIP — ADICIÓN COMPLEMENTARIA
// No altera ninguna lógica existente.
// Intenta abrir el off-canvas de chat en vivo por los IDs
// más comunes; si no existe en la página actual, navega a chat.html.
// ============================================================

function abrirAsesorVIP() {
    // IDs posibles del off-canvas de "Abrir chat en vivo"
    const idsOffcanvasChat = [
        'offcanvasChat',
        'offcanvasChatVivo',
        'offcanvasChatEnVivo',
        'chatOffcanvas',
        'chatLive',
        'liveChatPanel',
        'panelChat',
        'sidebarChat',
        'chatVivo',
        'chatEnVivo',
        'chatDrawer'
    ];

    // Buscar el off-canvas de chat entre los IDs conocidos
    for (const id of idsOffcanvasChat) {
        const panel = document.getElementById(id);
        if (panel) {
            // Intentar abrir con Bootstrap (si está disponible)
            if (typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
                const instance = bootstrap.Offcanvas.getOrCreateInstance(panel);
                instance.show();
            } else {
                // Fallback manual: toggle clase "show"
                const overlay = document.getElementById('offcanvasOverlay') || document.getElementById('chatOverlay');
                panel.classList.add('show');
                panel.setAttribute('aria-hidden', 'false');
                if (overlay) overlay.classList.add('show');
            }
            return; // Off-canvas encontrado y abierto: salir
        }
    }

    // Buscar también por atributos data comunes de Bootstrap
    const panelPorData = document.querySelector(
        '[data-bs-target="#offcanvasChat"], [data-bs-target="#chatLive"], [data-bs-target="#offcanvasChatVivo"]'
    );
    if (panelPorData) {
        panelPorData.click();
        return;
    }

    // Fallback: si no hay off-canvas en esta página, ir a chat.html
    window.location.href = 'chat.html';
}

function inyectarBotonAsesorVIP() {
    // Evitar duplicados si el script se carga más de una vez
    if (document.getElementById('btnAsesorVIP')) return;

    // ── Solo se inyecta si existe el modal VIP en esta página ──
    // El botón es ESTÁTICO: vive dentro de modalExperienciaVIP,
    // justo antes del botón "Cerrar y Volver". No flota, no se
    // repite en otras páginas; es únicamente el puente de conexión
    // entre la sección de beneficios VIP y el chat en vivo.
    const modalVIP = document.getElementById('modalExperienciaVIP');
    if (!modalVIP) return; // No inyectar en páginas sin modal VIP

    // Buscar el botón de cierre dentro del modal para insertar antes de él
    // Acepta las clases/textos más comunes usados en el proyecto
    const btnCerrar = modalVIP.querySelector(
        'button[onclick*="cerrar"], button[onclick*="Cerrar"], ' +
        '.btn-cerrar-vip, .cerrar-vip, .btn-volver, ' +
        'button.btn-cyan, button.btn-azul'
    );

    // ── Estilos del botón (estático, no fixed) ─────────────────
    const estilos = document.createElement('style');
    estilos.id = 'estilosAsesorVIP';
    estilos.textContent = `
        /* Contenedor del bloque asesor dentro del modal */
        #wrapperAsesorVIP {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            width: 100%;
            margin: 12px 0 4px 0;   /* Espacio natural en el flujo del modal */
        }

        /* Botón estático — sin position fixed, integrado en el flujo */
        #btnAsesorVIP {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            max-width: 340px;
            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
            outline: none;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
        }

        /* Contenedor visual principal */
        #btnAsesorVIP .vip-inner {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            border: 1.5px solid rgba(212, 175, 55, 0.55);
            border-radius: 50px;
            padding: 13px 22px 13px 18px;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5);
            transition:
                transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.15s ease,
                border-color 0.15s ease;
        }

        /* Ícono corona */
        #btnAsesorVIP .vip-icon {
            font-size: 20px;
            line-height: 1;
            flex-shrink: 0;
            filter: drop-shadow(0 0 5px rgba(212,175,55,0.7));
            transition: transform 0.15s ease;
        }

        /* Bloque de texto */
        #btnAsesorVIP .vip-texto {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            flex: 1;
            line-height: 1;
        }

        #btnAsesorVIP .vip-label {
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(212, 175, 55, 0.75);
            font-family: 'Segoe UI', Arial, sans-serif;
        }

        #btnAsesorVIP .vip-nombre {
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: #e8c84a;
            font-family: 'Segoe UI', Arial, sans-serif;
            text-shadow: 0 0 8px rgba(232, 200, 74, 0.4);
        }

        /* Punto online */
        #btnAsesorVIP .vip-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            flex-shrink: 0;
            background: #2ecc71;
            box-shadow: 0 0 0 2px rgba(46,204,113,0.3);
            animation: vipPulse 2s ease-in-out infinite;
        }

        @keyframes vipPulse {
            0%, 100% { box-shadow: 0 0 0 2px rgba(46,204,113,0.3); }
            50%       { box-shadow: 0 0 0 6px rgba(46,204,113,0.0); }
        }

        /* Subtexto debajo del botón */
        #wrapperAsesorVIP .vip-hint {
            font-size: 10px;
            color: rgba(212, 175, 55, 0.55);
            font-family: 'Segoe UI', Arial, sans-serif;
            letter-spacing: 0.3px;
            transition: color 0.2s ease;
        }

        /* ── HOVER ── */
        #btnAsesorVIP:hover .vip-inner {
            border-color: rgba(212, 175, 55, 0.9);
            box-shadow:
                0 6px 24px rgba(0, 0, 0, 0.55),
                0 0 16px rgba(212, 175, 55, 0.22);
            transform: translateY(-2px);
        }
        #btnAsesorVIP:hover .vip-icon {
            transform: rotate(-8deg) scale(1.12);
        }
        #btnAsesorVIP:hover ~ .vip-hint,
        #wrapperAsesorVIP:hover .vip-hint {
            color: rgba(212, 175, 55, 0.9);
        }

        /* ── EFECTO HUNDIMIENTO AL PRESIONAR ── */
        #btnAsesorVIP:active .vip-inner {
            transform: translateY(3px) scale(0.97);
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
            border-color: rgba(212, 175, 55, 0.35);
        }
        #btnAsesorVIP:active .vip-icon {
            transform: scale(0.88);
        }

        /* Accesibilidad: foco por teclado */
        #btnAsesorVIP:focus-visible .vip-inner {
            outline: 2px solid #e8c84a;
            outline-offset: 3px;
        }
    `;
    document.head.appendChild(estilos);

    // ── Crear wrapper + botón estático ────────────────────────
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapperAsesorVIP';

    const boton = document.createElement('button');
    boton.id = 'btnAsesorVIP';
    boton.setAttribute('aria-label', 'Hablar con un Asesor VIP');
    boton.setAttribute('title', 'Habla con nuestro Asesor VIP especializado');
    boton.onclick = abrirAsesorVIP;
    boton.innerHTML = `
        <div class="vip-inner">
            <span class="vip-icon" aria-hidden="true">👑</span>
            <div class="vip-texto">
                <span class="vip-label">Chat exclusivo</span>
                <span class="vip-nombre">Asesor VIP</span>
            </div>
            <span class="vip-dot" aria-hidden="true"></span>
        </div>
    `;

    const hint = document.createElement('span');
    hint.className = 'vip-hint';
    hint.textContent = '¿Tienes dudas sobre tus beneficios? Chatea ahora';

    wrapper.appendChild(boton);
    wrapper.appendChild(hint);

    // Insertar ANTES del botón de cierre si existe; si no, al final del modal
    if (btnCerrar && btnCerrar.parentNode) {
        btnCerrar.parentNode.insertBefore(wrapper, btnCerrar);
    } else {
        modalVIP.appendChild(wrapper);
    }
}
// ── FIN BOTÓN ASESOR VIP ───────────────────────────────────────

// ============================================================
// 🔥 NUEVO: RESTAURAR INTERACTIVIDAD DE ELEMENTOS BLOQUEADOS POR CSS
// ============================================================
function restaurarInteractividad() {
    // 1. Logo de Tiempo de Refrigerio (redirige al inicio)
    const logo = document.querySelector('.logo-container');
    if (logo) {
        logo.style.pointerEvents = 'auto';
        // Asegurar que tenga href correcto
        logo.setAttribute('href', 'index.html');
        // Por si acaso, añadir listener para forzar navegación
        logo.addEventListener('click', function(e) {
            // Si ya tiene href, el navegador lo manejará normalmente,
            // pero lo reforzamos para evitar cualquier bloqueo residual.
            window.location.href = 'index.html';
            e.preventDefault(); // Prevenir comportamiento por defecto solo si usamos window.location
        });
    }

    // 2. Enlace "Regístrate" (último de .login-links)
    const enlaceRegistro = document.querySelector('.login-links a:last-child');
    if (enlaceRegistro) {
        enlaceRegistro.style.pointerEvents = 'auto';
        // Asegurar que redirija a registrate.html
        enlaceRegistro.setAttribute('href', 'registrate.html');
        enlaceRegistro.addEventListener('click', function(e) {
            window.location.href = 'registrate.html';
            e.preventDefault();
        });
    }

    // 3. Redes sociales (todos los enlaces dentro de .social-icons)
    const iconosSociales = document.querySelectorAll('.social-icons a');
    iconosSociales.forEach(link => {
        link.style.pointerEvents = 'auto';
    });
    // Re-aplicar configuración de redes sociales por si acaso
    configurarRedesSociales();

    // 4. Mapa (iframe)
    const mapaIframe = document.querySelector('.map-container iframe');
    if (mapaIframe) {
        mapaIframe.style.pointerEvents = 'auto';
    }
    // Re-enlazar mapa real
    enlazarMapaReal();
}

// ============================================================
// INICIALIZACIÓN COMÚN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    generarPreguntasBuzon();
    unificarBotonBusqueda();
    enlazarMapaReal();
    inicializarTema(); // 🌙 Inicializar la lógica del botón de tema

    // ✅ AJUSTE ÚNICO: Aclarar que el comentario es opcional en el buzón
    const textareaOpinion = document.getElementById('opinionTexto');
    if (textareaOpinion) {
        textareaOpinion.placeholder = 'Comentarios adicionales (opcional)';
    }

    // ✅ Configurar enlaces de redes sociales a páginas reales
    configurarRedesSociales();

    // ✅ Activar acordeón en los carritos de compra
    inicializarAcordeonCarritos();

    // ✅ CHECKLIST PARA VER CONTRASEÑA (con ojito 👁)
    const passInput = document.getElementById('passInput');
    if (passInput) {
        // Crear contenedor para el checkbox y la etiqueta
        const toggleWrapper = document.createElement('label');
        toggleWrapper.style.display = 'block';
        toggleWrapper.style.marginTop = '5px';
        toggleWrapper.style.cursor = 'pointer';
        toggleWrapper.style.fontSize = '0.9em';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'mostrarContrasenaCheck';
        checkbox.style.marginRight = '6px';
        
        toggleWrapper.appendChild(checkbox);
        toggleWrapper.appendChild(document.createTextNode('👁 Mostrar contraseña'));
        
        // Insertar después del campo de contraseña
        passInput.parentNode.insertBefore(toggleWrapper, passInput.nextSibling);
        
        // Alternar visibilidad de la contraseña
        checkbox.addEventListener('change', function() {
            passInput.type = this.checked ? 'text' : 'password';
        });

        // ✅ CHECKLIST "RECORDAR CONTRASEÑA" (usabilidad + seguridad)
        const recordarWrapper = document.createElement('label');
        recordarWrapper.style.display = 'block';
        recordarWrapper.style.marginTop = '8px';
        recordarWrapper.style.cursor = 'pointer';
        recordarWrapper.style.fontSize = '0.9em';
        // recordarWrapper.style.color = '#444';   // ❌ ELIMINADO para que el CSS controle el color
        recordarWrapper.classList.add('recordar-label'); // 🔥 NUEVO: clase para tema oscuro

        const checkRecordar = document.createElement('input');
        checkRecordar.type = 'checkbox';
        checkRecordar.id = 'recordarContrasenaCheck';
        checkRecordar.style.marginRight = '6px';
        
        recordarWrapper.appendChild(checkRecordar);
        recordarWrapper.appendChild(document.createTextNode('🔐 Recordar contraseña (solo en casa)'));
        
        // Insertar después del checkbox de mostrar contraseña
        toggleWrapper.parentNode.insertBefore(recordarWrapper, toggleWrapper.nextSibling);
        
        // Al desmarcar explícitamente, borrar cualquier credencial guardada
        checkRecordar.addEventListener('change', function() {
            if (!this.checked) {
                eliminarCredenciales();
                // Opcional: avisar al usuario
                const userInput = document.getElementById('userInput');
                if (userInput) userInput.value = '';
                if (passInput) passInput.value = '';
            }
        });

        // Cargar credenciales guardadas al iniciar la página (si existen)
        cargarCredenciales();
    }

    // ✅ Inyectar botón Asesor VIP (complemento no invasivo)
    inyectarBotonAsesorVIP();

    // 🔥 RESTAURAR INTERACTIVIDAD DE LOS 4 ELEMENTOS BLOQUEADOS POR CSS
    restaurarInteractividad();
});