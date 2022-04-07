const formatDate = (date) => {
  date = new Date(date);
  return date.toDateString() + " at " + date.toLocaleTimeString();
};

export default formatDate;
