import timediff from "timediff";

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const calculateDateAgo = (units, quantity) => {
  const currentDate = new Date();
  switch (units) {
    case "hours":
      return new Date(currentDate.getTime() - quantity * 60 * 60 * 1000);
    case "days":
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - quantity
      );
    case "months":
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - quantity,
        currentDate.getDate()
      );
    case "years":
      return new Date(
        currentDate.getFullYear() - quantity,
        currentDate.getMonth(),
        currentDate.getDate()
      );

    default:
      return null;
  }
};

export const getTimeDifference = (dateTime) => {
  const currentDate = new Date();
  const dateToCompare = new Date(dateTime);
  const result = timediff(currentDate, dateToCompare, "YMWDHmS");
  const timeDirection = Object.values(result).some((value) => value < 0)
    ? "Há "
    : "Daqui a ";

  const formatTimeUnit = (value, unit) => {
    if (value === 1) {
      return `${value} ${unit}, `;
    } else if (value > 1) {
      return `${value} ${unit == "mês" ? "meses" : `${unit}s`}, `;
    }
    return "";
  };

  const years = formatTimeUnit(Math.abs(result.years), "ano");
  const months = formatTimeUnit(Math.abs(result.months), "mês");
  const weeks = formatTimeUnit(Math.abs(result.weeks), "semana");
  const days = formatTimeUnit(Math.abs(result.days), "dia");
  const hours = formatTimeUnit(Math.abs(result.hours), "hora");
  const minutes = formatTimeUnit(Math.abs(result.minutes), "minuto");

  return years == "" && months == ""
    ? `${timeDirection}${years}${months}${weeks}${days}${hours}${minutes}`.slice(
        0,
        -2
      )
    : formatDate(dateToCompare);
};

export const findObjectInArrayById = (items, id) => {
  return items.find((item) => item.id === id);
};
