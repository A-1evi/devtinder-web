import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MainFeed from "../components/MainFeed";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col lg:flex-row gap-20">
          <LeftSidebar />
          <MainFeed />
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}
