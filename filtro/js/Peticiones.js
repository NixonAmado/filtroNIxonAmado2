export {Ciudad,PeticionesManagement,Departamento} 
// import {verRegistro} from "./tablasDeRegistro.js"

const URL = "http://localhost:3000"
const headers = new Headers ({'Content-Type': 'application/json'});

class Departamento{
    constructor(nombre) {
        this.nomDepartamento = nombre;
    }
    
}

class Ciudad{
    constructor(nombre,latitud,longitud,imagen="https://elturismoencolombia.com/wp-content/uploads/2021/12/bandera-colombia-turismo.jpg",vinculacion){
        this.nomCiudad = nombre,
        this.coordenadas ={
            "lat":  latitud,
             "lon": longitud
            }
        this.imagen = imagen;
        this.departamentoId = vinculacion
    }
}

function configurarAccion(accion,data=""){

    let config ={
        method:`${accion}`,
        headers: headers,
        body: JSON.stringify(data)
    }
    return config  
}
class PeticionesManagement{
    async obtenerDatos(direccion){
        let data = await (await fetch(`${URL}/${direccion}`)).json();
        return data
        //listar(data);
    }
    async postDatos(data,direccion){
        await fetch(`${URL}/${direccion}`,configurarAccion("POST",data));
    }

    async actualizarDatos(data,direccion,id){
        try {
        await fetch(`${URL}/${direccion}/${id}`,configurarAccion("PUT",data))
            
        } catch (error) {
            console.log("error" + error)
        }
    }

    async eliminarDatos(tr,id,direccion){
        let data = Object.fromEntries(new FormData(tr.target));
        let config = {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(data)
        };

        if(direccion == "departamentos"){
            await fetch(`${URL}/${direccion}/${id}`, config);
        }


        else if(direccion =="ciudades"){
            await fetch(`${URL}/${direccion}/${id}`,config);
        }
    
    }
}

