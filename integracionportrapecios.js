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

  var poligonosADibujar = [];

  const fa2 = func(a + h);
  poligonosADibujar.push([
    { x: a, y: fa },
    { x: a + h, y: fa2 },
    { x: a + h, y: 0 },
    { x: a, y: 0 },
  ]);

  // Calcular altura de cada trapecio y sumarla a la sumatoria
  for (var k = 1; k < n; k++) {
    const x = a + h * k;

    var y = func(x);
    sumatoria += y;

    const nextx = a + h * (k + 1);
    var nexty = func(nextx);
    poligonosADibujar.push([
      { x: x, y: y },
      { x: nextx, y: nexty },
      { x: nextx, y: 0 },
      { x: x, y: 0 },
    ]);
  }

  // Multiplicar alto total por el ancho y retornar
  return {
    integral: (fa / 2 + fb / 2 + sumatoria) * h,
    animacion: poligonosADibujar,
  };
}

function animarTrapecios(animacion, t) {
  const snappiness = 20;
  colorDeLinea("#0f0");
  for (let i = 0; i < animacion.length; i++) {
    let r = animacion[i];
    let rt = sigmoide((t - i) * snappiness);
    let rt2 = sigmoide((t - i - 0.5) * snappiness);
    colorDeRelleno("#0f05");
    poligono([
      { x: r[0].x, y: r[0].y * rt },
      { x: r[1].x, y: r[1].y * rt2 },
      { x: r[2].x, y: r[2].y },
      { x: r[3].x, y: r[3].y },
    ]);
    colorDeRelleno("#0f0");
    punto(r[0].x, r[0].y * rt, 4 * rt);
    punto(r[1].x, r[1].y * rt2, 4 * rt2);
  }
}
