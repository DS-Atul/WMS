/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  FormFeedback,
} from "reactstrap";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

const AddDocketStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [page, setpage] = useState(1);

  const [isupdating, setisupdating] = useState(false);

  const location = useLocation();
  const order_docket_no = useSelector(
    (state) => state.order.cur_order_docket_no
  );

  // Date And Time
  const [added_date_time, setadded_date_time] = useState("");

  // Status
  const [status_list, setstatus_list] = useState([
    "SHIPMENT ORDER RECEIVED",
    "SHIPMENT PICKED UP",
    "SHIPMENT ARRIVED AT HUB",
    "SHIPMENT IN TRANSIT",
    "SHIPMENT ARRIVED AT DESTINATION HUB",
    "SHIPMENT OUT FOR DELIVERY",
    "SHIPMENT DELIVERED",
  ]);
  const [status, setstatus] = useState("");

  const [cant_change_status, setcant_change_status] = useState(false);
  const [ord_status, setord_status] = useState(null);

  // Transit Status
  const [transit_status_list, settransit_status_list] = useState([
    "Shipment Departed",
    "Shipment Arrived",
    "Shipment Ready for Dispatch",
  ]);
  const [transit_status, settransit_status] = useState(null);
  const [transit_status_short, settransit_status_short] = useState("");

  // Transit To Branch
  const [transit_to_branch_list, settransit_to_branch_list] = useState([]);
  const [transit_to_branch, settransit_to_branch] = useState(null);
  const [transit_to_branch_id, settransit_to_branch_id] = useState("");
  const [search_transit_branch, setsearch_transit_branch] = useState("");

  // Image
  const [selectedFile, setSelectedFile] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const handleClose = () => setOpenCrop(false);
  const [OpenCrop, setOpenCrop] = useState(false);

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  //validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      remarks: location.state.order.transit_remarks || "",
    },

    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      if (added_date_time == "") {
        alert("Please Add Added Date and Time");
      } else if (status == "") {
        alert("Please Add Status");
      } else if (status == "SHIPMENT IN TRANSIT" && transit_status == null) {
        alert("Please Add Transist Status");
      } else if (status == "SHIPMENT IN TRANSIT" && transit_to_branch == null) {
        alert("Please Add Transist To Branch");
      } else {
        add_order_status(values);
      }
    },
  });

  //  For Handling File Field
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setphotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const [status_item, setstatus_item] = useState([]);
  const get_order_status = (docket_no) => {
    let temp_list = [];
    axios
      .post(
        ServerAddress + "booking/get-status/" + docket_no,
        {
          body: "nothing",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        let resp = response.data;
        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          temp_list.push(element.status);
        }
        setstatus_item(temp_list);
        console.log("Status", status_item);
        // setorder_status_list(response.data);
      })
      .catch((error) => {
        alert(`Error Happen while Geting Order Status Data ${error}`);
      });
  };

  // Get Transit Branch
  const getBranches = () => {
    let temp3 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&vendor=${[
            "",
          ]}&branch_search=${search_transit_branch}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          data = response.data.results;
          for (let index = 0; index < data.length; index++) {
            temp3.push([data[index].id, data[index].name]);
          }
          temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          settransit_to_branch_list(temp3);
        }
      })
      // .then((resp) => {
      //   sethome_branch_list(resp.data);
      // })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  useLayoutEffect(() => {
    getBranches();
  }, [page, search_transit_branch]);
  // Set Order Status
  const setOrderStatus = () => {
    let break_me = false;
    let temp_status_list = [];
    for (let index = 0; index < status_list.length; index++) {
      const stat = status_list[index];
      if (stat === location.state.order.status) {
        temp_status_list = [];
        break_me = true;
      } else {
        temp_status_list.push(stat);
        if (break_me) {
          break;
        }
      }
    }
    setstatus_list(temp_status_list);
  };

  // Add Order Status
  const add_order_status = (values) => {
    axios
      .post(
        ServerAddress + "booking/add_orderstatus/",
        {
          cal_type: location.state.order.local_cal_type,
          status: String(status).toUpperCase(),
          transit_status: transit_status,
          transit_branch: transit_to_branch_id,
          transit_remarks: values.remarks,
          docket: location.state.order.docket
            ? [location.state.order.docket]
            : [location.state.order.id],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText == "Created") {
          // dispatch(setLastActiveOrderStatus(status));
          dispatch(
            setDataExist(
              `New Order Status '${status}' for Order ${
                location.state.order
                  ? location.state.order.docket_no
                  : location.state.order.docket_no
              } Added Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Order Status  Data ${error}`);
      });
  };

  useEffect(() => {
    let date = new Date();
    let added_date_time =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());
    let month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    let year = String(date.getFullYear());

    let hour =
      String(date.getHours()).length === 1
        ? "0" + String(date.getHours())
        : String(date.getHours());
    let minutes =
      String(date.getMinutes()).length === 1
        ? "0" + String(date.getMinutes())
        : date.getMinutes();
    setadded_date_time(
      `${year}-${month}-${added_date_time}T${hour}:${minutes}`
    );
  }, []);

  useEffect(() => {
    // get_transit_to_branch();
  }, []);

  useLayoutEffect(() => {
    setOrderStatus();
    try {
      let status_ul = location.state.order;
      let status_n = location.state.order.status;
      if (location.state.order.status) {
        setisupdating(true);
      }
      if (
        location.state.index !== location.state.status_len - 1 ||
        status_n == "SHIPMENT ARRIVED AT HUB" ||
        status_n == "SHIPMENT IN TRANSIT" ||
        status_n == "SHIPMENT ARRIVED AT DESTINATION HUB"
      ) {
        setcant_change_status(true);
      }
      setord_status(status_ul);

      setstatus(status_ul.status);
    } catch {}
  }, []);

  useEffect(() => {
    get_order_status(location.state.order.docket_no);
  }, [location.state.order.docket_no]);
  console.log("location----", location)
  useLayoutEffect(() => {
    if (location.state.type == "add"&& status_item !== []) {
      let a = status_list.filter((v) => status_item.indexOf(v) === -1);
      setstatus_list(a);
    }
  }, [status_item]);

  return OpenCrop ? (
    <Modal show={OpenCrop} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crop Your Image:</Modal.Title>
      </Modal.Header>

      {/* <CropEasy {...{photoURL,setOpenCrop,setphotoURL,setSelectedFile}} /> */}
    </Modal>
  ) : (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle
            page={isupdating ? "Update Docket Status" : "Add Docket Status"}
          />
          <Title
            title={isupdating ? "Update Docket Status" : "Add Docket Status"}
            parent_title="Bookings"
          />
        </div>
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Traking Details</div>

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
                    {/* Add coloader */}

                    <Row>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Docket Number*</Label>
                          <Input
                            className="form-control-md"
                            id="input"
                            value={order_docket_no}
                            disabled
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Date and Time:</Label>
                          <input
                            type="datetime-local"
                            className="form-control d-block form-control-md"
                            id="input"
                            //  value="2018-07-22"
                            value={added_date_time}
                            onChange={(val) => {
                              setadded_date_time(val.target.value);
                            }}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Status*:</Label>
                          <NSearchInput
                            data_list={status_list}
                            data_item_s={status}
                            set_data_item_s={setstatus}
                            show_search={false}
                            error_message={"Select status"}
                            disable_me={
                              location.state.order.status
                                ? cant_change_status
                                : false
                            }
                          />
                        </div>
                      </Col>

                      {status == "SHIPMENT IN TRANSIT" ? (
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Transit Status *
                            </Label>
                            <NSearchInput
                              data_list={transit_status_list}
                              data_item_s={transit_status}
                              set_data_item_s={settransit_status}
                              show_search={false}
                              error_message={"Select transit type"}
                            />
                          </div>
                        </Col>
                      ) : null}

                      {status === "SHIPMENT IN TRANSIT" ? (
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">
                              Transit Branch*:
                            </Label>
                            <SearchInput
                              data_list={transit_to_branch_list}
                              setdata_list={settransit_to_branch_list}
                              data_item_s={transit_to_branch}
                              set_data_item_s={settransit_to_branch}
                              set_id={settransit_to_branch_id}
                              setsearch_item={setsearch_transit_branch}
                              error_message={"Select transit type"}
                            />
                          </div>
                        </Col>
                      ) : null}

                      <Col lg={8} md={8} sm={8}>
                        <div className="mb-2">
                          <Label className="header-child">Remarks:</Label>
                          <div>
                            <Input
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.remarks || ""}
                              invalid={
                                validation.touched.remarks &&
                                validation.errors.remarks
                                  ? true
                                  : false
                              }
                              type="text"
                              name="remarks"
                              className="form-control-md"
                              id="input"
                              placeholder="Enter Remarks"
                            />
                            {validation.touched.remarks &&
                            validation.errors.remarks ? (
                              <FormFeedback type="invalid">
                                {validation.errors.remarks}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button type="submit" className="btn btn-info m-1 cu_btn"
              disabled={status==="SHIPMENT ORDER RECEIVED"}
              >
                {isupdating ? "Update" : "Save"}
              </Button>

              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </form>
    </div>
  );
};

export default AddDocketStatus;
