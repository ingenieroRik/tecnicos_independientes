window.addEventListener('load', function() {

 
    
    /***************************  para login ************************** */
    let botonEnvioLogin = document.querySelector("#btn-envio-login");
    let inputEmailLogin =document.querySelector('#email');
    let inputClaveLogin = document.querySelector("#clave")
    
    let loginForm = document.querySelector(".form-login");
    //let errorNombreLogin = document.querySelector(".errorNombreLogin");
    //let errorClaveLogin = document.querySelector(".errorClaveLogin");
  
  
    // Función para validar si una cadena es una dirección de correo electrónico válida
    const isEmail = (email) => {
      // Expresión regular para validar el formato de correo electrónico
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Verifica si el correo electrónico cumple con el formato
      return re.test(email);
    }
    
      botonEnvioLogin.addEventListener('click', function(e){
                e.preventDefault();
  
                 // Obtiene el valor del campo email (el email que ingresa el usuario) 
                 // y elimina los espacios en blanco al principio y al final con la funcion trim()
                const emailData = inputEmailLogin.value.trim();
             
                   
                  if(inputEmailLogin.value.length == 0){
  
                    // se reproduce mensaje
                    const mensaje = new SpeechSynthesisUtterance();
                    mensaje.text = "completa tu email, por favor";           
                    speechSynthesis.speak(mensaje);
    
    
                     // Encuentra el elemento padre del campo de entrada
                     const formControl = inputEmailLogin.closest('div');
                     // Encuentra el elemento de texto de error dentro del elemento padre
                    const errorText = formControl.querySelector('.error-text');
                   
                    // Establece el texto del mensaje de error
                    errorText.innerText = "El correo electrónico es obligatorio";
                    } 
  
                    else if(isEmail(emailData) == false){
  
                      // se reproduce mensaje
                      const mensaje = new SpeechSynthesisUtterance();
                      mensaje.text = "el correo no es valido";           
                      speechSynthesis.speak(mensaje);
      
      
                       // Encuentra el elemento padre del campo de entrada
                       const formControl = inputEmailLogin.closest('div');
                       // Encuentra el elemento de texto de error dentro del elemento padre
                      const errorText = formControl.querySelector('.error-text');
                     
                      // Establece el texto del mensaje de error
                      errorText.innerText = "El correo electrónico no es válido";
                      } 
  
  
                  if (inputClaveLogin.value.length < 1) {
                  const mensaje = new SpeechSynthesisUtterance();
                  mensaje.text = "completa tucontraseña, por favor";           
                  speechSynthesis.speak(mensaje);
  
                   // Encuentra el elemento padre del campo de entrada
                   const formControl = inputClaveLogin.closest('div');
                   // Encuentra el elemento de texto de error dentro del elemento padre
                  const errorText = formControl.querySelector('.error-text');
                
                  // Establece el texto del mensaje de error
                  errorText.innerText = "La contraseña es obligatoria";
  
  
                }
                
                else {
                loginForm.submit();
                }
      })
    
    })
  
  
  
  
  
  
  
    
  