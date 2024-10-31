const crypto = require("crypto");
const { getData } = require("../../firstTest");

test("fetch data", async () => {
  jest.spyOn(crypto, "randomBytes").mockResolvedValueOnce("bytes");

  const res = await getData();
  console.log(res);
  expect(res).toBe("bytes");
});
