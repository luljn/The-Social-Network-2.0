// Tooltips.
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl){
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
//...

//Toggle Password
document.getElementById('togglePassword').addEventListener('click', function(){

    const passwordField = document.getElementById('password');
    const fieldType = passwordField.getAttribute('type');

    if(fieldType === 'password'){

      passwordField.setAttribute('type', 'text');
      this.innerHTML = '<i class="bi bi-eye-slash"></i><span> Masquer le mot de passe</span>';
    } 
    
    else {
      
      passwordField.setAttribute('type', 'password');
      this.innerHTML = '<i class="bi bi-eye"></i><span> Afficher le mot de passe</span>';
    }
});
//...