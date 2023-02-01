import React from "react";
import style from "./styles.module.css";


export function Video() {
    return (
        <div className={style.video}>
            <video controls poster="\assets\images\posters\p2.png" src="\assets\videos\e.mp4" oncontextmenu="return false;" contextMenu="false"></video>
        </div>
    );
}
