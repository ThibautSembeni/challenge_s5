import Event from "@/components/molecules/Calendar/Events/index.jsx";

Date.prototype.startOfWeek = function () {
  const diff = (this.getDay() + 6) % 7; // Ajuster le jour de la semaine (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() - diff);
};

Date.prototype.endOfWeek = function () {
  const startOfWeek = this.startOfWeek();
  return new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 6,
  );
};

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
