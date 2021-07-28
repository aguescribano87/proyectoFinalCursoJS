//Variables y obajetos globales

class PRODUCTO{
    constructor(cod,nombre,marca,cantidad,costo,precioventa,precioventadolares){
        this.cod = cod
        this.nombre = nombre
        this.marca = marca
        this.cantidad = cantidad
        this.costo = costo
        this.precioventa = precioventa
        this.precioventadolares = precioventadolares
    }
}

let dolarProd = localStorage.getItem("dolar")


//cargo algunos productos al array a modo de prueba
const productos = []
productos.push(new PRODUCTO(cod=productos.length,nombre="Monitor LG 19´",marca="LG",cantidad=10,costo=1200,precioventa=2000,precioventadolares=2000/dolarProd))
productos.push(new PRODUCTO(cod=productos.length,nombre="Parlantes GENIUS Stereo Usb´",marca="GENIUS",cantidad=35,costo=500,precioventa=1500,precioventadolares=1500/dolarProd))
productos.push(new PRODUCTO(cod=productos.length,nombre="Teclado Wireless LOGITECH kb788 Usb´",marca="LOGITECH",cantidad=7,costo=900,precioventa=1850,precioventadolares=1850/dolarProd))

guardar_prductos()

function guardar_prductos(){
    localStorage.setItem("productos", JSON.stringify(productos))
}

//valida el formulario de carga de productos para que no falten campos
function validarFormPro(){
    if ($("#nombre").val()!=""&&$("#marca").val()!=""&&$("#costo").val()!=""&&$("#ganancia").val()!=""&&$("#cantidad").val()!="") {
        return true
    }
    else{
        alert("faltan campos por completar")
        return false
    }
}


//muesta el contenedor cargar y oculta la lista de stock
$("#nuevoProd").on("click",()=>{
    $("#contenedorCargar").fadeIn()
    $("#contenedorStock").css("display","none")
    $("#contenedorFiltrado").css("display","none")
})

//funcion para limpiar el formulario de carga de productos
function resetProd(){
    $("#nombre").val("")
    $("#marca").val("")
    $("#costo").val("")
    $("#ganancia").val("")
    $("#cantidad").val("")
}


//funcion para cargar productos
$("#btnCargar").on("click",function(){
    if (validarFormPro()) {
        
    productos.push(new PRODUCTO ((productos.length),$("#nombre").val(),$("#marca").val(),$("#cantidad").val(),$("#costo").val(),rent($("#costo").val()),(rent($("#costo").val())/dolarProd)))
    guardar_prductos()
    //calcula el margen de ganancia y el iva
    function rent(c){
        marg = (parseInt($("#ganancia").val())/100)+1
        return ((parseInt(c) * marg ))*1.21

    }
    
    resetProd()
    }
})



//funcion para crear la tabla para mostrar productos y elementos de filtrado
$("#stock").on("click",stock)

function stock(){

    $("#contenedorStock").fadeIn()
    $("#contenedorFiltrado").fadeIn()
    $("#contenedorCargar").css("display","none")
    
    $("#contenedorFiltrado").html(`<hr>
                                <input id="txtFiltrar" placeholder="Nombre del Producto">
                                <button onclick="filtrarProd()">Buscar</button><br>
                                `)
listarProductos(productos)
}


//funcion para filtrar productos
function filtrarProd(){
let filtrado = productos.filter(prod => {
    
    return prod.nombre.toLowerCase().includes($("#txtFiltrar").val().toLowerCase())
})
listarProductos(filtrado)
$("#txtFiltrar").val("")
}



                           

//muestra los productos en stock
function listarProductos(p){
    $("#contenedorStock").html(
       `<table id="tablaProd" border=1><tr>
        <td>ID</td>
        <td>Nombre</td>
        <td>Marca</td>
        <td>Costo</td>
        <td>Precio de Venta</td>
        <td>Precio en Dolares</td>
        <td>Stock</td>
        </tr><br>
        </table>`
    ) 
    for (const elem of p) {
        $("#tablaProd").append(`<tr>
                        <td>${elem.cod}</td>
                        <td>${elem.nombre}</td>
                        <td>${elem.marca}</td>
                        <td>$${elem.costo}</td>
                        <td>$${(elem.precioventa).toFixed(2)}</td>
                        <td>$${(elem.precioventa/dolarProd).toFixed(2)}</td>
                        <td>${elem.cantidad}</td>
                        <td><button onclick="editarProd(${elem.cod})">Editar</button></td>
                        </tr>`)
                        
                                    
                                                       
    }
      
}

//funcion para editar productos
function editarProd(p){
    let producto = productos.find(prod => prod.cod == p)


    $("#contenedorFiltrado").css("display","none")
    $("#contenedorStock").html(`
    Nombre del Producto<br>
    <input type="text" id="nombreEdit" value="${producto.nombre}" ><br>
    
    Marca<br>
    <input type="text" id="marcaEdit" value="${producto.marca}" ><br>
    
    Costo<br>
    <input min="0" type="number" id="costoEdit" value="${producto.costo}" ><br>
    
    Margen de Ganancia<br>
    <input min="0" type="number" onchange="modificarLbl(${producto,$("#rentEdit").val()})" id="rentEdit" value="${(((producto.precioventa)/1.21 / producto.costo)-1)*100}" ><br>
    
    Cantidad<br>
    <input min="0" type="number" id="cantEdit" value="${producto.cantidad}" ><br>
    
    <button onclick="guardarEditProd(${p})">Guardar</button>
    <button onclick="eliminarEditProd(${p})" >Eliminar</button>

    `)


}

function guardarEditProd(p){
    let edit = new PRODUCTO (
        cod=p,
        nombre=$("#nombreEdit").val(),
        marca=$("#marcaEdit").val(),
        cantidad=$("#cantEdit").val(),
        costo=$("#costoEdit").val(),
        precioventa=(($("#costoEdit").val())*(($("#rentEdit").val()/100)+1))*1.21
    )

    let pos = productos.findIndex(prod => prod.cod === p)
    
    if (confirm("¿Desea Guardar los Cambios?")){
        productos.splice(pos,1,edit)
        guardar_prductos()
    }
    stock()
        
}

function eliminarEditProd(p){
    let pos = productos.findIndex(prod => prod.cod === p)
    if (confirm("¿Esta Seguro de Eliminar el Producto?")){
        productos.splice(pos,1)
        guardar_prductos()
    }
    stock()
}



