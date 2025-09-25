const formulario = document.getElementById('formCurso');
const alertArea  = document.getElementById('alert-area');

formulario.onsubmit = gravarCurso;

function gravarCurso(evento) {
  evento.preventDefault();
  evento.stopPropagation();

  if (validarFormulario()) {
    const id          = document.getElementById('id').value;
    const nomeCurso   = document.getElementById('nomeCurso').value;
    const inicioCurso = document.getElementById('inicioCurso').value;
    const duracao     = document.getElementById('duracao').value;
    const preco       = document.getElementById('preco').value;
    const vagas       = document.getElementById('vagas').value;
    const nivel       = document.getElementById('nivel').value;

    fetch('http://localhost:4000/curso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        nomeCurso,
        inicioCurso,
        duracao,
        preco,
        vagas,
        nivel
      })
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.status) {
          formulario.reset();
          if (typeof exibirTabelaCursos === 'function') {
            exibirTabelaCursos();
          }
        }
        alert(dados.mensagem);
      })
      .catch((erro) => {
        alert('Não foi possível gravar o curso. ' + erro.message);
      });
  }
}

function validarFormulario() {
  const formValidado = formulario.checkValidity();
  if (formValidado) {
    formulario.classList.remove('was-validated');
  } else {
    formulario.classList.add('was-validated');
  }
  return formValidado;
}

function exibirTabelaCursos() {
  const espacoTabela = document.getElementById('tabela');
  if (!espacoTabela) return;

  espacoTabela.innerHTML = '';

  fetch('http://localhost:4000/curso', { method: 'GET' })
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.status) {
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';

        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
          <tr>
            <th>ID</th>
            <th>Nome do curso</th>
            <th>Início</th>
            <th>Duração</th>
            <th>Preço</th>
            <th>Vagas</th>
            <th>Nível</th>
          </tr>`;
        tabela.appendChild(cabecalho);

        const corpoTabela = document.createElement('tbody');
        for (const curso of dados.cursos) {
          const linha = document.createElement('tr');
          linha.innerHTML = `
            <td>${curso.id}</td>
            <td>${curso.nomeCurso}</td>
            <td>${curso.inicioCurso}</td>
            <td>${curso.duracao}</td>
            <td>${curso.preco}</td>
            <td>${curso.vagas}</td>
            <td>${curso.nivel}</td>`;
          corpoTabela.appendChild(linha);
        }
        tabela.appendChild(corpoTabela);
        espacoTabela.appendChild(tabela);
      } else {
        espacoTabela.innerHTML = '<div class="alert alert-info">Nenhum curso encontrado.</div>';
      }
    })
    .catch((erro) => {
      espacoTabela.innerHTML = '<div class="alert alert-danger">Erro ao carregar cursos.</div>';
      console.error(erro);
    });
}

function excluirCurso(id) {
    if(confirm ('Confirma a exclusão do curso (id: "' + id + '")?')) {
        fetch('http://localhost:4000/curso/' + id, { method: 'DELETE' })
        .then((resposta) => {
            if(resposta.ok) {
                return resposta.json();
            }
        })
        .then((dados) => {
            if (dados.status) {
                exibirTabelaCursos();
            }
            alert(dados.mensagem);
        })
        .catch((erro) => {
            alert('Não foi possível excluir o curso. ' + erro.message);
        });
    }
}