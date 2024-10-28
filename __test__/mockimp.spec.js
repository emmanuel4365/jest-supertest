test("mock imp", () => {
  const mockfn = jest
    .fn(() => "default")
    .mockImplementation(() => "First call")
    .mockImplementation(() => "Second call");
  const res1 = mockfn();
  const res2 = mockfn();
  console.log(res1);
  console.log(res2);
});

test("mock imp", () => {
  const mockfn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "First call")
    .mockImplementationOnce(() => "Second call");
  const res1 = mockfn();
  const res2 = mockfn();
  const res3 = mockfn();
  const res4 = mockfn();
  console.log(res1);
  console.log(res2);
  console.log(res3);
  console.log(res4);
});
