import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setNavToggle } from "../../store/dataList/DataList";

const Layout = () => {
  const dispatch = useDispatch();
  const nav_toggle = useSelector((state) => state.datalist.nav_toggle);
  const [innerWidth, setinnerWidth] = useState();

  let wind_Width = window.innerWidth;
  useEffect(() => {
    setinnerWidth(wind_Width);
  }, [wind_Width]);

  useEffect(() => {
    dispatch(setNavToggle(false));
  }, []);

  const handleClk = () => {
    if (innerWidth < 1200) {
      dispatch(setNavToggle(true));
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "auto",
      }}
    >
      {!nav_toggle && (
        // <div className={innerWidth < 1200 ? "min_side_bar" : "side_bar"}>
        <div style={{ flex: "1" }}>
          <SideBar />
        </div>
      )}
      <div style={{ flex: "5" }}>
        <div
          style={{
            background: "#FFFFFF",
            height: "8%",
            display: "flex",
            justifyContent: "space-between",
            top: "0",
            zIndex: "1",
          }}
        >
          <Header />
        </div>
        <div
          id={nav_toggle ? "max_outlet" : "min_outlet"}
          style={{
            background: "",
            height: "84%",
            overflowX: "hidden",
            overflowY: "scroll",
            paddingTop: "6px",
            margin: "0px",
            // width: "100%",
          }}
          onClick={() => handleClk()}
        >
          <Outlet />
        </div>
        <div
          style={{
            background: "#FFFFFF",
            height: "8%",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Footer />
        </div>
      </div>
    </div>
    // <div>
    //   <div style={{width:"100%", background:"green"}}>A</div>
    //   <div style={{width:"100%", background:"red"}}>B</div>
    // </div>
  );
};

export default Layout;
