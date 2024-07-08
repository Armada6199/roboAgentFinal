import AxiosHit from "../api/AxiosHit.js";
import {
  // handleSubmitUserAuths,
  handleFetchAuthorities,
  hanldeSubmitUserNewRole,
  handleSubmitUserNewService,
  handleFetchAllUsers,
  handleFetchServiceList,
  handleFetchCurrentUser,
} from "../users/users";

jest.mock("../api/AxiosHit.js");

describe("API handling functions", () => {
  const utils = {
    roboAuthorities: ["authority1", "authority2"],
    userId: "user123",
    newRole: "admin",
    userNewService: "service1",
    someUtil: jest.fn(),
    setIsLoading: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it("handleSubmitUserAuths should call AxiosHit with correct config", async () => {
  //   AxiosHit.mockResolvedValueOnce({ data: "success" });

  //   await handleSubmitUserAuths(utils);

  //   expect(AxiosHit).toHaveBeenCalledWith(
  //     {
  //       method: "put",
  //       url: "/api/user-auth",
  //       data: {
  //         roboAuthorities: utils.roboAuthorities,
  //         userId: utils.userId,
  //       },
  //     },
  //     utils
  //   );
  // });

  it("handleFetchAuthorities should call AxiosHit with correct config", async () => {
    AxiosHit.mockResolvedValueOnce({ data: "success" });

    await handleFetchAuthorities(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "get",
        url: "/api/user-auth",
      },
      utils
    );
  });

  it("hanldeSubmitUserNewRole should call AxiosHit with correct config", async () => {
    AxiosHit.mockResolvedValueOnce({ data: "success" });

    await hanldeSubmitUserNewRole(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "put",
        url: `/api/user-roles/${utils.userId}/roles/${utils.newRole}`,
      },
      utils
    );
  });

  // it("handleSubmitNewUser should call AxiosHit with correct config and handle subsequent calls", async () => {
  //   const userData = {
  //     name: "John Doe",
  //     email: "john@example.com",
  //     roboAuthorities: ["authority1", "authority2"],
  //   };
  //   const mockResponse = {
  //     data: {
  //       roboAgentRs: {
  //         body: {
  //           user: {
  //             userId: "user123",
  //           },
  //         },
  //       },
  //     },
  //   };

  //   AxiosHit.mockResolvedValueOnce(mockResponse);

  //   await handleSubmitNewUser(userData, utils);

  //   expect(AxiosHit).toHaveBeenCalledWith(
  //     {
  //       url: "/api/users/signup",
  //       method: "post",
  //       data: { ...userData, roboAuthorities: undefined },
  //     },
  //     utils
  //   );

  //   expect(AxiosHit).toHaveBeenCalledWith(
  //     {
  //       method: "put",
  //       url: "/api/user-auth",
  //       data: {
  //         roboAuthorities: userData.roboAuthorities,
  //         userId: "user123",
  //       },
  //     },
  //     { roboAuthorities: userData.roboAuthorities, userId: "user123" }
  //   );
  // });

  it("handleSubmitUserNewService should call AxiosHit with correct config", async () => {
    AxiosHit.mockResolvedValueOnce({ data: "success" });

    await handleSubmitUserNewService(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "put",
        url: `/api/service/${utils.userId}/service/${utils.userNewService}`,
      },
      utils
    );
  });

  it("handleFetchAllUsers should call AxiosHit with correct config", async () => {
    AxiosHit.mockResolvedValueOnce({ data: "success" });

    await handleFetchAllUsers(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        url: "/api/users/getallusers?size=40",
        method: "get",
      },
      utils
    );
  });

  it("handleFetchServiceList should call AxiosHit with correct config", async () => {
    AxiosHit.mockResolvedValueOnce({ data: "success" });

    await handleFetchServiceList(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "get",
        url: "/api/service",
      },
      utils
    );
  });

  it("handleFetchCurrentUser should call AxiosHit with correct config", async () => {
    AxiosHit.mockResolvedValueOnce({ data: "success" });

    await handleFetchCurrentUser(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        url: "/api/users/currentuser",
        method: "get",
      },
      utils
    );
  });
});
