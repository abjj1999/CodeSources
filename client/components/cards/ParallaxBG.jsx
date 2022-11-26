import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context";

const ParallaxBG = ({ url, children = "" }) => {
  const [state, setState] = useContext(UserContext);

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url(" + url + ")",
        backgroundAttachment: "fixed",
        padding: "200px 0px 170px 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <h1 className="display-1 font-weight-bold text-center py-5">
        {children}
      </h1>
    </div>
  );
};

export default ParallaxBG;
