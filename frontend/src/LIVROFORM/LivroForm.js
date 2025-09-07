import React, { useState, useEffect } from "react";
import "./LivroForm.css";

const initialForm = {
  titulo: "",
  autor: "",
  editora: "",
  categoria: "",
  isbn: "",
  numero_paginas: "",
  lancamento: "",
  imagem: "",
};

function normalizeLivro(livro = {}) {
  return {
    titulo: livro.titulo ?? "",
    autor: livro.autor ?? "",
    editora: livro.editora ?? "",
    categoria: livro.categoria ?? "",
    isbn: (livro.isbn !== null && livro.isbn !== undefined) ? String(livro.isbn) : "",
    numero_paginas: (livro.numero_paginas !== null && livro.numero_paginas !== undefined) ? String(livro.numero_paginas) : "",
    lancamento: livro.lancamento ?? "",
    imagem: livro.imagem ?? "",
    id: livro.id ?? undefined, 
  };
}

function LivroForm({ livroEditando, onSalvar }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (livroEditando) {
      setForm(prev => ({ ...initialForm, ...normalizeLivro(livroEditando) }));
    } else {
      setForm(initialForm);
    }
  }, [livroEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value ?? "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        titulo: form.titulo.trim(),
        autor: form.autor.trim(),
        editora: form.editora.trim(),
        categoria: form.categoria.trim() || "",
        isbn: form.isbn === "" ? null : Number(form.isbn),
        numero_paginas: form.numero_paginas === "" ? null : Number(form.numero_paginas),
        lancamento: form.lancamento || "",
        imagem: form.imagem.trim() || "",
      };

      let res;
      if (form.id) {
        res = await fetch(`/api/livros/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/livros", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          alert(resData.error || "ISBN já cadastrado.");
        } else if (res.status === 400) {
          alert(resData.error || "Campos obrigatórios faltando.");
        } else {
          alert(resData.error || "Erro ao salvar livro.");
        }
        setLoading(false);
        return;
      }

      setForm(initialForm);
      if (typeof onSalvar === "function") await onSalvar();
    } catch (err) {
      console.error("Erro ao salvar livro:", err);
      alert("Erro ao salvar livro. Veja o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="livro-form" onSubmit={handleSubmit}>
      <h2>{form.id ? "Editar Livro" : "Cadastrar Livro"}</h2>

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Autor</label>
        <input
          type="text"
          name="autor"
          value={form.autor}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Editora</label>
        <input
          type="text"
          name="editora"
          value={form.editora}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>ISBN</label>
        <input
          type="number"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Número de Páginas</label>
        <input
          type="number"
          name="numero_paginas"
          value={form.numero_paginas}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Lançamento</label>
        <input
          type="date"
          name="lancamento"
          value={form.lancamento}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Imagem (capa)</label>
        <input
          type="text"
          name="imagem"
          value={form.imagem}
          onChange={handleChange}
        />
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? "Salvando..." : (form.id ? "Atualizar" : "Salvar")}
      </button>
    </form>
  );
}

export default LivroForm;
