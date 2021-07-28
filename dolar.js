const URLDOLAR = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
let dolar
//funcion para cargar la cotizacion del dolar actualizada
$.get( URLDOLAR, function( precio, estado ) { 
    if (estado =="success") {

        $(".cotizacion").append(`<h4>${precio[0].casa.venta}</h4>`)
        dolar = parseFloat(precio[0].casa.venta.replace(",","."))
        localStorage.setItem("dolar",dolar)        
    }
    
});
