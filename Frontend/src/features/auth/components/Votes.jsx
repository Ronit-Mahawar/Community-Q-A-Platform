import { useState } from "react";
import authApi from "../api/authApi";

const Votes = ({ post }) => {
  const [score, setScore] = useState(post.upvoteCount - post.downvoteCount);
  const [isVoted, setIsVoted] = useState(post.userVote); // "upvote" | "downvote" | null

  const handleVote = async (type) => {
    try {
      const res = await authApi.Vote(post._id, type);
      if(res!=="invalid token"){
      setScore(res.score); // <-- backend should return new score
      setIsVoted(res.userVote);
      } // <-- backend should return user's vote type
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => handleVote("upvote")}
        className={`p-1 ${
          isVoted === "upvote" ? "text-orange-500" : "text-gray-500"
        }`}
      >
        <i className="fi fi-rr-up"></i>
      </button>

      <span className="font-bold">{score}</span>

      <button
        onClick={() => handleVote("downvote")}
        className={`p-1 ${
          isVoted === "downvote" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <i className="fi fi-rr-down"></i>
      </button>
    </div>
  );
};

export default Votes;
