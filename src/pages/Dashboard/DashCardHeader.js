import { CardHeader , styled } from "@mui/material";

import { useTranslation } from "react-i18next";

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: "24px 24px 0 24px",

  "& .MuiCardHeader-title": {
    fontSize: theme.spacing(3),
    fontWeight: 600,
  },
  "& .MuiCardHeader-subheader": {
    fontSize: theme.spacing(2),
    fontWeight: 300,
    color: theme.palette.gray.main,
  },
}));

const DashCardHeader = (props) => {
  const { t } = useTranslation();
  return <CardHeaderStyle title={t(props.title)} subheader={props.subheader} />;
};

export default DashCardHeader;
