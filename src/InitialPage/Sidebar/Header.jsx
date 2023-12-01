import React, { useEffect, useRef, useState } from "react";
import {
  Logo,
  SmallLogo,
  Closes,
  HeaderSearch,
  Flag,
  FlagUS,
  FlagES,
  FlagDE,
  Notification,
  Avatar2,
  Avatar3,
  Avatar6,
  Avatar17,
  Avatar13,
  Avatar,
  Logout,
  LogoWhite,
  Avatar1,
} from "../../EntryFile/imagePath";
import { Link, useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import TimeClock from "../../MainPage/DateTime/Clock";
import TimeDate from "../../MainPage/DateTime/Date";

const Header = (props) => {
  const history = useHistory();
  const [searchBar, SetSearchBar] = useState(false);
  const [toggle, SetToggle] = useState(false);

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
    SetToggle((current) => !current);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const sidebarOverlay = () => {
    document.querySelector(".main-wrapper").classList.toggle("slide-nav");
    document.querySelector(".sidebar-overlay").classList.toggle("opened");
    document.querySelector("html").classList.toggle("menu-opened");
  };

  let pathname = location.pathname;

  const handleLogoutClicked = () => {
    window.localStorage.removeItem('token');
    history.push("/signIn");
  }

  return (
    <>
      <div className="header">
        {/* Logo */}
        {/* Header Menu */}
        
        <div className="d-flex justify-content-between">
        <div
          className={`header-left ${toggle ? "" : "active"}`}
          onMouseLeave={expandMenu}
          onMouseOver={expandMenuOpen}
        >
          <Link to="/dream-pos/product/productlist-product" className="logo logo-normal">
            <img src={Logo} alt="" />
          </Link>
          <Link to="/dream-pos/product/productlist-product" className="logo logo-white">
            <img src={LogoWhite} alt="" />
          </Link>
          <Link to="/dream-pos/product/productlist-product" className="logo-small">
            <img src={SmallLogo} alt="" />
          </Link>
          <Link
            id="toggle_btn"
            to="#"
          >
          </Link>
       
        {/* /Logo */}
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#"
          onClick={sidebarOverlay}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        </div>
        <div className="nav-item has-arrow nav-item-box user-menu align-self-center">
          <p><TimeClock /></p>
        </div>
        <ul className="justify-content-between nav user-menu">
          <li className="nav-item-box align-self-center me-3">
            <p><TimeDate /></p>
          </li>
          <li className="d-flex align-items-center nav-item dropdown has-arrow flag-nav nav-item-boxb">
            <div className="nav-item dropdown has-arrow flag-nav nav-item-boxb d-flex justify-content-end">
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
              >
                <FeatherIcon icon="globe" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link to="#" className="dropdown-item active">
                  <img src={FlagUS} alt="" height={16} /> English
                </Link>
                <Link to="#" className="dropdown-item">
                  <img src={FlagES} alt="" height={16} /> Spanish
                </Link>
                <Link to="#" className="dropdown-item">
                  <img src={FlagDE} alt="" height={16} /> German
                </Link>
              </div>
            </div>
            <div className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link userset"
                data-bs-toggle="dropdown"
              >
                <span className="user-info">
                  <span className="user-letter">
                    <img src={Avatar1} alt="" className="img-fluid" />
                  </span>
                  <span className="user-detail">
                    <span className="user-name">Edward Chee</span>
                    <span className="user-role">Super Admin</span>
                  </span>
                </span>
              </Link>
              <div className="dropdown-menu menu-drop-user">
                <div className="profilename">
                  <div className="profileset">
                    <span className="user-img">
                      <img src={Avatar1} alt="" />
                      <span className="status online" />
                    </span>
                    <div className="profilesets">
                      <h6>Edward Chee</h6>
                      <h5>Super Admin</h5>
                    </div>
                  </div>
                  <hr className="m-0" />
                  <Link
                    className="dropdown-item"
                    to="/dream-pos/profile/user-profile"
                  >
                    <i className="me-2" data-feather="user" /> My Profile
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/dream-pos/settings/generalsettings"
                  >
                    <i className="me-2" data-feather="settings" />
                    Settings
                  </Link>
                  <hr className="m-0" />
                  <button className="dropdown-item logout pb-0" onClick={handleLogoutClicked}>
                    <img src={Logout} className="me-2" alt="img" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        </div>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="profile.html">
              My Profile
            </Link>
            <Link className="dropdown-item" to="generalsettings.html">
              Settings
            </Link>
            <Link className="dropdown-item" to="signin.html">
              Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </>
  );
};

export default Header;

