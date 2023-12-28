export const formatDate = (date: number) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return Intl.DateTimeFormat("th-TH", options).format(date);
};
