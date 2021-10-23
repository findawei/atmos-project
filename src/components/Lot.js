import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "@mui/material/Modal";
import CardHeader from "@mui/material/CardHeader";
import { setCurrentLot } from "../flux/actions/lotActions";
import HomePlan from "./HomePlan";

const Lot = ({ lot, homeplan, combination, setCurrentLot, currentLot }) => {
  const [open, setOpen] = React.useState(false);
  const [favorite, setFavorite] = React.useState("");
  const [saveButton, setSaveButton] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setCurrent = (lot) => {
    setCurrentLot(lot);
  };

  function LotView() {
    setCurrent(lot);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // margin: 3
    },
    media: {
      height: 180,
    },
    link: {
      color: "black",
      "&:hover": {
        color: "#000000",
        textDecoration: "none",
      },
    },
  }));
  const classes = useStyles();

  var formattedString = lot.address.split(",");

  const compatibleHomePlanIDs = combination.combinations.filter(
    (combo) => combo.lotId === currentLot.lotId
  );

  const compatibleHomePlans = homeplan.homeplans.filter((o1) =>
    compatibleHomePlanIDs.some((o2) => o1.homePlanId === o2.homePlanId)
  );

  const modalBody = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography gutterBottom variant="h6" textAlign="center">
          {formattedString[0]}
        </Typography>
        <Typography gutterBottom textAlign="center">
          Compatible Home Plans
        </Typography>
        <Grid container spacing={2}>
          {compatibleHomePlans.map((homeplan) => (
            <HomePlan homeplan={homeplan} key={homeplan.HomePlanId} />
          ))}
        </Grid>
      </Box>
    </Modal>
  );

  return (
    <Grid
      item
      xs={12}
      sm={6}
      lg={4}
      // onClick={ItemView}
    >
      <Card className={classes.paper} onClick={LotView}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                setSaveButton(!saveButton);
              }}
            >
              <FavoriteIcon color={saveButton ? "error" : ""} />
            </IconButton>
          }
        />
        <CardActionArea onClick={handleOpen}>
          <CardMedia className={classes.media} image={lot.image}></CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6">
              {formattedString[0]}
            </Typography>
            <Typography gutterBottom variant="subtitle">
              {formattedString[1]}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {lot.acres.toFixed(2)} acres -{" "}
              {(lot.acres * 43560).toLocaleString("en-US")} sqft
            </Typography>
            <Typography>{lot.description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  combination: state.combination,
  currentLot: state.lot.currentLot,
  homeplan: state.homeplan,
});

export default connect(mapStateToProps, { setCurrentLot })(Lot);
