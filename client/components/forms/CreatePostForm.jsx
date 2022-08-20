import React from "react";
import { Avatar } from "antd";

const CreatePostForm = ({ content, setContent, postSubmit }) => {
  return (
    <div className="card">
      <div className="card-body pb-4">
        <form className="form-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="write something!"
            className="form-control"
          ></textarea>
        </form>
      </div>

      <div className="card-footer">
        <button onClick={postSubmit} className="btn btn-primary btn-sm mt-1">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
