/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ThumbsUp, MessageSquare, Bookmark, Share2 } from "lucide-react";
import { likePost, setLikes } from "../utils/Store/slices/postSlice";
import { useState } from "react";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(post.isLiked || false); // Initialize based on post data
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = async (postId) => {
    try {
      const result = await dispatch(likePost(postId)).unwrap(); // Await the result of the action
      if (result.success) {
        setIsLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <article className="bg-black rounded-lg shadow-sm overflow-hidden border border-gray-700">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="w-10 h-10 mr-3">
            {post.author.photoUrl ? (
              <AvatarImage src={post.author.photoUrl} alt={post.author.firstName} />
            ) : (
              <AvatarFallback>
                {post.author.firstName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-primary">
                {post.author.firstName + " " + post.author.lastName}
              </h3>
              <span className="ml-2 text-xs text-neutral-dark">@{post.author.email}</span>
            </div>
            <p className="text-xs text-neutral-dark">{post.createdAt}</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-primary mb-2">{post.title}</h2>
        <p className="text-neutral-dark mb-3">{post.content}</p>
        {post.codeSnippet && (
          <div className="bg-gray-900 rounded-md p-3 mb-3 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-100">{post.codeSnippet}</pre>
          </div>
        )}
        {post.image && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag.id} // Use a unique identifier for each tag
              variant="secondary"
              className={`bg-${tag.color}-100 text-${tag.color}-800 text-xs font-medium px-2 py-0.5 rounded`}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="px-4 py-2 flex justify-between">
        <div className="flex space-x-4">
          <Button
            onClick={() => handleLike(post._id)}
            variant="ghost"
            size="sm"
            className={`flex items-center text-neutral-dark hover:text-secondary ${
              isLiked ? "text-red-500" : ""
            }`}
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-neutral-dark hover:text-secondary"
          >
            <MessageSquare className="mr-1 h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-dark hover:text-secondary h-8 w-8"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-dark hover:text-secondary h-8 w-8"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
