// Obtiene una func(x)
// a (inicio) y b (fin)
// n (cantidad de subdivisiones)

/*resuelve de estas maneras: 
https://www.wolframalpha.com/widgets/view.jsp?id=71ee0e011946417d5e7238f42dfec03c
o
https://planetcalc.com/5494/
*/

function calcularPorSimpson(func, a, b, n) {
  var sumatoria1 = 0;
  var sumatoria2 = 0;

  // Ancho de cada division
  const h = (b - a) / (n * 2);

  // Valores fijos F(X0) y F(Xn)
  var fa = func(a);
  var fb = func(b);

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

  // Dibujo
  for (var k = 1; k <= n; k++) {
    // 3 puntos
    var x1 = a + h * (k * 2 - 2);
    var y1 = func(x1);
    var x2 = a + h * (k * 2 - 1);
    var y2 = func(x2);
    var x3 = a + h * (k * 2);
    var y3 = func(x3);
    colorDeLinea("#0f0");
    colorDeRelleno("#0f0");
    punto(x1, y1, 4);
    punto(x2, y2, 3);
    punto(x3, y3, 4);
    colorDeRelleno("#0f05");
    parabolaPor3Puntos(x1, y1, x2, y2, x3, y3);
  }

  // Retornar resultado final
  return ((fa + fb + sumatoria1 * 2 + sumatoria2 * 4) * h) / 3;
}

/*
resuelve de esta manera: 
https://www.zweigmedia.com/MundoReal/integral/integral.html
*/
