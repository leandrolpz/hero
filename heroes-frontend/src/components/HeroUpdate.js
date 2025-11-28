import { useState, useEffect } from "react";

function HeroUpdate() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [powers, setPowers] = useState([]); // IDs selecionados
  const [availablePowers, setAvailablePowers] = useState([]); // Powers do backend
  const [message, setMessage] = useState("");

  // Buscar todos os poderes disponíveis
  useEffect(() => {
    fetch("http://localhost:5000/api/powers")
      .then((res) => res.json())
      .then((data) => setAvailablePowers(data))
      .catch((err) => console.error("Erro ao buscar poderes:", err));
  }, []);

  const handleUpdate = async () => {
    try {
      if (!id) return setMessage("Informe o ID do herói!");

      const payload = {
        name,
        powers
      };

      const res = await fetch(`http://localhost:5000/api/heroes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao atualizar herói");
      }

      setMessage("Herói atualizado com sucesso!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Atualizar Herói</h2>

      {/* ID do herói */}
      <input
        className="form-control mb-2"
        type="text"
        placeholder="ID do herói"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      {/* Nome */}
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Select múltiplo de poderes */}
      <label className="form-label">Poderes:</label>
      <select
        className="form-select mb-3"
        multiple
        value={powers}
        onChange={(e) =>
          setPowers(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
      >
        {availablePowers.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* Botão de atualizar */}
      <button className="btn btn-warning" onClick={handleUpdate}>
        Atualizar
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default HeroUpdate;
