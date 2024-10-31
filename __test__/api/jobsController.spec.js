const Job = require("../../models/jobs");
const { getJobs, newJob } = require("../../controllers/jobsController");

const mockJob = {
  _id: "3456yi246jd46jfo296ksotj",
  title: "Node Developer",
  description: "Hello",
  email: "employee@gmail.com",
  address: "5 street",
  company: "apple",
  industry: [],
  position: 2,
  salary: 100000000,
  user: "3456yi246jd46jfo296k5678",
  postingDate: "2022-11-08T22:31:52.4412",
};

const mockRequest = () => {
  return {
    body: {},
    query: {},
    params: {},
    user: {},
  };
};

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

afterEach(() => {
  //restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("Jobs Controller", () => {
  describe("get all jobs", () => {
    it("should get all jobs", async () => {
      jest.spyOn(Job, "find").mockImplementationOnce(() => ({
        limit: () => ({
          skip: jest.fn().mockResolvedValue([mockJob]),
        }),
      }));

      const mockReq = mockRequest();
      const mockRes = mockResponse();

      await getJobs(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        jobs: [mockJob],
      });
    });
  });
  describe("create new job", () => {
    it("should create a new job", async () => {
      jest.spyOn(Job, "create").mockResolvedValueOnce(mockJob);
      const mockReq = (mockRequest().body = {
        body: {
          title: "Node Developer",
          description: "Hello",
          email: "employee@gmail.com",
          address: "5 street",
          company: "apple",
          position: 2,
          salary: 100000000,
        },
        user: { id: "3456yi246jd46jfo296k5678" },
      });

      const mockRes = mockResponse();
      await newJob(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        job: mockJob,
      });
    });
  });
});
