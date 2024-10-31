function fetchData(dataFunc) {
  setTimeout(() => {
    dataFunc("peanut butter");
  }, 1000);
}

module.exports = fetchData;
