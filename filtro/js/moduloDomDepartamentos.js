import{administrarPeticiones} from"../index/index.js"
import { Departamento } from "./Peticiones.js";
export {llenarModalDepart,listarDepartamentos,eliminarFilaDepartamentos}    


async function listarDepartamentos(contenedor) {

    let tableBody = contenedor.querySelector("tbody");
    let departamentos = await administrarPeticiones.obtenerDatos("departamentos");
    let ciudades = await administrarPeticiones.obtenerDatos("ciudades"); 
    tableBody.innerHTML="";
    for (let index = 0; index < departamentos.length; index++) {
      let ciudadesFiltradas=[];
      for (let ciudad of ciudades){
        if(departamentos[index].id === ciudad.departamentoId){
          ciudadesFiltradas.push(ciudad.nomCiudad)
        }
      
    }

      tableBody.innerHTML +=
        `
      <tr id="${departamentos[index].id}">
        <td>${departamentos[index].id}</td>
      <td>
        <div class="ms-3">
          <p class="fw-bold mb-1">${departamentos[index].nomDepartamento}</p>
        </div>
    </td>
    <td>
      <p class="text-muted mb-0">${ciudadesFiltradas.join("-")}</p>
    </td>
    <td >
      <button class="mr-2 btn btn-lg text-dark btn-edit-departamentos"><i class="far fa-edit"></i></button>

      <button class="btn btn-lg text-dark btn-eliminar-departamentos"><i class="far fa-trash-alt"></i></button>
    </td>
    </tr>

      
      `
    }
  }


  async function llenarModalDepart(e){
    let tr = e.target.closest("tr"); 
    let idTr = tr.id;
     const departamento = await(await fetch(`http://localhost:3000/departamentos/${idTr}`)).json()   
     let contenedorModal = document.getElementById('div-modal-edit-depart');
     contenedorModal.innerHTML = 
     `     
     <!-- Modal -->
     <div class="modal" id="modalEditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <!-- modal para añadir departamento -->
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                 <h3 class="fs-3 text-center">Añadir Departamento</h3>
              </div>
              <div class="modal-body">
                      <div class="mb-3">
                         <label for="ipt-nombre-depart-edit" class="form-label">NOMBRE DEL DEPARTAMENTO</label>
                         <input type="text" value="${departamento.nomDepartamento}" class="form-control" id="ipt-nombre-depart-edit">
                      </div>  
               </div>  
                     <div class="mb-3 ">
                        <button type="button" class="btn btn-secondary"  data-mdb-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary" id="form-depart-btn-edit">Gurdar cambios</button>
              </div>         
            </div>
          </div>
    </div
     `
            var modal = new mdb.Modal(document.getElementById("modalEditar"));
            // Llamar a la función show() para abrir el modal
            modal.show();
            
            //añadiar addEvent al boton de editar ya que solo existe cuando se muestra este modal
            
            let formRutaEditBtn = document.getElementById('form-depart-btn-edit').
            addEventListener("click",()=>{
             //lee los valores introducidos en el modal y genera un objeto con esos valores
              let nombreDepartEdit = document.getElementById("ipt-nombre-depart-edit").value;
              let editarDepartamento= new Departamento(nombreDepartEdit);
              alert("se ha editado satisfactoriamente")
              administrarPeticiones.actualizarDatos(editarDepartamento,"departamentos",idTr)
            }) 

            }


        
  

  async function eliminarFilaDepartamentos(e) {
    let tr = e.target.closest("tr");
    let idTr = tr.id;
    try {
        let departamento =await(await fetch(`http://localhost:3000/departamentos/${idTr}`)).json();

        let ciudades = await administrarPeticiones.obtenerDatos("ciudades"); 

          let ciudadesAEliminar=[];
          for (let ciudad of ciudades){
            if(departamento.id === ciudad.id){
              ciudadesAEliminar.push(ciudad.id)
            }

          for(let ciudad  of ciudadesAEliminar)  
            await administrarPeticiones.eliminarDatos(tr,ciudad,"ciudades")
        }
        await administrarPeticiones.eliminarDatos(tr,idTr,"departamentos");

     } catch (error) {
      console.log("error: " + error);
    }
  }
  
