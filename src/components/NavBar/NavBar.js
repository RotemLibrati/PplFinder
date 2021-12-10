import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { HashRouter as Router, Link } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
      <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Navigation"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Home" index={0} component={Link} to="/"/>
          <Tab label="Favorites" index={1} component={Link} to="/fav" />
        </Tabs>
      </AppBar>
  );
};

export default NavBar;
