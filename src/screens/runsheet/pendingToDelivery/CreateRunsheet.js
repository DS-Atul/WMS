import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  Col,
  Row,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import toTitleCase from "../../../lib/titleCase/TitleCase";

function CreateRunsheet({ awb_numbers, issuereceived_total, issuenon_received_total, total_pieces }) {
  console.log("awb_numbers------", awb_numbers)
  console.log("issuereceived_total--------", issuereceived_total)
  console.log("issuenon_received_total--------", issuenon_received_total)
  console.log("total_pieces-----", total_pieces)
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [show, setShow] = useState(false);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const user = useSelector((state) => state.authentication.userdetails);
  const navigate = useNavigate();

  //Vehicle Type
  const [vehicle_type, setvehicle_type] = useState("TRUCK")
  const [delivery_staff, setdelivery_staff] = useState("")

  //Route
  const [route_list, setroute_list] = useState([]);
  const [route, setroute] = useState("");
  const [defined_route_name, setdefined_route_name] = useState("")
  const [route_id, setroute_id] = useState("");
  const [search_route, setsearch_route] = useState("");
  const [route_loaded, setroute_loaded] = useState(false)
  const [route_count, setroute_count] = useState(1)
  const [route_bottom, setroute_bottom] = useState(103)
  const [route_page, setroute_page] = useState(1)

  //Vehicle
  const [veh_list, setveh_list] = useState([]);
  const [vehicle_no, setvehicle_no] = useState("");
  const [vehicle_id, setvehicle_id] = useState(0);
  const [search_vehicle_no, setsearch_vehicle_no] = useState("");
  const [close, setclose] = useState(false)
  //Driver
  const [driver_list, setdriver_list] = useState([]);
  const [driver_name, setdriver_name] = useState("");
  const [driver_id, setdriver_id] = useState(0);
  const [search_driver_name, setsearch_driver_name] = useState("");
  const [driver_count, setdriver_count] = useState(1)
  const [driver_page, setdriver_page] = useState(1)
  const [driver_bottom, setdriver_bottom] = useState(103)
  const [driver_loaded, setdriver_loaded] = useState(false)

  //Used for error
  const [route_error, setroute_error] = useState(false);
  const [vehicle_no_error, setvehicle_no_error] = useState(false);
  const [driver_name_error, setdriver_name_error] = useState(false);
  const [contract_base_vehicle_error, setcontract_base_vehicle_error] =
    useState(false);

  const [is_contract_based, setis_contract_based] = useState(false);
  const [contract_based_vehicle_no, setcontract_based_vehicle_no] =
    useState("");

  const [defined_route, setdefined_route] = useState(false);

  const awb_no_list = awb_numbers;

  const handleClose = () => {
    setShow(false)
    setclose(false)
  };
  const handleShow = () => setShow(true);
  const handleSuccess = () => {
    // send_runsheet_data();
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {},

    onSubmit: (values) => {
      send_runsheet_data(values);
    },
  });
  // Post Runsheet Data
  const send_runsheet_data = () => {
    axios
      .post(
        ServerAddress + "runsheet/add_runsheet/",
        {
          branch: user.home_branch,
          route: defined_route ? route_id : null,
          route_name: !defined_route ? (route).toUpperCase() : "",
          defined_route_name: (defined_route_name).toUpperCase(),
          is_defined_route: defined_route,
          vehicle_type: "FIXED VEHICLE",
          driver_name: (driver_name).toUpperCase(),
          branch_name: user.branch_nm,
          driver: driver_id,
          contracted_vehicle: is_contract_based ? vehicle_id : null,
          vehicle_number: !is_contract_based ? (vehicle_no).toUpperCase() : "",
          is_contract_vehicle: is_contract_based,
          // contracted_vehicle_no: (contract_based_vehicle_no).toUpperCase(),
          awb_no_list: awb_no_list,
          vehicle_type: vehicle_type,
          delivery_staff: (delivery_staff).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("done", response.data);
        if (response.data.status === "success") {
          setShow(false);
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Runsheet Created sucessfully`));
          navigate("/runsheet/allrunsheet");
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  const getRoutes = () => {
    let route_lists = []
    axios
      .get(
        ServerAddress +
        `master/get_routes/?search=${""}&p=${route_page}&records=${10}&name_search=${search_route}&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setroute_loaded(false);
        } else {
          setroute_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (route_page == 1) {
            route_lists = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            route_lists = [
              ...route_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setroute_count(route_count + 2);
          setroute_list(route_lists);
        }
        else {
          setroute_list([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const getVehicles = () => {
    axios
      .get(ServerAddress + `vms/get_vehicle/?p=1&records=10`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          let vehicles_list = response.data.results.map((v) => [
            v.id,
            v.registeration_no,
          ]);
          setveh_list(vehicles_list);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const getDrivers = () => {
    let driver_lists = []
    axios
      .get(
        ServerAddress +
        `ems/get_driver/?search=${search_driver_name}&p=${driver_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setdriver_loaded(false);
        } else {
          setdriver_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (driver_page == 1) {
            driver_lists = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.username),
            ]);
          } else {
            driver_lists = [
              ...driver_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.username)]),
            ];
          }
          setdriver_count(driver_count + 2);
          setdriver_list(driver_lists);
        }
        else {
          setdriver_list([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  useEffect(() => {
    getRoutes();
  }, [search_route, route_page]);

  useEffect(() => {
    getVehicles();
  }, []);

  useEffect(() => {
    getDrivers();
  }, [search_driver_name, driver_page]);



  useEffect(() => {
    if (route != "") {
      setroute_error(false);
    }
    if (vehicle_no != "") {
      setvehicle_no_error(false);
    }
    if (driver_name != "") {
      setdriver_name_error(false);
    }
    if (contract_based_vehicle_no != "") {
      setcontract_base_vehicle_error(false);
    }
  }, [route, vehicle_no, driver_name, contract_based_vehicle_no]);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        disabled={awb_no_list.length === 0}
      >
        Create Runsheet
      </Button>

      <Modal show={show} onHide={handleClose}>
        {/* contentClassName="content-test" */}
        <Modal.Header closeButton>
          <Modal.Title>Create Runsheet</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            console.log("run");
            e.preventDefault();
            if (route == "") {
              setroute_error(true);
            }
            if (vehicle_no == "") {
              setvehicle_no_error(true);
            }
            if (driver_name == "") {
              setdriver_name_error(true);
            }
            if (contract_based_vehicle_no == "" && is_contract_based) {
              setcontract_base_vehicle_error(true);
            }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <Modal.Body>
            {/* <Label>Is Defined Row</Label> */}
            {(issuereceived_total === 0 && issuenon_received_total === 0) || close ?
              <>
                <div >
                  <Label>
                    Vehicle Type
                  </Label>
                  <Row>
                    <Col md={4} sm={5}>
                      <div className="form-check mb-2">
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="vehicle_type"
                          id="exampleRadios3"
                          value="TRUCK"
                          onClick={() => {
                            setvehicle_type("TRUCK");
                          }}
                          checked={vehicle_type === "TRUCK"}
                          readOnly={true}
                        />
                        <Label
                          className="form-check-label input-box"
                          htmlFor="exampleRadios2"
                        >
                          Truck
                        </Label>
                      </div>
                    </Col>
                    <Col md={6} sm={7}>
                      <div className="form-check mb-2">
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="vehicle_type"
                          id="exampleRadios4"
                          value="BIKE"
                          onClick={() => {
                            setvehicle_type("BIKE");
                          }}
                          checked={vehicle_type === "BIKE"}
                          readOnly={true}
                        />

                        <Label
                          className="form-check-label input-box"
                          htmlFor="exampleRadios1"
                        >
                          Bike
                        </Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Label>
                    {" "}
                    Route (Is Defined Route{" "}
                    <span onClick={() => setdefined_route(!defined_route)}>
                      {defined_route ? (
                        <FiCheckSquare size={15} />
                      ) : (
                        <FiSquare size={15} />
                      )}
                    </span>
                    )
                  </Label>

                  {defined_route ? (
                    <SearchInput
                      data_list={route_list}
                      setdata_list={setroute_list}
                      data_item_s={defined_route_name}
                      set_data_item_s={setdefined_route_name}
                      set_id={setroute_id}
                      page={route_page}
                      setpage={setroute_page}
                      search_item={search_route}
                      setsearch_item={setsearch_route}
                      loaded={route_loaded}
                      count={route_count}
                      bottom={route_bottom}
                      setbottom={setroute_bottom}
                    />
                  ) : (
                    <Input
                      value={route}
                      onChange={(val) => {
                        setroute(val.target.value);
                      }}
                      type="text"
                      className="form-control-md"
                      id="input"
                      placeholder="Enter route"
                    />
                  )}

                  {/* {route_error && (
                    <div className="mt-1 error-text" color="danger">
                      Please Select Route
                    </div>
                  )} */}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Label> Contract Based Vehicle :
                    <span onClick={() => setis_contract_based(!is_contract_based)}>
                      {is_contract_based ? (
                        <FiCheckSquare size={15} />
                      ) : (
                        <FiSquare size={15} />
                      )}
                    </span>
                  </Label>
                </div>

                {is_contract_based ? (
                  <div>
                    <SearchInput
                      data_list={veh_list}
                      data_item_s={vehicle_no}
                      set_data_item_s={setvehicle_no}
                      set_id={setvehicle_id}
                      setsearch_item={setsearch_vehicle_no}
                    />
                    {contract_base_vehicle_error && (
                      <div className="mt-1 error-text" color="danger">
                        Please Select Vehicle
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Input
                      value={vehicle_no}
                      onChange={(val) => {
                        setvehicle_no(val.target.value);
                      }}
                      type="text"
                      className="form-control-md"
                      id="input"
                      placeholder="Enter Vehicle Number"
                    />
                    {/* <SearchInput
                  data_list={veh_list}
                  data_item_s={vehicle_no}
                  set_data_item_s={setvehicle_no}
                  set_id={setvehicle_id}
                  setsearch_item={setsearch_vehicle_no}
                /> */}
                    {vehicle_no_error && (
                      <div className="mt-1 error-text" color="danger">
                        Please Select Vehicle
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: "10px" }}>
                  <Label> Driver *:</Label>
                  <SearchInput
                    data_list={driver_list}
                    setdata_list={setdriver_list}
                    data_item_s={driver_name}
                    set_data_item_s={setdriver_name}
                    set_id={setdriver_id}
                    search_item={search_driver_name}
                    setsearch_item={setsearch_driver_name}
                    page={driver_page}
                    setpage={setdriver_page}
                    loaded={driver_loaded}
                    count={driver_count}
                    bottom={driver_bottom}
                    setbottom={setdriver_bottom}
                  />
                  {driver_name_error && (
                    <div className="mt-1 error-text" color="danger">
                      Please Select Driver
                    </div>
                  )}
                </div>
                {vehicle_type === "TRUCK" &&
                  <div style={{ marginTop: "10px" }}>
                    <Label> Delivery Staff :</Label>
                    <Input
                      value={delivery_staff}
                      onChange={(val) => {
                        setdelivery_staff(val.target.value);
                      }}
                      type="text"
                      className="form-control-md"
                      id="input"
                      placeholder="Enter Staff Name"
                    />
                  </div>
                }
              </>
              :
              <div>{`You have total "${total_pieces}" Quantity With in this "${issuereceived_total}" Pieces is Damaged and "${issuenon_received_total}" is not Received So, Do you want to Create Runsheet ?`}</div>
            }
          </Modal.Body>

          <Modal.Footer>
            {(issuereceived_total === 0 && issuenon_received_total === 0) || close ?
              <Button type="submit">
                Save
              </Button>
              :
              <Button type="button" onClick={() => setclose(true)}>
                Yes
              </Button>
            }
            <Button type="button" variant="secondary" onClick={handleClose}>
              {(issuereceived_total === 0 && issuenon_received_total === 0) ? "Close" : "Cancel"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default CreateRunsheet;
