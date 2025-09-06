const db = require('./db');

const livros = db.prepare('SELECT * FROM livros').all();
console.log(livros);
