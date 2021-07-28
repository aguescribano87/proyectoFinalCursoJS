const USUARIO = "admin"
const PASS = 1234

$("#btnLogIn").on("click",function(){
    
    if ($("#usuario").val() == USUARIO && $("#pass").val() == PASS) {
        $(location).attr('href',"Simulador.html")
        sessionStorage.setItem("usuario",USUARIO)
        
    }else{
        $(".logIn").html(`<h4> Usuario y/o Contraseña Incorrectos </h4>
                          <button id="btnVolver">Volver</button>`)
        $("#btnVolver").on("click",()=>{location.reload()})                  
    }

})