import Post from "../components/Post";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/authApi";
import Navbar from "../components/Navbar";

const PostPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState(state?.post || null);
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    try {
      const data = await api.ShowPost(id);
      setPost(data.post);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await api.GetComments(id);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (content) => {
    try {
      const newComment = await api.AddComment(id, content);
      setComments((prev) => [newComment, ...prev]); // prepend
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto">
        {/* Post */}
        <Post post={post} isLink={false} />

        {/* Comment form */}
        <CommentForm onSubmit={handleAddComment} />

        {/* Comments */}
        <div className="mt-4">
          <h3 className="font-bold mb-2">Comments</h3>
          {comments.length > 0 ? (
            comments.map((c) => <Comment key={c._id} comment={c} />)
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostPage;
