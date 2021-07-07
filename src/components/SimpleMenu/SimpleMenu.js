import React, { useRef } from "react";
import style from "./simplemenu.module.css";
import { Link } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

const SimpleMenu = (props) => {
  const ref = useRef();

  useOutsideClick(ref, () => {
    props.toggleMenu();
  });

  // const onClickHandler = () => {
  //   props.toggleMenu();
  // };

  return (
    <div ref={ref} className={[style.menu, "disableSelect"].join(" ")}>
      <ul>
        {props.content.map((option) => {
          return (
            <Link
              key={option.display}
              className={style.navlink}
              to={option.link}
            >
              <li>
                <div>
                  <i className="material-icons">{option.icon}</i>
                </div>
                <div>{option.display}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SimpleMenu;
