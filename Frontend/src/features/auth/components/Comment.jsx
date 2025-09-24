// components/Comment.jsx
const Comment = ({ comment }) => {
  return (
    <div className="border-b py-2">
      <p className="text-sm text-gray-600">
        {comment.user?.username || "Anonymous"} said:
      </p>
      <p>{comment.content}</p>
      <p className="text-xs text-gray-400">
        {new Date(comment.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Comment;
