// Obtiene una func(x)
// a (inicio) y b (fin)
// n (cantidad de subdivisiones)

function calcularPorTrapecios(func, a, b, n) {
  var sumatoria = 0;
  
  // Ancho de cada division
  const h = (b - a) / n;

  // Valores fijos F(X0) y F(Xn)
  var fa = func(a)
  var fb = func(b)
        
  // Dibujar
  colorDeRelleno("#0f0");
  punto(a, fa, 4);
  punto(b, fb, 4);

  // Calcular altura de cada trapecio y sumarla a la sumatoria
  for (var k = 1; k < n; k++) {

    var y = func(a + h*k);
    sumatoria += y;
    
    // Dibujar
    colorDeRelleno("#0f0");
    punto(a + h*k, y, 4);
  }

  // Multiplicar alto total por el ancho y retornar
  return (fa/2 + fb/2 + sumatoria) * h;
}