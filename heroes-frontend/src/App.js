import { useState } from "react";
import HeroForm from "./components/HeroForm";
import HeroList from "./components/HeroList";
import PowerForm from "./components/PowerForm";
import PowerList from "./components/PowerList";

function App() {
  const [page, setPage] = useState("heroes");

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Heroes App</span>

        <div>
          <button className="btn btn-light me-2" onClick={() => setPage("heroes")}>
            Listar Heróis
          </button>

          <button className="btn btn-primary me-2" onClick={() => setPage("heroForm")}>
            Cadastrar Herói
          </button>

          <button className="btn btn-warning me-2" onClick={() => setPage("powers")}>
            Listar Poderes
          </button>

          <button className="btn btn-success" onClick={() => setPage("powerForm")}>
            Cadastrar Poder
          </button>
        </div>
      </nav>

      {page === "heroes" && <HeroList />}
      {page === "heroForm" && <HeroForm />}
      {page === "powers" && <PowerList />}
      {page === "powerForm" && <PowerForm />}
    </div>
  );
}

export default App;
