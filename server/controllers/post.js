import Post from "../models/Post";
import User from "../models/User";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
export const createPost = async (req, res) => {
  //   console.log(req.body);
  const { content, image } = req.body;

  if (!content) {
    return res.json({
      error: "Post is empty",
    });
  }
  try {
    const post = await Post.create({
      content,
      Image: image,
      postedBy: req.user._id,
    });
    post.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  // console.log(req.files);

  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    //console.log("image url", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const PostByUser = async (req, res) => {
  try {
    // const posts = await Post.find({ postedBy: req.user._id })
    const posts = await Post.find()

      .populate("postedBy", "_id name image")
      .limit(10)
      .sort({ createdAt: -1 });
    // console.log(post);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params._id,
      { content, Image: image },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    // remove the image from cloud
    if (post.Image && post.Image.public_id) {
      const image = await cloudinary.uploader.destroy(post.Image.public_id);
    }
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let following = user.following;
    following.push(req.user._id);
    //pageination
    const currentPage = req.params.page || 1;
    // console.log(currentPage);
    const perPage = 3;

    const posts = await Post.find({ postedBy: { $in: following } })
      .skip((currentPage - 1) * perPage)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(perPage);

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } },
      },
      { new: true }
    )
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const removeComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const totalPost = async (req, res) => {
  try {
    const totalPost = await Post.find().estimatedDocumentCount();
    res.json(totalPost);
  } catch (error) {
    console.log(error);
  }
};
//add later
export const getPostsUsername = async (req, res) => {};
