import cursos from '/cursoa.js';

function real(v) {
  return 'R$ ' + Number(v || 0).toFixed(2).replace('.', ',');
}

function renderCursos(lista) {
  const cont = document.getElementById('lista-cursos');
  if (!cont) return;
  cont.innerHTML = '';

  if (!Array.isArray(lista) || lista.length === 0) {
    cont.innerHTML = '<div class="badge">Nenhum curso disponível.</div>';
    return;
  }

  lista.forEach((c) => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = [
      '<div class="card__media">',
      `  <img class="card__img" src="${c.imagem}" alt="Capa do curso ${c.nome}">`,
      '</div>',
      '<div class="card__body">',
      `  <h3 class="card__title">${c.nome}</h3>`,
      '  <div class="card__meta">',
      `    <span class="badge">Início: ${c.inicio}</span>`,
      `    <span class="badge">Duração: ${c.duracao}</span>`,
      '  </div>',
      `  <div class="card__price">Preço: ${real(c.preco)}</div>`,
      '  <div class="card__actions">',
      `    <a class="btn btn--primary" href="/curso.html?id=${c.id}">Ver detalhes</a>`,
      '  </div>',
      '</div>'
    ].join('\n');
    cont.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cont = document.getElementById('lista-cursos');
  if (cont) cont.innerHTML = '<span class="badge">Carregando...</span>';
  renderCursos(cursos);
});