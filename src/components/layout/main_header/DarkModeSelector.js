// /* eslint-disable no-unused-vars */
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { Box, IconButton } from "@mui/material";
// import { useContext } from "react";
// import { themeContext } from "hooks/context/ThemeContext";

// const CurrentThemeSelector = (props) => {
//   const { currentTheme, setCurrentTheme } = useContext(themeContext);
//   console.log("currentTheme ===> ", currentTheme);
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//         bgcolor: "background.default",
//         color: "text.primary",
//         borderRadius: 1,
//       }}
//       onClick={(e) => {
//         console.log("click");
//         console.log(currentTheme);
//         setCurrentTheme(currentTheme === "light" ? "dark" : "light");
//       }}
//       style={{ cursor: "pointer" }}
//       className=".MuiBox-root .MuiBox-root-489"
//     >
//       {currentTheme === "light" ? "Light mode" : "Dark mode"}
//       <IconButton sx={{ ml: 1 }} color="inherit">
//         {currentTheme ? <Brightness7Icon /> : <Brightness4Icon />}
//       </IconButton>
//     </Box>
//   );
// };

// export default CurrentThemeSelector;
