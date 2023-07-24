import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ThemeContextProvider } from "../../context/ThemeContext";
import theme_main from "../../Theme";
import styles from "./navbar.module.css";
import hamberMenuDark from "../../assets/images/hamberMenu_dark.svg";
import hamberMenuLight from "../../assets/images/hamberMenu_light.svg";
import closeDark from "../../assets/images/close_dark.svg";
import closeLight from "../../assets/images/close_light.svg";
import basketLight from "../../assets/images/basket_light.svg";
import basketDark from "../../assets/images/basket_dark.svg";
import { CartContextProvider } from "../../context/CartContext";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundColor: "#001e3c",
        borderRadius: "50%",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#fff",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#001e3c"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Navbar = () => {
  const { mode, setMode } = useContext(ThemeContextProvider);
  const [openMenu, setOpenMenu] = useState(false);
  const { state } = useContext(CartContextProvider);

  return (
    <div
      className={styles.nav}
      style={{
        background: theme_main[mode].secondary,
        // border:'1px solid grey',
        boxShadow: `0 0 10px 0 ${mode === "light" ? "#1A1A1A" : "#454545"}`,
      }}
    >
      <div className={styles.nav_container}>
        <div className={styles.logo_items_nav}>
          <img
            src={mode === "dark" ? hamberMenuLight : hamberMenuDark}
            alt="menu"
            onClick={() => setOpenMenu(true)}
          />
          <Link to={"/products"}>
            <h1 style={{ color: theme_main[mode].primary }}>Logo.</h1>
          </Link>
          <div className={styles.items_navbar}>
            <NavLink
              to="/products"
              style={({ isActive }) => {
                return {
                  borderBottom:
                    isActive && `2px solid ${theme_main[mode].primary}`,
                  color: theme_main[mode].primary,
                };
              }}
            >
              Products
            </NavLink>
          </div>
        </div>
        <div className={styles.basket_theme}>
          <div className={styles.theme}>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              // label={`${mode} mode`}
            />
          </div>
          <div className={styles.basket}>
            <Link to={"/cart"} onClick={() => setOpenMenu(false)}>
              <img
                src={mode === "dark" ? basketLight : basketDark}
                alt="basket-iamge"
              />

              <span
                style={{
                  color: theme_main[mode].secondary,
                  background: theme_main[mode].primary,
                }}
              >
                {state.totalCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${styles.menu} ${
          openMenu ? styles.openMenu : styles.closeMenu
        }`}
        style={{
          background: theme_main[mode].secondary,
          boxShadow: `0 0 10px 0 ${mode === "light" ? "#1A1A1A" : "#454545"}`,
        }}
      >
        <div className={styles.exit_theme_menu}>
          <img
            src={mode === "dark" ? closeLight : closeDark}
            alt="close"
            onClick={() => setOpenMenu(false)}
          />
          {/* <div className={styles.basket_menu}>
            <Link to={"/cart"} onClick={() => setOpenMenu(false)}>
              <img
                src={mode === "dark" ? basketLight : basketDark}
                alt="basket-iamge"
              />
            </Link>
            <span>0</span>
          </div> */}
          <div>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              // label={`${mode} mode`}
            />
          </div>
        </div>
        <ul>
          <li>
            <NavLink
              to="/products"
              onClick={() => setOpenMenu(false)}
              style={({ isActive }) => {
                return {
                  borderBottom:
                    isActive && `2px solid ${theme_main[mode].primary}`,
                  color: theme_main[mode].primary,
                };
              }}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
