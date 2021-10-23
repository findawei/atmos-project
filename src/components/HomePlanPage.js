import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import HomePlan from "./HomePlan";

const HomePlanPage = ({ homeplan }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 10,
      paddingTop: 10,
      paddingLeft: 240,
    },
  }));

  const classes = useStyles();
  const [savedHomePlans, setSavedHomePlans] = React.useState([]);
  const [showSaved, setShowSaved] = React.useState(false);

  let { homeplans } = homeplan;

  //Incomplete
  useEffect(() => {
    if (showSaved) {
      setSavedHomePlans(homeplan.homeplans_saved);
    }
  }, [showSaved]);

  useEffect(() => {
    if (showSaved && savedHomePlans) {
      homeplans = savedHomePlans;
    }
  }, [savedHomePlans, showSaved]);
  //

  return (
    <div className={classes.root}>
      <Button
        variant={"outlined"}
        onClick={() =>
          savedHomePlans.length > 0 ? setShowSaved(!showSaved) : ""
        }
      >
        {showSaved ? "Hide Saved Home Plans" : "Show Saved Home Plans"}
      </Button>
      <br />
      <br />
      <Grid container spacing={2}>
        {homeplans.map((homeplan) => (
          <HomePlan homeplan={homeplan} key={homeplan.HomePlanId} />
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeplan: state.homeplan,
  combination: state.combination,
  currentHomePlan: state.homeplan.currentHomePlan,
});

export default connect(mapStateToProps)(HomePlanPage);
