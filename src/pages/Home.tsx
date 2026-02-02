import { useEffect, useState } from "react";
import type { Post } from "../types";
import { Link } from "react-router";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "posts")
      .then((response) => response.json())
      .then((data) =>
        setPosts(
          data.data.filter((post: Post) => post.published === true).reverse(),
        ),
      )
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading..</div>;
  }

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} className="p-2 my-2">
          <div className="p-2 flex justify-between items-center shadow-lg shadow-brand-main rounded-md gap-4 animate-glow">
            <div className="flex-2 max-w-xl">
              <h1 className="text-3xl">{post.title}</h1>
              <div>{post.content.slice(0, 14) + "..."}</div>
            </div>
            <div>
              <Link to={`/posts/${post.id}`} className="text-shadow underline">
                View more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default Home;
