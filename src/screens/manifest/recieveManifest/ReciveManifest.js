/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Row, CardBody, CardTitle, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";

import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { ServerAddress } from "../../../constants/ServerAddress";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
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
import Question from "../../../assets/images/bookings/question.png";
import BreakManifest from "../../../data/manifests/recieveManifest/BreakManifest";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
const RecieveManifest = ({ depart }) => {

  const [is_submit, setis_submit] = useState(false);
  const [is_issue, setis_issue] = useState(false);
  const [received, setReceived] = useState([]);
  // const [notReceived, setNotReceived] = useState([]);
  // console.log("Recived", received);
  // console.log("Not Recived", notReceived);
  const [is_issuerec, setis_issuerec] = useState(false);
  const [receivedrec, setReceivedrec] = useState([]);
  // const [notReceivedrec, setNotReceivedrec] = useState([]);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const success = useSelector((state) => state.alert.show_alert);
  const [remarks, setremarks] = useState("");
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();
  const order_id = useSelector((state) => state.manifest.order_id);
  console.log("receivedqqqq Mnaaaa-----", received)
  // useEffect(() => {
  //   console.log("--------------------------------------------------------------", received)
  //   let a = received.filter((v)=>v.issueType !=="None")
  //   console.log("a-------+++++++++", a)
  // }, [received])
  
  const issue_id = useSelector((state) => state.manifest.issueorder_id);
  const loaded = useSelector((state) => state.manifest.loaded);

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/manifest/incomingmanifest");
  };
  const [is_break, setis_break] = useState(false);
  const [is_recv, setis_recv] = useState(false);

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
  const [flight_name, setflight_name] = useState("");
  const [data, setdata] = useState([]);

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
  const [vehicle_no, setvehicle_no] = useState("");
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
        // setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    manifest_no && get_orderof_manifest();
  }, [manifest_no, success]);

  const [mn_barcode, setmn_barcode] = useState([]);
  useEffect(() => {

    console.log("hello ji pass check", location_data.state.depart.mn_barcode);
    if (location_data.state.depart.mn_barcode) {
      setmn_barcode(location_data.state.depart.mn_barcode);
    }
  }, [])

  const RecieveManifest = (steps) => {
    axios
      .post(
        ServerAddress + "manifest/add_recieve_manifest/",
        {
          manifest_no: manifest_no,
          is_received: "True",
          awb_no_list: order_id,
          issue_type: issue_id,
          is_issue: is_issue,
          vehcile_no: vehicle_no,
          is_disputed: false,
          disputed_by: "",
          dispute_username: "",
          remarks: remarks,
          issue_recieved_order: received,
          // issue_notrecieved_order: notReceived,
          vehicle_no: toTitleCase(vehicle_no).toUpperCase(),
          transport_mode: trans_mode_selected.toUpperCase(),
          step: steps,
          issue_recieved_order_rec: receivedrec,
          // issue_notrecieved_order_rec: notReceivedrec,
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
  // useEffect(() => {
  //   if (is_submit) {
  //     RecieveManifest();
  //   }
  // }, [is_submit]);

  const [show, setShow] = useState(false);

  let docket_no_list = []

  for (let index = 0; index < data.length; index++) {
    const element = data[index]?.docket_no;
    docket_no_list.push(element)
    console.log("docket_no_list-manifest----", docket_no_list)
  }
  const handleClose = () => {
    RecieveManifest("STEP1");
    setis_break(false);
    setShow(false);
  };
  const handleCloseAll = () => {
    setis_break(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [vendor_list, setvendor_list] = useState([]);
  const [vendor_name, setvendor_name] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [vendor_n_page, setvendor_n_page] = useState(1);
  const [search_vendor_name, setsearch_vendor_name] = useState("");
  const [vendor_error, setvendor_error] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [vendor_data, setvendor_data] = useState([]);
  const [rental, setrental] = useState(false);
  //  For getting Vehcile number
  const get_vehcile_no = () => {
    let vendor_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_vehcile/?search=${""}&p=${vendor_n_page}&records=${10}&name_search=${search_vendor_name}&vendor_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        console.log("data printing", data)
        setvendor_data(data);
        if (response.data.results.length > 0) {
          if (vendor_n_page == 1) {
            vendor_temp = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.vehcile_no),
            ]);
          } else {
            vendor_temp = [
              ...vendor_list,
              ...response.data.results.map((v) => [v.id, v.vehcile_no]),
            ];
          }
        }
        setvendor_list(vendor_temp);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };


  useLayoutEffect(() => {
    get_vehcile_no();
  }, [vendor_n_page, search_vendor_name, refresh]);
  useEffect(() => {
    setdata(location_data.state.depart.orders)
  }, [location_data])


  return (
    <>
      <Modal
        show={is_recv}
        onHide={() => {
          setShow(false);
          setis_break(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header></Modal.Header>

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
              color: "blue",
            }}
          >
            In {manifest_no} You Have Recieved All Bags And Boxes Do You Want To
            Update Status Connecting To Hub ?
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setis_recv(false);
            }}
          >
            Cancel
          </Button>

          <Button variant="success" onClick={() => {
            RecieveManifest("STEP1");
          }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleCloseAll}
        backdrop="static"
        keyboard={false}
        dialogClassName={is_break && "custom-modal2"}
      >
        <Modal.Header closeButton></Modal.Header>

        {is_break ? (
          <Modal.Body>
            <BreakManifest
              manifest_no={manifest_no}
              is_issue={is_issue}
              setis_issue={setis_issue}
              received={received}
              setReceived={setReceived}
            // notReceived={notReceived}
            // setNotReceived={setNotReceived}
            />
          </Modal.Body>
        ) : (
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
              {manifest_no} Have Some Issues In Box Or Bag Do You Want To Break
              Manifest ?
            </div>
          </Modal.Body>
        )}

        <Modal.Footer>
          {
            is_break ?
              <Button variant="danger" onClick={handleCloseAll}>Cancel</Button>
              :
              <Button variant="danger" onClick={handleClose}>
                No,Later
              </Button>
          }

          {!is_break ? (
            <Button
              variant="success"
              onClick={() => {
                setis_break(true);
              }}
            >
              Yes
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={() => {
                RecieveManifest("STEP2")
                setis_submit(true);
              }}
            >
              Break
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {/* Modal For Break manifest Started*/}
      <Title title="Recieve Manifest" parent_title="Manifests" />
      <PageTitle page="RecieveManifest" />
      <div className="mt-0 m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardBody style={{ paddingTop: "0px" }}>
              <Row>
                <div
                  className="container-fluid"
                  style={{ background: "white" }}
                >
                  <div className="mb-2 row ">

                    <div style={{ color: "blue", fontSize: "15px", marginTop: "10px" }}>
                      Docket Present In This Manifest = [
                      {
                        docket_no_list.map((v) => {
                          return <a>{v}{docket_no_list[docket_no_list.length - 1] === v ? null : ", "}</a>
                        }
                        )
                      }
                      ]
                    </div>

                  </div>

                  {/* DataTable */}
                  <RecieveDataFormat
                    data={location_data.state.depart.orders}
                    barcode={mn_barcode}
                    is_issue={is_issuerec}
                    setis_issue={setis_issuerec}
                    received={receivedrec}
                    setReceived={setReceivedrec}
                  // notReceived={notReceivedrec}
                  // setNotReceived={setNotReceivedrec}
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
                  <Col lg={4} md={6} sm={6}>
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

                  <Col lg={4} md={8} sm={8}>
                    <div className="mb-2">
                      <Label className="header-child">Vehcile No* :</Label>
                      {
                        rental ?
                          null :
                          <SearchInput
                            data_list={vendor_list}
                            setdata_list={setvendor_list}
                            data_item_s={vendor_name}
                            set_data_item_s={setvendor_name}
                            set_id={setvendor_id}
                            page={vendor_n_page}
                            setpage={setvendor_n_page}
                            search_item={search_vendor_name}
                            setsearch_item={setsearch_vendor_name}
                            error_message={"Please Select Any Vechile Number"}
                            error_s={vendor_error}
                          />

                      }

                      {rental &&
                        <Input
                          name="vehicle_no"
                          type="text"
                          id="input"
                          maxLength={10}
                          value={vehicle_no}
                          onChange={(e) => {
                            setvehicle_no(e.target.value);
                          }}
                        />
                      }

                    </div>
                  </Col>
                  <Col>
                    <div className="mb-2" style={{ marginTop: "25px" }}>
                      <Label className="header-child">Rentend Vehcile :</Label>
                      {rental ?
                        <FiCheckSquare size={20} onClick={() => {
                          setrental(false);
                        }} />
                        :
                        <FiSquare size={20} onClick={() => {
                          setrental(true);
                        }} />
                      }
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
                  if (receivedrec.length > 0) {
                    handleShow();
                  } else {
                    setis_recv(true);
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
