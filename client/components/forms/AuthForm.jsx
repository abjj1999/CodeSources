import React from "react";
import { SyncOutlined } from "@ant-design/icons";
const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {page !== "login" && (
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
      )}
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
      {page !== "login" && (
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
      )}

      {page !== "login" && (
        <div className="form-group p-2">
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="form-control"
            placeholder="Security question's answer"
          />
        </div>
      )}
      <div className="form-group p-2">
        <button
          disabled={
            page === "login"
              ? !email || !password || loading
              : !name || !email || !secret || !password
          }
          className="btn btn-primary btn-block col-12"
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
