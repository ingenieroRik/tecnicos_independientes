window.onload = function () {

    let marca = document.querySelector("#marca")
    let modelo = document.querySelector("#modelo")
    let falla = document.querySelector("#falla")
    let solucion = document.querySelector("#solucion")
    let fecha = document.querySelector("#fecha")
    
   
    let btnCargar = document.querySelector("#btnCargar");

    marca.focus()

    btnCargar.addEventListener("click", function (e) {

        let errors = {}

        if (marca.value.length < 2) {
            errors.marca = "Debes completar con una marca valida"
        }

        if (modelo.value.length < 6) {
            errors.modelo = "Debes completar con una artist valida"
        }

        if (falla.value.length < 1) {
            errors.falla = "Debes completar con un falla valido"
        }

        if (solucion.value.length <= 5) {
            errors.solucion = "Debes completar con un solucion valido"
        }

        if (fecha.value.length < 4) {
            errors.fecha = "Debes completar con un fecha valido"
        }
        
    })

     //BOTON VOLVER PAGINA ANTERIOR

    let btnVolver = document.querySelector("#btnVolver")

    btnVolver.addEventListener("click", function(e){
        history.go(-1)
    })


}
