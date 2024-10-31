function fetchData() {
  return new Promise((resolve, reject) => {
    if (false) {
      resolve("peanut butter");
    } else {
      reject("error");
    }
  });
  //   return new Promise((resolve) => resolve("peanut butter"));
}

module.exports = fetchData;
