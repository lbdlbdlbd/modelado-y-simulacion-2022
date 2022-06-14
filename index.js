// Variables para renderizado
var canvas;
var ctx;

var time = 0;
var elapsed_time = 1 / 60;
var velocidadDeAnimacion = 0;
var velocidadElegida = 1;

// Elementos html
var resultElement;

// Dominio e imagen
var a = -2;
var b = 2;
var yi = -3;
var yf = 3;
var yiSinMargen = -3;
var yfSinMargen = 3;

// Metodo
var method = 0;
var animatingMethod = 0;

// Divisiones / Cantidad total de puntos (MonteCarlo)
var n = 20;

// Cotas (MonteCarlo)
var m = 15;

var animacion;
var expression = "x*x*x*0.5 - x*x+7/3";

// Esta es una funcion placeholder. Mas adelante se tendra que interpretar la funcion ingresada por el usuario
function Funcion(x) {
  try {
    return eval(expression);
  } catch {
    alert("Expresion inválida");
    FrenarAnimacion();
  }
}

function FrenarAnimacion() {
  velocidadDeAnimacion = 0;
  expression = "";
}

// Al cambiar los valores de los inputs:
function OnSpeedChange(event) {
  velocidadElegida = Number(event.target.value);
}
function OnEquationChange(event) {
  expression = event.target.value;
  // Seguridad
  expression = expression.replace(/\(\)/g, "");
  expression = expression.replace(/{/g, "");
  expression = expression.replace(/}/g, "");
  // Expresiones matematicas
  expression = expression.replace(/abs\(/g, "Math.abs(");
  expression = expression.replace(/tan\(/g, "Math.tan(");
  expression = expression.replace(/sin\(/g, "Math.sin(");
  expression = expression.replace(/cos\(/g, "Math.cos(");
  expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
  expression = expression.replace(/x\^2/g, "x*x");
  expression = expression.replace(/x\^3/g, "x*x*x");
  expression = expression.replace(/x\^4/g, "x*x*x*x");
  expression = expression.replace(/x\^5/g, "x*x*x*x*x");
  expression = expression.replace(/x\^6/g, "x*x*x*x*x*x");
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
  setInterval(Update, elapsed_time * 1000); // <-- Esto va a ser util mas adelante cuando necesite hacer animaciones
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
  yiSinMargen = yi;
  yfSinMargen = yf;
  const altura = yf - yi;
  yf = yf + altura / 10;
  yi = yi - altura / 10;
}

function CalcularRapido() {
  time = 10000000;
  velocidadDeAnimacion = 10000000;
  Calcular();
}

function CalcularAnimado() {
  time = 0;
  velocidadDeAnimacion = velocidadElegida;
  Calcular();
}

// Calcular y dibujar la integral
function Calcular() {
  if (n <= 0) {
    alert("'n' debe ser mayor que 0");
    velocidadDeAnimacion = 0;
    return;
  }

  animatingMethod = method;
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

  CalcularAltura(Funcion, a, b, n);
  // Plasmar resultado en la pagina
  resultElement.innerHTML =
    "Resultado: " + Math.round(resultado.integral * 10000000) / 10000000;
  animacion = resultado.animacion;
}

function Update() {
  if (velocidadDeAnimacion > 0) {
    Render();
    time = time + velocidadDeAnimacion * elapsed_time;
    if (time > n + velocidadDeAnimacion) {
      velocidadDeAnimacion = 0;
      console.log("Finished");
    }
  }
}

function Render() {
  // Redibujar grilla y funcion
  dibujarGrilla(a, b, yi, yf);
  dibujarCurva(Funcion);
  switch (animatingMethod) {
    case 0:
      resultado = animarRectangulos(animacion, time);
      break;
    case 1:
      resultado = animarTrapecios(animacion, time);
      break;
    case 2:
      resultado = animarSimpson(animacion, time);
      break;
    case 3:
      resultado = animarMontecarlo(animacion, time);
      break;
  }
}
