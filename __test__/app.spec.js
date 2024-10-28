const crypto = require("crypto");
const { getData } = require("../app");

test("fetch data", async () => {
  jest.spyOn(crypto, "randomBytes").mockResolvedValueOnce("bytes");

  const res = await getData();
  console.log(res);
});
