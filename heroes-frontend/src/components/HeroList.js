import React, { useEffect, useState } from "react";

export default function HeroList() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/heroes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Heroes carregados:", data);
        setHeroes(data);
      })
      .catch((err) => console.error("Erro ao buscar heróis:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Heróis</h2>

      <div className="row">
        {heroes.map((hero) => (
          <div className="col-md-4 mb-3" key={hero._id}>
            <div className="card shadow-sm">
              <div className="card-body">

                {/* Nome */}
                <h5 className="card-title">{hero.name}</h5>

                {/* ID */}
                <p className="card-text">
                  <strong>ID:</strong> <span className="text-muted">{hero._id}</span>
                </p>

                {/* Poderes */}
                <p className="card-text">
                  <strong>Poderes:</strong>{" "}
                  {hero.powers && hero.powers.length > 0 ? (
                    hero.powers.map((p) => p.name).join(", ")
                  ) : (
                    <span className="text-muted">Nenhum poder cadastrado</span>
                  )}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
