import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Lot from "./Lot";

const LotPage = ({ lot }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 10,
      paddingTop: 10,
      paddingLeft: 240,
    },
  }));

  const classes = useStyles();

  const { lots } = lot;

  return (
    <div className={classes.root}>
      <Button variant={"outlined"}>Show Saved Lots</Button>
      <br />
      <br />
      <Grid container spacing={2}>
        {lots.map((lot) => (
          <Lot lot={lot} key={lot.lotId} />
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lot: state.lot,
  combination: state.combination,
  currentLot: state.lot.currentLot,
});

export default connect(mapStateToProps)(LotPage);
