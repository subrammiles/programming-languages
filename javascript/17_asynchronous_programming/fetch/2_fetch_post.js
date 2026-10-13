/*
fetch with POST / PUT / DELETE
Pass an options object: method, headers, body.
The body must be a string, so use JSON.stringify for objects.
*/
async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Hello", body: "My first post", userId: 1 })
  });
  console.log(response.status);// 201 (Created)
  console.log(await response.json());
  // { title: 'Hello', body: 'My first post', userId: 1, id: 101 }
}

async function deletePost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE"
  });
  console.log("deleted:", response.ok);// deleted: true
}

createPost()
  .then(() => deletePost(1))
  .catch(e => console.log("network error:", e.message));
