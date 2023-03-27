import React from 'react';
import {Col,Card,CardTitle,CardBody} from "reactstrap";

const VendorCreatedHistory = () => {
  return (
    <>
    <Col lg={6} md={12} sm={12}>
      <div>
        <Card
          className="h_card"
        >
          <CardTitle>
            <div
              style={{
                display: "flex",
                paddingLeft: "16px",
                paddingTop: "8px",
                paddingBottom: "2px",
                color: "Black",
                fontSize: "18px",
                fontFamily: "arial, sans-serif",
              }}
            >
              <h5>Vendor Info</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Vendor Name </span> <span>Own</span>
              </div>
              <div className="container_element">
                <span>MSME Registered</span> <span>Jamshedpur</span>
              </div>
              <div className="container_element">
                <span>MSME Registered No.</span> <span>jsr@gmail.com</span>
              </div>
              <div className="container_element">
                <span>Vendor Email</span> <span>7878787878</span>
              </div>
              <div className="container_element">
                <span>Vendor Ph.No</span> <span>KJHG76J88U</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>

    <Col lg={6} md={12} sm={12}>
      <div>
        <Card
          className="h_card"
        >
          <CardTitle>
            <div
              style={{
                display: "flex",
                paddingLeft: "16px",
                paddingTop: "8px",
                paddingBottom: "2px",
                color: "Black",
                fontSize: "18px",
                fontFamily: "arial, sans-serif",
              }}
            >
              <h5>Vendor Servies </h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span> Company Type </span> <span>SOnari,Kunj Nagar</span>
              </div>
              <div className="container_element">
                <span>Line Of Business </span> <span>Jharkhand</span>
              </div>
              <div className="container_element">
                <span>Service Region</span> <span>Jamshedpur</span>
              </div>
              <div className="container_element">
                <span>Pin Code</span> <span>831011</span>
              </div>
              <div className="container_element">
                <span>Locality</span> <span>Sonari</span>
              </div>
              <div className="container_element">
                <span>Operating City</span> <span>Musabani</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>

  </>  )
}

export default VendorCreatedHistory