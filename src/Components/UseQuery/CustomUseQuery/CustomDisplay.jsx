// import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { fetchPosts, addPost, fetchTags } from "../../../api/api";
import { useCustomUseQueryHook } from "./hooks/useCustomUseQueryHook";
import { useCustomUseMutationHook } from "./hooks/useCustomUseMutationHook";
import { Link } from "react-router-dom";
function CustomDisplay() {
  const [counter, setCounter] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data: postData,
  } = useCustomUseQueryHook({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5000,
  });

  const { data: tagsData, isLoading: isTagsLoading } = useCustomUseQueryHook({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const {
    mutate,
    isPending,
    isError: isPostError,
    reset,
  } = useCustomUseMutationHook({
    mutationFn: addPost,
    onSuccess: ({ data, variables }) => {
      console.log(data, variables);
    },
    onError: ({ error, variables }) => {
      console.log(error, variables);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
    if (!title || !tags) return;
    mutate({ id: postData?.length + 1, title: title, tags: tags });
    e.target.reset(); // reset form
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {isPostError && <h5 onClick={() => reset()}>Unable to Post</h5>}
        <input
          type="text"
          placeholder="Enter your post.."
          className="postbox"
          name="title"
        />
        <div className="tags">
          {tagsData?.map((tag) => {
            return (
              <div key={tag}>
                <input name={tag} id={tag} type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button disabled={isPending}>
          {isPending ? "Posting..." : "Post"}
        </button>
      </form>

      <Link to={"/post"}>move to post page</Link>
      {
        <button
          onClick={() => {
            // refetch();
            setCounter(counter + 1);
          }}
        >
          {counter}
        </button>
      }
      {isLoading && isTagsLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      {postData?.map((post) => {
        return (
          <div key={post.id} className="post">
            <div>{post.title}</div>
            {post.tags.map((tag) => {
              return <span key={tag}>{tag}</span>;
            })}
          </div>
        );
      })}
      {/* Pagination */}
      <div className="pages">
        <button
          onClick={() => setCounter((old) => Math.max(old - 1, 0))}
          disabled={!postData?.prev}
        >
          Previous Page
        </button>
        <span>{counter}</span>
        <button
          onClick={() => {
            if (postData?.next) {
              setCounter((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={counter || !postData?.next}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default CustomDisplay;
