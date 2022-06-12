// Obtiene una func(x)
// a (inicio) y b (fin)
// m (cota superior)
// n (cantidad total de puntos)

/* 
Resuelve como lo vimos en clase.
Verifico con: https://www.geogebra.org/m/jjvhfew6
*/
function calcularPorMonteCarlo(func, a, b, n) {
  // Cantidad de puntos que verifican yi <= f(xi)
  var cantPtosExitoPos = 0;
  var cantPtosExitoNeg = 0;

  // Ancho de cada division
  const h = (b - a) / n;

  //Error estmativo - no se como se saca
  const eEst = 0.1;

  //Cotas
  var cotaSup = 0;
  var cotaInf = 0;

  // Busco cotas
  for (var k = 0; k <= n; k++) {
    var y = func(a + h * k);

    if (y > cotaSup) {
      cotaSup = y;
    }

    if (y < cotaInf) {
      cotaInf = y;
    }
  }

  // Calcular H [Altura del rectangulo]
  var altura =
    cotaSup + eEst * Math.abs(cotaSup) - (cotaInf - eEst * Math.abs(cotaInf));

  // Calcular puntos aleatoreos
  for (var i = 0; i <= n; i++) {
    var xi = a + Math.random() * (b - a);
    var yi = cotaInf - eEst * Math.abs(cotaInf) + altura * Math.random();

    var fxi = func(xi);

    // Conteo de puntos de exito
    if (yi >= 0 && fxi >= 0 && yi <= fxi) {
      cantPtosExitoPos++;

      colorDeRelleno("#0f0");
      punto(xi, yi, 2);
    } else if (yi < 0 && fxi < 0 && yi >= fxi) {
      cantPtosExitoNeg++;

      colorDeRelleno("#FF00FF");
      punto(xi, yi, 2);
    } else {
      // Dibujar
      colorDeRelleno("#ff000c");
      punto(xi, yi, 2);
    }
  }

  // Retornar resultado final
  return ((cantPtosExitoPos - cantPtosExitoNeg) / n) * (b - a) * altura;
}
