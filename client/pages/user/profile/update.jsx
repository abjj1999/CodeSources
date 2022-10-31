import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
import AuthForm from "../../../components/forms/AuthForm";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";

function Update() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [state, setState] = useContext(UserContext);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const data = {
    name,
    email,
    password,
    secret,
  };
  //   console.log(data);

  useEffect(() => {
    if (state && state.user) {
      //   console.log(state.user);
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setOk(true);
        setLoading(false);
        //update localstorge and user, keep token
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));

        //update context
        setState({ ...state, user: data });
      }
    } catch (error) {
      // toast.error(error.response.data);
      setLoading(false);
    }
    // console.log(data
  };

  const handleImage = async (e) => {
    // e.preventDefault()
    const file = e.target.files[0];

    let formData = new FormData();
    formData.append("image", file);
    // formData.append("content", content);
    // console.log([...formData]);

    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      // console.log("uploaded image data", data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  //   if (state && state.token) router.push("/");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-2 text-center text-info py-4">Profile</h1>
        </div>
      </div>
      {/* {loading ? <h1>Loading</h1> : ""} */}
      <div className="row py-4">
        <div className="col-md-6 offset-md-3">
          <label className="d-flex justify-content-center display-6">
            {image && image.url ? (
              <Avatar size={30} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              className="form-control"
              hidden
            />
          </label>
          <AuthForm
            profileUpdate={true}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
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
            <p>you have seccussflly updated your profile</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Update;
