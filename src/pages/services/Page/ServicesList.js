import { Grid } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { AlertContext } from "hooks/Context/AlertContext";
import { handleFetchCurrentUser } from "utils/users/users";
import { Services } from "../Schema/ServicesSchema";
import ServicesListItem from "./utils/ServicesListItem";
const ServicesList = () => {
  const [currentUserData, setCurrentUserData] = useState({});
  // console.log("currentUserData ===> Siminz ===> ", currentUserData.status);
  const queryCenterSignup = useRef(currentUserData?.status?.startsWith("0"));
  // console.log("queryCenterSignup ===> Siminz ===> ", queryCenterSignup.current);
  const { setAlert } = useContext(AlertContext);
  const [eligiableServices, setEligiableSevices] = useState({ General: true });

  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: "SET_CURRENT_USER",
      setCurrentUserData,
      setAlert,
    });
    if (queryCenterSignup.current)
      setAlert({
        alertType: "warning",
        alertMsg:
          "Please Register in the query center to be able to use the services",
        sleep: 1000000,
      });
    return () =>
      setAlert({
        alertType: "",
        alertMsg: "",
        sleep: 0,
      });
  }, []);
  useEffect(() => {
    if (currentUserData.roboAuthorities) {
      Services.map((service, index) => {
        const showService = currentUserData.roboAuthorities.some((auth) =>
          service?.allowedAuthorities?.includes(auth.name)
        );
        if (showService)
          setEligiableSevices((prev) => ({ ...prev, [service.enName]: true }));
      });
      console.log(eligiableServices);
    }
  }, [currentUserData]);
  if (currentUserData) {
    return (
      <Grid container item spacing={4}>
        <Helmet>
          <title>Services | RoboAgent</title>
        </Helmet>
        {Services.map((service, index) => (
          <Grid key={service.enName + index} item xs={12} sm={6} md={4} lg={3}>
            <ServicesListItem
              eligiableServices={eligiableServices}
              currentUserData={currentUserData}
              service={service}
              queryCenterSignup={queryCenterSignup.current}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
};
export default ServicesList;
// else {
//   return (
//     currentUserData.roboAuthorities && (
//       <Grid container item spacing={4}>
//         <Helmet>
//           <title>Services | RoboAgent</title>
//         </Helmet>
// {Services.map((service, index) => {
//   const showService = currentUserData?.roboAuthorities?.some((auth) =>
//     service?.allowedAuthorities?.includes(auth.name)
//   );
//           return showService ? (
//             <Grid
//               key={service.enName + index}
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               lg={3}
//             >
//               <ServicesListItem
//                 currentUserData={currentUserData}
//                 key={service.value}
//                 service={service}
//                 queryCenterSignup={queryCenterSignup.current}
//               />
//             </Grid>
//           ) : service.allowedAuthorities[0] === "all" ? (
//             <Grid
//               key={service.enName + index}
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               lg={3}
//             >
//               <ServicesListItem
//                 currentUserData={currentUserData}
//                 key={service.value}
//                 service={service}
//                 queryCenterSignup={queryCenterSignup.current}
//               />
//             </Grid>
//           ) : null;
//         })}
//       </Grid>
//     )
//   );
// }
