class CLIENTE{
    constructor(cod,razonSocial,telefono,email){
        this.cod = cod
        this.razonSocial = razonSocial
        this.telefono = telefono
        this.email = email
    }
}
//cargo algunos clientes al array a modo de prueba
const clientes = []

clientes.push(new CLIENTE(cod=clientes.length,razonSocial="Alejandro Eschoyez",telefono=3518351789,email="alejandroes@gmail.com"))
clientes.push(new CLIENTE(cod=clientes.length,razonSocial="Ruben Cerruria",telefono=3515123456,email="semacor@gmail.com"))
clientes.push(new CLIENTE(cod=clientes.length,razonSocial="Octavio Julio",telefono=3514789654,email="idea2@gmail.com"))

guardar_clientes()

function guardar_clientes(){
    localStorage.setItem("clientes", JSON.stringify(clientes))
}

$("#nuevoCliente").on("click",()=>{
    $("#contenedorCargarCliente").fadeIn()
    $("#contenedorListadoClientes").css("display","none")
    $("#contenedorFiltradoClientes").css("display","none")
})

//carga los clientes
$("#btnCargarCliente").on("click",function(){
    if (validarFormCl()) {
        
    clientes.push(new CLIENTE ((clientes.length),$("#clNombre").val(),parseInt($("#clTel").val()),$("#clMail").val()))
    guardar_clientes()
    resetCL()
    }
})

//limpia el formulario de carga
function resetCL(){
    $("#clNombre").val("")
    $("#clTel").val("")
    $("#clMail").val("")
}
//valida que no falten datos
function validarFormCl(){
    if ($("#codigo").val()!=""&&$("#clNombre").val()!=""&&$("#clTel").val()!=""&&$("#clMail").val()) {
        return true
    }
    else{
        alert("faltan campos por completar")
        return false
    }
}

$("#listarClientes").on("click",listar)

function listar(){

    $("#contenedorListadoClientes").fadeIn()
    $("#contenedorFiltradoClientes").fadeIn()
    $("#contenedorCargarCliente").css("display","none")
    
    $("#contenedorFiltradoClientes").html(`<hr>
                                <input id="txtFiltrarCl" placeholder="Razon Social">
                                <button onclick="filtrarCl()">Buscar</button><br>
                                `)
listarCliente(clientes)
}


//funcion para filtrar clientes
function filtrarCl(){
let filtrado = clientes.filter(cl => {
    
    return cl.razonSocial.toLowerCase().includes($("#txtFiltrarCl").val().toLowerCase())
})
listarCliente(filtrado)
$("#txtFiltrarCl").val("")
}
                    

//muestra los clientes
function listarCliente(p){
    $("#contenedorListadoClientes").html(
       `<table id="tablaCl" border=1><tr>
        <td>ID</td>
        <td>Razon Social</td>
        <td>Telefono</td>
        <td>Email</td>
        </tr><br>
        </table>`
    ) 
    for (const elem of p) {
        $("#tablaCl").append(`<tr>
                        <td>${elem.cod}</td>
                        <td>${elem.razonSocial}</td>
                        <td>${elem.telefono}</td>
                        <td>${elem.email}</td>
                        <td><button onclick="editarCliente(${elem.cod})">Editar</button></td>
                        </tr>`)
                        
                                    
                                                       
    }
      
}

//funcion para editar clientes
function editarCliente(p){
    let cliente = clientes.find(cl => cl.cod == p)


    $("#contenedorFiltradoClientes").css("display","none")
    $("#contenedorListadoClientes").html(`
    Razon Social<br>
    <input type="text" id="nombreEditCl" value="${cliente.razonSocial}" ><br>
    
    Marca<br>
    <input type="number" id="telefonoEditCl" value="${cliente.telefono}" ><br>
    
    Costo<br>
    <input min="0" type="email" id="emailEditCl" value="${cliente.email}" ><br>
    
        
    <button onclick="guardarEditCl(${p})">Guardar</button>
    <button onclick="eliminarEditCl(${p})" >Eliminar</button>

    `)



}
function guardarEditCl(p){
    let edit = new CLIENTE (
        cod=p,
        razonSocial=$("#nombreEditCl").val(),
        telefono=$("#telefonoEditCl").val(),
        email=$("#emailEditCl").val(),
        
    )

    let pos = clientes.findIndex(cl => cl.cod === p)
    
    if (confirm("¿Desea Guardar los Cambios?")){
        clientes.splice(pos,1,edit)
        guardar_clientes()
    }
    listar()
        
}

function eliminarEditCl(p){
    let pos = clientes.findIndex(cl => cl.cod === p)
    if (confirm("¿Esta Seguro de Eliminar el Cliente?")){
        clientes.splice(pos,1)
        guardar_clientes()
    }
    listar()
}

