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
