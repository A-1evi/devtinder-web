import { Link } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block w-64 shrink-0">
      <div className="bg-base-100 rounded-lg p-4 mb-4 sticky top-20">
        <h3 className="font-medium text-sm text-white mb-4">Trending Topics</h3>
        <ul className="space-y-3">
          <li>
            <Link to="/topic/typescript" className="block">
              <span className="text-sm text-blue-500 hover:underline">
                #TypeScript
              </span>
              <p className="text-xs text-neutral-dark mt-1">
                TypeScript 5.2 beta released with new features
              </p>
              <span className="text-xs text-muted mt-1">1,245 posts</span>
            </Link>
          </li>
          {/* More trending topics */}
        </ul>
      </div>
    </aside>
  );
}
