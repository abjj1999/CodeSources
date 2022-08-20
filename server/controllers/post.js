import Post from "../models/Post";

export const createPost = async (req, res) => {
  //   console.log(req.body);
  const { content } = req.body;

  if (!content) {
    return res.json({
      error: "Post is empty",
    });
  }
  try {
    const post = await Post.create({ content, postedBy: req.user._id });
    post.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
