import Event from "@/components/molecules/Calendar/Events/index.jsx";
import "@/utils/date";
export function getTimeLabels(locale) {
  const timeLabels = [];
  for (let i = 0; i < 24; i++) {
    const date = new Date();
    date.setHours(i);
    date.setMinutes(0);
    const timeLabel = date.toLocaleTimeString(locale, { hour: "2-digit" });
    timeLabels.push(timeLabel);
  }
  return timeLabels;
}

// Helper function to filter schedules
export function filterSchedules(schedules, date, view) {
  if (view === "day") {
    return schedules.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  } else if (view === "week") {
    const startOfWeek = date.startOfWeek();
    const endOfWeek = date.endOfWeek();
    endOfWeek.setDate(endOfWeek.getDate() + 1);
    return schedules.filter((event) => {
      const eventDate = new Date(event.startTime);
      return eventDate >= startOfWeek && eventDate < endOfWeek;
    });
  } else if (view === "month") {
    return schedules.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  }
}

// Helper function to calculate event position
function calculateEventPosition(event) {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
  const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
  const minutesPerRow = (24 * 60) / 288; // 288 is the number of rows in your grid
  const gridRowStart = Math.floor(startMinutes / minutesPerRow) + 1;
  const gridRowSpan = Math.floor((endMinutes - startMinutes) / minutesPerRow);
  const diffInDays = Math.floor(
    (startDate - startDate.startOfWeek()) / (1000 * 60 * 60 * 24),
  );
  const gridColumnStart = diffInDays + 1; // +1 because grid columns start at 1
  return { gridRowStart, gridRowSpan, gridColumnStart };
}

// EventItem component
export function EventItem({ event, index, status, title, description, view }) {
  const { gridRowStart, gridRowSpan, gridColumnStart } =
    calculateEventPosition(event);

  return (
    <Event
      key={index}
      status={status}
      event={event}
      style={{
        gridRow: `${gridRowStart} / span ${gridRowSpan}`,
        gridColumn: view === "week" ? gridColumnStart : 1,
      }}
      title={title}
      description={description}
    />
  );
}

export function generateDaysOfWeek(locale, weekday = "long") {
  return [...Array(7).keys()].map((_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: weekday }).format(
      new Date(1970, 0, i + 4),
    ),
  );
}

// Helper function to get the number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper function to get the number of days in the previous month
function getDaysInPrevMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// Helper function to get the first day of the month
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// Helper function to get the last day of the month
function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDay();
}
export function getDaysOfMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInPrevMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const lastDayOfMonth = getLastDayOfMonth(year, month);

  const days = [];
  for (let i = 1; i <= firstDayOfMonth; i++) {
    days.push({
      date: `${year}-${month.toString().padStart(2, "0")}-${(
        daysInPrevMonth -
        firstDayOfMonth +
        i
      )
        .toString()
        .padStart(2, "0")}`,
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date();
    const day = {
      date: `${year}-${(month + 1).toString().padStart(2, "0")}-${i
        .toString()
        .padStart(2, "0")}`,
      isCurrentMonth: true,
    };
    if (
      i === currentDate.getDate() &&
      year === currentDate.getFullYear() &&
      month === currentDate.getMonth()
    )
      day.isToday = true;
    if (i === date.getDate()) day.isSelected = true;
    days.push(day);
  }
  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    days.push({
      date: `${year}-${(month + 2).toString().padStart(2, "0")}-${i
        .toString()
        .padStart(2, "0")}`,
    });
  }
  return days;
}
