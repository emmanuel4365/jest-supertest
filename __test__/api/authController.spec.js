const {
  registerUser,
  loginUser,
} = require("../../controllers/authController.js");
const bcrypt = require("bcryptjs");
const User = require("../../models/users.js");

jest.mock("../../utils/helpers.js", () => ({
  getJwtToken: jest.fn(() => "jwt_token"),
}));

const mockRequest = () => {
  return {
    body: {
      name: "Test user",
      email: "testuser@email.com",
      password: "123abc",
    },
  };
};

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockUser = {
  _id: "65i6798o340607kd903jdt94",
  name: "Test user",
  email: "testuser@email.com",
  password: "hashedPassword",
};

const userLogin = {
  email: "testuser@email.com",
  password: "123abc",
};

afterEach(() => {
  //restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("Register User", () => {
  it("should register user", async () => {
    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
    jest.spyOn(User, "create").mockResolvedValueOnce(mockUser);

    const mockReq = mockRequest();
    const mockRes = mockResponse();

    await registerUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(bcrypt.hash).toHaveBeenCalledWith("123abc", 10);
    expect(User.create).toHaveBeenCalledWith({
      name: "Test user",
      email: "testuser@email.com",
      password: "hashedPassword",
    });
  });

  it("should throw validation error", async () => {
    const mockReq = (mockRequest().body = { body: {} });
    const mockRes = mockResponse();

    // console.log(mockReq);

    await registerUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Please enter all values",
    });
  });

  it("should throw duplicate email entered error", async () => {
    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
    jest.spyOn(User, "create").mockRejectedValueOnce({ code: 11000 });

    const mockReq = mockRequest();
    const mockRes = mockResponse();

    await registerUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Duplicate email",
    });
  });
});

describe("Login User", () => {
  it("should throw missing email or password error", async () => {
    const mockReq = (mockRequest().body = { body: {} });
    const mockRes = mockResponse();

    await loginUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Please enter email & Password",
    });
  });

  it("should throw invalid email error", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(null),
    }));

    const mockReq = (mockRequest().body = { body: userLogin });
    const mockRes = mockResponse();

    await loginUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Invalid Email or Password",
    });
  });

  it("should throw invalid password error", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(mockUser),
    }));

    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);

    const mockReq = (mockRequest().body = { body: userLogin });
    const mockRes = mockResponse();

    await loginUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Invalid Email or Password",
    });
  });
});
