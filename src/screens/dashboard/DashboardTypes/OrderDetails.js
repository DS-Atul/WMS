import React, { useState } from "react";
import HeaderCard from "../../../components/dashboardComponents/card/HeaderCard";
// import useWindowDimensions from "../ScreenSize";
import useWindowDimensions from "../ScreenSize";
import { MdDashboard } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
// import "bootstrap/dist/css/bootstrap.css";
import "./Client.scss";
import "./OrderDetail.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { SpaOutlined } from "@mui/icons-material";

const OrderDetails = () => {
  const [width, height] = useState();
  return (
    <>
      <div style={{ width: width, margin: "20px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            margin: "inherit",
          }}
        >
          Outgoing Orders
        </div>
        <Col lg={12}>
          <Row style={{ display: "flex" }}>
            {" "}
            <Col lg={4}>
              <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">OUTGOING ORDERS</h6>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#0078AA",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon2" style={{ color: "#0078AA" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">DELIVERED ORDERS</h6>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#54B435",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon3" style={{ color: "#54B435" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-0.5">PENDING ORDERS</h6>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#E64848",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon4" style={{ color: "#E64848" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </div>

      <div style={{ width: width, margin: "20px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            margin: "inherit",
          }}
        >
          Incoming Orders
        </div>
        <Col lg={12}>
          <Row style={{ display: "flex" }}>
            {" "}
            <Col lg={4}>
              <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">INCOMING ORDERS</h6>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#0078AA",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon2" style={{ color: "#0078AA" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-2">DELIVERED ORDERS</h6>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#54B435",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon3" style={{ color: "#54B435" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                className="mini-stats-wid"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <h6 className="text-muted mb-0.5">PENDING ORDERS</h6>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#E64848",
                        }}
                      >
                        More Info{" "}
                        <span>
                          {" "}
                          <IoMdInformationCircleOutline />
                        </span>{" "}
                      </p>
                    </div>

                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="icon4" style={{ color: "#E64848" }}>
                          <MdDashboard />{" "}
                        </i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </div>

      <div style={{ width: width, margin: "10px", display:"flex", flexWrap: "wrap" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            margin: "inherit",
          }}
        >
          Cold Chain Orders
          <span
            style={{ display: "flex", position: "relative", left: "10rem" }}
          >
            Delay Orders
          </span>
        </div>
        <Row>
          <Col lg={4}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              INCOMING ORDERS{" "}
                              <i className="icon4" style={{ color: "#59CE8F" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#7DB9B6",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              OUTGOING ORDERS{" "}
                              <i className="icon4" style={{ color: "#66BFBF" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#609966",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={8}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <Row>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-1">
                            <h6 className="text-muted mb-0.1">
                              INCOMING ORDERS{" "}
                              <i className="icon4" style={{ color: "#59CE8F" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              OUTGOING ORDERS{" "}
                              <i className="icon4" style={{ color: "#66BFBF" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              INCOMING ORDERS{" "}
                              <i className="icon4" style={{ color: "#59CE8F" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              OUTGOING ORDERS{" "}
                              <i className="icon4" style={{ color: "#66BFBF" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#181823",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    
      <div style={{ width: width, margin: "20px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "Georgia",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            marginTop: "-20px",
          }}
        >
          Manifest Orders
        </div>
        <Row>
          <Col lg={6}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <CardTitle
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Incoming Orders
                </CardTitle>
                <Row>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              RECEIVED{" "}
                              <i className="icon4" style={{ color: "#5FD068" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#A7727D",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              NOT RECEIVED{" "}
                              <i className="icon4" style={{ color: "#E64848" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#609966",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={6}>
            <Card style={{ background: "transparent", boxShadow: "none" }}>
              <CardBody>
                <CardTitle
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Outgoing Orders
                </CardTitle>
                <Row>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-1">
                            <h6 className="text-muted mb-0.1">
                              RECEIVED{" "}
                              <i className="icon4" style={{ color: "#5FD068" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#A7727D",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card
                      className="mini-stats-wid"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <CardBody>
                        <div className="d-flex flex-wrap">
                          <div className="me-3">
                            <h6 className="text-muted mb-0.2">
                              NOT RECEIVED{" "}
                              <i className="icon4" style={{ color: "#E64848" }}>
                                <MdDashboard />{" "}
                              </i>
                            </h6>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#F99417",
                              }}
                            >
                              More Info{" "}
                              <span>
                                {" "}
                                <IoMdInformationCircleOutline />
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetails;
