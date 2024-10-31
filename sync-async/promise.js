function fetchData() {
  return new Promise((resolve, reject) => {
    if (false) {
      resolve("peanut butter");
    } else {
      reject("error");
    }
  });
}

module.exports = fetchData;
