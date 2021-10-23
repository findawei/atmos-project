import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
// import { setCurrentItem } from "../flux/actions/itemActions";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Modal from "@mui/material/Modal";
import CardHeader from "@mui/material/CardHeader";
import { getCombinations } from "../flux/actions/combinationAction";
import {
  savedHomePlans,
  setCurrentHomePlan,
} from "../flux/actions/homeplanActions";
import Lot from "./Lot";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const HomePlan = ({
  lot,
  homeplan,
  combination,
  setCurrentHomePlan,
  currentHomePlan,
  savedHomePlans,
}) => {
  const [open, setOpen] = React.useState(false);
  const [favorite, setFavorite] = React.useState("");
  const [saveButton, setSaveButton] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setCurrent = (homeplan) => {
    setCurrentHomePlan(homeplan);
  };

  function HomePlanView() {
    setCurrent(homeplan);
  }

  useEffect(() => {
    if (saveButton) {
      savedHomePlans(homeplan);
    } else {
      // unsaveHomePlan(homeplan)
    }
  }, [saveButton]);

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

  let compatibleLots;
  if (currentHomePlan && combination) {
    const compatibleLotIDs = combination.combinations.filter(
      (combo) => combo.homePlanId === currentHomePlan.homePlanId
    );

    compatibleLots = lot.lots.filter((o1) =>
      compatibleLotIDs.some((o2) => o1.lotId === o2.lotId)
    );
  }

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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
        >
          {currentHomePlan && currentHomePlan.name}
        </Typography>
        <Typography gutterBottom textAlign="center">
          Compatible Lots
        </Typography>
        <Grid container spacing={2}>
          {currentHomePlan &&
            compatibleLots.map((lot) => <Lot lot={lot} key={lot.lotId} />)}
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
      <Card className={classes.paper} onClick={HomePlanView}>
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
          <CardMedia
            className={classes.media}
            image={homeplan && homeplan.image}
          ></CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6">
              {homeplan && homeplan.name}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {homeplan && homeplan.numBeds} beds -{" "}
              {homeplan && homeplan.numBaths}{" "}
              {homeplan && homeplan.numBaths === 1 ? "bath" : "baths"} -{" "}
              {homeplan && homeplan.sqft} sqft
            </Typography>
            <Stack direction="row" spacing={1} padding={1}>
              {homeplan &&
                homeplan.tags &&
                homeplan.tags.map((tag) => (
                  <Chip label={tag} variant="outlined" />
                ))}
            </Stack>
            <Typography gutterTop>
              {homeplan && homeplan.description}
            </Typography>
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
  currentHomePlan: state.homeplan.currentHomePlan,
  lot: state.lot,
});

export default connect(mapStateToProps, { setCurrentHomePlan, savedHomePlans })(
  HomePlan
);
