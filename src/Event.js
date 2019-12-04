import React from 'react';
import './Date.css';

function Date(props) {

    let style = "event";

    switch (props.event) {
        case 1:
            style += " event event-multiday-start"
            break;
        case 2:
            style += " event event-multiday"
            break;
        case 3:
            style += " event event-multiday-finish"
            break;
        case 4:
            style += " event event-ghost"
            break;
    }
    return (
       <span className={style}></span>
    );
}

let a = {
    "1": {
        slot1: 1,
        slot2: 0,
        slot3: 1
    },
    "2": {
        slot1: 1,
        slot2: 0,
        slot3: 0
    }
}
export default Date;
