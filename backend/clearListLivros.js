
const db = require('./db');

db.prepare('DROP TABLE IF EXISTS livros').run();

console.log('Livros excluídos');