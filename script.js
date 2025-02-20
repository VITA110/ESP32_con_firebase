// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBw0OT96Wc0tSOf9oFnPT9R2Uwbty4DoDY",
    authDomain: "ecodrop-esp32.firebaseapp.com",
    databaseURL: "https://ecodrop-esp32-default-rtdb.firebaseio.com",
    projectId: "ecodrop-esp32",
    storageBucket: "ecodrop-esp32.firebasestorage.app",
    messagingSenderId: "542331947970",
    appId: "1:542331947970:web:809530a7d223c9de5c645b"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Función para encender el motor
function encenderMotor() {
    db.ref().update({ motor_on: true })
        .then(() => console.log("Motor encendido"))
        .catch(error => console.error("Error:", error));
}

// Función para apagar el motor
function apagarMotor() {
    db.ref().update({ motor_on: false })
        .then(() => console.log("Motor apagado"))
        .catch(error => console.error("Error:", error));
}

// Función para cambiar la dirección del motor
function cambiarDireccion() {
    db.ref("motor_dir").get().then((snapshot) => {
        if (snapshot.exists()) {
            let currentDir = snapshot.val();
            db.ref().update({ motor_dir: !currentDir })
                .then(() => console.log("Dirección cambiada"))
                .catch(error => console.error("Error:", error));
        } else {
            console.error("No existe la entrada motor_dir");
        }
    }).catch((error) => {
        console.error("Error obteniendo motor_dir:", error);
    });
}

// 💡 Mover esta función fuera de `cambiarDireccion()`
function moverMotor() {
    let distancia = document.getElementById("posicionObjetivo").value;
    if (distancia !== "") {
        db.ref().update({ posicion_mm: parseInt(distancia) })
            .then(() => console.log("Posición actualizada a:", distancia))
            .catch(error => console.error("Error:", error));
    } else {
        console.error("Ingrese una distancia válida.");
    }
}

function moverIzquierda() {
    db.ref().update({ posicion_mm: 0 }) // Suponiendo que 0 mm es la posición izquierda
        .then(() => console.log("Moviendo a la izquierda"))
        .catch(error => console.error("Error:", error));
}

function moverCentro() {
    db.ref().update({ posicion_mm: 50 }) // Suponiendo que 50 mm es la posición central
        .then(() => console.log("Moviendo al centro"))
        .catch(error => console.error("Error:", error));
}

function moverDerecha() {
    db.ref().update({ posicion_mm: 100 }) // Suponiendo que 100 mm es la posición derecha
        .then(() => console.log("Moviendo a la derecha"))
        .catch(error => console.error("Error:", error));
}
