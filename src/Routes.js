import React from "react";
import LotPage from "./components/LotPage";
import HomePlanPage from "./components/HomePlanPage";

const Routes = [
  {
    path: "/homes",
    sidebarName: "Home Plans",
    component: HomePlanPage,
  },
  {
    path: "/lots",
    sidebarName: "Lots",
    component: LotPage,
  },
];

export default Routes;
