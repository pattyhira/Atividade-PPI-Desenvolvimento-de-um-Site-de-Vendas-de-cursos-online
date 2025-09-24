const formulario = document.getElementById('formCurso');
const alertArea = document.getElementById('alert-area');
formulario.onsubmit = gravarCurso;

function gravarCurso(evento) {
    validarFormulario();
    evento.stopPropagation();
    evento.preventDefault();
}

function validarFormulario() {
    
    const formValidado = formulario.checkValidity();
    if (formValidado) {
        formulario.classList.remove('was-validated');
    }
    else {
        formulario.classList.add('was-validated');
    }

    return formValidado;

}

