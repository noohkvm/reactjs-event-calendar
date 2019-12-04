import React from 'react';
import Date from './Date'

function Week(props) {
    let dates = [];
    let diff = props.week.end - props.week.start;
    if (props.week.start == 1) {
        for (let i = 0; i < 6 - diff; i++) {
            dates.push("");
        }
    }
    for (let i = props.week.start; i <= props.week.end; i++) {
        dates.push({ active: true, date: i, month: props.month, year: props.year});
    }
    let dateSize = dates.length;
    for (let i = 1; i < 8 - dateSize; i++) {
        let month = props.month;
        let year = props.year;
        if (props.month == 12) {
            month = 1;
            year++;
        }
        dates.push({ active: false, date: i, month: month, year: year });
    }
    return (
        <tr>
            {dates.map((value, index) => {
                return <Date date={value} events={props.events} />
            })}
        </tr>
    );
}

export default Week;
