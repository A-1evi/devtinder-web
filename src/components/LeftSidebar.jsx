import { Link } from "react-router";
import {
  Flame,
  Newspaper,
  Bookmark,
  HelpCircle,
  GitBranch,
  Briefcase,
} from "lucide-react";

const communities = [
  { name: "JavaScript", abbr: "JS", color: "bg-blue-100 text-blue-600" },
  { name: "React", abbr: "R", color: "bg-cyan-100 text-cyan-600" },
  { name: "Node.js", abbr: "N", color: "bg-green-100 text-green-600" },
  { name: "Python", abbr: "P", color: "bg-purple-100 text-purple-600" },
];

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-gray-900  rounded-lg p-4 mb-4 sticky top-20">
        <h3 className="font-medium text-sm text-white mb-4">Discover</h3>
        <ul className="space-y-1">
          <li>
            <Link
              to="/trending"
              className="flex items-center text-gray-300  hover:text-blue-500 py-1.5 transition-colors"
            >
              <Flame className="h-4 w-4 mr-2" />
              <span >Trending</span>
            </Link>
          </li>
          <li>
            <Link
              to="/latest"
              className="flex items-center text-gray-300 antialiased hover:text-blue-500 py-1.5 transition-colors"
            >
              <Newspaper className="h-4 w-4 mr-2" />
              <span>Latest Posts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/bookmarks"
              className="flex items-center text-gray-300 antialiased hover:text-blue-500 py-1.5 transition-colors"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              <span>Bookmarks</span>
            </Link>
          </li>
          <li>
            <Link
              to="/questions"
              className="flex items-center text-gray-300 antialiased hover:text-blue-500 py-1.5"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              <span>Questions</span>
            </Link>
          </li>
          <li>
            <Link
              to="/open-source"
              className="flex items-center text-gray-300 antialiased hover:text-blue-500 py-1.5"
            >
              <GitBranch className="h-4 w-4 mr-2" />
              <span>Open Source</span>
            </Link>
          </li>
        </ul>

        <div className="border-t border-neutral-medium my-4"></div>

        <h3 className="font-medium text-sm text-white mb-3">Top Communities</h3>
        <ul className="space-y-1">
          {communities.map((community) => (
            <li key={community.name}>
              <Link
                to={`/community/${community.name.toLowerCase()}`}
                className="flex items-center text-neutral-dark hover:text-blue-500 py-2 transition-colors"
              >
                <span
                  className={`${community.color} w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3`}
                >
                  {community.abbr}
                </span>
                <span className="text-sm">{community.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
