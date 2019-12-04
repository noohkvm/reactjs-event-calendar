import React from 'react';
import './Calendar.css';
import Week from './Week';
import WeekHeader from './WeekHeader';


function aa() {

  let events = this.props.events;

  let eventSlots = {};
  for (let event of events) {
    let from = event.from.getDate();
    let to = event.to.getDate();
    let year = event.from.getFullYear();
    let month = event.from.getMonth() + 1;
    let freeSlot = hasFreeSlot(eventSlots, year, month, from);

    if (freeSlot) {
      if (event.from.getFullYear() == event.to.getFullYear() && event.from.getMonth() == event.to.getMonth() && from == to) {
        eventSlots[year][month][from][freeSlot] = 5;
        continue;
      }
      fillSlot(event.from, event.to, month, year, eventSlots, freeSlot);
      // for (let i = from; i <= to; i++) {
      //   if (!eventSlots[year][month][i]) {
      //     eventSlots[year][month][i] = {};
      //   }
      //   if (i == from) {
      //     eventSlots[year][month][i][freeSlot] = 1;
      //   } else if (i == to) {
      //     eventSlots[year][month][i][freeSlot] = 3;
      //   } else {
      //     eventSlots[year][month][i][freeSlot] = 2;
      //   }
      //   if (freeSlot == 2) {
      //     if (!eventSlots[year][month][i][1]) {
      //       eventSlots[year][month][i][1] = 4;
      //     }
      //   }
      //   if (freeSlot == 3) {
      //     if (!eventSlots[year][month][i][1]) {
      //       eventSlots[year][month][i][1] = 4;
      //     }
      //     if (!eventSlots[year][month][i][2]) {
      //       eventSlots[year][month][i][2] = 4;
      //     }
      //   }
      // }


    }
  }
  return eventSlots;
}

function fillSlot(from, to, currentMonth, currentYear, slots, slotNumber) {
  if (slots[currentYear] == null) slots[currentYear] = {}
  if (slots[currentYear][currentMonth] == null) slots[currentYear][currentMonth] = {}

  let fromMonth = from.getMonth() + 1;
  let toMonth = to.getMonth() + 1;

  let startDate = 0;
  let lastDate = 0;
  if (fromMonth == toMonth) {
    startDate = from.getDate();
    lastDate = to.getDate();
  } else if (fromMonth == currentMonth) {
    startDate = from.getDate();
    lastDate = new Date(currentYear, currentMonth, 0).getDate()
  } else if (toMonth == currentMonth) {
    startDate = 1;
    lastDate = to.getDate();
  } else {
    startDate = 1;
    lastDate = new Date(currentYear, currentMonth, 0).getDate();
  }
  for (let i = startDate; i <= lastDate; i++) {
    if (slots[currentYear][currentMonth][i] == null) slots[currentYear][currentMonth][i] = {}

    if (from.getFullYear() == currentYear && (from.getMonth() + 1) == currentMonth && from.getDate() == i) {
      slots[currentYear][currentMonth][i][slotNumber] = 1;
    } else if (to.getFullYear() == currentYear && (to.getMonth() + 1) == currentMonth && to.getDate() == i) {
      slots[currentYear][currentMonth][i][slotNumber] = 3;
    } else {
      slots[currentYear][currentMonth][i][slotNumber] = 2;
    }
    if (slotNumber == 2) {
      if (!slots[currentYear][currentMonth][i][1]) {
        slots[currentYear][currentMonth][i][1] = 4;
      }
    }
    if (slotNumber == 3) {
      if (!slots[currentYear][currentMonth][i][1]) {
        slots[currentYear][currentMonth][i][1] = 4;
      }
      if (!slots[currentYear][currentMonth][i][2]) {
        slots[currentYear][currentMonth][i][2] = 4;
      }
    }
  }
  let nextMonth = currentMonth + 1;
  if (nextMonth > 12) {
    nextMonth = 1
    currentYear++
  }
  nextMonth = nextMonth > 13 ? 1 : nextMonth;

  if (currentYear <= to.getFullYear() && (to.getMonth() + 1) != currentMonth) {
    fillSlot(from, to, nextMonth, currentYear, slots, slotNumber)
  }
}

function hasFreeSlot(eventSlots, year, month, date) {
  if (!eventSlots[year]) {
    eventSlots[year] = {};
  }
  if (!eventSlots[year][month]) {
    eventSlots[year][month] = {}
  }
  if (!eventSlots[year][month][date]) {
    eventSlots[year][month][date] = {}
  }
  let eventSlot = eventSlots[year][month][date];
  // eventSlot = eventSlots[year][month][date];
  // if (!eventSlot) {
  //   eventSlots[year][month][date] = {}
  //   eventSlot = eventSlots[year][month][date];
  // }
  if (!eventSlot[1] || eventSlot[1] == 4) {
    return 1
  } else if (!eventSlot[2] || eventSlot[2] == 4) {
    return 2
  } else if (!eventSlot[3]) {
    return 3
  }
  return 0;
}

function Calendar(props) {
  let events = aa();
  let year = props.year;
  let month = props.month;
  let startWeek = props.startWeek;
  month--;
  let firstDateOfMonth = new Date(year, month, 1);
  let weeks = [];
  let lastDate = 0;
  let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i <= 5; i++) {
    if (i == 0) {
      let startPos = firstDateOfMonth.getDay();
      lastDate = startWeek - startPos;
      lastDate = lastDate < 1 ? lastDate + 7 : lastDate;
      weeks.push({ start: 1, end: lastDate });
    } else {
      let startDate = lastDate + 1;
      lastDate += 7;
      if (lastDate > lastDateOfMonth) {
        lastDate = lastDateOfMonth;
        weeks.push({ start: startDate, end: lastDate });
        break;
      }
      weeks.push({ start: startDate, end: lastDate });
    }
  }
  return (
    <table>
      <WeekHeader startWeek={startWeek} weakHeaders={props.weakHeaders} />
      {weeks.map((value, index) => {
        return <Week year={year} month={month + 1} week={value} events={events} />
      })}
    </table>
  );
}

export default Calendar;
