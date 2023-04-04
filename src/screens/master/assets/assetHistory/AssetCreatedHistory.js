import React ,{useState, useLayoutEffect} from 'react';
import {Col,Card,CardTitle,CardBody} from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const AssetCreatedHistory = ({page_data}) => {
  console.log("page",page_data)
  const [asset_data, setasset_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

let data = p_data.change_message;
let n_data = JSON.parse(data)  
setasset_data(n_data);      
    }
  }, [page_data])

  console.log("Asset  data >>>>>",asset_data);
  

  let time = new Date(asset_data.created_at).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  
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
                <h5>Asset Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Asset Type </span> <span> Logger</span>
                </div>
                <div className="container_element">
                  <span>Manufacture Name</span> <span>ABC Private Limited </span>
                </div>
                <div className="container_element">
                  <span>Teamperature Type</span> <span>20 to 25 </span>
                </div>
                <div className="container_element">
                  <span>Logger Number</span> <span> 12345</span>
                </div>
                <div className="container_element">
                  <span>Box Type</span> <span> ABCDES</span>
                </div>
                <div className="container_element">
                  <span>Box Capacities </span> <span> 20 L</span>
                </div>
                <div className="container_element">
                  <span>Product ID </span> <span> 207620456 L</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
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
                <h5>Asset Details</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Initial Assign Branch </span> <span> Jamshedpur </span>
                </div>
                <div className="container_element">
                  <span>Created By</span> <span>{user_name}</span>
                </div>
                <div className="container_element">
                  <span>Created At</span> <span>{time}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
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
                <h5>Asset Callibration Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Callibration From </span> <span> 12/03/2023</span>
                </div>
                <div className="container_element">
                  <span>Callibration To</span> <span>22/03/2023 </span>
                </div>
                <div className="container_element">
                  <span>Certificate Issued By</span> <span>Admin</span>
                </div>
                <div className="container_element">
                  <span>Issued Date</span> <span> 8/03/2023</span>
                </div>
                <div className="container_element">
                  <span>Certificate</span> <span> Yes</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
    </>
   )
}

export default AssetCreatedHistory