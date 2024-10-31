const fetchData = require("../../sync-async/promise");

describe("Promise", () => {
  test("the response is error", () => {
    expect.assertions(2);
    return fetchData().catch((response) => {
      expect(response).toMatch("error");
      expect(response).toMatch("error");
    });
  });

  // test("the response is peanut butter", () => {
  //   return fetchData().then((response) => {
  //     expect(response).toBe("peanut butter");
  //   });
  // });
});
