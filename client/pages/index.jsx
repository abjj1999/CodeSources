import { useContext } from "react";
import { UserContext } from "../context";

function Home() {
  const [state, setState] = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1 className="display-1 font-weight-bold text-center py-5">
            Code Sources
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
