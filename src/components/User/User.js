import { Grid } from "@mui/material";
import { LoginContext } from "hooks/context/LoginInfoContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import UserTable from "./UserTable";

const User = () => {
  const { loginData } = useContext(LoginContext);
  // const navigate = useNavigate();
  if (loginData.role == "ADMIN" || loginData.role == "TEAM_LEAD") {
    return (
      <>
        <Helmet>
          <title>Users | RoboAgent</title>
        </Helmet>
        <Grid container>
          <UserTable />
        </Grid>
      </>
    );
  }
  return null;
};

export default User;
