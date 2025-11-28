import { useState } from "react";

function HeroSearch() {
  const [id, setId] = useState("");
  const [hero, setHero] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/heroes/${id}`);
      if (!res.ok) throw new Error("Herói não encontrado");

      const data = await res.json();
      setHero(data);
      setError("");
    } catch (err) {
      setHero(null);
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Buscar Herói por ID</h2>

      <input
        className="form-control mb-2"
        type="text"
        placeholder="ID do herói"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={handleSearch}>
        Buscar
      </button>

      {error && <p className="text-danger">{error}</p>}

      {hero && (
        <div className="card p-3">
          <h3>{hero.name}</h3>
          <p>Idade: {hero.age}</p>
          <p>
            Poderes: {hero.powers?.map((p) => p.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default HeroSearch;
