import React, { useState, useEffect, useLayoutEffect } from "react";
// import "../../../assets/scss/forms/form.scss";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Input,
} from "reactstrap";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// import CreateRunsheet from "./CreateRunsheet";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { ServerAddress } from "../../../constants/ServerAddress";
import Modal from "react-bootstrap/Modal";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import EditUnmanifestDataFormat from "./addAnother/unmanifests/UnrunsheetsDataFormat";
import EditDeliveryDataFormat from "./addAnother/manifests/PendingDeliveryDataFormat";
import { useNavigate } from "react-router-dom";
import { Select } from "@mui/material";
// import "./addanother.css";

const AddAnotherOrder = ({id_m, refresh, setrefresh, edit=false}) => {
  console.log("edit-------",edit)
  console.log("id_m-----", id_m)
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  // const success = useSelector((state) => state.alert.show_alert);

  const username = useSelector((state) => state.authentication.username);
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
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [divide_deliverys, setdivide_deliverys] = useState([]);
  const [domestic_order, setdomestic_order] = useState([]);
  const [unmanifest_list, setunmanifest_list] = useState(domestic_order);
  const [local_list, setlocal_list] = useState(divide_deliverys);
  const [Show, setShow] = useState(false);
  const [success, setsuccess] = useState(false);

  const [createRunsheet_list, setcreateRunsheet_list] = useState([]);

  const handleClose = () => {
    setShow(false);
    setcreateRunsheet_list([]);
  };

  const handleShow = () => {
    setShow(true);
    setsuccess(true);
  };

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
  const [branch_type_short, setbranch_type_short] = useState("");
  const [branch_dest, setbranch_dest] = useState("");
  const [branch_dest_id, setbranch_dest_id] = useState("");
  const [page, setpage] = useState(1);
  const get_branch = () => {
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&branch_search=${search}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("branch-response", response.data);
        let temp = [];
        let temp2 = [...branch_list];
        temp = response.data.results;
        // console.log("temp",temp)
        for (let index = 0; index < temp.length; index++) {
          temp2.push([
            temp[index].id,
            temp[index].name,
            temp[index].state_name,
            temp[index].location,
          ]);
          // console.log("temp2-----------",temp2);
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
  useLayoutEffect(() => {
    // console.log("branch list ---------",branch_list)
    if (branch_type_short) {
      branch_list.forEach((element) => {
        console.log("element checking----", element);
        if (element[2]) {
          setbranch_dest(element[2]);
          setbranch_dest_id(element[3]);
        }
      });
    }
  }, [branch_type_short]);

  const [branch_search, setbranch_search] = useState("");
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
        console.log("response hello", response.data);
        setdomestic_order(response.data);
      })
      .catch((err) => {
        alert(`Error Occur in Get Domestic Order , ${err}`);
      });
  };
  useEffect(() => {
    if (success) {
      getPendindOrders();
    }
  }, [success]);

  useEffect(() => {
    setsuccess(false);
  }, [success]);

  console.log("success----------", success);

  console.log("id_m", id_m.id_m);

  const send_manifest_data = () => {
    let data1 = createRunsheet_list;
    let id = [];
    for (let index = 0; index < data1.length; index++) {
      const element = data1[index];
      id.push(element.id);
    }
    axios
      .post(
        ServerAddress + `manifest/add_manifest_order/`,
        {
          manifest_no: id_m,
          awb_no_list: id,
          steps: "FIRST",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data === "done") {
          setShow(false);
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          getPendindOrders();
          setcreateRunsheet_list([]);
          dispatch(setDataExist(`Manifest Added sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };
  console.log("unmanifest_list----------", unmanifest_list)

  return (
    <>
      <Button size={edit && "sm"} outline color={edit && "primary"} className={!edit && "btn btn-info m-1 cu_btn"} onClick={handleShow}>
        {edit ? "Edit" : "Add More"}
        
      </Button>

      <Modal
        show={Show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Another Docket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}
          <div>
            <div className="">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <h5>Unmanifest Orders</h5>
                  <CardBody style={{ padding: "0px 10px 0px 10px" }}>
                    <Row>
                      <div
                        className="container-fluid "
                        style={{ background: "white", padding: "0px" }}
                      >
                        <div className="mb-1 row ">
                          <div className="col-sm-4">
                            <SearchList />
                          </div>
                        </div>
                        <EditDeliveryDataFormat
                          local_list={unmanifest_list}
                          check={transfer_list}
                        />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div className="">
              <Col lg={12}>
                <Card className="shadow bg-white rounded">
                  <h5>Create Manifest</h5>
                  <CardBody style={{ paddingTop: "0px" }}>
                    <Row>
                      <div
                        className="container-fluid "
                        style={{
                          background: "white",
                          // height: "290px",
                          marginTop: "20px",
                        }}
                      >
                        {/* DataTable */}
                        <EditUnmanifestDataFormat
                          Manifest_list={createRunsheet_list}
                          remove_list={remove_transfer_list}
                        />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
                {/* Footer OF the Modal   */}
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <Button
                      type="button"
                      color="success"
                      onClick={() => {
                        send_manifest_data();
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div>
                    <Button type="button" color="danger" onClick={handleClose}>
                      Cancel
                    </Button>
                  </div>
                </div> */}
              </Col>
            </div>
          </div>
          {/* </form> */}
        </Modal.Body>
        <Modal.Footer>
        <Button
            variant="primary"
            onClick={() => {
              send_manifest_data();
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAnotherOrder;
