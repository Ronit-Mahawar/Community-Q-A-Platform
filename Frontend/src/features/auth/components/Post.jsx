import { Link } from "react-router-dom";
import Votes from "./Votes";

const Post = ({ post, isLink = true }) => {
  const content = (
    <div className="border p-4 rounded-lg shadow-sm mb-6 bg-white hover:shadow-md transition w-full max-w-2xl mx-auto">
      {/* Title (linked if in feed) */}
      {isLink ? (
        <Link
          to={`/post/${post._id}`}
          state={{ post }}
          className="block hover:underline"
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        </Link>
      ) : (
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      )}

      {/* Body */}
      <p className="text-gray-700 mb-2 line-clamp-3">{post.body}</p>

      {/* Author */}
      {post.postBy && (
        <p className="text-sm text-gray-500 mb-3">
          By <span className="font-medium">{post.postBy.fullName}</span>
        </p>
      )}

      {/* Actions: Votes + Comments */}
      <div className="flex items-center justify-between border-t pt-2">
        <Votes post={post} />
        <button className="flex items-center gap-1 text-gray-600 hover:text-black">
          <i className="fi fi-rr-comment-dots"></i>
          <span>{post.commentCount || 0}</span>
        </button>
      </div>
    </div>
  );

  return content;
};

export default Post;
