import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Tracking.css";
import { ImSearch } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { FaBitbucket, FaPeopleCarry } from "react-icons/fa";
import { FaBox, FaRoute } from "react-icons/fa";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const TrackingOrder = () => {
  const [order_id, setorder_id] = useState("");
  const [search, setsearch] = useState(false);
  const [next, setnext] = useState(false);
  const [refresh, setrefresh] = useState(false);

  // _________
  const [get_orders, setget_orders] = useState([]);
  const [get_status, setget_status] = useState([]);

  const get_order_data = () => {
    axios
      .get(
        ServerAddress + "booking/get_order_status/?awb_no=" + order_id,
       
      )
      .then((response) => {
        console.log("Tracking response data", response.data);
        const docket_info = response.data[0];
        const last = docket_info[docket_info.length - 1];
setget_status(last);
        if (response.data[0].length > 0) {
          let last_ele = response.data;
          let last_data_s = last_ele.map((item) => item.push(false));
          setget_orders(response.data);

          setsearch(true);
        } else {
          alert("Docket Not Found");
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  return (
    <>
      <div className="background">
        <nav className="nav1">
        <Link className="nav_link" to="/signin">
            Login
          </Link>

          <a className="nav_link" href="https://www.etechcube.com/" target="_blank">
            Website
          </a>
        </nav>
        <div className="main">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (order_id == "") {
                  alert("Please Enter a valid Docket Number");
                }
                get_order_data();
                return false;
              }}
            >
              <div className="search">
                <input
                  type="text"
                  name="Search"
                  className="input1"
                  placeholder=" Enter Docket Number"
                  onChange={(val) => {
                    setorder_id(val.target.value);
                  }}
                  value={order_id}
                />{" "}
                <button className="search_btn" type="submit">
                  <i>
                    {" "}
                    <ImSearch />
                  </i>
                </button>
              </div>
            </form>
          </div>

          <div>
            {get_orders.map((item, index) => {

              const last_ele = item[item.length - 2];
              console.log("222222222222222",last_ele)
              console.log("item", item);

              return (
                <div key={index}>
                  {console.log("------", item)}

                  {search ? (
                    <div
                      className="container"
                      style={{ paddingBottom: "20px" }}
                    >
                      {/* <div className="t-card " style={{ borderRadius: "19px" , background:"green"}}> */}
                      <div
                        className="t-card-body t-card"
                        style={{ borderRadius: "10px" }}
                      >
                        <h5
                          style={{
                            fontSize: "21px",
                            borderRadius: "10px",
                            borderRadius: "10px 10px 0 0",
                            textAlign:"left",
                          }}
                          className="card-title header"
                        >
                          Tracking
                        </h5>
                        <div className="card-text" style={{ margin: "5px" }}>
                          <b style={{ fontSize: "15px" }}>Docket Number:</b>{" "}
                          {last_ele.docket_no}
                        </div>
                        <div
                          // className="row"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "20px",
                          }}
                        >
                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Origin:
                            </strong>
                            <br />
                            {toTitleCase(last_ele.orgin_locality)}{","} {toTitleCase(last_ele.orgin_city)}{","} {toTitleCase(last_ele.orgin_pincode)}
                          </div>

                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Destination:
                            </strong>{" "}
                            <br />
                            {toTitleCase(last_ele.destination_locality)}{" ,"} {toTitleCase(last_ele.destination_city)}{" , "} {toTitleCase(last_ele.destination_pincode)}
                            {/* {item[0].order_detail[0].consignee_city__city}{" "} */}
                          </div>

                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Status:
                            </strong>
                            <br />
                            {toTitleCase(last_ele.status)}
                          </div>

                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Current Location:
                            </strong>{" "}
                            <br />
                            {
                              toTitleCase(last_ele.current_locality)
                            }
                            {","}
                            {
                              toTitleCase(last_ele.current_city)
                            }{","} {
                              last_ele.current_pincode
                            }
                          </div>
                        </div>
                        <div style={{ padding: "15px" }}>
                          <div className="track">
                            {last_ele.status ===
                            "SHIPMENT ORDER RECEIVED" ? (
                              <>
                                {" "}
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    {/* <i className="fa fa-warehouse"></i>{" "} */}
                                    <FaRoute />
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                            "SHIPMENT PICKED UP" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse"></i>{" "}
                                    <FaRoute />
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                            "SHIPMENT ARRIVED AT HUB" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse">
                                      {" "}
                                      <FaRoute />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                            "SHIPMENT IN TRANSIT" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <FaRoute />
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status === "SHIPMENT ARRIVED AT DESTINATION HUB"
                             ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    {/* <i className="fas fa-route"></i> */}
                                     <FaRoute />{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                            "SHIPMENT OUT FOR DELIVERY" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i class="fas fa-route"></i> <FaRoute />{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step active ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                            "DELIVERED" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse"></i>{" "}
                                    <i className="fas fa-route"></i>
                                  </span>{" "}
                                  <span className="text">
                                    Shipment Arrived At Destination
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <button
                          className="more_btn"
                          onClick={() => {
                            let last = item[item.length - 1];
                            console.log("last", last);
                            // setnext(true);
                            item[item.length - 1] = true;
                            setrefresh(!refresh);
                          }}
                          type="button"
                        >
                          More Details{" "}
                        </button>
                      </div>
                      {/* </div> */}
                    </div>
                  ) : null}

                  {item[item.length - 1] == true ? (
                    <div
                      className="t-card"
                      style={{ width: "100%", borderRadius: "10px" }}
                    >
                      <div
                        className="t-card-body"
                        style={{ borderRadius: "10px" }}
                      >
                        <h5
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px",
                            fontSize: "21px",
                            borderRadius: "10px 10px 0 0",
                          }}
                          className="card-title header"
                        >
                          Tracking / History
                          <div
                            onClick={() => {
                              // setnext(false);
                              item[item.length - 1] = false;
                              setrefresh(!refresh);
                            }}
                            key={index}
                          >
                            {" "}
                            <ImCross style={{ fontSize: "15px" }} />
                          </div>
                        </h5>
                        <div className="card-text" style={{ margin: "5px" }}>
                          <strong>Docket No. :</strong>{" "}
                          {/* {item[0].order_detail[0].awb_no} */}
                          {last_ele.docket_no}
                        </div>
                        <div>
                          <table
                            className="table table-bordered"
                            style={{
                              width: "100%",
                              textAlign: "center",
                              // whiteSpace: "nowrap"
                            }}
                          >
                            <thead>
                              <tr>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.length == 0 ? (
                                <tr>
                                  <td>No Data Found</td>
                                </tr>
                              ) : (
                                item.map((item1, index) => {
                                  console.log(
                                    item.length,
                                    index,
                                    item.length - 1 != index
                                  );
                                  if (item.length - 1 != index) {
                                    console.log(
                                      "not last entry",
                                      item1.updated_at
                                    );
                                    let update_date = String(
                                      item1.created_at
                                    ).split("T");
                                    let d_update_date = String(
                                      update_date[0]
                                    ).substring(0, 10);
                                    let update_time = String(
                                      update_date[1]
                                    ).substring(16, 25);

                                    console.log("Date", d_update_date);
                                    // let update_date1  = update_date.
                                    return (
                                      <tr key={index}>
                                        <td>{item1.status}</td>
                                        <td>{d_update_date}</td>
                                        <td>{update_time}</td>
                                        <td>
                                          {item1.state}
                                          {/* {" ,  "} */}
                                          {item1.current_city} 
                                          {/* {" ,  "} */}
                                          {item1.pincode}
                                        </td>
                                      </tr>
                                    );
                                  }
                                })
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: "410px", padding: "10px", color: "white" }}>
          <strong>Copyright © 2022.</strong> All rights reserved.
        </div>
      </div>
    </>
  );
};
export default TrackingOrder;
