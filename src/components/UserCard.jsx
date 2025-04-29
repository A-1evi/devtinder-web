import React from "react";
/* eslint-disable react/prop-types */
import { animated } from "@react-spring/web";
import styles from "./UserCard.module.css";

const UserCard = ({ cardData, style, bind, imageUrl }) => {
  return (
    <animated.div
      {...bind}
      className={styles.card}
      style={{
        ...style,
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className={styles.cardContent}>
        <h2 className={styles.name}>
          {cardData.firstName} {cardData.lastName}
        </h2>
        <p className={styles.bio}>{cardData.bio}</p>
        <div className={styles.tags}>
          <span className={styles.tag}>🎯 {cardData.role || "Developer"}</span>
          <span className={styles.tag}>📍 {cardData.location || "Remote"}</span>
        </div>
      </div>
    </animated.div>
  );
};

export default UserCard;
