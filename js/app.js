const ingresos = [
  new Ingreso("salario", 2500),
  new Ingreso("venta de computador", 35),
];

const egresos = [
  new Egreso("Renta departamento", 900),
  new Egreso("compra audifonos", 600),
];

let cargarApp = () => {
  cargarCabecero();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos_total").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos_total").innerHTML = formatoMoneda(
    totalEgresos()
  );
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-Us", {
    style: "currency",
    currency: "usd",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-Us", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};
