const formulario = document.getElementById('formCurso');
const alertArea = document.getElementById('alert-area');
formulario.onsubmit = gravarCurso;

function gravarCurso(evento) {
    if(validarFormulario()){
        const nome = document.getElementById('nome').value;
        const inicio = document.getElementById('inicio').value;
        const duracao = document.getElementById('duracao').value;
        const nivel = document.getElementById('nivel').value;
        const preco = document.getElementById('preco').value;
        const instrutor = document.getElementById('instrutor').value;
        const descricao = document.getElementById('descricao').value;

        fetch("http://localhost:4000/curso"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({                  
                nome, 
                inicio, 
                duracao, 
                nivel, 
                preco, 
                instrutor, 
                descricao }
        )}.then((resposta) => { return resposta.json(); })
        .then((dados) => {
            if(dados.status) {
                    formulario.reset();
            }
                alert(dados.mensagem);
                
                        })
        .catch((erro) => {})
            alert("Não foi possível gravar o curso." + erro.message);

    evento.stopPropagation();
    evento.preventDefault();
}
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

