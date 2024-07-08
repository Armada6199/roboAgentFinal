/* eslint-disable */
const { generalSuccessReducer } = require("hooks/reducers/store");
const { failureHitHandle, successHitHandle } = require("utils/HitHandiling");



describe("Hit Handling", () => {


  it("should handle JWT failure", () => {
    const result = {
      response: {
        data: {
          roboAgentRs: { header: { responseStatus: { code: "JWT123" } } },
        },
      },
    };
    const utils = { test: "test-utils", setAlert: jest.fn() };

    failureHitHandle(result, utils);

    // expect(window.location).toBe("/auth/login");
    expect(localStorage.getItem("userInfo")).toBe(null);
  });
});
