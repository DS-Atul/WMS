import React from "react";
import { Col, Row } from "reactstrap";
import BranchStatusCard from "../../../components/dashboardComponents/branchStatusCard/BranchStatusCard";
// import useWindowDimensions from "./ScreenSize";

const BranchDailyDetails = () => {
  return (
    <div style={{ margin: "10px" }}>
      <div style={{ display: "", justifyContent: "space-between", margin: "" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Georgia",
          }}
        >
          {" "}
          <h3>Daily Status(Last 24 hours)</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 0px 5px 0px",
            fontFamily: " Gill Sans Extrabold, sans-serif",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <div
            style={{
              background: "#D0C9C0",
              
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              flex: "2.5",
              padding: "10px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
            }}
          >
            Total Order
          </div>
          <div
            style={{
              background: "#E14D2A",
              
              color: "white",
              flex: "2.5",
              padding: "10px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Pending Order
          </div>
          <div
            style={{
              background: "#769bff",
              opacity: "0.8",
              color: "white",
              flex: "2.5",
              padding: "8px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Cold Chain
          </div>
          <div
            style={{
              background: "#73777B",
             
              color: "white",
              flex: "2.5",
              padding: "8px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Manifest Order
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            marginBottom: "9px",
          }}
        >
          <Col lg={12} md={12} sm={12}>
            <Row>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Andheri"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Ranchi"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                  
                    Unit={"0"}
                    Upper={"Bangalore"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Cochin"}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </div>

        <div
          style={{
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Col lg={12} md={12} sm={12}>
            <Row>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                  
                    Unit={"0"}
                    Upper={"Jaipur"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Jhodpur"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Bikaner"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                 
                    Unit={"0"}
                    Upper={"Sikar"}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </div>

        <div
          style={{
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Col lg={12} md={12} sm={12}>
            <Row>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                 
                    Unit={"0"}
                    Upper={"Pune"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                  
                    Unit={"0"}
                    Upper={"Allahabad"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                 
                    Unit={"0"}
                    Upper={"Mumbai"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Kerala"}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </div>

        <div
          style={{
            alignItems: "center",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          <Col lg={12} md={12} sm={12}>
            <Row>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Delhi"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                    
                    Unit={"0"}
                    Upper={"Chennai"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                  
                    Unit={"0"}
                    Upper={"Jamshedpur"}
                  />
                </div>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <div>
                  <BranchStatusCard
                   
                    Unit={"0"}
                    Upper={"Chandigarh"}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default BranchDailyDetails;
