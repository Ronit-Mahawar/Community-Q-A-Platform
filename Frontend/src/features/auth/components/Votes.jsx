import React from "react";

const Votes = ({ post }) => {
  return (
    <div>
      <button>
        <i className="fi fi-rr-up"></i>
      </button>
      <span>{post.upvoteCount - post.downvoteCount}</span>
      <button>
        <i className="fi fi-rr-down"></i>
      </button>
    </div>
  );
};

export default Votes;
