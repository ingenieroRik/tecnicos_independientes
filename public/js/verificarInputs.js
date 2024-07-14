document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-login');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const clave = document.getElementById('clave');
    const confirmarClave = document.getElementById('confirmarClave');
    const btnEnviar = document.getElementById('btn-envio-login');
  
    form.addEventListener('submit', function(event) {
      if (nombre.value.trim() === '' || email.value.trim() === '' || clave.value.trim() === '' || confirmarClave.value.trim() === '') {
        event.preventDefault();
        alert('Por favor complete todos los campos antes de enviar el formulario.');
      }
    });
  });