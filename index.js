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

// Metodo
var method = 0;

// Divisiones / Cantidad total de puntos (MonteCarlo)
var n = 20;

// Cotas (MonteCarlo)
var m = 15;

// Esta es una funcion placeholder. Mas adelante se tendra que interpretar la funcion ingresada por el usuario
function Funcion(x) {
  return Math.sin(x) + Math.sin(x * 2.5) * 0.5 + 0.5;
  //return Math.sin(x*x) + 2;
  //return x*x*5 + Math.sin(x);
}

// Al cambiar los valores de los inputs:
function OnEquationChange(event) {
  expression = event.target.value;
}
function OnMethodChange(event) {
  method = Number(event.target.value);
}
function OnAChange(event) {
  a = Number(event.target.value);
}
function OnBChange(event) {
  b = Number(event.target.value);
}
function OnNChange(event) {
  n = Number(event.target.value);
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
}

function CalcularAltura(func, a, b, n) {
  yi = 0;
  yf = 0;
  // Busco cotas
  const h = (b - a) / 100;
  const iteraciones = 100;
  for (var k = 0; k <= iteraciones; k++) {
    var y = func(a + h * k);

    if (y > yf) {
      yf = y;
    }

    if (y < yi) {
      yi = y;
    }
  }
  const altura = yf - yi;
  yf = yf + altura / 10;
  yi = yi - altura / 10;
}

// Calcular y dibujar la integral
function CalcularRapido() {
  CalcularAltura(Funcion, a, b, n);
  // Redibujar grilla y funcion
  dibujarGrilla(a, b, yi, yf);
  dibujarCurva(Funcion);
  // Calcular integral
  var resultado;
  switch (method) {
    case 0:
      resultado = calcularPorRectangulos(Funcion, a, b, n);
      break;
    case 1:
      resultado = calcularPorTrapecios(Funcion, a, b, n);
      break;
    case 2:
      resultado = calcularPorSimpson(Funcion, a, b, n);
      break;
    case 3:
      resultado = calcularPorMonteCarlo(Funcion, a, b, n);
      break;
  }

  // Plasmar resultado en la pagina
  resultElement.innerHTML = "Resultado: " + resultado;
}

function CalcularAnimado() {
  alert("Calculo animado no implementado todavia");
}

//function Update() {} // <-- Esto va a ser util mas adelante cuando necesite hacer animaciones
