// components/CommentForm.jsx
import { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border rounded p-2"
        rows="3"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
