import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import CreatePostForm from "../../../components/forms/CreatePostForm";
import UserRoutes from "../../../components/routes/UserRoutes";
import { toast } from "react-toastify";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) {
      fetchPost();
    }
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.Image);
    } catch (error) {}
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("post updated");
      }
      router.push("/user/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    // e.preventDefault()
    const file = e.target.files[0];

    let formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <UserRoutes>
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col">
            <h1 className="display-1 text-center">Update your Post</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
        </div>
      </div>
    </UserRoutes>
  );
};

export default EditPost;
