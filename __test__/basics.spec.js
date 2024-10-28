test("addition", () => {
  expect(2 + 2).toBe(4);
});

test("null", () => {
  const i = null;
  expect.assertions(2);
  expect(i).toBeNull();
  expect(i).toBeDefined();
});

const animals = ["cat", "dog"];

test("Animal array", () => {
  expect(animals).toContain("dog");
  expect(animals).toBeInstanceOf(Array);
});

function getData() {
  throw new Error("Not found");
}

function addData() {
  return 2 + 2;
}

test("getData", () => {
  expect(() => getData()).toThrow("Not found");
});

test("addData", () => {
  expect(addData()).toBe(4);
});
