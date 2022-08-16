import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../context";

import AuthForm from "../components/forms/AuthForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const data = {
  //   name,
  //   email,
  //   password,
  //   secret,
  // };

  const [state, setState] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        {
          email,
          password,
        }
      );

      //populate setState with the data we recieve from BE
      setState({
        user: data.user,
        token: data.token,
      });

      //Save in LocalS
      window.localStorage.setItem("auth", JSON.stringify(data));
      router.push("/");
      setEmail("");
      setPassword("");

      setLoading(false);
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
      setLoading(false);
    }
    // console.log(data
  };

  if (state && state.token) router.push("/");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-2 text-center text-info py-4">Login page</h1>
        </div>
      </div>
      {/* {loading ? <h1>Loading</h1> : ""} */}
      <div className="row py-4">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registered
            <Link href="/register">
              <a> Sign up Now</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
