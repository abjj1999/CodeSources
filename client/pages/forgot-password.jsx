import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";

import { UserContext } from "../context";
import { useRouter } from "next/router";
import ForgotForm from "../components/forms/forgetForm";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      });
      console.log(data);
      // setOk(data.ok);
      // setName("");
      // setEmail("");
      // setPassword("");
      // setSecret("");
      // setLoading(false);

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
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
            Forgot Password page
          </h1>
        </div>
      </div>
      {/* {loading ? <h1>Loading</h1> : ""} */}
      <div className="row py-4">
        <div className="col-md-6 offset-md-3">
          <ForgotForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Congrats"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You can now login with this password</p>
            <Link href="/login">
              <a className="btn btn-primary">Login Now</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
