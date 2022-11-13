import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logOut = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between  ">
      <div className="container-fluid ">
        <Link href="/">
          <a className="navbar-brand text-light">
            <Avatar src="/images/logo.png" />
            Navbar
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li> */}

            {state !== null ? (
              <>
                <li className="nav-item">
                  <Link href="/user/dashboard">
                    <a
                      className={`nav-link text-light  ${
                        current === "/user/dashboard" && "active"
                      }`}
                    >
                      <span className="">
                        {state && state.user && state.user.username}
                      </span>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/user/profile/update">
                    <a
                      className={`nav-link text-light  ${
                        current === "/user/profile/update" && "active"
                      }`}
                    >
                      <span className="">Profile</span>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <a onClick={logOut} className="nav-link text-light">
                    Log OUT
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login">
                    <a
                      className={`nav-link text-light  ${
                        current === "/login" && "active"
                      }`}
                    >
                      Login
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register">
                    <a
                      className={`nav-link text-light  ${
                        current === "/register" && "active"
                      }`}
                    >
                      Register
                    </a>
                  </Link>
                </li>
              </>
            )}

            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
