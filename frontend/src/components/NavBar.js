import styles from "../styles/navbar.module.css";
import { appColor } from "../values/colors";
import React from "react";

function NavBar({ title, leftAction, rightAction }) {
    return (
        <div className={styles.navBar} style={{ backgroundColor: appColor }}>
            {leftAction && <div className={styles.leftAction}>{leftAction}</div>}
            <h2>{title}</h2>
            {rightAction && <div className={styles.rightAction}>{rightAction}</div>}
        </div>
    );
}

export default NavBar;
