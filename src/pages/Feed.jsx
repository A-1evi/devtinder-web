/* eslint-disable react/prop-types */
// Core React & Redux
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Third-party libraries
import axios from "axios";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

// Local imports
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/Store/slices/feedSlice";
import styles from "./Feed.module.css";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  // Ensure the initial state in feedSlice is an empty array []
  const feed = useSelector((store) => store.feed);
  console.log("Feed data from Redux store:", feed); // Debugging line to check feed data
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // --- Animation Setup ---
  const to = (i) => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
    delay: i * 100,
  });
  const from = (_i) => ({ x: 0, rot: 0, scale: 1, y: 0 });
  const trans = (r, s) => `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

  // --- State for tracking swiped cards ---
  const [gone] = useState(() => new Set());

  // --- Initialize Springs ---
  // Check if feed is an array before accessing length
  const feedLength = Array.isArray(feed) ? feed.length : 0;
  const [props, api] = useSprings(feedLength, (i) => ({
    ...to(i),
    from: from(i),
  }));

  // --- Fetch Data ---
  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });

        // Ensure the response data is an array before dispatching
        if (Array.isArray(res?.data?.data)) {
          dispatch(addFeed(res.data));
        } else {
          console.error("Fetched feed data is not an array:", res?.data?.data);
          dispatch(addFeed([])); // Dispatch empty array if data is invalid
          setError("Received invalid data format.");
        }
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError(err.message || "Failed to fetch feed.");
        dispatch(addFeed([])); // Dispatch empty array on error
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only re-run if dispatch changes (which it shouldn't)

  // --- Drag Gesture ---
  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      // Check if feed data exists and has the current index
      if (!Array.isArray(feed) || index === undefined || index >= feed.length)
        return;

      const trigger = vx > 0.2; // If you flick hard enough it should trigger
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right

      // If card is released and trigger condition met, mark it as gone
      if (!active && trigger) gone.add(index);

      api.start((i) => {
        if (index !== i) return; // Only affect the dragged card
        const isGone = gone.has(index);
        // Card flies out if gone, otherwise moves with drag or returns to center
        const x = isGone ? (200 + window.innerWidth) * dir : active ? mx : 0;
        // Rotation based on drag + flick velocity
        const rot = mx / 100 + (isGone ? dir * 10 * vx : 0);
        // Scale up when active

        return {
          x,
          rot,

          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });

      // If all cards are gone, reset after a delay
      if (!active && gone.size === feedLength) {
        setTimeout(() => {
          gone.clear();
        }, 600);
      }
    }
  );

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading feed...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  // Ensure feed is an array and props exist before mapping
  if (!Array.isArray(feed) || !props || props.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No items in feed.
      </div>
    );
  }

  return (
    <div className={styles.deckContainer}>
      {props.map(({ x, y, rot, scale }, i) => {
        const cardData = feed[i];
        if (!cardData) return null;

        const imageUrl =
          cardData.photoUrl ||
          "https://placehold.co/600x400/eee/ccc?text=No+Image";

        return (
          <animated.div
            className={styles.deck}
            key={cardData.id || i}
            style={{ x, y }}
          >
            <UserCard
              cardData={cardData}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
              bind={bind(i)}
              imageUrl={imageUrl}
            />
          </animated.div>
        );
      })}
    </div>
  );
};

export default Feed;
