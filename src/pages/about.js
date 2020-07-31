import React from "react";

// Styles
import style from "./about.module.css";

function About() {
  return (
    <div className={style.aboutMain}>
      <nav className={style.sideNav}>
        <ul>
          <li>Section 1</li>
          <li>Section 2</li>
          <li>
            Section 3
            <ul>
              <li>Subsection 1</li>
              <li>Subsection 2</li>
              <li>Subsection 3</li>
            </ul>
          </li>
          <li>Section 4</li>
          <li>Section 5</li>
        </ul>
      </nav>
      <main className={style.content}></main>
    </div>
  );
}

export default About;
