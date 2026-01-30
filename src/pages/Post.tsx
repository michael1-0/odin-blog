import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams } from "react-router";
import type { Post, Comment } from "../types";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [newCommentUsername, setNewCommentUsername] = useState<string>("");
  const [errors, setErrors] = useState<{ msg: string }[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${Number(postId)}`)
      .then((response) => response.json())
      .then((data) => setPost(data.data))
      .catch((error) => console.log(error));
    fetch(import.meta.env.VITE_API_URL + `comments?postId=${Number(postId)}`)
      .then((response) => response.json())
      .then((data) => setComments(data.data.reverse()))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [postId]);

  function handleCommentContentChange(e: ChangeEvent<HTMLInputElement>) {
    setNewCommentContent(e.target.value);
  }

  function handleCommentUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setNewCommentUsername(e.target.value);
  }

  function handleCommentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = JSON.stringify({
      username: newCommentUsername,
      content: newCommentContent,
    });

    fetch(import.meta.env.VITE_API_URL + `comments?postId=${Number(postId)}`, {
      method: "post",
      body: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          setErrors(data.error);
          return null;
        }
        setErrors([]);
        return data;
      })
      .then((data) => {
        if (data) {
          setComments([data.data, ...comments]);
          setNewCommentContent("");
          setNewCommentUsername("");
        }
      })
      .catch((error) => console.log(error.error));
  }

  if (isLoading) {
    return <div className="text-center">Loading..</div>;
  }

  return (
    <div className="flex flex-col gap-12 ">
      <div className="flex flex-col gap-2">
        <div className="text-4xl text-center">{post?.title}</div>
        <div className="text-justify">{post?.content}</div>
      </div>
      <div className="flex flex-col gap-10 ">
        <form
          onSubmit={(e) => handleCommentSubmit(e)}
          className="flex flex-col rounded-md shadow-md shadow-brand-main gap-6 p-6 "
        >
          <div className="text-2xl text-center">Leave a comment</div>
          {errors &&
            errors.map((error, index) => (
              <div key={index} className="text-red-500">
                {error.msg}
              </div>
            ))}
          <input
            type="text"
            className="border-b"
            placeholder="What's your username?"
            onChange={(e) => handleCommentUsernameChange(e)}
            value={newCommentUsername}
            pattern="^[A-Za-z0-9]+$"
            title="Username should only be letters and numbers without space"
          />
          <input
            type="text"
            className="border-b"
            placeholder="What do you think?"
            onChange={(e) => handleCommentContentChange(e)}
            value={newCommentContent}
            required
          />
          <button
            type="submit"
            className="p-2 rounded-sm shadow-xs shadow-brand-main "
          >
            Submit
          </button>
        </form>
        {comments?.map((comment) => (
          <div
            className="shadow-xs shadow-brand-main p-2 rounded-md"
            key={comment.id}
          >
            <div className="text-2xl">{comment.username} says:</div>
            <div>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
