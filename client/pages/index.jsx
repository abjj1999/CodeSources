import { useContext } from "react";
import { UserContext } from "../context";

function Home() {
  const [state, setState] = useContext(UserContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center py-5">Hello to Code Sources</h1>
          <p>{JSON.stringify(state)}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
