import React, { useState,useLayoutEffect } from "react";
import { Input, Col, Row, Label } from "reactstrap";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import { useDispatch } from "react-redux";

const PacketTitle = [
  "Ewb No",
  "Expiring Time",
  "Shipper",
  "Consignee",
  "Action",
];

const ExtendDataFormat = ({ data }) => {
  const dispatch=useDispatch();
  const [show, setshow] = useState(false);
  const [d_pincode, setd_pincode] = useState("");
  const [c_pincode, setc_pincode] = useState("");
  const [consigment_l, setconsigment_l] = useState([
    ("M","IN MOVEMENT"),
    ("T","IN TRANSIST"),
  ]);
  const [ext_reason_sel, setext_reason_sel] = useState("");
  const [ext_reason_id, setext_reason_id] = useState("");

  const [ext_reason_l, setext_reason_l] = useState([
    ("1","Natural Calamity"),
    ("2","Law & Order Situation"),
    ("4","Transshipment"),
    ("5","Accident"),
    ("99","Others"),
  ]);
  const [consigment_sel, setconsigment_sel] = useState("");
  const [consigment_id, setconsigment_id] = useState("");
  const [ewb_no, setewb_no] = useState("");
  const [is_ready, setis_ready] = useState(false);
  const handleCloseM = () => {
    setshow(false);
  };

  useLayoutEffect(() => {
    const currentTime = new Date().getHours();
    console.log("currentTime",currentTime)
    if (currentTime >= 16 || currentTime < 2) {
      setis_ready(true);
    } else {
      setis_ready(false);
      // Perform button action here
    }
  
  }, [])
  console.log("datappppp", data);
  const handleEData=(a,b,c) =>{
    setd_pincode(a,b);
    setewb_no(c,b);
  }
console.log("is_readyyyyy for extend",is_ready)
  return (
    <>
      <Modal show={show} onHide={handleCloseM} 
      dialogClassName={"custom-modal2"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{fontSize:"15px",color:"red"}}>Extend EwayBill No : {ewb_no}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "20vw" }}>
              <Label>Destination Pincode *</Label>
              <Input value={d_pincode} disabled />
            </div>
            <div style={{ width: "20vw", marginLeft: "10px" }}>
              <Label>Current Pincode *</Label>
              <Input
                value={c_pincode}
                placeholder="Enter Current Pincode"
                onChange={(e) => {
                  setc_pincode(e.target.value);
                }}
              />
            </div>
            <div style={{ width: "20vw", marginLeft: "10px" }}>
              <Label>Consigment Is*</Label>
              <NSearchInput 
              data_list={consigment_l}
              set_id={setconsigment_id}
              show_search={false}
              error_message={"Please Select Consigment Status"}
              data_item_s={consigment_sel}
              set_data_item_s={setconsigment_sel}
              />
            </div>
          </div>
          <div>
          <div style={{ width: "20vw" }}>
              <Label>Extend Reason*</Label>
              <NSearchInput 
              data_list={ext_reason_l}
              set_id={setext_reason_id}
              show_search={false}
              error_message={"Please Select Extend  Reason"}
              data_item_s={ext_reason_sel}
              set_data_item_s={setext_reason_sel}
              />
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success">Save</Button>
          <Button color="danger">Cancel</Button>
        </Modal.Footer>
      </Modal>
      <div className="table">
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {/* {PacketTitle.map((i,index)=>)} */}
              {PacketTitle.map((i, j) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={j}
                  >
                    {i}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              data.map((ewb, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      style={{
                        borderWidth: 1,
                      }}
                    >
                      <td>{ewb.ewbNo}</td>

                      <td>{ewb.validUpto}</td>
                      <td>{ewb.fromTrdName}</td>
                      <td>{ewb.toTrdName}</td>
                      <td>
                        <Button
                          color="success"
                          onClick={() => {
                            if (is_ready) {
                               setshow(true);
                            handleEData(ewb.toPincode,index,ewb.ewbNo)
                            }else {
                              dispatch(setShowAlert(true));
                              dispatch(setDataExist(`EwayBill Can Only Extend From 4 p.m Onwards`));
                              dispatch(setAlertType("danger"));
                            }
                          }}
                        >
                          Extend EwayBill
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExtendDataFormat;
