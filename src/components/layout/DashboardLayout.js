/* eslint-disable */
import { Box, Toolbar, styled } from "@mui/material";
import ShowAlert from "components/ShowAlert";
import { LoginContext } from "hooks/context/LoginInfoContext";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router";
import SideDrawer from "./SideDrawer";
import MainHeader from "./main_header/MainHeader";
import { themeContext } from "hooks/context/ThemeContext";

export const drawerWidth = 240;

const DrawerPaper = styled("div")(({ theme }) => ({
  width: drawerWidth,
  display: "grid",
  gridTemplateRows: "auto auto 1fr auto",
  // Add any other styles you need here
}));

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  height: "calc(100vh - 65px)",
  padding: 16,
}));

const DashboardLayout = (props) => {
  const { loginData } = useContext(LoginContext);
  const { window } = props;
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);
  const { direction } = useContext(themeContext);
  const handleToggleClose = () => setToggleMenu(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <React.Fragment>
      <Box
        sx={{
          direction: direction == "rtl" ? "ltr" : "ltr",
          display: "flex",
        }}
      >
        {/* App Bar */}
        {loginData.isLoggedIn && <MainHeader onClick={handleToggleDrawer} />}

        {loginData.isLoggedIn && (
          <SideDrawer
            container={container}
            toggleMenu={toggleMenu}
            onClose={handleToggleClose}
            drawerPaper={<DrawerPaper />}
          />
        )}
        {/* Drawer */}

        {/* Content */}
        <MainStyle>
          {loginData.isLoggedIn && <Toolbar />}
          <ShowAlert />
          <Outlet />
        </MainStyle>
      </Box>
    </React.Fragment>
  );
};

export default DashboardLayout;
