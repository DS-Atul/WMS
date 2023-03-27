import React, { useState, useEffect ,useLayoutEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaExpandArrowsAlt, FaCrosshairs } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import { setUserDepartment } from "../../store/authentication/Authentication";
import useWindowDimensions from "./ScreenSize";

import DashboardChartSection from "./DashboardChartSection";
import ClientDashboard from "./DashboardTypes/ClientDashboard";
import CheckerDashboard from "./DashboardTypes/CheckerDashboard";
import DashboardNotificationSection from "./DashboardNotificationSection";
import NSearchInput from "../../components/formComponent/nsearchInput/NSearchInput";
import VmsDashboard from "./DashboardTypes/VmsDashboard";
import TripDashboard from "./DashboardTypes/TripDashboard";
import BillingDashboard from "./DashboardTypes/BillingDashboard";
import TrackingOrderDash from "./TrackingOrderDash";
import {setSearchDocket} from "../../store/orderTracking/OrderTracking";

const Dashboard = () => {
  const navigate = useNavigate();

  // Redux State
  const accessToken = useSelector((state) => state.authentication.access_token);
  const dispatch = useDispatch();

  //Department
  const department = useSelector((state) => state.authentication.userdetails);
  const [dep_id, setdep_id] = useState("");


  const search_order = useSelector((state) => state.OrderTracking.search_docket);
  const getdepartment = () => {
    axios
      .get(ServerAddress + "ems/get_department_info/?dep_id=" + dep_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        dispatch(setUserDepartment(response.data[0]));
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  useEffect(() => {
    getdepartment();
  }, [dep_id]);

  useEffect(() => {
    let dep_id = String(department.priority - 1).padStart(2, "0");
    if (dep_id === "00") {
      setdep_id("01");
    } else {
      setdep_id(dep_id);
    }
  }, [department]);

  // To get Screen Size
  const {  width } = useWindowDimensions();

  // for dashborad type
  const [dashboard_type, setdashboard_type] = useState("Home");
  const [dashboard_type_list] = useState([
    "Home",
    "Client",
    "Maker-Checker",
    "VMS",
    "TRIP",
    "BILLING",
    "OERATIONAL",
  ]);


  useLayoutEffect(() => {
   dispatch(setSearchDocket(false));
  }, [])
  return (
    <>
      {/* <div>
      width: {width} ~ height: {height}
    </div> */}
 {/* {search_order ? 
 <TrackingOrderDash/>

: */}
<div
        style={{
          display: "flex",
          Width: width,
          // background: "F9F9F9",
          //   margin: "2px",
          //   border: "2px solid black",
          flexDirection: width > 800 ? "row" : "column",
        }}
      >
        {/* For Chart */}
        <div
          className="custom-scrollbars__content"
          style={{
            // background: "white",
            padding: "10px",
            flex: "0.7",
            overflowY: "scroll",
            maxHeight: "83vh",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/dashboard/DashboardTypes/OrderDetails");
              }}
            >
              <FaExpandArrowsAlt />
            </div>
            {/* <div style={{ cursor: "pointer", display:"flex",position:"absolute",right:"540px", top:"80px" }} onClick={() => {
              navigate("/DashboardTypes/BranchDailyDetails")
            }}><FaCrosshairs/></div> */}
            <div className="responsive-div">
              <div
                className="responsive-child"
                onClick={() => {
                  navigate("/DashboardTypes/BranchDailyDetails");
                }}
              >
                <FaCrosshairs />
              </div>
            </div>
            <div>
              <NSearchInput
                data_list={dashboard_type_list}
                data_item_s={dashboard_type}
                set_data_item_s={setdashboard_type}
                current_width={"120px"}
                show_search={false}
              />
            </div>
          </div>

          {dashboard_type === "Home" ? (
            <>
              <DashboardChartSection />
            </>
          ) : null}

          {dashboard_type === "Client" ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Georgia",
                  display: "flex",
                  postion: "relative",
                  padding: "inherit",
                }}
              >
                Client Dashboard
              </div>
              <ClientDashboard />
            </>
          ) : null}

          {dashboard_type === "Maker-Checker" ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Georgia",
                  display: "flex",
                  postion: "relative",
                  padding: "inherit",
                }}
              >
                Maker-Checker Dashboard
              </div>
              <CheckerDashboard />
            </>
          ) : null}

          {dashboard_type === "VMS" ? (
            <>
              <div>Vms Dashboard</div>
              <VmsDashboard />
            </>
          ) : null}

          {dashboard_type === "TRIP" ? (
            <>
              <div>Trip Dashboard</div>
              <TripDashboard />
            </>
          ) : null}

          {dashboard_type === "BILLING" ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Georgia",
                  display: "flex",
                  postion: "relative",
                  padding: "inherit",
                }}
              >
                Billing Dashboard
              </div>
              <BillingDashboard />
            </>
          ) : null}
        </div>

        {/* For Notification */}
        <div
          style={{
            // background: "#dee3e0",
            padding: "",
            // margin: "2px",
            flex: "0.3",
            Height: "83vh",
            border: "2px solid white",
          }}
        >
          <DashboardNotificationSection />
        </div>
      </div>
{/* } */}

      
    </>
  );
};

export default Dashboard;
