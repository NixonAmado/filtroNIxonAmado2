import{administrarPeticiones} from"../index/index.js"
import{Ciudad} from"./Peticiones.js";
export {listarCiudades,llenarModalCiudades,eliminarFilaCiudades}

async function listarCiudades(contenedor) {
    let tableBody = contenedor.querySelector("tbody");
    let ciudades = await administrarPeticiones.obtenerDatos("ciudades");
    tableBody.innerHTML="";
    for (let index = 0; index < ciudades.length; index++) {
      tableBody.innerHTML +=
        `
      <tr id="${ciudades[index].id}">
        <td>${ciudades[index].id}</td>
      <td>
      <div class="d-flex justify-content-center align-items-center">
        <img
            src="${ciudades[index].imagen}"
            alt="${ciudades[index].nomCiudad}"
            style="width: 45px; height: 45px"
            class="rounded-circle"
            />
        <div class="ms-3">
          <p class="fw-bold mb-1">${ciudades[index].nomCiudad}</p>
          <p class="text-muted mb-0">lat: ${ciudades[index].coordenadas.lat} lon:${ciudades[index].coordenadas.lon}</p>
        </div>
      </div>
    </td>
    <td>${ciudades[index].departamentoId}</td>
    
    <td >
      <button class="mr-2 btn btn-lg text-dark btn-edit-ciudad"><i class="far fa-edit"></i></button>
      <button class="btn btn-lg text-dark btn-eliminar-ciudad"><i class="far fa-trash-alt"></i></button>
  </td>
  </tr>
      </tr>
      `
    }
  }



  async function llenarModalCiudades(e){
    let tr = e.target.closest("tr"); 
    let idTr = tr.id;

      const ciudad = await(await fetch(`http://localhost:3000/ciudades/${idTr}`)).json()   
      let contenedorModal = document.getElementById('div-modal-editar-ciudad');
      contenedorModal.innerHTML = 
      // se añade todo el modal
      `
<!-- Modal -->
<div class="modal" id="modalCiudadEditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
         <span class="input-group-text rounded-0">URL</span>
         <input type="text" id="ipt-imagen-ciudad-editar" value="${ciudad.imagen}" aria-label="First name"  class="form-control rounded-0" />
     </div>
     <div class="modal-body">
             <div class="mb-3">
               <label for="ipt-nombre-ciudad-editar" class="form-label">NOMBRE DE LA CIUDAD</label>
               <input type="text" class="form-control" value="${ciudad.nomCiudad}"id="ipt-nombre-ciudad-editar">
             </div>
             <div class="mb-3">
                 <label for="ipt-lat-ciudad-editar" class="form-label">LATITUD</label>
                 <input type="text"  class="form-control" value="${ciudad.coordenadas.lat}" id="ipt-lat-ciudad-editar">
               </div>

             <label for="ipt-long-ciudad-editar" class="form-label">LONGITUD</label>
             <div class="mb-3">
                 <input type="text" class="form-control" value="${ciudad.coordenadas.lon}" id="ipt-long-ciudad-editar">
               </div>

             <label for="ipt-vinculacion-ciudad" class="form-label">VINCULACION</label>
             <div class="mb-3">
                  <input type="text" class="form-control" value="${ciudad.departamentoId}" id="ipt-vinculacion-ciudad-editar">
                </div>  
   
            <div class="mb-3 ">
               <button type="button" class="btn btn-secondary"  data-mdb-dismiss="modal">Close</button>
             <button type="submit" class="btn btn-primary" id="form-ciudades-btn-edit">Guardar cambios</button>
     </div>         
   </div>
 </div>
</div>
</div>   `

            var modal = new mdb.Modal(document.getElementById("modalCiudadEditar"));
            // Llamar a la función show() para abrir el modal
            modal.show();         
            //añadiar addEvent al boton de editar ya que solo existe cuando se muestra este modal    
            let formCiudadEditBtn = document.getElementById('form-ciudades-btn-edit').
            addEventListener("click",()=>{
                let imagenCiudadEditar = document.getElementById('ipt-imagen-ciudad-editar').value;
                let nombreCiudadEditar = document.getElementById('ipt-nombre-ciudad-editar').value;
                let latitudCiudadEditar = document.getElementById("ipt-lat-ciudad-editar").value;
                let longitudCiudadEditar = document.getElementById("ipt-long-ciudad-editar").value;
                let vinculacionCiudadEditar = document.getElementById("ipt-vinculacion-ciudad-editar").value;
                //lee los valores introducidos en el modal y genera un objeto con esos valores
            
             //lee los valores introducidos en el modal y genera un objeto con esos valores
              let ciudadEditar= new Ciudad(nombreCiudadEditar,latitudCiudadEditar,longitudCiudadEditar,imagenCiudadEditar,Number(vinculacionCiudadEditar));
              alert("se ha editado satisfactoriamente")
              administrarPeticiones.actualizarDatos(ciudadEditar,"ciudades",idTr)
            }) 

            }


async function eliminarFilaCiudades(e){
  let tr = e.target.closest("tr");
  let idTr = tr.id;
  try {
      await administrarPeticiones.eliminarDatos(tr,idTr,"ciudades");

   } catch (error) {
    console.log("error: " + error);
  }
}