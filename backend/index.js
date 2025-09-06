const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const db = new Database('./database.sqlite3');

const app = express();
app.use(cors());
app.use(express.json());

db.prepare(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    editora TEXT NOT NULL,
    categoria TEXT,
    isbn INTEGER NOT NULL UNIQUE,
    numero_paginas INTEGER,
    lancamento DATE NOT NULL,
    imagem TEXT
  )
`).run();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'lets go' });
});

app.get('/api/livros', (req, res) => {
  try {
    const livros = db.prepare('SELECT * FROM livros ORDER BY id DESC').all();
    res.json(livros);
  } catch (err) {
    console.error('Erro ao buscar livros:', err);
    res.status(500).json({ error: 'Erro interno ao listar livros' });
  }
});

app.post('/api/livros', (req, res) => {
  const { titulo, isbn, editora, lancamento, autor, imagem, categoria, numero_paginas } = req.body;

  if (!titulo || !isbn || !editora || !lancamento || !autor) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  try {
    const info = db.prepare(`
      INSERT INTO livros (titulo, isbn, editora, lancamento, autor, imagem, categoria, numero_paginas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      titulo,
      Number(isbn),
      editora,
      lancamento,
      autor,
      imagem || '',
      categoria || '',
      numero_paginas ? Number(numero_paginas) : null
    );

    const livro = db.prepare('SELECT * FROM livros WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(livro);
  } catch (err) {
    console.error('Erro ao criar livro:', err);

    if (err && (err.code === 'SQLITE_CONSTRAINT' || String(err).includes('UNIQUE'))) {
      return res.status(409).json({ error: 'ISBN já cadastrado' });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.put('/api/livros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, isbn, editora, lancamento, autor, imagem, categoria, numero_paginas } = req.body;

  if (!titulo || !isbn || !editora || !lancamento || !autor) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  try {
    const info = db.prepare(`
      UPDATE livros
      SET titulo = ?, isbn = ?, editora = ?, lancamento = ?, autor = ?, imagem = ?, categoria = ?, numero_paginas = ?
      WHERE id = ?
    `).run(
      titulo,
      Number(isbn),
      editora,
      lancamento,
      autor,
      imagem || '',
      categoria || '',
      numero_paginas ? Number(numero_paginas) : null,
      id
    );

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    const livroAtualizado = db.prepare('SELECT * FROM livros WHERE id = ?').get(id);
    res.json(livroAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar livro:', err);

    if (err && (err.code === 'SQLITE_CONSTRAINT' || String(err).includes('UNIQUE'))) {
      return res.status(409).json({ error: 'ISBN já cadastrado' });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.delete('/api/livros/:id', (req, res) => {
  try {
    const info = db.prepare('DELETE FROM livros WHERE id = ?').run(req.params.id);
    res.json({ changes: info.changes });
  } catch (err) {
    console.error('Erro ao deletar livro:', err);
    res.status(500).json({ error: 'Erro interno ao deletar' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
