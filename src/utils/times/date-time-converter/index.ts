const dateTimeConverter = (date: string) => {
  //* Date
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  //* Time
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedDate = [year, month, day].join("/");
  const formattedTime = [hours, minutes].join(":");

  return `${formattedDate} ${formattedTime}`;
};

export default dateTimeConverter;
