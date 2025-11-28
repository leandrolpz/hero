import { useState } from "react";

function HeroDelete() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/heroes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao deletar");

      setMessage("Herói deletado com sucesso!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Deletar Herói</h2>

      <input
        className="form-control mb-2"
        type="text"
        placeholder="ID do herói"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button className="btn btn-danger" onClick={handleDelete}>
        Deletar
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default HeroDelete;
