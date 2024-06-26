import { Link as RouterLink } from "react-router-dom";
import { Avatar, Typography, Link } from "@mui/material";
import { Box, styled } from "@mui/material";

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: "flex",

  "& .MuiAvatar-root": {
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  "& h3": {
    fontWeight: 500,
  },
  "& .MuiTypography-caption": {
    color: theme.palette.text.secondary,
  },
  "& .MuiTypography-body2": {
    backgroundColor: theme.palette.gray.lighter,
    color: theme.palette.gray.main,
    fontWeight: 500,
    lineHeight: 1,
    display: "inline-block",
    borderRadius: 25,
    padding: "4px 6px",
  },
}));

const NewsUpdateItem = (props) => {
  return (
    <BoxContainerStyle sx={{ my: 1 }}>
      <Avatar src={props.photo} alt={props.title} />

      <Box sx={{ px: 1.5 }}>
        <Link to="/" component={RouterLink} underline="hover" color="inherit">
          <Typography variant="body1" component="h3">
            {props.title}
          </Typography>
        </Link>

        <Typography variant="caption" component="p">
          {props.subtitle}
        </Typography>

        <Typography variant="body2">{props.postingTime}</Typography>
      </Box>
    </BoxContainerStyle>
  );
};

export default NewsUpdateItem;
