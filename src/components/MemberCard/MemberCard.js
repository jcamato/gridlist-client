import React from "react";
import style from "./membercard.module.css";

// MemberCard
const MemberCard = (props) => {
  return (
    <div className={style.member}>
      <img className={style.poster} src={props.poster} alt="" />
      <div className={style.tab}>
        <p className={style.name}>{props.name}</p>
        <p className={style.position}>{props.position}</p>
      </div>
    </div>
  );
};

export default MemberCard;
