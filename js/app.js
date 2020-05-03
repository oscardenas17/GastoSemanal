//VARIABLES 
const presupuestoUsuario = prompt("Cual es tu presupuesto semanal?");
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

console.log(presupuestoUsuario);

//CLASES
//CLase presupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);


    }

    //Método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}


//Clase interfaz
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan= document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');
        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-sucess');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //QUitar el alert despues de 3 seg
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        },3000);
    }
    //INsertar los gastos en una lista
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');
        //Crearli
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //Insertar el gasto
        li.innerHTML=` ${nombre}
                       <span class="badge badge-primary badge-pill"> $  ${cantidad}</span>`;

        //Insertar al HTML
        gastosListado.appendChild(li);
    }
    //Comprueba el presupuesto restante
        presupuestoRestante(cantidad){
            const restante =  document.querySelector('span#restante');
            //Leemos el presupuesto restante
            const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

            restante.innerHTML = ` ${presupuestoRestanteUsuario}`;
          
    }

}


//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        //Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //INstanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //Leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //Instanciar la interfaz
    const ui = new Interfaz();
    //comprobar que los hastos no esten vacios
    if(nombreGasto === '' || cantidadGasto ===''){
       //2 parametros , mensaje y tipo
        ui.imprimirMensaje('Tienes un Error', 'error');
    }else{
        //insertar en el HTML
        ui.imprimirMensaje('Correcto','correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);

    }


});