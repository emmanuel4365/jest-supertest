beforeAll(() => {
  console.log("Before all");
});
afterAll(() => {
  console.log("After all");
});
beforeEach(() => {
  console.log("Before each");
});
afterEach(() => {
  console.log("After each");
});

describe("Auth", () => {
  it("test1", () => {});
  it("test1", () => {});
});

describe("Products", () => {
  it("test1", () => {});
  it("test1", () => {});
});
