import React, { useState, useLayoutEffect, useEffect } from "react";
import "../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
// import {
//   runsheetId,
//   setActive_rn_no,
//   setFRN_Id_List,
//   setORN_Id_List,
//   setPdOrders,
//   setRnOrders,
//   setRN_Del_Id_List,
// } from "../../store/Runsheet/Change_Runsheets/actions";
// import Add_Docket from "./Add_Another_Docket/Add_Docket";
import SearchInput from "../../components/formComponent/searchInput/SearchInput";
import toTitleCase from "../../lib/titleCase/TitleCase";
import DocketInfo from "./DocketInfo";
import PageTitle from "../../components/pageTitle/PageTitle";
import Title from "../../components/title/Title";
import AddDocket from "./AddDocket";
import { ServerAddress } from "../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";

const ChangedRusheet = () => {
  const dispatch = useDispatch();
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const location = useLocation();
  console.log("location-----", location)
  const [isupdating, setisupdating] = useState(false);
  const navigate = useNavigate();
  const [runsheet, setrunsheet] = useState([]);

  //Vehicle

  const [contract_based_vehicle_no, setcontract_based_vehicle_no] = useState("");
  const [contract_based_vehicle_list, setcontract_based_vehicle_list] = useState([])
  const [contract_based_vehicle_id, setcontract_based_vehicle_id] = useState("")
  const [search_setcontract_based_vehicle, setsearch_setcontract_based_vehicle] = useState("")

  const [vehicle_type_list, setvehicle_type_list] = useState([]);
  const [vehicle_type, setvehicle_type] = useState(vehicle_type_list[0]);
  const [search_vehicle_type, setsearch_vehicle_type] = useState("");

  // Runsheet No
  const [runsheet_no, setrunsheet_no] = useState("");

  // Delivery Staff
  const [delivery_staff, setdelivery_staff] = useState("")

  //Driver
  const [driver_list, setdriver_list] = useState([]);
  const [driver_name, setdriver_name] = useState("");
  const [driver_id, setdriver_id] = useState(0);
  const [search_driver_name, setsearch_driver_name] = useState("");
  //Route
  const [route_list, setroute_list] = useState([]);
  const [defined_route_name, setdefined_route_name] = useState("")
  const [route_id, setroute_id] = useState("");
  const [search_route, setsearch_route] = useState("");

  const [route, setroute] = useState("");
  //Vehicle
  const [vehicle_no, setvehicle_no] = useState("");

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const [circle_btn1, setcircle_btn1] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  //Get Driver Name
  const getDrivers = () => {
    axios
      .get(
        ServerAddress +
        `ems/get_driver/?search=${""}&p=${page_num}&records=${data_len}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          let driver_list = response.data.results.map((v) => [
            v.id,
            toTitleCase(v.username),
          ]);
          setdriver_list(driver_list);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };
  const getRoutes = () => {
    axios
      .get(
        ServerAddress +
        `master/get_routes/?search=${""}&p=${page_num}&records=${data_len}&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          let route_list = response.data.results.map((v) => [v.id, v.name]);
          setroute_list(route_list);
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
          setcontract_based_vehicle_list(vehicles_list);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Update Runsheet
  const update_runsheet = (id) => {
    let fields_names = Object.entries({
      branch_name: user.branch_nm,
      driver_name: driver_name.toUpperCase(),
      route_name: route.toUpperCase(),
      vehicle_name: vehicle_no,
      vehicle_type: vehicle_type.toUpperCase(),
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location.state.runsheet[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    axios
      .put(
        ServerAddress + "runsheet/update_runsheet/" + id,
        {
          change_fields: change_fields,
          is_defined_route: runsheet.is_defined_route,
          defined_route_name: (defined_route_name).toUpperCase(),
          branch: user.home_branch,
          branch_name: user.branch_nm,
          route: runsheet.is_defined_route ? route_id : null,
          route_name: !runsheet.is_defined_route ? (route).toUpperCase() : "",
          vehicle_type: (vehicle_type).toUpperCase(),
          delivery_staff: vehicle_type === "Truck" ? (delivery_staff).toUpperCase() : "",
          driver_name: (driver_name).toUpperCase(),
          branch_name: user.branch_nm,
          driver: driver_id,
          vehicle_number: !runsheet.is_contract_vehicle ? (vehicle_no).toUpperCase() : "",
          // vehicle_number: vehicle_no),
          // is_contract_vehicle: is_contract_based,
          contracted_vehicle: runsheet.is_contract_vehicle ? contract_based_vehicle_id : null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Runsheet number ${runsheet.runsheet_no} Updated sucessfully`
            )
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  const handleSubmit = () => {
    update_runsheet(runsheet.id);
  };
  useEffect(() => {
    getVehicles();
    getDrivers();
    getRoutes();
  }, []);

  useLayoutEffect(() => {
    try {
      let runsheets = location.state.runsheet;
      setrunsheet(location.state.runsheet);
      setisupdating(true);
      setdriver_name(toTitleCase(runsheets.driver_name));
      setdriver_id(runsheets.driver);
      setvehicle_type(toTitleCase(runsheets.vehicle_type));
      setrunsheet_no(runsheets.runsheet_no);
      setdelivery_staff(toTitleCase(runsheets.delivery_staff))
      if (runsheets.is_defined_route) {
        setroute_id(runsheets.route);
        setdefined_route_name(toTitleCase(runsheets.defined_route_name))
      }
      else {
        setroute(toTitleCase(runsheets.route_name));
      }

      if (runsheets.is_contract_vehicle) {
        setcontract_based_vehicle_id(runsheets.contracted_vehicle)
        setcontract_based_vehicle_no(runsheets.contracted_vehicle_no)
      }
      else {
        setvehicle_no(runsheets.vehicle_number)
      }
    } catch (error) { }
  }, []);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page={"Changed Runnsheet"} />
          <Title title={"Changed Runnsheet"} parent_title="Runsheet" />
        </div>
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Runsheet Info </div>

                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle}>
                      {circle_btn ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn ? (
                <CardBody>
                  <Form>
                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child"> Runsheet No.</Label>
                          <Input
                            value={runsheet_no}
                            type="text"
                            name="runsheet_no"
                            className="form-control-md"
                            id="input"
                            placeholder="Runsheet No"
                            disabled
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child"> Vehicle Type </Label>
                          <SearchInput
                            data_list={vehicle_type_list}
                            data_item_s={vehicle_type}
                            set_data_item_s={setvehicle_type}
                            show_search={false}
                            setsearch_item={setsearch_vehicle_type}
                            disable_me={true}
                          />
                        </div>
                      </Col>
                      {runsheet.is_defined_route ?
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label> Route </Label>
                            <SearchInput
                              data_list={route_list}
                              data_item_s={defined_route_name}
                              set_data_item_s={setdefined_route_name}
                              set_id={setroute_id}
                              setsearch_item={setsearch_route}
                            />
                          </div>
                        </Col>
                        :
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Route
                            </Label>
                            <Input
                              value={route}
                              onChange={(event) => {
                                setroute(
                                  event.target.value
                                );
                              }}
                              type="text"
                              name="route"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Vehicle Number"
                            />
                          </div>
                        </Col>
                      }
                      {!runsheet.is_contract_vehicle ? (
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Vehicle Number
                            </Label>
                            <Input
                              value={vehicle_no}
                              onChange={(event) => {
                                setvehicle_no(
                                  event.target.value
                                );
                              }}
                              type="text"
                              name="vehicle_no"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Vehicle Number"
                            />
                          </div>
                        </Col>
                      ) : (
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label>Vehicle Number</Label>
                            <SearchInput
                              data_list={setcontract_based_vehicle_list}
                              data_item_s={contract_based_vehicle_no}
                              set_data_item_s={setcontract_based_vehicle_no}
                              set_id={setcontract_based_vehicle_id}
                              setsearch_item={setsearch_setcontract_based_vehicle}
                            />
                          </div>
                        </Col>
                      )}
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label> Driver </Label>
                          <SearchInput
                            data_list={driver_list}
                            data_item_s={driver_name}
                            set_data_item_s={setdriver_name}
                            set_id={setdriver_id}
                            setsearch_item={setsearch_driver_name}
                          />
                        </div>
                      </Col>
                      {vehicle_type === "Truck" &&
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Delivery Staff
                            </Label>
                            <Input
                              value={delivery_staff}
                              onChange={(event) => {
                                setdelivery_staff(
                                  event.target.value
                                );
                              }}
                              type="text"
                              name="delivery_staff"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Staff Name"
                            />
                          </div>
                        </Col>
                      }
                      <Col md={4} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Pod Image </Label>
                          <Input id="input" type="file" />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              ) : null}
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Docket Info
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AddDocket runsheet={isupdating && runsheet} />
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
                <CardBody style={{ padding: "1px" }}>
                  <DocketInfo
                    runsheet_orders={isupdating && runsheet.orders}
                    runsheet_no={isupdating && runsheet.runsheet_no}
                  />
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={() => handleSubmit()}
              >
                Update
              </Button>

              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={() => navigate("/runsheet/allrunsheet")}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default ChangedRusheet;
