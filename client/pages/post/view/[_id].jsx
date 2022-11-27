import { useContext } from "react";
import { Avatar, Card } from "antd";

import moment from "moment";

import renderHTML from "react-render-html";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import ParallaxBG from "../../../components/cards/ParallaxBG";
import { imageSrc } from "../../../functions";
import PostImage from "../../../components/images/PostImage";
import { CommentOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
const { Meta } = Card;
function singlePost({ post }) {
  const head = () => (
    <Head>
      <title> Post by {post.postedBy} </title>
      <meta name="description" content="Code Sources - for Devs" />
      <meta property="og:description" content="Code Sources - for Devs" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="codesources" />
      <meta
        property="og:url"
        content={`https://codesources.com/post/view/${post._id}`}
      />
      <meta
        property="og:image:secure_url"
        content="http://codesources.com/images/logo.png"
      />
    </Head>
  );
  return (
    <>
      {head()}
      <ParallaxBG url="/images/logo.png" />
      <div className="row d-flex justify-content-center  align-items-center p-2">
        <div className="col-lg-6 col-md-8 col-sm-10 offset-1 p-2">
          <Card
            style={{
              width: 400,
              margin: "10px",
              padding: "5px",
            }}
            cover={post.Image && <PostImage url={post.Image.url} />}
          >
            <Meta
              avatar={<Avatar src={imageSrc(post.postedBy)} />}
              title={post.postedBy.name}
              description={moment(post.createdAt).fromNow()}
            />
            <div className="mt-4">{renderHTML(post.content)}</div>
            <div className="likesContainer d-flex">
              {post.likes && <HeartOutlined className="text-danger pt-2 h5" />}
              <div className="p-2">{post.likes.length} likes</div>
              <CommentOutlined className="text-danger pt-2 h5" />
              <div className="p-2">{post.comments.length} Comments</div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(cont) {
  const { data } = await axios.get(
    `http://localhost:8000/api/post/${cont.params._id}`
  );
  // console.log(data);
  return {
    props: { post: data }, // will be passed to the page component as props
  };
}
export default singlePost;
