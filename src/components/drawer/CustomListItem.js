/* eslint-disable */
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, Typography , styled } from "@mui/material";

import "styles/styles.css";
const ListItemStyle = styled(ListItem)(() => ({
  padding: 0,
}));

export const CustomLinkStyle = styled(NavLink)(({ theme }) => ({
  width: "100%",
  padding: "8px 8px 8px 32px",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: theme.palette.gray.main,

  "& .MuiListItemIcon-root": {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    color: "inherit",
    fontSize: 18,
  },
  "& h6": {
    fontSize: 15,
    fontWeight: 400,
  },
}));

const CustomListItem = (props) => {
  return (
    <ListItemStyle button onClick={props.onClick}>
      <CustomLinkStyle
        to={props.path}
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "600" : "",
            color: isActive ? "#4ABB7D" : "rgb(99, 115, 129)",
          };
        }}
      >
        <ListItemIcon>{props.icon}</ListItemIcon>

        <Typography variant="subtitle1" component="h6">
          {props.title}
        </Typography>
      </CustomLinkStyle>
    </ListItemStyle>
  );
};

export default CustomListItem;
