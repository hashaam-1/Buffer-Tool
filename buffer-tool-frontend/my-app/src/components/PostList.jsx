import { useGetAllPostsQuery } from "../features/posts/postApi";

const PostList = () => {
  const { data, isLoading } = useGetAllPostsQuery();
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="space-y-2">
      {data.map((post) => (
        <li key={post._id} className="border p-2">
          <p>{post.content}</p>
          <p>Status: {post.status}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;