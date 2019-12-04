import React from 'react';
import './Date.css';
import Event from './Event'

function Date(props) {

    let a = props.events;
    let d = null;
    if(a[props.date.year] && a[props.date.year][props.date.month] ){
        d = a[props.date.year][props.date.month][props.date.date];
    }
    let active = props.date.active ? "active" : "inactive";
    return (
        <td class="day"><div class={active}>{props.date.date}</div>
            {d && d[1] ? <Event event={d[1]} /> : null}
            {d && d[2] ? <Event event={d[2]} /> : null}
            {d && d[3] ? <Event event={d[3]} /> : null}
        </td>
    );
}


export default Date;
