//check usuario
if(sessionStorage.getItem("usuario")) {
    let usu = sessionStorage.getItem("usuario")
    console.log(`Bienvenido ${usu}`)
}else{
    $(location).attr('href',"inicio.html")
}


//botones productos
$("#btnProductos").on("click",()=>{
    $(".botonesIni").css("display","none")
    $(".botonesProd").fadeIn()
})
$("#btnVolverProd").on("click",()=>{
    $(".botonesIni").fadeIn()
    $(".botonesProd").css("display","none")
    $("#contenedorCargar").css("display","none")
    $("#contenedorFiltrado").css("display","none")
    $("#contenedorStock").css("display","none")

})

//botones Clientes
$("#btnClientes").on("click",()=>{
    $(".botonesIni").css("display","none")
    $(".botonesClientes").fadeIn()
    
})
$("#btnVolverCliente").on("click",()=>{
    $(".botonesIni").fadeIn()
    $(".botonesClientes").css("display","none")
    $("#contenedorCargarCliente").css("display","none")
    $("#contenedorFiltradoClientes").css("display","none")
    $("#contenedorListadoClientes").css("display","none")

})


