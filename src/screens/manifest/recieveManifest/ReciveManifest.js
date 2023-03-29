/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
// import "../../../assets/scss/forms/form.scss";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
} from "reactstrap";
import Modal from 'react-bootstrap/Modal';

import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";

import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import RecieveDataFormat from "../../../data/manifests/recieveManifest/RecieveManifestFormat";
import { setLoaded } from "../../../store/manifest/RecieveManifest";
// import Question from "../../../"
import Question from "../../../assets/images/bookings/question.png";
import BreakManifest from "../../../data/manifests/recieveManifest/BreakManifest";
const RecieveManifest = ({ depart }) => {
  const [is_submit, setis_submit] = useState(false)
  const [is_issue, setis_issue] = useState(false);
  const [received, setReceived] = useState([]);
  const [notReceived, setNotReceived] = useState([]);

  const [is_issuerec, setis_issuerec] = useState(false);
  const [receivedrec, setReceivedrec] = useState([]);
  const [notReceivedrec, setNotReceivedrec] = useState([]);
  console.log("receive--------", received)
  console.log("notReceived--------", notReceived)
  console.log("is_issue--------", is_issue)
  console.log("is_issue-----", is_issue)

  console.log("receiverec--------", receivedrec)
  console.log("notReceivedrec--------", notReceivedrec)
  console.log("is_issuerec--------", is_issuerec)
  console.log("is_issuerec-----", is_issuerec)

  // console.log("Recive Data", depart);
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
  const success = useSelector((state) => state.alert.show_alert);
  const [page, setpage] = useState(1);
  const [refresh, setrefresh] = useState("false");
  const [remarks, setremarks] = useState("");
  const dispatch = useDispatch();
  const location_data = useLocation();
  // console.log("depart-----", location_data.orders);

  const navigate = useNavigate();
  const order_id = useSelector((state) => state.manifest.order_id);
  const futher_conn_id = useSelector((state) => state.manifest.futher_conn_id);
  const going_hub_id = useSelector((state) => state.manifest.going_hub_id);
  const issue_id = useSelector((state) => state.manifest.issueorder_id);
  const loaded = useSelector((state) => state.manifest.loaded);

  // console.log("futher_conn_id----", futher_conn_id);
  // console.log("going_hub_id----", going_hub_id);
  // console.log("issue_id---", issue_id);

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/manifest/incomingmanifest");
  };
  const [is_break, setis_break] = useState(false);
  console.log("is_break-----", is_break)

  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [manifest_no, setmanifest_no] = useState("");
  const [manifest_id, setmanifest_id] = useState("");
  const [total_bags, settotal_bags] = useState("");
  const [manifest_weight, setmanifest_weight] = useState("");
  const [airway_bill_no, setairway_bill_no] = useState("");
  const [coloader_mode, setcoloader_mode] = useState("");
  const [company_slected_list, setcompany_slected_list] = useState("");
  const [flight_name, setflight_name] = useState("");
  const [data, setdata] = useState([]);
  const [coloader_mode_list, setcoloader_mode_list] = useState([
    "DIRECT AWB",
    "AIR CONSOLE",
    "BY ROAD (SURFACE)",
    "BY TRAIN",
    "DIRECT VEHICLE",
    "PARTLOAD",
  ]);
  useLayoutEffect(() => {
    let manifest_data = location_data.state.depart;
    setmanifest_no(manifest_data.manifest_no);
    setmanifest_id(manifest_data.id);
    setfrom_branch(manifest_data.from_branch_n);
    setto_branch(manifest_data.to_branch_n);
    setcoloader_mode(manifest_data.coloader_mode);
    setcoloader_id(manifest_data.coloader);
    setcoloader_selected(manifest_data.coloader_name);
    settotal_bags(manifest_data.bag_count);
    setmanifest_weight(manifest_data.total_weight);
    setairway_bill_no(manifest_data.airwaybill_no);
    setflight_name(manifest_data.carrier_name);
  }, []);

  const [trans_mode_list, settrans_mode_list] = useState([
    "Air",
    "Road",
    "Rail",
    "Ship",
    "In Transit",
  ]);
  const [trans_mode_selected, settrans_mode_selected] = useState("");
  const [vehicle_no, setvehicle_no] = useState("")
  const get_orderof_manifest = () => {
    axios
      .get(
        ServerAddress +
        `manifest/get_manifest_order/?manifest_no=${manifest_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    manifest_no && get_orderof_manifest();
  }, [manifest_no, success]);

  const RecieveManifest = () => {
    axios
      .post(
        ServerAddress + "manifest/add_recieve_manifest/",
        {
          manifest_no: manifest_no,
          is_received: "True",
          awb_no_list: order_id,
          // futher_connected: futher_conn_id,
          // is_going_to_hub_list: going_hub_id,
          issue_type: issue_id,
          is_issue: is_issue,
          is_disputed: false,
          disputed_by: "",
          dispute_username: "",
          remarks: remarks,
          issue_recieved_order: received,
          issue_notrecieved_order: notReceived,
          vehicle_no: toTitleCase(vehicle_no).toUpperCase(),
          transport_mode: (trans_mode_selected).toUpperCase(),
          step:is_submit ? "STEP2" : "STEP1",

          issue_recieved_order_rec: receivedrec,
          issue_notrecieved_order_rec: notReceivedrec,
          is_issue_rec: is_issuerec,

        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest  "${manifest_no}" Recieved sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1);
        }
      })
      .catch(function (err) {
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };
  console.log("error=--->>", received, notReceived);
  // useEffect(() => {
  //   if (loaded) {
  //     RecieveManifest();
  //   }
  // }, [loaded]);

  useEffect(() => {
    if (is_submit) {
      RecieveManifest();
    }
  }, [is_submit]);

  console.log("=================", received, notReceived);


  const [show, setShow] = useState(false);

  const handleClose = () =>
  {
    setis_break(false);
    setShow(false);
  } 
  const handleShow = () => setShow(true);


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName={is_break && "custom-modal2"}
      >
        <Modal.Header closeButton>

        </Modal.Header>

        {
          is_break ?
            <Modal.Body>
                <BreakManifest
                data={location_data.state.depart.orders}
                is_issue={is_issue}
                setis_issue={setis_issue}
                received={received}
                setReceived={setReceived}
                notReceived={notReceived}
                setNotReceived={setNotReceived}
              />
            </Modal.Body>
            :
            <Modal.Body>
              <div style={{ marginLeft: "170px" }}>
                <img src={Question} width="100vw" height="100vh" />
              </div>
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginLeft: "20px",
                  color: "red",
                }}
              >
                {manifest_no} Have Some Issues In Box Or Bag Do You Want To Break Manifest ?
              </div>

            </Modal.Body>
        }

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No,Later
          </Button>
          {!is_break ?
          <Button variant="success" onClick={() => {
            setis_break(true);
          }}>Yes1</Button>
          :
          <Button variant="success" onClick={() => {
            setis_submit(true)
          }}>Yes2</Button>    
        }
        </Modal.Footer>
      </Modal>
      {/* Bag info started */}
      <Title title="Recieve Manifest" parent_title="Manifests" />
      <PageTitle page="RecieveManifest" />
      <div className="mt-0 m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardBody style={{ paddingTop: "0px" }}>
              <Row>
                <div className="container-fluid" style={{ background: "white" }}>
                  <div className="mb-2 row ">
                    <div className="col-sm-4">
                      <SearchList />
                    </div>

                  </div>

                  {/* DataTable */}
                  <RecieveDataFormat
                    data={location_data.state.depart.orders}
                    is_issue={is_issuerec}
                    setis_issue={setis_issuerec}
                    received={receivedrec}
                    setReceived={setReceivedrec}
                    notReceived={notReceivedrec}
                    setNotReceived={setNotReceivedrec}
                  />
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
      {/* Bag Info Ended */}

      {/* Colader Services */}
      <div className="m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Docket Info:
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle1}>
                      {circle_btn1 ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            </CardTitle>
            {circle_btn1 ? (
              <CardBody>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <div className="mb-2">
                      <Label className="header-child">Manifest No* :</Label>

                      <Input
                        className="form-control-md"
                        id="input"
                        disabled
                        value={manifest_no}
                      />
                    </div>
                  </Col>
                  <Col lg={12} md={12} sm={12}>
                    <div className="mb-2">
                      <Label className="header-child"> Remarks :</Label>

                      <Input
                        value={remarks}
                        className="form-control-md"
                        id="input"
                        onChange={(e) => {
                          setremarks(e.target.value);
                        }}
                        placeholder="Enter Remarks"
                      />
                    </div>
                  </Col>

                  {going_hub_id.length !== 0 && (
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Transporation Mode :
                        </Label>
                        <NSearchInput
                          data_list={trans_mode_list}
                          data_item_s={trans_mode_selected}
                          set_data_item_s={settrans_mode_selected}
                          show_search={false}
                          error_message={"Please Select Transportation Mode"}
                        />
                      </div>
                    </Col>
                  )}
                  {trans_mode_selected === "Road" &&
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Vehicle Number :
                        </Label>

                        <Input
                          name="vehicle_no"
                          type="text"
                          id="input"
                          value={vehicle_no}
                          onChange={(e) => {
                            setvehicle_no(e.target.value)
                          }}
                        />
                      </div>

                    </Col>
                  }
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>

        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={() => {
                  dispatch(setLoaded(true));
                  if (receivedrec.length > 0 || notReceivedrec.length > 0) {
                    handleShow()
                  }
                }}
              >
                Recieve
              </Button>

              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={handleAction}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default RecieveManifest;
