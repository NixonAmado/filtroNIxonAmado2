import {PeticionesManagement,Ciudad,Departamento} from "../js/Peticiones.js"
import {llenarModalDepart,listarDepartamentos,eliminarFilaDepartamentos} from "../js/moduloDomDepartamentos.js"
import {listarCiudades,llenarModalCiudades,eliminarFilaCiudades} from "../js/moduloDomCiudades.js";
let administrarPeticiones= new PeticionesManagement();


let searchDepartamentosBtn = document.getElementById('search-departamentos-btn').
addEventListener("click", ()=>{
    let trContenedor=document.getElementById("seccion-departamentos");
    buscar("search_table_1",trContenedor)
})

let searchCiudadBtn = document.getElementById('search-ciudades-btn').
addEventListener("click", ()=>{
  let trContenedor=document.getElementById("seccion-ciudades");
  buscar("search_table_2",trContenedor)
})

function buscar(iptBuscar,contenedor) {
    const buscado = document.getElementById(iptBuscar).value.toLowerCase();
    const rows = contenedor.querySelector("tbody").getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].children;
        let found = false;
        for (let j = 0; j < columns.length; j++) {
            const columnValue = columns[j].textContent.toLowerCase();
            if (columnValue.indexOf(buscado) == 0) {
                found = true;
                break;
            }
        }
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}



//añade el departamento a la tabla
let AñadirDepartamentoBtn = document.getElementById('form-departamento-btn').
addEventListener("click",async ()=>{
    let nombreDepartamento = document.getElementById('ipt-nombre-departamento').value;
   //lee los valores introducidos en el modal y genera un objeto con esos valores
    let departamento = new Departamento(nombreDepartamento)
    alert("se ha añadido satisfactoriamente")
    administrarPeticiones.postDatos(departamento,"departamentos");
})


//añade la ciudad a la tabla
let AñadirCiudadBtn = document.getElementById('form-ciudades-btn').
addEventListener("click",async ()=>{
    let imagenCiudad = document.getElementById('ipt-imagen-ciudad').value;
    let nombreCiudad = document.getElementById('ipt-nombre-ciudad').value;
    let latitudCiudad = document.getElementById("ipt-lat-ciudad").value;
    let longitudCiudad = document.getElementById("ipt-long-ciudad").value;
    let vinculacionCiudad = document.getElementById("ipt-vinculacion-ciudad").value;

   //lee los valores introducidos en el modal y genera un objeto con esos valores
    let ciudad= new Ciudad(nombreCiudad,latitudCiudad,longitudCiudad,imagenCiudad,Number(vinculacionCiudad));
    alert("se ha añadido satisfactoriamente")
    administrarPeticiones.postDatos(ciudad,"ciudades")
})   



  window.addEventListener('load', async () => {
    
    let trContenedorDepart = document.getElementById("seccion-departamentos");
    await listarDepartamentos(trContenedorDepart);
    
    let botonesEditarDepart = document.getElementsByClassName("btn-edit-departamentos");
    [...botonesEditarDepart].forEach((btn) => {
        btn.addEventListener("click", async function(e) {
            await llenarModalDepart(e);
        })});

    let botonesEliminarDepart= document.getElementsByClassName("btn-eliminar-departamentos");
    [...botonesEliminarDepart].forEach((btn)=> {
            btn.addEventListener("click", async function(e) {
                await eliminarFilaDepartamentos(e);
            })});        

    // ciudades

    let trContenedorCiudades = document.getElementById("seccion-ciudades");
    await listarCiudades(trContenedorCiudades);

    let botonesEditarCiudades = document.getElementsByClassName("btn-edit-ciudad");
    [...botonesEditarCiudades].forEach((btn) => {
        btn.addEventListener("click", async function(e) {
         await llenarModalCiudades(e);
        })})   
        
    let botonesEliminarCiudades= document.getElementsByClassName("btn-eliminar-ciudad");
    [...botonesEliminarCiudades].forEach((btn)=> {
        btn.addEventListener("click", async function(e) {
        await eliminarFilaCiudades(e);
            })});        
    
    let contenedorImagenes = document.getElementById('contenedor-imagenes-inicio');
    let ciudades = await administrarPeticiones.obtenerDatos("ciudades");
    contenedorImagenes.innerHTML="";
    for(let ciudad of ciudades){
        contenedorImagenes.innerHTML+=
        `
          <div class="col-3 d-flex bg-image hover-overlay  ripple" data-mdb-ripple-color="light">
            <img src="${ciudad.imagen}" class="img-fluid" alt="${ciudad.nomCiudad}"/>
            <a href="#navbarExample01">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
            </a>
          </div>
        `;

    }           
  })


  export{administrarPeticiones}




