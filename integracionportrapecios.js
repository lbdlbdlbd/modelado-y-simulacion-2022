// Obtiene una func(x)
// a (inicio) y b (fin)
// n (cantidad de subdivisiones)

function calcularPorTrapecios(func, a, b, n) {
  var sumatoria = 0;

  // Ancho de cada division
  const h = (b - a) / n;

  // Valores fijos F(X0) y F(Xn)
  var fa = func(a);
  var fb = func(b);

  // Dibujar
  colorDeLinea("#0f0");
  colorDeRelleno("#0f05");
  const fa2 = func(a + h);
  poligono([
    { x: a, y: fa },
    { x: a + h, y: fa2 },
    { x: a + h, y: 0 },
    { x: a, y: 0 },
  ]);
  colorDeRelleno("#0f0");
  punto(a, fa, 4);
  punto(b, fb, 4);

  // Calcular altura de cada trapecio y sumarla a la sumatoria
  for (var k = 1; k < n; k++) {
    const x = a + h * k;

    var y = func(x);
    sumatoria += y;

    const nextx = a + h * (k + 1);
    var nexty = func(nextx);
    colorDeRelleno("#0f05");
    poligono([
      { x: x, y: y },
      { x: nextx, y: nexty },
      { x: nextx, y: 0 },
      { x: x, y: 0 },
    ]);
    colorDeRelleno("#0f0");
    punto(x, y, 4);
  }

  // Multiplicar alto total por el ancho y retornar
  return (fa / 2 + fb / 2 + sumatoria) * h;
}
