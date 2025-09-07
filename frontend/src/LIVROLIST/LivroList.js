import React, { useState } from 'react';
import './LivroList.css';

function LivroList({ livros, onAtualizar, onEditar }) {
  const [buscaId, setBuscaId] = useState('');

  const handleDelete = async id => {
    if (!window.confirm('Deseja realmente deletar este livro?')) return;
    try {
      const res = await fetch(`/api/livros/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        if (typeof onAtualizar === 'function') onAtualizar();
      } else {
        alert('Erro ao deletar: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (err) {
      console.error('Erro ao deletar livro:', err);
      alert('Erro ao deletar livro. Veja o console.');
    }
  };

  const livrosFiltrados = buscaId
    ? livros.filter(livro => String(livro.id) === buscaId)
    : livros;

  return (
    <div className="livro-list">
      <h2>Lista de Livros</h2>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="number"
          placeholder="Buscar por ID..."
          value={buscaId}
          onChange={e => setBuscaId(e.target.value)}
        />
      </div>

      {livrosFiltrados.length === 0 && <p>Nenhum livro encontrado.</p>}
      <ul>
        {livrosFiltrados.map(livro => (
          <li key={livro.id} className="livro-item">
            <ul>
              <li><strong>ID:</strong> {livro.id}</li>
              <li><strong>Título:</strong> {livro.titulo}</li>
              <li><strong>Autor:</strong> {livro.autor}</li>
              <li><strong>Editora:</strong> {livro.editora}</li>
              <li><strong>Categoria:</strong> {livro.categoria || '-'}</li>
              <li><strong>ISBN:</strong> {livro.isbn}</li>
              <li><strong>Número de páginas:</strong> {livro.numero_paginas || '-'}</li>
              <li><strong>Lançamento:</strong> {livro.lancamento}</li>
              <li>
                <strong>Imagem:</strong><br />
                {livro.imagem ? (
                  <img src={livro.imagem} alt={livro.titulo} style={{ width: '100px' }} />
                ) : (
                  '-'
                )}
              </li>
            </ul>

            <div className="btn-group">
              <button className="edit-btn" onClick={() => onEditar(livro)}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete(livro.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LivroList;
