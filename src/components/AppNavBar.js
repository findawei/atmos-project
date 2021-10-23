import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink, withRouter } from "react-router-dom";
import Routes from "../Routes";

const AppNavbar = (props) => {
  const drawerWidth = 240;

  const activeRoute = (routeName) => {
    return props.location.pathname === routeName ? true : false;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <List>
          {Routes.map((prop, key) => {
            return (
              <NavLink
                to={prop.path}
                style={{ textDecoration: "none" }}
                key={key}
              >
                <ListItem button selected={activeRoute(prop.path)}>
                  <ListItemText primary={prop.sidebarName} />
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};
export default withRouter(AppNavbar);
