
document.addEventListener('DOMContentLoaded', () =>{

    const form = document.querySelector('form');



//  esto borrará los que hay dentro de los div de errores
const setSuccessFor = (input) => {
    const formControl = input.closest('div');
    formControl.classList.remove('error');
    const errorText = formControl.querySelector('.error-text');
    errorText.innerText = '';
   }; 

// Agrega eventos para borrar las clases de error cuando se completa el input o se presiona Tab
form.querySelectorAll('input').forEach(input => {
input.addEventListener('input', () => {
  // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
  const value = input.value.trim();
  // Si el campo no está vacío, elimina cualquier mensaje de error
  if (value !== '') {
      setSuccessFor(input);
  }
});
});

// Agrega eventos para borrar las clases de error cuando se selecciona una opción del select
form.querySelectorAll('select').forEach(select => {
select.addEventListener('change', () => {
// Obtiene el valor seleccionado del campo de selección
const value = select.value;
// Si se selecciona una opción, elimina cualquier mensaje de error
if (value !== '') {
    setSuccessFor(select);
}
});
});

});