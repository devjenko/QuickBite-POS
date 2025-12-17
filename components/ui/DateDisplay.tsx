const DateDisplay = () => {
  const today = new Date().toDateString();

  return <span>{today}</span>;
};

export default DateDisplay;
