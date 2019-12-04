import React from 'react';
import './WeekHeader.css'

function WeekHeader(props) {


    let dates = props.weakHeaders ? props.weakHeaders : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const rotate = (arr, count) => {
        if (count === 0) return arr;
        return [...arr.slice(count, arr.length), ...arr.slice(0, count)];
    };

    let d = rotate(dates, props.startWeek);

    return (
        <tr>
            {d.map((value, index) => {
                return <th class="day-name">{value}</th>

            })}
        </tr>
    );
}

export default WeekHeader;
