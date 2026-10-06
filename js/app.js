let nombresCursos = ["Desarrollo de Software", "Inteligencia Artificial", "Diseño Web"];
let preciosCursos = [450, 520, 380];
let DESCUENTO = 0.20;


function mostrarError(idCampo, idError, mensaje) {
    document.getElementById(idError).innerText = mensaje;

    if (mensaje === "") {
        document.getElementById(idCampo).classList.remove("invalido");
    } else {
        document.getElementById(idCampo).classList.add("invalido");
    }
}

function soles(numero) {
    return "S/ " + numero.toFixed(2);
}

function enviarRegistro() {
    let nombre = document.getElementById("txtNombre").value.trim();
    let correo = document.getElementById("txtCorreo").value.trim();
    let telefono = document.getElementById("txtTelefono").value.trim();
    let edad = parseInt(document.getElementById("txtEdad").value);
    let programa = document.getElementById("selPrograma").value;
    let acepto = document.getElementById("chkTerminos").checked;

    let esValido = true;

    document.getElementById("mensaje-exito").innerText = "";
    document.getElementById("simulacion-envio").style.display = "none";

    let tieneNumeros = false;
    let i = 0;
    while (i < nombre.length) {
        let letra = nombre.charAt(i);
        if (letra !== " " && !isNaN(letra)) {
            tieneNumeros = true;
        }i++;}

    if (nombre === "") {
        mostrarError("txtNombre", "errNombre", "Ingresa tu nombre completo.");
        esValido = false;
    } else if (nombre.length < 3) {
        mostrarError("txtNombre", "errNombre", "El nombre es muy corto.");
        esValido = false;
    } else if (tieneNumeros) {
        mostrarError("txtNombre", "errNombre", "El nombre no puede tener números.");
        esValido = false;
    } else {
        mostrarError("txtNombre", "errNombre", "");
    }

    if (correo === "") {
        mostrarError("txtCorreo", "errCorreo", "Ingresa tu correo electrónico.");
        esValido = false;
    } else if (!correo.includes("@") || !correo.includes(".")) {
        mostrarError("txtCorreo", "errCorreo", "Escribe un correo válido (ej. nombre@correo.com).");
        esValido = false;
    } else {
        mostrarError("txtCorreo", "errCorreo", "");
    }

    if (telefono === "") {
        mostrarError("txtTelefono", "errTelefono", "Ingresa tu teléfono.");
        esValido = false;
    } else if (isNaN(telefono) || telefono.length !== 9 || telefono.charAt(0) !== "9") {
        mostrarError("txtTelefono", "errTelefono", "Debe tener 9 dígitos y empezar con 9.");
        esValido = false;
    } else {
        mostrarError("txtTelefono", "errTelefono", "");
    }

    if (isNaN(edad)) {
        mostrarError("txtEdad", "errEdad", "Ingresa tu edad.");
        esValido = false;
    } else if (edad < 16 || edad > 70) {
        mostrarError("txtEdad", "errEdad", "La edad debe estar entre 16 y 70 años.");
        esValido = false;
    } else {
        mostrarError("txtEdad", "errEdad", "");
    }

    if (programa === "") {
        mostrarError("selPrograma", "errPrograma", "Selecciona un programa.");
        esValido = false;
    } else {
        mostrarError("selPrograma", "errPrograma", "");
    }

    if (!acepto) {
        document.getElementById("errTerminos").innerText = "Debes aceptar los términos y condiciones.";
        esValido = false;
    } else {
        document.getElementById("errTerminos").innerText = "";
    }

    if (!esValido) {
        return;
    }

    let posicion = parseInt(programa);
    let nombrePrograma = nombresCursos[posicion];
    let precio = preciosCursos[posicion];
    let ahorro = precio * DESCUENTO;
    let total = precio - ahorro;

    let cajaResumen = document.getElementById("simulacion-envio");
    cajaResumen.innerText =
        "DATOS REGISTRADOS\n" +
        "Nombre:   " + nombre + "\n" +
        "Correo:   " + correo + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Edad:     " + edad + "\n" +
        "Programa: " + nombrePrograma + "\n\n" +
        "DESCUENTO\n" +
        "Precio normal:  " + soles(precio) + "\n" +
        "Descuento 20%: -" + soles(ahorro) + "\n" +
        "Total a pagar:  " + soles(total);
    cajaResumen.style.display = "block";

    document.getElementById("mensaje-exito").innerText = "¡Gracias, " + nombre + "! Te enviaremos información sobre " + nombrePrograma + ".";

    document.getElementById("txtNombre").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtEdad").value = "";
    document.getElementById("selPrograma").value = "";
    document.getElementById("chkTerminos").checked = false;
}

function cambiarImagen(miniatura) {
    const principal = document.getElementById("imgPrincipal");
    const srcTemp = principal.src;
    const altTemp = principal.alt;

    principal.src = miniatura.src;
    principal.alt = miniatura.alt;
    miniatura.src = srcTemp;
    miniatura.alt = altTemp;
}