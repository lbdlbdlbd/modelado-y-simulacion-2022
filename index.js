// Variables para renderizado
var canvas;
var ctx;

// Esto se usará mas adelante para hacer animaciones
//var time = 0;
//var elapsed_time = 1 / 30;

// Elementos html
var resultElement;

// Dominio e imagen
var a = 0;
var b = 10;
var yi = -3;
var yf = 3;

// Divisiones / Cantidad total de puntos (MonteCarlo)
var n = 1000;

// Cotas (MonteCarlo)
var m = 15;

// Esta es una funcion placeholder. Mas adelante se tendra que interpretar la funcion ingresada por el usuario
function Funcion(x) {
  return Math.sin(x) + Math.sin(x * 2.5) * 0.5 + 0.5;
  //return Math.sin(x*x) + 2;
  //return x*x*5 + Math.sin(x);
}

// Al cambiar los valores de los inputs:
function OnAChange(event) {
  a = Number(event.target.value);
  Calcular();
}
function OnBChange(event) {
  b = Number(event.target.value);
  Calcular();
}
function OnNChange(event) {
  n = Number(event.target.value);
  Calcular();
}

// Start se llama al cargarse el documento
function Start() {
  //setInterval(Update, elapsed_time * 1000);  // <-- Esto va a ser util mas adelante cuando necesite hacer animaciones
  // Obtener el canvas para poder dibujar
  canvas = document.getElementById("mycanvas");
  ctx = canvas.getContext("2d");
  // Obtener referencia a los elementos de html para poder cambiar el texto
  resultElement = document.getElementById("Resultado");
  // Calcular la integral y dibujarla
  Calcular();
}

// Calcular y dibujar la integral
function Calcular() {
  // Redibujar grilla y funcion
  dibujarGrilla(a, b, yi, yf);
  dibujarCurva(Funcion);
  // Calcular integral
  //var resultado = calcularPorRectangulos(Funcion, a, b, n); // <-- Cambia calcularPorRectangulos por tu propia funcion para probarla
  //var resultado = calcularPorSimpson(Funcion, a, b, n);
  //var resultado = calcularPorTrapecios(Funcion, a, b, n);
  var resultado = calcularPorMonteCarlo(Funcion, a, b, n);
  
  // Plasmar resultado en la pagina
  resultElement.innerHTML = "Resultado: " + resultado;
}

//function Update() {} // <-- Esto va a ser util mas adelante cuando necesite hacer animaciones
