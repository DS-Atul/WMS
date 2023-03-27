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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
import "./addanother.css";

const AddAnotherOrder = (id_m, refresh, setrefresh) => {
  console.log("id_m-------",id_m)
  const [success, setsuccess] = useState(false);

  // Additional Fields
  const search = useSelector((state) => state.searchbar.search_item);
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
  const [Show, setShow] = useState(false);

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
  const [branch_selected, setbranch_selected] = useState("");
  const [branch_dest, setbranch_dest] = useState("");
  const [branch_dest_id, setbranch_dest_id] = useState("");
  const [page, setpage] = useState(1);

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
    if (success) {
    getPendindOrders();
    }
  }, [success]);
  useEffect(() => {
    setsuccess(false);
  }, [success]);


  
  const send_hub_data = () => {
    let data1 = createRunsheet_list;
    let id = [];
    for (let index = 0; index < data1.length; index++) {
      const element = data1[index];
      id.push(element.id);
    }
    axios
      .post(
        ServerAddress + "manifest/add_hub_order/",
        {
          hub_transfer_no:  id_m.id_m,
          // from_branch: user_homebranch_id,
          // destination: branch_dest_id,
          // to_branch: branch_dest_id,
          awb_no_list: id,
          // orgin_branch_name: user_home_branch,
          // destination_branch_name: branch_selected,
          // origin_city: user_home_branch_city,
          // destination_city: branch_dest,
          steps: "FIRST",
          // origin: user_home_branch_location_id,
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
          dispatch(setDataExist(`Order Added Sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };


  return (
    <>
      <Button className="btn btn-info m-1 cu_btn" onClick={handleShow}>
        Add More
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
          <form>
            <div className="mt-0 m-3">
              <Col lg={12}>
                <div className="cust-header">Unmanifest Orders</div>
                <CardBody style={{ paddingTop: "0px" }}>
                  <Row>
                    <div
                      className="container-fluid "
                      style={{ background: "white", maxHeight: "290px" }}
                    >
                      <div className="mb-2 row ">
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
              </Col>
            </div>
            <div className="">
              <Col lg={12}>
                <div className="cust-header">Manifest Orders</div>
                <Row>
                  <div
                    className="container-fluid "
                    style={{
                      background: "white",
                         maxHeight: "290px",
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              send_hub_data();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAnotherOrder;
