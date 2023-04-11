import React, { useState } from "react";
import HeaderCard from "../../../components/dashboardComponents/card/HeaderCard";
import useWindowDimensions from "../ScreenSize";
import { FaTruck } from "react-icons/fa";
import { IoMdTrain } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import "bootstrap/dist/css/bootstrap.css";
import BarChart from "../../../components/dashboardComponents/Charts/BarChart";
import DonutChart from "../../../components/dashboardComponents/Charts/DonutChart";
import PieChart from "../../../components/dashboardComponents/Charts/PieChart";
import { Card } from "react-bootstrap";
import VerticalBarChart from "../../../components/dashboardComponents/Charts/VerticalBarChart";
import SpineAreaChart from "../../../components/dashboardComponents/Charts/SpineAreaChart";
import LineColumnArea from "../../../components/dashboardComponents/Charts/LineColumnArea";
import { CardBody, CardTitle, Col, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const CheckerDashboard = () => {
  const navigate = useNavigate();
  // To get Screen Size
  const { height, width } = useWindowDimensions();

  // FOr Donut Chart
  const series = [20, 30, 30, 10, 10];
  const labels = ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"];
  const colors = ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"];

  // used for bar chart
  const seriesData = [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365, 100];
  const categories = [
    "South Korea",
    "Canada",
    "United Kingdom",
    "Netherlands",
    "Italy",
    "France",
    "Japan",
    "United States",
    "China",
    "Germany",
    "USA",
  ];
  const color = " rgb(136 , 132,216)";

  //  Spine Area Chart
  const seriesData1 = [
    { data: [30, 40, 35, 50, 49, 60, 70] },
    { data: [20, 35, 40, 60, 58, 70, 80] },
  ];

  const optionsData = {
    stroke: { curve: "smooth", width: 3 },
    colors: ["#556ee6", "#34c38f"],
    tooltip: { x: { format: "dd/MM/yy HH:mm" } },
  };

  let list1 = ["1", "2", "3", "4", "5", "6"];

  return (
    <>
      {/* For HeaderCard */}

      <Row style={{ display: "flex" }}>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#54B435",
            }}
          >
            <CardBody>
              <Link
                to={{
                  pathname: `/master/commodities/addcommodity`,
                }}
                state={{ commodity: "P 24Hr", type:"Commodity"}}
              >
                <div className="d-flex flex-wrap">
                  <div className="me-1">
                    <h5
                      className
                      style={{
                        color: "white",
                        fontFamily: "sans-serif",
                        fontSize: "21px",
                      }}
                    >
                      {" "}
                      Generated
                    </h5>
                  </div>

                  <div className="avatar-sm ms-auto"></div>
                </div>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#007580",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                    }}
                  >
                    Not Paid
                  </h5>
                </div>

                <div className="avatar-sm ms-auto"></div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#E28F83",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                    }}
                  >
                    In review
                  </h5>
                </div>

                <div className="avatar-sm ms-auto"></div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#F94C66",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                    }}
                  >
                    Disputed
                  </h5>
                </div>

                <div className="avatar-sm ms-auto"></div>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
      </Row>

      <div className="wrapper">
        <div className="table1">
          <div class="row1 header green">
            <div class="cell">Serial Number</div>
            <div class="cell">Application Model</div>
            <div class="cell">Added Name</div>
            <div class="cell">Status</div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              1
            </div>
            <div class="cell" data-title="Unit Price">
              800
            </div>
            <div class="cell" data-title="Quantity">
              Rahul
            </div>
            <div class="cell" s data-title="Date Sold">
              Pending
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              2
            </div>
            <div class="cell" data-title="Unit Price">
              45
            </div>
            <div class="cell" data-title="Quantity">
              Rahul
            </div>
            <div class="cell" data-title="Date Sold">
              Fullfilled
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              1
            </div>
            <div class="cell" data-title="Unit Price">
              1000
            </div>
            <div class="cell" data-title="Quantity">
              Rahul
            </div>
            <div class="cell" data-title="Date Sold">
              Active
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              4
            </div>
            <div class="cell" data-title="Unit Price">
              60
            </div>
            <div class="cell" data-title="Quantity">
              Rahul
            </div>
            <div class="cell" data-title="Date Sold">
              Pending
            </div>
          </div>
        </div>
      </div>

      {/* For table */}
      {/* <div>
        <DashboardTable title={DashboardDataTitle} data={list1} />
      </div> */}

      {/* for Charts */}

      {/*Line ColumnArea Chart */}

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="mb-4">

              </CardTitle>
              <Row className="justify-content-center">
                <Col sm={4}>
                  <div className="text-center">
                    <h5 className="mb-0 font-size-20">86541</h5>
                    <p className="text-muted">Activated</p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="text-center">
                    <h5 className="mb-0 font-size-20">2541</h5>
                    <p className="text-muted">Pending</p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="text-center">
                    <h5 className="mb-0 font-size-20">102030</h5>
                    <p className="text-muted">Deactivated</p>
                  </div>
                </Col>
              </Row>
              <LineColumnArea />
            </CardBody>
          </Card>
        </Col>

      </Row>

      {/* Pie Chart */}

      {/* Horizontal Chart */}

      {/* Vertical Chart */}



      {/* Spine Area Chart */}
    </>
  );
};

export default CheckerDashboard;
