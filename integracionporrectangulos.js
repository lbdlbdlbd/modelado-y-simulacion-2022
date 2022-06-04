// Obtiene una func(x)
// a (inicio) y b (fin)
// n (cantidad de subdivisiones)
function calcularPorRectangulos(func, a, b, n) {
  var sumatoria = 0;
  // Ancho de cada rectangulo
  const h = (b - a) / n;

  // Calcular altura de cada rectangulo y sumarla a la sumatoria
  for (var k = 0; k < n; k++) {
    var y = func(a + h * (k + 0.5));
    sumatoria += y;

    // Dibujar rectangulo
    colorDeLinea("#0f0");
    colorDeRelleno("#0f05");
    rectangulo(a + k * h, 0, a + h * (k + 1), y);
    colorDeRelleno("#0f0");
    punto(a + h * (k + 0.5), y, 4);
  }

  // Multiplicar alto total por el ancho y retornar
  return sumatoria * h;
}
