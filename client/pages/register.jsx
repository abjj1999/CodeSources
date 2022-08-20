import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";

import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [state, setState] = useContext(UserContext);
  // const data = {
  //   name,
  //   email,
  //   password,
  //   secret,
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setOk(data.ok);
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
    // console.log(data
  };

  if (state && state.token) router.push("/");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-2 text-center text-info py-4">
            Register page
          </h1>
        </div>
      </div>
      {/* {loading ? <h1>Loading</h1> : ""} */}
      <div className="row py-4">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Congrates"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>you have seccussflly registered</p>
            <Link href="/login">
              <a className="btn btn-primary">Login Now</a>
            </Link>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            Already registered?
            <Link href="/login">
              <a> Login Now</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
