import { Modal } from "antd";
import React from "react";
import CommentForm from "../forms/CommentForm";

const CommentM = ({ visible, setVisible, comment, setComment, addComment }) => {
  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      title="Comment"
      footer={null}
    >
      <CommentForm
        comment={comment}
        setComment={setComment}
        addComment={addComment}
      />
    </Modal>
  );
};

export default CommentM;
