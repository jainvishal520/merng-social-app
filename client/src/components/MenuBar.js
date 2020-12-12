import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/AuthContext";
const MenuBar = () => {
  const { logout: contextLogout, user } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, params) => {
    console.log(params); // {name: "login", active: false, onClick: ƒ}
    setActiveItem(params.name);
  };
  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} to="/" as={Link} active />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={contextLogout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        to="/"
        as={Link}
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          to="/login"
          as={Link}
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          to="/register"
          as={Link}
        />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
};

export default MenuBar;
