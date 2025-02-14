import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  if (!feed) return;

  if (feed.length === 0)
    return (
      <div className="text-center my-16 font-extrabold text-4xl h-[450px]  ">
        No new profile...
      </div>
    );
  return (
    feed && (
      <div className="flex justify-center my-8 w-[500px]  ">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
