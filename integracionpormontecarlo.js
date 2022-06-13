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

  var puntosAAnimar = [];

  // Calcular puntos aleatoreos
  for (var i = 0; i <= n; i++) {
    var xi = a + Math.random() * (b - a);
    var yi = cotaInf - eEst * Math.abs(cotaInf) + altura * Math.random();

    var fxi = func(xi);

    // Conteo de puntos de exito
    if (yi >= 0 && fxi >= 0 && yi <= fxi) {
      cantPtosExitoPos++;
      puntosAAnimar.push({ x: xi, y: yi, contribucion: 1 });
    } else if (yi < 0 && fxi < 0 && yi >= fxi) {
      cantPtosExitoNeg++;
      puntosAAnimar.push({ x: xi, y: yi, contribucion: -1 });
    } else {
      puntosAAnimar.push({ x: xi, y: yi, contribucion: 0 });
    }
  }

  // Retornar resultado final
  return {
    integral: ((cantPtosExitoPos - cantPtosExitoNeg) / n) * (b - a) * altura,
    animacion: puntosAAnimar,
  };
}

function animarMontecarlo(animacion, t) {
  const snappiness = 20;
  for (let i = 0; i < animacion.length; i++) {
    let r = animacion[i];
    let rt = sigmoide(((t - i - 1) * snappiness) / velocidadDeAnimacion);
    if (t > i) {
      switch (r.contribucion) {
        case -1:
          colorDeRelleno("#f00");
          break;
        case 0:
          colorDeRelleno("#888");
          break;
        case 1:
          colorDeRelleno("#0f0");
          break;
      }
      punto(r.x, r.y * rt, 3 * rt);
    }
  }
}
