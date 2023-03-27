/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
  FormFeedback,
  Form,
  FormGroup
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { Button } from "react-bootstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import TransferList from "../../../components/formComponent/transferList/TransferList";

function AddRoute() {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();
  const [routes, setroutes] = useState([]);

  // Liocation
  const [location_list, setlocation_list] = useState([]);
  const [location, setlocation] = useState([]);
  const [location_id, setlocation_id] = useState([]);
  const [location_page, setlocation_page] = useState(1);
  const [location_search, setlocation_search] = useState("");

  //state used for get data for update
  const [isupdating, setisupdating] = useState(false);
  const [routedata, setroutedata] = useState("");
  console.log("routedadad---", routedata);
  //USed for error
  const [location_error, setlocation_error] = useState(false);

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: toTitleCase(routedata.name) || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Branch name is required"),
    }),

    onSubmit: (values) => {
      isupdating ? update_route(values) : add_route(values);
    },
  });

  // Get Route City
  const get_route_cities = (route_id, cities_list) => {
    axios
      .get(ServerAddress + "master/get_routecities/?route_id=" + route_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        let temp = [];
        console.log("response Rurr---", response.data);
        for (let index = 0; index < response.data.cities.length; index++) {
          const loc = response.data.cities[index];
          temp.push([
            loc.pincode,
            toTitleCase(loc.pincode__city__city) +
              "-" +
              toTitleCase(loc.pincode__city__state__state) +
              "-" +
              loc.pincode__pincode,
          ]);
        }
        setlocation(temp);
        let temp3 = [];
        let other_cities = [];

        for (let index = 0; index < temp.length; index++) {
          const element2 = temp[index][1];
          temp3.push(element2);
        }

        for (let index = 0; index < cities_list.length; index++) {
          const element = cities_list[index][1];
          if (temp3.includes(element) === false) {
            other_cities.push(cities_list[index]);
          }
        }
        setlocation_list(other_cities);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  // Get Operating City
  const get_locations = () => {
    let temp = [...location_list];
    axios
      .get(
        ServerAddress +
          `master/all_pincode/?search=${""}&p=${page_num}&records=${data_len}&pincode_search=${[
            location_search,
          ]}&place_id=all&filter_by=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        for (let index = 0; index < response.data.results.length; index++) {
          const loc = response.data.results[index];
          temp.push([
            loc.id,
            toTitleCase(loc.city_name) +
              "-" +
              toTitleCase(loc.state_name) +
              "-" +
              loc.pincode,
          ]);
        }
        temp = [...new Set(temp.map((v) => `${v}`))].map((v) => v.split(","));
        setlocation_list(temp);
        try {
          get_route_cities(location_data.state.route.id, temp);
        } catch (error) {}
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  // Post Route Data
  const add_route = (values) => {
    axios
      .post(
        ServerAddress + "master/add_route/",
        {
          name: String(values.name).toUpperCase(),
          pincode: location_id,
          created_by: user.id,
          //For C&M
          cm_current_department: user.user_department,
          cm_current_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
          cm_transit_status: (user.user_department_name === "ADMIN") ? 'NOT APPROVED' : (current_status).toUpperCase(),
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
            setDataExist(
              `Route  "${toTitleCase(values.name)}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/master/routes");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Route Name "${toTitleCase(values.name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Commodity  Data ${error}`);
      });
  };

  // Update Branch
  const update_route = (values) => {
    let id = routedata.id;
    let op_city_id_list2 = [];
    let temp_lis2 = [];
    console.log("location-111--", location);
    for (let index = 0; index < location.length; index++) {
      const op_city_id = location[index];
      op_city_id_list2.push(op_city_id[0]);
    }
    temp_lis2 = [...new Set(location.map((v) => `${v}`))].map((v) =>
      parseInt(v.split(","))
    );

    let city_id_list = temp_lis2.flat();
    let fields_names = Object.entries({
      name: values.name,
      pincode: city_id_list,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.route[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    axios
      .put(
        ServerAddress + "master/update_route/" + id,
        {
          name: String(values.name).toUpperCase(),
          pincode: city_id_list,
          modified_by: user.id,
          change_fields: change_fields,
          //For C&M
          cm_transit_status: status_toggle === true ? current_status : "",
          cm_current_status: (current_status).toUpperCase(),
          cm_remarks: ""
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setDataExist(`Branch "${values.name}" Updated Sucessfully`));
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/master/routes");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Route name "${toTitleCase(values.name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function () {
        alert("Error Error While Updateing branches");
      });
  };

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/routes");
  };

  // useEffect(() => {
  //   try {
  //     setroutes(location.state.route);
  //     setisupdating(true);
  //   } catch (error) {}
  //
  // }, []);
  console.log("location-----", location);
  useEffect(() => {
    let id = location.map((data) => data[0]);
    setlocation_id(id);
  }, [location]);

  useEffect(() => {
    if (location !== "") {
      setlocation_error(false);
    }
  }, [location]);

  //This useLayoutEffect is used to get data fro update
  useLayoutEffect(() => {
    try {
      setroutedata(location_data.state.route);
      setisupdating(true);
    } catch (error) {}
  }, []);

  useEffect(() => {
    get_locations();
  }, [location_page, location_search]);

  //For Checker Maker
  const [current_status, setcurrent_status] = useState("");
  const [status_toggle, setstatus_toggle] = useState(false)
  const [message, setmessage] = useState("")
  const [message_error, setmessage_error] = useState(false);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setmessage_error(false)
  };

  useEffect(() => {
    if (user.user_department_name === "ADMIN") {
      setcurrent_status("NOT APPROVED")
      setstatus_toggle(true)
    }

    else if (user.user_department_name === "ACCOUNTANT" || user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER" || user.is_superuser) {
      setcurrent_status("APPROVED")
      setstatus_toggle(true)
    }
    else {
      setcurrent_status("NOT APPROVED")
      // setstatus_toggle(false)
    }

  }, [user, isupdating])

  const update_routestatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_route/" + id,
        {

          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          change_fields: {},
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          // dispatch(Toggle(true))
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          navigate("/master/routes");
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message == "") {
      setmessage_error(true);
    }
    else {
      update_routestatus(routedata.id)
      setShow(false)
    }
  }

  return (
    <div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">
              Text Area
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value)
              }}
            />
            <div className="mt-1 error-text" color="danger">
              {message_error ? "Please Enter Reject Resion" : null}
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (location == "") {
            setlocation_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page={isupdating ? "Update Route" : "Add Route"} />
          <Title
            title={isupdating ? "Update Route" : "Add Route"}
            parent_title="Masters"
          />
        </div>

        {/* Routes Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Route Info
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
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Name* </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name
                              ? true
                              : false
                          }
                          type="text"
                          className="form-control-md"
                          id="input"
                          name="name"
                          placeholder="Enter Name"
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Label className="header-child">Pincode* </Label>
                    <Col lg={12} md={12} sm={12}>
                      <TransferList
                        list_a={location_list}
                        setlist_a={setlocation_list}
                        list_b={location}
                        setlist_b={setlocation}
                        page={location_page}
                        setpage={setlocation_page}
                        error_message={"Please Select Any Option"}
                        setsearch_item={setlocation_search}
                      />
                      {location_error ? (
                        <div style={{ color: "#f46a6a", fontSize: "10.4px" }}>
                          Please Select any pincode
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Footer */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
            <button
                type="submit"
                className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
              >
                {isupdating && (user.user_department_name === "ADMIN") ? "Update" : !isupdating ? "Save" : "Approved"}
              </button>

              {isupdating && (user.user_department_name !== "ADMIN" && !user.is_superuser) &&
                <button
                  type="button"
                  className="btn btn-danger m-1"
                  onClick={handleShow}
                >
                  Rejected
                </button>
              }

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
      </Form>
    </div>
  );
}

export default AddRoute;
