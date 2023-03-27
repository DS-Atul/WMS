import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
//i18n
// import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux";
import { withRouter, Link, useNavigate } from "react-router-dom";
import toTitleCase from "../../lib/titleCase/TitleCase";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "../../store/authentication/Authentication";
import { ServerAddress } from "../../constants/ServerAddress";
import axios from "axios";
import { setPermission } from "../../store/permissions/Permissions";
// users
// import user1 from "../../../assets/images/users/avatar-1.jpg"

const ProfileMenu = () => {
  // Declare a new state variable, which we'll call "menu"
  const accessTK = useSelector((state) => state.authentication.access_token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const userdetails = useSelector((state) => state.authentication.userdetails);

  const login_id = useSelector((state) => state.authentication.login_id);

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.displayName)
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.username)
  //     }
  //   }
  // }, [props.success])
  const send_logout_time = () => {
    if (login_id) {
      axios
        .post(
          ServerAddress + "ems/set_logout_time/",
          {
            login_id: login_id,
          },
          {
            headers: { Authorization: `Bearer ${accessTK}` },
          }
        )
        .then(function (response) {})
        .catch(function () {
          alert("Error Occur While Sending Logout Data");
        });
    }
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            // src={user1}
            alt="Header Avatar"
          /> */}
          <BiUserCircle style={{ fontSize: "1.5rem" }} />
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {" "}
            {toTitleCase(userdetails.username)}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {userdetails.branch_nm
              ? `( ${toTitleCase(userdetails.branch_nm)} )`
              : "(  )"}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/authentication/userProfile/Profile">
            {" "} */}
            <Link to="/authentication/userProfile/Profile"    className="dropdown-item"
>
            <i className="bx bx-user font-size-16 align-middle me-1" />
            "Profile
            </Link>
          {/* </DropdownItem> */}

          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            My Wallet
          </DropdownItem>

          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            Settings
          </DropdownItem>

          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            Lock screen
          </DropdownItem>

          <div className="dropdown-divider" />
          <Link
            to="/signin"
            className="dropdown-item"
            onMouseDown={() => {
              send_logout_time();
              dispatch(setUserDetails(null));
              dispatch(setAccessToken(""));
              dispatch(setRefreshToken(""));
              navigate("/");
              dispatch(setPermission(false));
            }}
          >
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

// ProfileMenu.propTypes = {
//   success: PropTypes.any,
//   t: PropTypes.any
// }

// const mapStatetoProps = state => {
//   const { error, success } = state.Profile
//   return { error, success }
// }

// export default withRouter(
//   connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
// )
export default ProfileMenu;
