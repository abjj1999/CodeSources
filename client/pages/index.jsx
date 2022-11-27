import { useContext } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import HomePost from "../components/cards/HomePost";
import Head from "next/head";
import Link from "next/link";
function Home({ posts }) {
  const [state, setState] = useContext(UserContext);
  const head = () => (
    <Head>
      <title>Code Sources - for Devs </title>
      <meta name="description" content="Code Sources" />
      <meta property="og:description" content="Code Sources - for Devs" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="codesources" />
      <meta property="og:url" content="https://codesources.com" />
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
      <h1 className="text-muted display-4 text-center m-4">Latest Posts </h1>
      <div className="row d-flex justify-content-center  align-items-center p-2">
        {posts.map((post) => (
          <div className="col-lg-3 col-md-6 col-sm-8 p-2">
            <Link href={`/post/view/${post._id}`}>
              <a>
                <HomePost post={post} key={post._id} />
              </a>
            </Link>
          </div>
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
