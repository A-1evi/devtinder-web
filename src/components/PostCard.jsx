
/* eslint-disable react/prop-types */
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ThumbsUp, MessageSquare, Bookmark, Share2 } from "lucide-react";

const PostCard = ({post})  =>{

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="w-10 h-10 mr-3">
            {post.author.photoUrl ? (
              <AvatarImage src={post.author.photoUrl} alt={post.author.name} />
            ) : (
              <AvatarFallback>
                {post.author.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-primary">{post.author.name}</h3>
              <span className="ml-2 text-xs text-neutral-dark">
                @{post.author.username}
              </span>
            </div>
            <p className="text-xs text-neutral-dark">{post.postedAt}</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-primary mb-2">
          {post.title}
        </h2>
        <p className="text-neutral-dark mb-3">{post.content}</p>
        {post.codeSnippet && (
          <div className="bg-gray-900 rounded-md p-3 mb-3 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-100">
              {post.codeSnippet}
            </pre>
          </div>
        )}
        {post.image && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        {post.link && (
          <a
            href={post.link}
            className="text-secondary hover:underline font-medium"
          >
            {post.linkText || "Read more"} →
          </a>
        )}
        {post.projectInfo && (
          <div className="bg-neutral-light border border-neutral-medium rounded-md p-4 mb-3">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-green-500 text-white rounded-lg p-1">
                <span className="text-lg">📦</span>
              </div>
              <div>
                <h4 className="font-medium">{post.projectInfo.name}</h4>
                <p className="text-sm text-neutral-dark mb-2">
                  {post.projectInfo.description}
                </p>
                <a
                  href={post.projectInfo.link}
                  className="text-secondary text-sm hover:underline"
                >
                  {post.projectInfo.linkText}
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-3 mb-1">
          {post.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`bg-${tag.color}-100 text-${tag.color}-800 text-xs font-medium px-2 py-0.5 rounded`}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="border-t border-neutral-medium px-4 py-2 flex justify-between">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-neutral-dark hover:text-secondary"
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>{post.likes}</span>
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
}



export default PostCard;
