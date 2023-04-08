import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  // Button,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import * as Yup from "yup";
// import CreateRunsheet from "./CreateRunsheet";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import UnrunsheetsDataFormat from "../../../data/manifests/pendingForDispatch/unmanifests/UnrunsheetsDataFormat";
import Title from "../../../components/title/Title";
import PageTitle from "../../../components/pageTitle/PageTitle";
import { ServerAddress } from "../../../constants/ServerAddress";

import PendingDeliveryDataFormat from "../../../data/manifests/pendingForDispatch/manifests/PendingDeliveryDataFormat";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import Navigate from "../navigateTab/Navigate";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useStepContext } from "@mui/material";

// import Navigate from "../../runsheet/runsheetTab/Navigate";

const PendingForDispatch = () => {
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const [refresh, setrefresh] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [awbno_list, setawbno_list] = useState([])
  const [issuereceived_total, setreceived_total] = useState()
  const [issuenon_received_total, setissuenon_received_total] = useState()
  const [total_pieces, settotal_pieces] = useState()
  console.log("total_pieces----------", total_pieces)
  console.log("issuereceived_total-----------", issuereceived_total)
  console.log("issuenon_received_total--------", issuenon_received_total)
  console.log("awbno_list--1qqq--------", awbno_list)
  const user = useSelector((state) => state.authentication);
  const user_homebranch_id = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );
  const user_home_branch = useSelector(
    (state) => state.authentication.userdetails.branch_nm
  );
  const user_home_branch_city = useSelector(
    (state) => state.authentication.userdetails.branch_orgin_city
  );
  const user_home_branch_location_id = useSelector(
    (state) => state.authentication.userdetails.branch_location_id
  );

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [divide_deliverys, setdivide_deliverys] = useState([]);
  const [domestic_order, setdomestic_order] = useState([]);
  const [unmanifest_list, setunmanifest_list] = useState(domestic_order);
  const [local_list, setlocal_list] = useState(divide_deliverys);

  const [createRunsheet_list, setcreateRunsheet_list] = useState([]);

  let awb_no_list = [];
  for (let index = 0; index < createRunsheet_list.length; index++) {
    const loc = createRunsheet_list[index];
    awb_no_list.push(loc.awb_no);
  }
  const remove_transfer_list = (index) => {
    let remove_list = createRunsheet_list;
    let remove = remove_list[index];

    let remove_list1 = unmanifest_list;
    remove_list1.push(remove);
    setunmanifest_list(remove_list1);
    setcreateRunsheet_list(
      createRunsheet_list.filter((data) => data !== remove)
    );
  };
  const transfer_list = (index) => {
    let temp_list = unmanifest_list;
    let item = temp_list[index];
    let temp_list1 = createRunsheet_list;
    temp_list1.push(item);
    setcreateRunsheet_list(temp_list1);
    setunmanifest_list(unmanifest_list.filter((data) => data !== item));
  };
  //  For Fetching Branch Data Started
  const [branch_list, setbranch_list] = useState([]);
  console.log("branch_list-------", branch_list)
  const [branch_type_short, setbranch_type_short] = useState("");
  const [branch_selected, setbranch_selected] = useState("");
  const [manifest_type, setmanifest_type] = useState("Create_Manifest");
  const [branch_dest, setbranch_dest] = useState("");
  const [branch_dest_id, setbranch_dest_id] = useState("");
  const [page, setpage] = useState(1);
  console.log("branch_selected----", branch_selected)
  console.log("branch_type_short-----", branch_type_short)

  const get_branch = () => {
    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${""}&p=${branch_page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&branch_search=${branch_search}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        let temp = [];
        let temp2 = [...branch_list];
        temp = response.data.results;
        console.log("response---temp-----", temp);
        for (let index = 0; index < temp.length; index++) {
          temp2.push([
            temp[index].id,
            temp[index].name,
            temp[index].city_name,
            temp[index].location,
            // temp[index].locality_name
          ]);
        }
        temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
        setbranch_list(temp2);
      })
      .catch((err) => {
        alert(`Error While Loading Branches , ${err}`);
      });
  };

  useLayoutEffect(() => {
    get_branch();
  }, [search, page]);

  // useLayoutEffect(() => {
  //   if (branch_type_short) {
  //     branch_list.forEach((element) => {
  //       if (element[2]) {
  //         let el2 = element[2]
  //         setbranch_dest(el2);
  //         setbranch_dest_id(element[3]);
  //       }
  //     });
  //   }
  // }, [branch_type_short]);

  useLayoutEffect(() => {
    console.log("branch_dest,branch_dest", branch_dest);
  }, [branch_dest]);

  const [branch_search, setbranch_search] = useState("");
  const [branch_page, setbranch_page] = useState(1);
  //  FOr fetching Branch Data Ended
  useLayoutEffect(() => {
    setunmanifest_list(domestic_order);
  }, [domestic_order]);

  const getPendindOrders = () => {
    axios
      .get(ServerAddress + `manifest/get_domesticorder/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setdomestic_order(response.data);
      })
      .catch((err) => {
        alert(`Error Occur in Get Domestic Order , ${err}`);
      });
  };

  useEffect(() => {
    getPendindOrders();
  }, []);

  const send_manifest_data = () => {
    // let data1 = createRunsheet_list;
    // let id = [];
    // for (let index = 0; index < data1.length; index++) {
    //   const element = data1[index];
    //   id.push(element.id);
    // }
    axios
      .post(
        ServerAddress + "manifest/add_manifest/",
        {
          from_branch: user_homebranch_id,
          to_branch: branch_type_short,
          awb_no_list: awbno_list,
          orgin_branch_name: user_home_branch,
          origin_city: user_home_branch_city,
          steps: "FIRST",
          origin: user_home_branch_location_id,
          // created_by: user.id,

          destination_branch_name: branch_selected.toUpperCase(),
          destination: branch_dest_id,
          destination_city: branch_dest,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          setShow(false)
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          getPendindOrders();
          setcreateRunsheet_list([]);
          dispatch(setDataExist(`Manifest Created sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  const send_hub_data = () => {
    // let data1 = createRunsheet_list;
    // let id = [];
    // for (let index = 0; index < data1.length; index++) {
    //   const element = data1[index];
    //   id.push(element.id);
    // }
    axios
      .post(
        ServerAddress + "manifest/add_hub_manifest/",
        {
          origin_branch: user_homebranch_id,
          destination_branch: branch_type_short,
          origin_location: user_home_branch_location_id,
          destination_location: branch_dest_id,
          awb_no_list: awbno_list,
          created_by: user.id,
          destination_branch_name: branch_selected.toUpperCase(),
          origin_location_name: user_home_branch_city,
          destination_location_name: branch_dest,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          setShow(false)
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          getPendindOrders();
          setcreateRunsheet_list([]);
          dispatch(setDataExist(`Manifest  Hub Created sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  useEffect(() => {
    if (branch_selected !== "" && createRunsheet_list.length !== 0) {
      settoggle(true);
    } else {
      settoggle(false);
    }
  }, [createRunsheet_list, branch_selected, unmanifest_list]);

  useEffect(() => {
    if (createRunsheet_list.length !== 0) {
      let awb_no_list = [];
      let received = []
      let sum_received = []
      let non_received = []
      let sum_nonreceived = []
      let total_pkt = []

      for (let index = 0; index < createRunsheet_list.length; index++) {
        const element = createRunsheet_list[index];
        awb_no_list.push(element.id);
        received.push(element.issue)
        non_received.push(element.issue_notreceived)
        total_pkt.push(element.total_quantity)
      }
      for (let index = 0; index < received.length; index++) {
        const element = received[index];
        sum_received.push(element.length)
      }
      for (let index = 0; index < non_received.length; index++) {
        const element = non_received[index];
        sum_nonreceived.push(element.length)
      }
      const sumrec = sum_received.reduce((acc, curr) => acc + curr, 0);
      const sumnonrec = sum_nonreceived.reduce((acc, curr) => acc + curr, 0);
      const total_pcs = total_pkt.reduce((acc, curr) => acc + curr, 0);
      setreceived_total(sumrec)
      setissuenon_received_total(sumnonrec)
      setawbno_list(awb_no_list);
      settotal_pieces(total_pcs)
    }
  }, [createRunsheet_list, local_list, unmanifest_list])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{manifest_type === "Create_Manifest"
                ? "Create Manifest" : "Create Hub Manifest"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{`You have total "${total_pieces}" Quantity With in this "${issuereceived_total}" Pieces is Damaged and "${issuenon_received_total}" is not Received`}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"
            onClick={() =>{
              manifest_type === "Create_Manifest"
                ? send_manifest_data()
                : send_hub_data();
          }}
          
          >Save</Button>
      </Modal.Footer>
    </Modal >

      <form>

        <Navigate />
        <Title title="Pending For Dispatch" parent_title="Manifests" />
        <PageTitle page="Pending For Dispatch" />
        <div className="mt-0 m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle
                className="mb-1 header"
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Unmanifest Orders
              </CardTitle>

              <CardBody style={{ paddingTop: "0px" }}>
                <Row>
                  <div
                    className="container-fluid "
                    style={{ background: "white", height: "290px" }}
                  >
                    <div className="mb-2 row ">
                      <div className="col-sm-4">
                        <SearchList />
                      </div>
                    </div>
                    <PendingDeliveryDataFormat
                      local_list={unmanifest_list}
                      check={transfer_list}
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </div>
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle
                className="mb-1 header"
                style={{
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Create Manifest
              </CardTitle>

              <CardBody style={{ paddingTop: "5px" }}>
                <Row>
                  <Col lg={3} md={5} sm={5}>
                    <Label className="header-child">
                      Select Branch To Forward* :
                    </Label>
                    <SearchInput
                      // disable_me={isupdating && true}
                      data_list={branch_list}
                      setdata_list={setbranch_list}
                      data_item_s={branch_selected}
                      set_data_item_s={(value) => {
                        let cv = branch_list.forEach((e) => {
                          if (e[1] === value) {
                            console.log(
                              "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                              e[2]
                            );
                            setbranch_dest(e[2]);
                            setbranch_dest_id(e[3]);
                          }
                        });

                        setbranch_selected(value);
                      }}
                      set_id={setbranch_type_short}
                      setsearch_item={setbranch_search}
                      error_message={"Please select Branch To Forward"}
                      page={branch_page}
                      setpage={setbranch_page}
                    />
                  </Col>
                  <Col lg={3} md={5} sm={5}>
                    <Label className="header-child">Selected Branch Destination* :</Label>
                    <Input id="input" disabled value={branch_dest} />
                  </Col>
                  <Col
                    lg={3}
                    md={5}
                    sm={5}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <div
                      className="form-check mb-2"
                      style={{ marginTop: "25px", marginRight: "30px" }}
                    >
                      <Input
                        className="form-check-input "
                        type="radio"
                        name="delivery_type"
                        id="exampleRadios1"
                        value="Createmanifest"
                        defaultChecked
                        onClick={() => {
                          setmanifest_type("Create_Manifest");
                        }}
                      />
                      {/* <Label>Create Manifest</Label> */}
                      <Label>Through Air</Label>
                    </div>

                    <div
                      className="form-check mb-2"
                      style={{ marginTop: "25px", marginRight: "30px" }}
                    >
                      <Input
                        className="form-check-input "
                        type="radio"
                        name="delivery_type"
                        id="exampleRadios1"
                        value="Createmanifest"
                        onClick={() => {
                          setmanifest_type("Hub_To_Hub");
                        }}
                      />
                      {/* <Label>Branch Transfer</Label> */}
                      <Label>Through Vehicle</Label>
                    </div>
                  </Col>
                  <Col lg={3} md={5} sm={5} style={{ marginTop: "15px" }}>
                    <Button
                      className="btn btn-info m-1 cu_btn"
                      disabled={toggle === false}
                      onClick={() => {
                        if(issuereceived_total === 0 && issuereceived_total === 0) {
                          manifest_type === "Create_Manifest"
                          ? send_manifest_data()
                          : send_hub_data();
                        }
                        else{
                          handleShow()
                        }                      
                      
                      }}
                    >
                      {manifest_type === "Create_Manifest"
                        ? "Create Manifest"
                        : "Branch Transfer"}
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <div
                    className="container-fluid "
                    style={{
                      background: "white",
                      height: "290px",
                      marginTop: "20px",
                    }}
                  >
                    {/* DataTable */}
                    <UnrunsheetsDataFormat
                      Manifest_list={createRunsheet_list}
                      remove_list={remove_transfer_list}
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </div>
      </form>
    </>
  );
};

export default PendingForDispatch;
