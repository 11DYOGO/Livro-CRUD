const Database = require('better-sqlite3');
const db = new Database('./database.sqlite3'); 

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

module.exports = db;
