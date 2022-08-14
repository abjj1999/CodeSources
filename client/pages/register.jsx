import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  // const data = {
  //   name,
  //   email,
  //   password,
  //   secret,
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
        secret,
      });
      setOk(data.ok);
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    // console.log(data
    setName("");
    setEmail("");
    setPassword("");
    setSecret("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-2 text-center text-info py-4">
            Register page
          </h1>
        </div>
      </div>
      <div className="row py-4">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <small>
                <label htmlFor="" className="text-muted">
                  Name:
                </label>
              </small>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group p-2">
              <small>
                <label htmlFor="" className="text-muted">
                  Email:
                </label>
              </small>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group p-2">
              <small>
                <label htmlFor="" className="text-muted">
                  Password:
                </label>
              </small>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group p-2">
              <small>
                <label htmlFor="" className="text-muted">
                  Pick a security question:
                </label>
              </small>
              <select className="form-control">
                <option>In what city were you born?</option>
                <option>What is the name of your favorite pet?</option>
                <option>What is your mother's maiden name?</option>
                <option>What high school did you attend?</option>
                <option>What was the name of your elementary school?</option>
                <option>What was the make of your first car?</option>
              </select>

              <small className="form-text text-muted">
                You can use this to reset your password!
              </small>
            </div>
            <div className="form-group p-2">
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="form-control"
                placeholder="Security question's answer"
              />
            </div>
            <div className="form-group p-2">
              <button className="btn btn-primary btn-block col-12">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
