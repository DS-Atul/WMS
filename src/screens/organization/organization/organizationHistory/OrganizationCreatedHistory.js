import React ,{useState, useLayoutEffect} from 'react';
import {Col,Card,CardTitle,CardBody} from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const OrganizationCreatedHistory = ({page_data}) => {
  console.log("page  ===>",page_data)
  const [org_data, setorg_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

let data = p_data.change_message;
let n_data = JSON.parse(data)  
setorg_data(n_data);      
    }
  }, [page_data])

  console.log("Organization  data >>>>>",org_data);
  

  let time = new Date(org_data.created_at).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  
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
                <h5>Organization Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Organization Name </span> <span>ABCDE</span>
                </div>
                <div className="container_element">
                  <span>Email</span> <span>aeaeqw@gmail.com</span>
                </div>
                <div className="container_element">
                  <span>Toll Free Number</span> <span>139</span>
                </div>
                <div className="container_element">
                  <span>Registration/Incorporation No</span> <span> 12345</span>
                </div>
                <div className="container_element">
                  <span>PAN Number</span> <span>AS33727282</span>
                </div>
                <div className="container_element">
                  <span>Primary Mobile No </span> <span>9507720843</span>
                </div>
                <div className="container_element">
                  <span>Secondary Mobile No  </span> <span> 207620456</span>
                </div>
                <div className="container_element">
                  <span>Website Address  </span> <span>wwww.web_url.com</span>
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
                <h5>GST Address</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>GST No </span> <span>20AS33727282ABC  </span>
                </div>
                <div className="container_element">
                  <span>City </span> <span> Jamshedpur </span>
                </div>
                <div className="container_element">
                  <span>PinCode </span> <span> 840021 </span>
                </div>
                <div className="container_element">
                  <span> Locality </span> <span>Govindpur  </span>
                </div>
                <div className="container_element">
                  <span> Address</span> <span> Chhota Govindpur </span>
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
                <h5>Head Office Address</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Address Line 1 </span> <span> Govindpur</span>
                </div>
                <div className="container_element">
                  <span>Address Line 2</span> <span>Chhota Govindpur </span>
                </div>
                <div className="container_element">
                  <span>State </span> <span>Jharkhand</span>
                </div>
                <div className="container_element">
                  <span>City</span> <span>Jamshedpur</span>
                </div>
                <div className="container_element">
                  <span>PinCode</span> <span> 840021</span>
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
                <h5>Billing Address</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Address Line 1 </span> <span> Govindpur</span>
                </div>
                <div className="container_element">
                  <span>Address Line 2</span> <span>Chhota Govindpur </span>
                </div>
                <div className="container_element">
                  <span>State </span> <span>Jharkhand</span>
                </div>
                <div className="container_element">
                  <span>City</span> <span>Jamshedpur</span>
                </div>
                <div className="container_element">
                  <span>PinCode</span> <span> 840021</span>
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
                <h5>Contact Person Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Contact Person  </span> <span>Abhi  </span>
                </div>
                <div className="container_element">
                  <span>Contact Person Email </span> <span> abhi@gmail.com </span>
                </div>
                <div className="container_element">
                  <span>Contact Person Phone Number </span> <span> 84002112334 </span>
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
                <h5>Description</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Description </span> <span>Hello India</span>
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
    </>
   )
}

export default OrganizationCreatedHistory