import React, { useState, useEffect } from "react";

export default function HeroForm() {
  const [name, setName] = useState("");
  const [powerIds, setPowerIds] = useState([]); // array de ids selecionados
  const [powers, setPowers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carrega poderes do backend
  useEffect(() => {
    fetch("http://localhost:5000/api/powers")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar powers");
        return res.json();
      })
      .then((data) => {
        setPowers(data);
        console.log("Powers carregados:", data);
      })
      .catch((err) => {
        console.error("Erro no fetch de powers:", err);
      });
  }, []);

  // Handler para select (múltipla seleção)
  const handleSelectChange = (e) => {
    // cria array com os values selecionados
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setPowerIds(selected);
    console.log("Selecionado (powerIds):", selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // DEBUG: veja o que será enviado
    console.log("Enviando herói:", { name, powers: powerIds });

    // validação simples
    if (!name.trim()) {
      alert("Informe o nome do herói");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/heroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // enviar exatamente 'powers' como array de ids
        body: JSON.stringify({ name, powers: powerIds }),
      });

      const json = await res.json();
      console.log("Resposta do servidor:", res.status, json);

      if (!res.ok) {
        const msg = json.error || JSON.stringify(json);
        throw new Error(msg);
      }

      alert("Herói cadastrado com sucesso!");
      setName("");
      setPowerIds([]);
    } catch (err) {
      console.error("Erro ao cadastrar herói:", err);
      alert("Erro ao cadastrar herói. Veja console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Cadastrar Herói</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome do Herói</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: SkyMan"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Poderes (selecione um ou mais)</label>
              <select
                multiple
                className="form-select"
                value={powerIds}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  {/* caso queira mostrar placeholder */}
                </option>

                {powers.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">
                Segure Ctrl (ou Cmd) para selecionar múltiplos.
              </small>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Herói"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
