import React, { useEffect, useState } from "react";
import LivroForm from "../LIVROFORM/LivroForm";
import LivroList from "../LIVROLIST/LivroList";

function App() {
  const [livros, setLivros] = useState([]);
  const [livroEditando, setLivroEditando] = useState(null);

  const carregarLivros = async () => {
    try {
      const res = await fetch("/api/livros");
      const data = await res.json();
      setLivros(data);
    } catch (err) {
      console.error("Erro ao carregar livros:", err);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div>
      <LivroForm
        livroEditando={livroEditando}
        onSalvar={async () => {
          await carregarLivros();
          setLivroEditando(null);
        }}
      />

      <LivroList
        livros={livros}
        onAtualizar={carregarLivros}
        onEditar={setLivroEditando}
      />
    </div>
  );
}

export default App;
