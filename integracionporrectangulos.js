// Obtiene una func(x)
// a (inicio) y b (fin)
// n (cantidad de subdivisiones)
function calcularPorRectangulos(func, a, b, n) {
  var sumatoria = 0;
  // Ancho de cada rectangulo
  const h = (b - a) / n;

  var rectangulosAAnimar = [];

  // Calcular altura de cada rectangulo y sumarla a la sumatoria
  for (var k = 0; k < n; k++) {
    var y = func(a + h * (k + 0.5));
    sumatoria += y;

    rectangulosAAnimar.push({
      x1: a + k * h,
      y1: 0,
      x2: a + h * (k + 1),
      y2: y,
      contribucion: y * h,
    });
  }

  // Multiplicar alto total por el ancho y retornar
  return { integral: sumatoria * h, animacion: rectangulosAAnimar };
}

function animarRectangulos(animacion, t) {
  const snappiness = 20;
  for (let i = 0; i < animacion.length; i++) {
    let r = animacion[i];
    let rt = sigmoide((t - i) * snappiness);
    let rt2 = sigmoide((t - i - 0.5) * snappiness);
    const mid = (r.x2 + r.x1) * 0.5;
    const width = (r.x2 - r.x1) * 0.5;
    // Dibujar rectangulo
    colorDeLinea("#0f0");
    colorDeRelleno("#0f05");
    rectangulo(
      mid - width * rt2,
      r.y1,
      mid + width * rt2,
      r.y2 * Math.min(1, rt)
    );
    colorDeRelleno("#0f0");
    punto((r.x1 + r.x2) / 2, r.y2, rt2 * 4);
  }
}
