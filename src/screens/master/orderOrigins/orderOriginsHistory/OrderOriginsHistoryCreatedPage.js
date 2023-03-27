import React from 'react';
import { Col,Card,CardTitle,CardBody } from 'reactstrap';

const OrderOriginsHistoryCreatedPage = () => {
  return (
    <>
        <Col lg={12} md={12} sm={12}>
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
                <h5>Shipper/Consignee Details</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Shipper/Consignee</span> <span>Own</span>
                </div>
                <div className="container_element">
                  <span>Bill To</span> <span>Jamshedpur</span>
                </div>
<div className="container_element">
  <span>Client</span><span>Raman</span>
</div>

<div className="container_element">
  <span>City</span><span>Raman</span>
</div><div className="container_element">
  <span>PinCode</span><span>Raman</span>
</div><div className="container_element">
  <span>Locality</span><span>Raman</span>
</div>
                <div className="container_element">
                  <span>Created By</span> <span>jsr@gmail.com</span>
                </div>
                <div className="container_element">
                  <span>Created At</span> <span>7878787878</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
    </>
  )
}

export default OrderOriginsHistoryCreatedPage