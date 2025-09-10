import Votes from "./Votes";

const Post = ({ post }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4 w-1/2 justify-center">
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
      {post.postBy && (
        <p className="text-sm text-gray-500">By {post.postBy.fullName}</p>
      )}
      <div className="flex flex-row ">
        <Votes post={post} />
        <div>
          <button>
            <i class="fi fi-rr-comment-dots"></i>
            <span>{post.commentCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
