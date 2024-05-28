import MoreVertIcon from "@mui/icons-material/MoreVert";
import { t } from "i18next";
import { useState } from "react";

const { Grid, Button, Typography } = require("@mui/material");

function tableColumns(utils) {
  const { handleStatusClick, handleOpenServiceDialog, handleOpenServiceModal } =
    utils;
  return [
    {
      name: "userId",
      label: "User ID",
      options: {
        filter: true,
        display: "none",
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Grid display={"none"}></Grid>;
        },
      },
    },
    {
      name: "UserName",
      label: t("UserNameLabel"),
      options: {
        filter: true,
      },
    },
    {
      name: "FirstName",
      label: t("firstnameLabel"),
      options: {
        display: "none",
        filter: false,
      },
    },
    {
      name: "middleName",
      label: t("middlenameLabel"),

      options: {
        display: "none",

        filter: false,
      },
    },
    {
      name: "last Name",
      label: t("lastnameLabel"),

      options: {
        filter: false,
        display: "none",
      },
    },
    {
      name: "status",
      label: t("statusLabel"),

      options: {
        filter: true,
      },
    },
    {
      name: "role",
      label: t("roleLabel"),

      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid
              container
              item
              minWidth={"150px"}
              alignItems={"center"}
              gap={2}
            >
              <Grid item xs={8}>
                <Typography variant="body2" fontWeight={500}>
                  {value}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ cursor: "pointer" }}
                onClick={(event) => handleStatusClick(event, tableMeta.rowData)}
              >
                <MoreVertIcon sx={{ color: "primary.main" }} />
              </Grid>
            </Grid>
          );
        },
      },
    },
    {
      name: "email",
      label: t("emailLabel"),

      options: {
        filter: true,
      },
    },
    {
      name: "service",
      label: t("serviceLabel"),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const formattedValue = value.split("_").join(" ");
          return (
            <Grid
              container
              item
              minWidth={"200px"}
              maxWidth={"200px"}
              alignItems={"center"}
              gap={2}
            >
              <Grid item xs={8}>
                <Typography variant="body2" fontWeight={500}>
                  {formattedValue}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpenServiceDialog(tableMeta.rowData)}
              >
                <MoreVertIcon sx={{ color: "primary.main" }} />
              </Grid>
            </Grid>
          );
        },
      },
    },
    {
      name: "services",
      label: t("servicesLabel"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid
              container
              item
              minWidth={"150px"}
              maxWidth={"150px"}
              alignItems={"center"}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleOpenServiceModal(tableMeta.rowData)}
              >
                View all
              </Button>
            </Grid>
          );
        },
      },
    },
    {
      name: "team",
      label: t("teamLabel"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid container item alignItems={"center"}>
              <Grid item>
                <Typography>{value}</Typography>
              </Grid>
            </Grid>
          );
        },
      },
    },
  ];
}

export default tableColumns;
