import React from "react";
import { Modal } from "antd";
const DeletePostModel = ({ setDPost, setOpen, open, dPost, handleDelete }) => {
  return (
    <Modal
      title="POST DELETE"
      visible={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <p className="text-center display-3">
        Are you sure you want to delete this post?
      </p>

      <div className="d-flex justify-content-center">
        <button
          onClick={() => {
            handleDelete(dPost);
            setOpen(false);
            setDPost({});
          }}
          className="btn btn-danger mx-2"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="btn btn-secondary mx-2"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeletePostModel;
