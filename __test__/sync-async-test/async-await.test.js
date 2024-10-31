const fetchData = require("../../sync-async/async-await");

describe("Promise", () => {
  //   test("the response is peanut butter", async () => {
  //     const response = await fetchData();
  //     expect(response).toBe("peanut butter");
  //   });

  //   test("the data is peanut butter", async () => {
  //     await expect(fetchData()).resolves.toBe("peanut butter");
  //   });

  test("the fetch fails with an error", async () => {
    await expect(fetchData()).rejects.toMatch("error");
  });
});
