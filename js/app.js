const ingresos = [
  new Ingreso("Salario", 2500),
  new Ingreso("Venta de computador", 35),
];

const egresos = [
  new Egreso("Renta departamento", 900),
  new Egreso("Compra audifonos", 600),
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
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

const cargarIngresos = () =>{
  let ingresosHTML = "";
  for(let ingreso of ingresos){
    ingresosHTML += crearIngresosHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

const crearIngresosHTML = (ingreso) =>{
  let ingresosHTML = `
  <div class="elemento">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
    </div>
    <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
            <ion-icon name="close-outline"
            onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
        </button>
    </div>
  </div>
  `;
  return ingresosHTML;
}

const eliminarIngreso = (id) =>{
  let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
}

const cargarEgresos = () =>{
  let egresosHTML = "";
  for(let egreso of egresos){
    egresosHTML += crearEgresosHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) =>{
  let egresosHTML = `
  <div class="elemento">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha">
        <div class="elemento_val">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
    </div>
    <div class="elemento_eliminar">
        <button class="elemento_eliminar--bt">
            <ion-icon name="close-outline"
            onclick="eliminarEgreso(${egreso.id})"></ion-icon>
        </button>
    </div>
  </div>
  `;
  return egresosHTML;
}

const eliminarEgreso = (id) =>{
  let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
}


let agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if(descripcion.value !== "" && valor.value !== ""){
    if(tipo.value === "green"){
      ingresos.push( new Ingreso(descripcion.value, + valor.value));
      cargarCabecero();
      cargarIngresos();
    }
    else if(tipo.value === "red"){
      egresos.push( new Egreso(descripcion.value, + valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
}