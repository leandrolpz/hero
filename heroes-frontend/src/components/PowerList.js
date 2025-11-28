import { useEffect, useState } from "react";

function PowerList() {
  const [powers, setPowers] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/powers")
    .then(res => res.json())
    .then(data => setPowers(data))
    .catch(err => console.error("Erro ao buscar poderes:", err));
}, []);


  return (
    <div className="container mt-3">
      <h2>Powers Cadastrados</h2>

      <ul className="list-group">
        {powers.map(power => (
          <li key={power._id} className="list-group-item">
            {power.name} — {power.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PowerList;
