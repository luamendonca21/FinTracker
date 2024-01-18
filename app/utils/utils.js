import timediff from "timediff";

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${day}/${month}/${year}`;
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
  const seconds = formatTimeUnit(Math.abs(result.seconds), "segundo");

  return (years == "" &&
    months == "" &&
    weeks == "" &&
    days == "" &&
    hours == "" &&
    minutes == "" &&
    seconds !== "") ||
    dateToCompare === currentDate
    ? "Agora mesmo"
    : years == "" && months !== ""
    ? `${timeDirection}${months}`.slice(0, -2)
    : years == "" && months == "" && weeks !== ""
    ? `${timeDirection}${weeks}`.slice(0, -2)
    : years == "" && months == "" && weeks == "" && days !== ""
    ? `${timeDirection}${days}`.slice(0, -2)
    : years == "" && months == "" && weeks == "" && days == "" && hours !== ""
    ? `${timeDirection}${hours}`.slice(0, -2)
    : years == "" &&
      months == "" &&
      weeks == "" &&
      days == "" &&
      hours == "" &&
      minutes != ""
    ? `${timeDirection}${minutes}`.slice(0, -2)
    : formatDate(dateToCompare);
};

export const findObjectInArrayById = (items, id) => {
  return items.find((item) => item.id === id);
};

export const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// to fetch resources as Blob data
export const requestBlob = (uri) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(new TypeError("Network request failed"));
    xhr.responseType = "blob";

    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};
