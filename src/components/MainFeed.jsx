import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus } from "lucide-react";
import PostCard from "./PostCard";
import { useState } from "react";
import NewPostModal from "./NewPostModal";

const MainFeed = () => {
  const [activeFilter, setActiveFilter] = useState("Latest");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  const filterTags = [
    "All",
    "Web Development",
    "Mobile Development",
    "UI/UX",
    "DevOps",
    "AI/ML",
    "Data Science",
  ];

  return (
    <div className="flex-1">
      {/* Filters and New Post */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center m-3  gap-3">
        <div className="flex bg-card rounded-lg px-4 py-2 shadow-sm border border-gray-500">
          <Button
            variant={activeFilter === "Latest" ? "default" : "ghost"}
            className={`text-lg font-medium mr-2 rounded-lg px-4 py-1  transition-colors 
              ${
                activeFilter === "Latest"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 "
              }
            `}
            onClick={() => setActiveFilter("Latest")}
          >
            Latest
          </Button>
          <Button
            variant={activeFilter === "Top" ? "default" : "ghost"}
            className={`text-lg font-medium mr-2 rounded-lg px-4 py-1  transition-colors 
              ${
                activeFilter === "Top"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 "
              }
            `}
            onClick={() => setActiveFilter("Top")}
          >
            Top
          </Button>
          <Button
            variant={activeFilter === "Trending" ? "default" : "ghost"}
            className={`text-lg font-medium  rounded-lg px-2 py-1   transition-colors 
              ${
                activeFilter === "Trending"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 "
              }
            `}
            onClick={() => setActiveFilter("Trending")}
          >
            Trending
          </Button>
        </div>

        <Button
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-3"
          onClick={() => setNewPostModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      <NewPostModal 
        open={newPostModalOpen} 
        onOpenChange={setNewPostModalOpen} 
      />

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterTags.map((tag, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs font-medium bg-card border border-border px-3 py-1 rounded-full text-muted-foreground hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading posts...
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="bg-card rounded-lg shadow-sm p-8 text-center border border-border">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No posts available
            </h3>
            <p className="text-muted-foreground">
              Be the first to create a post!
            </p>
          </div>
        )}

        <div className="flex justify-center py-6">
          <Button
            variant="outline"
            className="bg-card hover:bg-muted text-foreground border border-border font-medium"
          >
            <span className="mr-2">↻</span> Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
