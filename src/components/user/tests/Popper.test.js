import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { AlertContext } from "hooks/context/AlertContext";
import { lightTheme } from "styles/theme";
import RolesPopper from "../poppers/RolesPopper";

describe("RolesPopper Component", () => {
  const setTableData = jest.fn();
  const handleCloseRolePopper = jest.fn();

  const userDataMember = [
    1,
    "John",
    "",
    "Doe",
    "john.doe@example.com",
    "Active",
    "MEMBER",
  ];
  const userDataTeamLead = [
    2,
    "Jane",
    "",
    "Smith",
    "jane.smith@example.com",
    "Active",
    "TEAM_LEAD",
  ];

  it('displays "Promote to Team Lead" button when user role is MEMBER', () => {
    render(
      <AlertContext.Provider
        value={{
          alertInfo: jest.fn(),
          handleCloseAlert: jest.fn(),
          setAlert: jest.fn(),
          handleOpenAlert: jest.fn(),
          openFailerAlert: false,
        }}
      >
        <ThemeProvider theme={lightTheme()}>
          <RolesPopper
            userData={userDataMember}
            setTableData={setTableData}
            tableData={[]}
            handleCloseRolePopper={handleCloseRolePopper}
          />
        </ThemeProvider>
      </AlertContext.Provider>
    );

    expect(screen.getByText("Promote to team Lead")).toBeInTheDocument();
    expect(screen.queryByText("Demote to Member")).not.toBeInTheDocument();
  });

  it('displays "Demote to Member" button when user role is not MEMBER', () => {
    render(
      <AlertContext.Provider
        value={{
          alertInfo: jest.fn(),
          handleCloseAlert: jest.fn(),
          setAlert: jest.fn(),
          handleOpenAlert: jest.fn(),
          openFailerAlert: false,
        }}
      >
        <ThemeProvider theme={lightTheme()}>
          <RolesPopper
            userData={userDataTeamLead}
            setTableData={setTableData}
            tableData={[]}
            handleCloseRolePopper={handleCloseRolePopper}
          />
        </ThemeProvider>
      </AlertContext.Provider>
    );

    expect(screen.getByText("Emote to Member")).toBeInTheDocument();
    expect(screen.queryByText("Promote to team Lead")).not.toBeInTheDocument();
  });

  // it("handles button click correctly", () => {
  //   const mockHandleSubmitUserNewRole = jest.fn();
  //   jest.mock("src/utils/users/users", () => ({
  //     hanldeSubmitUserNewRole: mockHandleSubmitUserNewRole,
  //   }));

  //   render(
  //     <AlertContext
  //       value={{
  //         alertInfo: jest.fn(),
  //         handleCloseAlert: jest.fn(),
  //         setAlert: jest.fn(),
  //         handleOpenAlert: jest.fn(),
  //         openFailerAlert: false,
  //       }}
  //     >
  //       <ThemeProvider theme={lightTheme()}>
  //         <RolesPopper
  //           userData={userDataMember}
  //           setTableData={setTableData}
  //           tableData={[]}
  //           handleCloseRolePopper={handleCloseRolePopper}
  //         />
  //       </ThemeProvider>
  //     </AlertContext>
  //   );

  //   const button = screen.getByText("Promote to team Lead");
  //   fireEvent.click(button);

  //   expect(handleCloseRolePopper).toHaveBeenCalled();
  //   expect(mockHandleSubmitUserNewRole).toHaveBeenCalledWith({
  //     userId: userDataMember[0],
  //     newRole: "TEAM_LEAD",
  //     setTableData,
  //     requestAction: "UPDATE_USER_ROLE",
  //     tableData: [],
  //     userData: userDataMember,
  //     handleCloseRolePopper,
  //     setAlert: useUpdateAlert,
  //   });
  // });
});
