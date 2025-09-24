import cursos from '/cursos.js';

const grid = document.getElementById('lista-cursos');
const alertBox = document.getElementById('home-alert');

function fmtBR(n) { return Number(n || 0).toFixed(2).replace('.', ','); }

function cardHTML(c) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${c.imagem || '/img/cursos/1.svg'}" class="card-img-top" alt="${c.nome}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${c.nome}</h5>
          <p class="card-text mb-2">${c.descricao || ''}</p>
          <ul class="list-unstyled small text-muted mb-3">
            <li><strong>Início:</strong> ${c.inicio}</li>
            <li><strong>Duração:</strong> ${c.duracao}</li>
            <li><strong>Nível:</strong> ${c.nivel}</li>
          </ul>
          <div class="mt-auto">
            <div class="fw-bold mb-2">R$ ${fmtBR(c.preco)}</div>
            <a href="/login.html" class="btn btn-primary w-100">Ver detalhes</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function carregar() {
  grid.innerHTML = `
    <div class="col-12"><div class="text-center text-muted py-3">
      Carregando...
    </div></div>`;

  try {
    const resp = await fetch('/api/cursos', { cache: 'no-store' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const lista = await resp.json();

    if (!Array.isArray(lista) || !lista.length) {
      grid.innerHTML = `<div class="col-12"><div class="alert alert-info">Nenhum curso cadastrado.</div></div>`;
      return;
    }

    grid.innerHTML = lista.map(cardHTML).join('');
  } catch (err) {
    alertBox.textContent = 'Falha ao carregar a lista de cursos.';
    alertBox.classList.remove('d-none');
    grid.innerHTML = '';
    console.error(err);
  }
}

carregar();