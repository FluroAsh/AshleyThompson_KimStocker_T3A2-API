exports.randomDate = () => {
  const minDate = new Date(Date.UTC(2012, 1, 1, 1));
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * (maxDate - minDate));
  return new Date(timestamp);
};
