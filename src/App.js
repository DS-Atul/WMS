import React, { useLayoutEffect, useState, useEffect } from "react";
import { auth_routes, routes } from "./routes";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
// Import scss
import "./assets/scss/theme.scss";

import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/layout";
import { withRouter, Link, useNavigate } from "react-router-dom";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "./store/authentication/Authentication";

const App = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authentication.userdetails);

  const setpermission = useSelector((state) => state.permissions.setpermission);
  const [s_route, sets_route] = useState(auth_routes);
  const dispatch = useDispatch();


  useLayoutEffect(() => {
    if (userData != null && setpermission === true) {
      sets_route(routes);
    } else {
      sets_route(auth_routes);
    }
  }, [userData, setpermission]);

  useEffect(() => {
    if (!setpermission) {
      dispatch(setUserDetails(null));
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      navigate("/");
    }
  }, [setpermission]);


  

  return (
    <>
      <Routes>
        {userData != null ? (
          <Route path="/" element={<Layout />}>
            {s_route.map((item, index) => {
              return (
                <Route path={item.path} element={item.element} key={index} />
              );
            })}
          </Route>
        ) : (
          <>
            {s_route.map((item, index) => {
              return (
                <Route path={item.path} element={item.element} key={index} />
              );
            })}
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
