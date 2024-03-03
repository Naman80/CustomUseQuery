const fetchPosts = async () => {
  const response = await fetch(
    `http://localhost:3000/posts?_sort=-id`

    // `http://localhost:3000/posts?_sort=-id&${
    //   page ? `_page=${page}&_per_page=5` : ""
    // }`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch posts. Status: ${response.status}`);
  }
  const postData = await response.json();

  for (let index = 0; index < 1000000000; index++) {
    ("");
  }
  return postData;
};

const fetchTags = async () => {
  const response = await fetch("http://localhost:3000/tags");
  const tagsData = await response.json();
  return tagsData;
};

const addPost = async (post) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return response.json();
};

export { fetchPosts, fetchTags, addPost };
