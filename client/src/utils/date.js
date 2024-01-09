export function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  const years = currentDate.getFullYear() - birthDate.getFullYear();
  const months = currentDate.getMonth() - birthDate.getMonth();
  const days = currentDate.getDate() - birthDate.getDate();

  let age = years;

  if (months < 0 || (months === 0 && days < 0)) {
    age--;
  }

  if (age > 0) {
    return `${age} year${age > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else {
    return "Today is the birthday";
  }
}

export function displayDay(date) {
  const currentDate = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return currentDate.toLocaleDateString("fr-FR", options);
}

export function displayTime(date) {
  const currentDate = new Date(date);
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  return `${hours}h${minutes}`;
}
