// Obtiene una func(x)
// a (inicio) y b (fin)
// n (cantidad de subdivisiones)

/*resuelve de estas maneras: 
https://www.wolframalpha.com/widgets/view.jsp?id=71ee0e011946417d5e7238f42dfec03c
o
https://planetcalc.com/5494/
*/

function calcularPorSimpson(func, a, b, _n) {
  var sumatoria1 = 0;
  var sumatoria2 = 0;

  let n = _n / 2;
  if (_n % 2 == 1) {
    alert("El método Simpson requiere un 'n' par. Se usará 'n' = " + (_n + 1));
    n = (_n + 1) / 2;
  }

  // Ancho de cada division
  const h = (b - a) / (n * 2);

  // Valores fijos F(X0) y F(Xn)
  var fa = func(a);
  var fb = func(b);

  var parabolasAAnimar = [];
  // Dibujo
  for (var k = 1; k <= n; k++) {
    // 3 puntos
    var x1 = a + h * (k * 2 - 2);
    var y1 = func(x1);
    var x2 = a + h * (k * 2 - 1);
    var y2 = func(x2);
    var x3 = a + h * (k * 2);
    var y3 = func(x3);
    parabolasAAnimar.push({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x3: x3,
      y3: y3,
    });
  }

  // Sumatoria k pares
  for (var k = 1; k < n; k++) {
    var y = func(a + h * k * 2);
    sumatoria1 += y;
  }

  // Sumatoria k impares
  for (var k = 1; k <= n; k++) {
    var z = func(a + h * (-1 + 2 * k));
    sumatoria2 += z;
  }

  // Retornar resultado final
  return {
    integral: ((fa + fb + sumatoria1 * 2 + sumatoria2 * 4) * h) / 3,
    animacion: parabolasAAnimar,
  };
}

function animarSimpson(animacion, t) {
  const snappiness = 20;
  for (let i = 0; i < animacion.length; i++) {
    let r = animacion[i];
    let rt = sigmoide((t - i) * snappiness);
    let rt2 = sigmoide((t - i - 0.25) * snappiness);
    let rt3 = sigmoide((t - i - 0.5) * snappiness);
    colorDeLinea("#0f0");
    colorDeRelleno("#0f0");
    punto(r.x1, r.y1 * rt, 4 * rt);
    punto(r.x2, r.y2 * rt2, 3 * rt);
    punto(r.x3, r.y3 * rt3, 4 * rt);
    colorDeRelleno("#0f05");
    linea(r.x2, 0, r.x2, r.y2 * rt2);
    parabolaPor3Puntos(r.x1, r.y1 * rt, r.x2, r.y2 * rt2, r.x3, r.y3 * rt3);
  }
}

/*
resuelve de esta manera: 
https://www.zweigmedia.com/MundoReal/integral/integral.html
*/
