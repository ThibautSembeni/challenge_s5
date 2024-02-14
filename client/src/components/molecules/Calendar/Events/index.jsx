const options = { hour: "2-digit", minute: "2-digit" };

export default function Event({
  status,
  event,
  locale = "fr-FR",
  style,
  title,
  description,
}) {
  // schedules generate and free => green
  // schedules generate and reserved => indigo
  // schedules generate and canceled => gray
  // schedules generate and completed => blue light
  // default indigo
  if (status === "free") {
    return (
      <li className="relative mt-px flex" style={style}>
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-green-50 p-2 text-xs leading-5 hover:bg-green-100"
        >
          <p className="order-1 font-semibold text-green-700">disponible</p>
          <p className="text-green-500 group-hover:text-green-700">
            <time dateTime={event.startTime}>
              {new Date(event.startTime).toLocaleTimeString(locale, options)} -{" "}
              {new Date(event.endTime).toLocaleTimeString(locale, options)}
            </time>
          </p>
        </a>
      </li>
    );
  } else if (status === "scheduled") {
    return (
      <li className="relative mt-px flex" style={style}>
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
        >
          {title && (
            <p className="order-1 font-semibold text-indigo-700">{title}</p>
          )}
          {description && (
            <p className="order-1 text-indigo-500 group-hover:text-indigo-700">
              {description}
            </p>
          )}
          <p className="text-indigo-500 group-hover:text-indigo-700">
            <time dateTime={event.startTime}>
              {new Date(event.startTime).toLocaleTimeString(locale, options)} -{" "}
              {new Date(event.endTime).toLocaleTimeString(locale, options)}{" "}
            </time>
          </p>
        </a>
      </li>
    );
  } else if (status === "completed") {
    return (
      <li className="relative mt-px flex" style={style}>
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
        >
          {title && (
            <p className="order-1 font-semibold text-blue-700">
              {title} terminé
            </p>
          )}
          {description && (
            <p className="order-1 text-blue-500 group-hover:text-blue-700">
              {description}
            </p>
          )}
          <p className="text-blue-500 group-hover:text-blue-700">
            <time dateTime={event.startTime}>
              {new Date(event.startTime).toLocaleTimeString(locale, options)} -{" "}
              {new Date(event.endTime).toLocaleTimeString(locale, options)}{" "}
            </time>
          </p>
        </a>
      </li>
    );
  } else if (status === "cancelled") {
    return (
      <li className="relative mt-px flex" style={style}>
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
        >
          {title && (
            <p className="order-1 font-semibold text-blue-700">
              {title} annulé{" "}
            </p>
          )}
          {description && (
            <p className="order-1 text-blue-500 group-hover:text-blue-700">
              {description}
            </p>
          )}
          <p className="text-blue-500 group-hover:text-blue-700">
            <time dateTime={event.startTime}>
              {new Date(event.startTime).toLocaleTimeString(locale, options)} -{" "}
              {new Date(event.endTime).toLocaleTimeString(locale, options)}{" "}
            </time>
          </p>
        </a>
      </li>
    );
  }
}
