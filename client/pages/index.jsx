import { useContext } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import HomePost from "../components/cards/HomePost";
function Home({ posts }) {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      <ParallaxBG url="/images/logo.png" />
      <h1 className="text-muted display-4 text-center m-4">Latest Posts </h1>
      <div className="row d-flex justify-content-center  align-items-center p-2">
        {posts.map((post) => (
          <HomePost
            className="col-lg-3 col-md-6 col-sm-8 p-2"
            post={post}
            key={post._id}
          />
        ))}
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const { data } = await axios.get(`/posts`);
  // console.log(data);
  return {
    props: { posts: data }, // will be passed to the page component as props
  };
}
export default Home;
