/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Row, CardBody, CardTitle, Label, Input, FormFeedback } from "reactstrap";
import Modal from "react-bootstrap/Modal";

import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { EServerAddress, ServerAddress } from "../../../constants/ServerAddress";
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
import { gstin_no } from "../../../constants/CompanyDetails";
import { setBusinesssAccessToken, setEAccessToken, setOrgs } from "../../../store/ewayBill/EwayBill";
import UpateEwaybillPartB from "../../authentication/signin/UpateEwaybillPartB";
const RecieveManifest = ({ depart }) => {

  const userDetail = useSelector((state) => state.authentication.userdetails);
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
  const [trans_mode_selected, settrans_mode_selected] = useState("");

  const [vehicle_no, setvehicle_no] = useState("");
  const [vehicle_list, setvehicle_list] = useState([]);
  const [vehicle_id, setvehicle_id] = useState("");
  const [vehicle_n_page, setvehicle_n_page] = useState(1);
  const [search_vehicle_name, setsearch_vehicle_name] = useState("");
  const [vehicle_error, setvehicle_error] = useState(false);
  const [vehicle_loaded, setvehicle_loaded] = useState(false)
  const [vehicle_count, setvehicle_count] = useState(1)
  const [vehicle_bottom, setvehicle_bottom] = useState(103)

  useLayoutEffect(() => {
    let manifest_data = location_data.state.depart;
    console.log("manifest_data====", manifest_data)
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
    setvehicle_no(manifest_data.vehicle_no);
    setrental(manifest_data.is_rented_vehcile);
  }, []);

  const [trans_mode_list, settrans_mode_list] = useState([
    "Air",
    "Road",
    "Rail",
    "Ship",
    "In Transit",
  ]);

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
          is_rented_vehcile: rental ? "True" : "False",
          transport_mode: trans_mode_selected.toUpperCase(),
          step: steps,
          issue_recieved_order_rec: receivedrec,
          // issue_notrecieved_order_rec: notReceivedrec,
          vehcile_no_f: vehicle_id,
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
          if (list_data.length > 0) {
             UpateEwaybillPartB({
              gstin_no: gstin_no,
              Data: list_data,
              ewayTokenB: business_access_token,
              access_token: accessToken,
            });
            // EwayUpdate();
          }
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
    if (vehicle_no == "" || vehicle_no?.toString().length !== 10) {
      setvehicle_error(true);
    }
    else {
      RecieveManifest("STEP1");
      setis_break(false);
      setShow(false);
    }
  };
  const handleCloseAll = () => {
    setis_break(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [rental, setrental] = useState(false);
  //  For getting Vehcile number
  const get_vehcile_no = () => {
    let vehicle_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_vehcile/?search=${search_vehicle_name}&p=${vehicle_n_page}&records=${10}&name_search=${''}&vehicle_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setvehicle_loaded(false);
        } else {
          setvehicle_loaded(true);
        }
        data = response.data.results;
        if (response.data.results.length > 0) {
          if (vehicle_n_page == 1) {
            vehicle_temp = response.data.results.map((v) => [
              v.id,
              v.vehcile_no,
            ]);
          } else {
            vehicle_temp = [
              ...vehicle_list,
              ...response.data.results.map((v) => [v.id, v.vehcile_no]),
            ];
          }
          setvehicle_count(vehicle_count + 2);
          setvehicle_list(vehicle_temp);
        }
        else {
          setvehicle_list([])
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  useLayoutEffect(() => {
    get_vehcile_no();
  }, [vehicle_n_page, search_vehicle_name]);
  useEffect(() => {
    setdata(location_data.state.depart.orders)
  }, [location_data])


  //For Update Part B
  const [EwayBillData, setEwayBillData] = useState([])
  const [list_data, setlist_data] = useState([])

  const getEwayBills = (mn_num) => {
    axios
      .get(
        ServerAddress +
        `booking/get_all_ewaybill/?type=${"manifest"}&value=${mn_num}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("resres----", res);
        if (res?.data?.length !== 0) {
          setEwayBillData(res.data);
        }
      })
      .catch((err) => {
        console.log("rerrerer", err);
      });
  };


  useEffect(() => {
    if (EwayBillData?.length > 0) {
      let li = [];
      EwayBillData?.forEach((e) => {
        let obj = {
          transMode: "1",
          fromPlace: userDetail.branch_nm,
          fromState: userDetail.branch_location_state_code,
          transDocNo: e.trans_doc_no,
          transDocDate: String(
            e.docDate.split("-")[1] +
            "/" +
            e.docDate.split("-")[2] +
            "/" +
            e.docDate.split("-")[0]
          ),
          vehicleNo: vehicle_no,
          reasonCode: "2",
          reasonRem: "text",
          userGstin: gstin_no,
          ewbNo: e.ewb_no,
        };
        li.push(obj);
      });
      setlist_data(li)
    }
    // Rest of your code...
  }, [EwayBillData, vehicle_no]);
  console.log("EwayBillData-----", EwayBillData)

  useEffect(() => {

    if (manifest_no !== "" && location_data?.state?.depart?.vehicle_number !== vehicle_no) {
      getEwayBills(manifest_no);
    }
  }, [manifest_no])

  //For Eway Bill

  const orgId = useSelector((state) => state.eway_bill?.orgs[0]?.orgId);

  const org_name = useSelector(
    (state) => state.authentication.userdetails.organization
  );
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);

  const e_access_token = useSelector((state) => state.eway_bill.e_access_token);

  const [ass_token, setass_token] = useState(false);
  const [euser_name, seteuser_name] = useState("");
  const [epass, setepass] = useState("");
  const [id_is, setid_is] = useState("");

  const [AccessToken_Modifiedat, setAccessToken_Modifiedat] = useState("");
  const [time_diff, settime_diff] = useState("");

  const getEwayAccessToken = () => {
    axios
      .get(
        ServerAddress +
        `organization/get_eway_accesstoken/?org_name=${org_name}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {
        console.log("first get ressssss ===>>", response.data);
        if (response.data.results.length !== 0) {
          let res_data = response.data.results[0];
          setid_is(res_data.id);
          seteuser_name(res_data.username);
          setepass(res_data.password);
          setAccessToken_Modifiedat(res_data.AccessToken_Modifiedat);
          if (e_access_token === "") {
            dispatch(setEAccessToken(res_data.access_token));
          }
          if (business_access_token === "") {
            dispatch(setBusinesssAccessToken(res_data.business_token));
          }

          if (response.data.results[0].access_token === null) {
            setass_token(true);
          } else {
            setass_token(false);
          }
        }
        else {
          dispatch(setEAccessToken(""));
          dispatch(setBusinesssAccessToken(""));
        }
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const AddEwayAccessToken = () => {
    axios
      .post(
        EServerAddress + "ezewb/v1/auth/initlogin",

        {
          // userid: "test.easywaybill@gmail.com",
          // password: "Abcd@12345",
          userid: euser_name,
          password: epass,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("AddEwayAccessToken response----", response)
        if (response.data.message !== "Please verify account (or sign up first).") {
          dispatch(setEAccessToken(response.data.response.token));
          dispatch(setOrgs(response.data.response.orgs));
          if (response.data.status === 1 && id_is !== "") {
            postAssToken(response.data.response.token);
          }
        }
        else {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Invalid Username And Password Sign Up First`));
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const postAssToken = (access_token) => {
    axios
      .put(
        ServerAddress + "organization/update_token/" + id_is,

        {
          type: "access_token",
          access_token: access_token,
        },

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {

      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };


  const GetBusiness_token = () => {
    axios
      .post(
        EServerAddress + "ezewb/v1/auth/completelogin",
        {
          token: `${e_access_token}`,
          orgid: orgId,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(setBusinesssAccessToken(response.data.response.token));
        if (response.data.status === 1 && id_is !== "") {
          postBusinessToken(response.data.response.token);
        }
      })
      .catch((error) => {
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Eway Bill Server Is Currently Down`));
        dispatch(setAlertType("danger"));
      });
  };

  const postBusinessToken = (business_token) => {
    axios
      .put(
        ServerAddress + "organization/update_token/" + id_is,

        {
          type: "business_token",
          business_token: business_token,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {
        console.log("post busines token res ===>>", response.data);

      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  useLayoutEffect(() => {
    if (ass_token) {
      AddEwayAccessToken();
    }
    if (time_diff >= 6) {
      AddEwayAccessToken();
    }
  }, [ass_token, time_diff]);

  //  For Step 1 Eway bill
  useLayoutEffect(() => {
    if (org_name) {
      getEwayAccessToken();
    }
  }, []);

  // For Step 2 Eway Bill
  useLayoutEffect(() => {
    if (e_access_token != "" && ass_token && orgId) {
      GetBusiness_token();
    }
    if (time_diff >= 6 && orgId) {
      GetBusiness_token();
    }
  }, [e_access_token, ass_token, time_diff]);

  useEffect(() => {
    // Calculate the time difference when AccessToken_Modifiedat changes
    if (AccessToken_Modifiedat) {
      var dateTime1 = new Date(AccessToken_Modifiedat);
      var dateTime2 = new Date(); // Current date-time
      console.log("AccessToken_Modifiedat------", AccessToken_Modifiedat)
      console.log("date time1---- ", dateTime1)
      console.log("date time2--- ", dateTime2)
      var timeDiff = Math.abs(dateTime2 - dateTime1);
      var diffHours = Math.floor(timeDiff / (1000 * 60 * 60));
      settime_diff(diffHours);
      console.log("time=====>>", diffHours, timeDiff); // Output: Number of hours between dateTime1 and current date-time
    }

  }, [AccessToken_Modifiedat]);

  useEffect(() => {
    if (vehicle_no !== "" || vehicle_no?.toString().length === 10) {
      setvehicle_error(false)
    }
  }, [vehicle_no])

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
            if (vehicle_no == "" || vehicle_no?.toString().length !== 10) {
              setvehicle_error(true);
            }
            else {
              RecieveManifest("STEP1");
            }

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

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Market Vehcile:
                      </Label>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          {rental ? (
                            <FiCheckSquare
                              size={20}
                              onClick={() => {
                                setrental(false);
                              }}
                            />
                          ) : (
                            <FiSquare
                              size={20}
                              onClick={() => {
                                setrental(true);
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      {rental ? (
                        <Label className="header-child">
                          {" "}
                          Market Vehcile No* :
                        </Label>
                      ) : (
                        <Label className="header-child">
                          Vehcile No* :
                        </Label>
                      )}
                      {rental ? null : (
                        <SearchInput
                          data_list={vehicle_list}
                          setdata_list={setvehicle_list}
                          data_item_s={vehicle_no}
                          set_data_item_s={setvehicle_no}
                          set_id={setvehicle_id}
                          page={vehicle_n_page}
                          setpage={setvehicle_n_page}
                          search_item={search_vehicle_name}
                          setsearch_item={setsearch_vehicle_name}
                          error_message={"Please Select Any Vechile Number"}
                          error_s={vehicle_error}
                          loaded={vehicle_loaded}
                          count={vehicle_count}
                          bottom={vehicle_bottom}
                          setbottom={setvehicle_bottom}
                        />
                      )}

                      {rental &&
                        <div className="mb-2">
                          <Input
                            name="vehicle_no"
                            type="text"
                            id="input"
                            maxLength={10}
                            value={vehicle_no}
                            onChange={(e) => {
                              setvehicle_no(e.target.value);
                            }}
                            onBlur={() => {
                              if (vehicle_no === "" || vehicle_no?.toString().length !== 10) {
                                setvehicle_error(true)
                              }
                            }
                            }
                            invalid={
                              vehicle_error
                            }
                          />
                          {vehicle_error && (
                            <FormFeedback type="invalid">
                              Vehicle Number Must Have 10 Character
                            </FormFeedback>
                          )}
                        </div>
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
                  if (vehicle_no == "" || vehicle_no?.toString().length !== 10) {
                    setvehicle_error(true);
                  }
                  else {
                    dispatch(setLoaded(true));
                    if (receivedrec.length > 0) {
                      handleShow();
                    } else {
                      setis_recv(true);
                    }
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
