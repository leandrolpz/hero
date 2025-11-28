import React, { useState } from "react";

export default function PowerForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/powers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Erro ao cadastrar power");
      }

      alert("Power cadastrado com sucesso!");
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Erro ao cadastrar power:", err);
      alert("Erro ao cadastrar power. Veja console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Cadastrar Power</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome do Power</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Super Força"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do poder (opcional)"
                rows="3"
              ></textarea>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
