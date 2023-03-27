import React, { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
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
import { useDispatch, useSelector } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import * as XLSX from "xlsx";
const Add_Commodity = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const userdepartment = useSelector(
    (state) => state.authentication.userdepartment
  );
  const location = useLocation();
  const [isupdating, setisupdating] = useState(false);
  const [commodity, setcommodity] = useState("");

  // Commodity
  const [commodity_type_id, setcommodity_type_id] = useState(0);
  const [commodity_type_list, setcommodity_type_list] = useState([]);
  const [approved_entry, setapproved_entry] = useState(false);
  const [commodity_type, setcommodity_type] = useState("");
  const [commodity_type_error, setcommodity_type_error] = useState(false);
  const [commodity_type_page, setcommodity_type_page] = useState(1);
  const [commodity_type_search_item, setcommodity_type_search_item] =
    useState("");
  const [other_commodity_type, setother_commodity_type] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      commodity_name: toTitleCase(commodity.commodity_name) || "",
    },
    validationSchema: Yup.object({
      commodity_name: Yup.string().required("Commodity name is required"),
    }),
    onSubmit: (values) => {
      isupdating ? update_commodity(values) : add_commodity(values);
    },
  });
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  useEffect(() => {
    try {
      setcommodity(location.state.commodity);
      setisupdating(true);
      setcommodity_type(toTitleCase(location.state.commodity.type));
      setcommodity_type_id(location.state.commodity.commodity_type);
      if (location.state.commodity.current_status === "Approved") {
        setapproved_entry(true);
      }
    } catch (error) { }
  }, []);

  //Get Commodity Type
  const getCommodityType = () => {
    let commodity_list = [...commodity_type_list];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_commoditytype/?search=${""}&p=${commodity_type_page}&records=${10}&commodity_type_search=${commodity_type_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (commodity_type_page == 1) {
            commodity_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.type),
            ]);
          } else {
            commodity_list = [
              ...commodity_type_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.type)]),
            ];
          }
        }
        let a_index = commodity_list.indexOf("Add New");
        if (a_index != -1) {
          commodity_list.splice(a_index, 1);
        }
        commodity_list = [...new Set(commodity_list.map((v) => `${v}`))].map(
          (v) => v.split(",")
        );
        commodity_list.push("Add New");

        setcommodity_type_list(commodity_list);

      })
      .catch((err) => {
        alert(`Error Occur in Get Commodity Type, ${err}`);
      });
  };

  const setCommodityType = () => {
    axios
      .post(
        ServerAddress + "master/add_commoditytype/",
        {
          type: toTitleCase(other_commodity_type).toUpperCase(),
          created_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status !== "duplicated") {
          if (response.statusText === "Created") {
            setcommodity_type_id(response.data.commoditytype_id);
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commodity Type ${toTitleCase(
                  other_commodity_type
                )} Added Sucessfully`
              )
            );
            dispatch(setAlertType("success"));
            setcommodity_type(toTitleCase(other_commodity_type));
            getCommodityType();
            // getDistrict();
          }
        } else {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Commodity Type ${toTitleCase(
                other_commodity_type
              )} Already Exist`
            )
          );
          dispatch(setAlertType("warning"));
          if (isupdating) {
            setcommodity_type(toTitleCase(location.type));
          } else {
            setcommodity_type("");
          }
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Commodity Type Data ${error}`);
      });
  };

  //Post Data
  const add_commodity = (values) => {
    axios
      .post(
        ServerAddress + "master/add_commodity/",
        {
          commodity_type: commodity_type_id,
          commodity_name: toTitleCase(values.commodity_name).toUpperCase(),
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
              `Commidity  "${toTitleCase(
                values.commodity_name
              )}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/master/commodities");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Commodity Name "${toTitleCase(
                values.commodity_name
              )}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Commodity  Data ${error}`);
      });
  };

  // Update Data

  const update_commodity = (values) => {
    let id = commodity.id;
    let fields_names = Object.entries({
      commodity_name: values.commodity_name,
      type: commodity_type,
    });
    let change_fields = {};
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location.state.commodity[`${ele[0]}`];
        let new_v = ele[1];
        if (prev !== new_v.toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toUpperCase();
        }
        if (j === fields_names.length - 1) resolve();
      }
    });
    prom.then(() => {
      axios
        .put(
          ServerAddress + "master/update_commodity/" + id,
          {
            commodity_type: commodity_type_id,
            commodity_name: toTitleCase(values.commodity_name).toUpperCase(),
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
          console.log(response.data)
          if (response.data.status === "success") {
            dispatch(setToggle(true));
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commidity  "${toTitleCase(
                  values.commodity_name
                )}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            navigate("/master/commodities");
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `Commodity Name "${toTitleCase(
                  values.commodity_name
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While  Updateing commidity");
        });
    });
  };
  const navigate = useNavigate();
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/commodities");
  };
  // Used to History
  const handlClk = () => {
    navigate(
      "/master/commodities/commodityHistory/CommodityHistoryPage",
      // "/utilities/historyPage/HistoryPage",
     {
      state: { commodity: commodity },
    });
  };

  useEffect(() => {
    getCommodityType();
  }, [commodity_type_page, commodity_type_search_item]);

  useEffect(() => {
    if (commodity_type === "Add New") {
      setother_commodity_type("");
    }
  }, [commodity_type]);

  useLayoutEffect(() => {
    if (commodity_type !== "") {
      setcommodity_type_error(false);
    }
  }, [commodity_type]);

  const data = [
    {
      commodity_type: 0,
      commodity_name: "",
      created_by: 0,
    },
  ];
  const headers = ["Commodity Type", "Commodity Name", "Created By"];
  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  {/* this code for import export dont`t remove it  */ }
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("jsonData", jsonData);
      setShowModal(true);
      setJsonData(jsonData);
    };
    reader.readAsBinaryString(file);
  }

  function closeModal() {
    setShowModal(false);
    setJsonData([]);
  }
  {/* this code for import export dont`t remove it  */ }
  function handleSave() {
    closeModal();
    axios
      .post(
        ServerAddress + "master/add_commodity/",
        {
          data: jsonData
          //   commodity_type: e.commodity_type,
          // commodity_name: String(e.commodity_name),
          // created_by: e.created_by,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((res) => {
        console.log(res.data.status)
      }).catch(() => {
        console.log("error")
      })
    // })

  }
  {/* this code for import export dont`t remove it  */ }

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

  const update_commoditystatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_commodity/" + id,
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
          navigate("/master/commodities");
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
      update_commoditystatus(commodity.id)
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
          if (commodity_type == "") {
            setcommodity_type_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={isupdating ? "Update Commodity" : "Add Commodity"} />
          <Title
            title={isupdating ? "Update Commodity" : "Add Commodity"}
            parent_title="Masters"
          />
        </div>

        <div className="m-3">
          {/* //Added For History */}
          {isupdating ? (
            <div style={{ justifyContent: "right", display: "flex" }}>
              <Button
                type="button"
                onClick={() => {
                  handlClk();
                }}
              >
                History
              </Button>
            </div>
          ) : (
            <>
              {/* this code for import export dont`t remove it  */}
              {/* <button type="button" onClick={() => downloadExcel(data)}>
                Download As Excel
              </button>
              <button type="button" style={{ maxHeight: 25, marginLeft: 5 }}>
                <label htmlFor="file-input" className="button">
                  Upload Excel file
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </button>
              <div style={{flex:1}}>
              <Modal
              scrollable={true}
              fullscreen={'md-down'}
                size={"md"}
                isOpen={showModal}
                toggle={closeModal}
                // style={{
                //   display: "flex",
                //   maxHeight: "80%",
                //   // maxWidth: "60%",
                //   overflowY: 'auto',
                // }}
              >
                <ModalHeader toggle={closeModal}>Excel Data</ModalHeader>
                <ModalBody
                  style={{
                    // maxWidth: "100%",
                    // maxHeight: "100%",
                    // overflowY: "auto",
                    // margin: "auto",
                  }}
                >
                  {jsonData.length !== 0 ? (
                    <table>
                      <thead>
                        <tr>
                          {Object.keys(jsonData[0]).map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {jsonData.map((row, index) => (
                          <tr key={index}>
                            {Object.values(row).map((value, index) => (
                              <td key={index}>{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No data to display</p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleSave}>
                    Save
                  </Button>
                  <Button color="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              </div> */}
            </>
          )}

          {/* //Added For History */}

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div></div>
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
                      <div className="mb-3">
                        <Label className="header-child">Commidity Type*</Label>
                        <SearchInput
                          data_list={commodity_type_list}
                          setdata_list={setcommodity_type_list}
                          data_item_s={commodity_type}
                          set_data_item_s={setcommodity_type}
                          set_id={setcommodity_type_id}
                          page={commodity_type_page}
                          setpage={setcommodity_type_page}
                          setsearch_item={setcommodity_type_search_item}
                          error_message={"Please Select Commidity Type"}
                          error_s={commodity_type_error}
                        />
                      </div>
                    </Col>
                    {commodity_type === "Add New" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Add Commodity Type*
                          </Label>
                          <Input
                            onChange={(val) =>
                              setother_commodity_type(val.target.value)
                            }
                            onBlur={() => {
                              if (other_commodity_type != "") {
                                if (
                                  window.confirm(
                                    `Are you want to add commodity type ${toTitleCase(
                                      other_commodity_type
                                    )}?`
                                  )
                                ) {
                                  setCommodityType();
                                } else {
                                  setcommodity_type("");
                                }
                              }
                            }}
                            value={other_commodity_type}
                            type="text"
                            name="other_commodity_type"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Commodity Type"
                          />
                        </div>
                      </Col>
                    ) : null}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Commodity Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.commodity_name}
                          invalid={
                            validation.touched.commodity_name &&
                              validation.errors.commodity_name
                              ? true
                              : false
                          }
                          type="text"
                          name="commodity_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Commodity name"
                          disabled={approved_entry}
                        />
                        {validation.touched.commodity_name &&
                          validation.errors.commodity_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.commodity_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>
        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button
                type="submit"
                className={isupdating && (user.user_department_name === "ADMIN") ? "btn btn-info m-1" : !isupdating ? "btn btn-info m-1" : "btn btn-success m-1"}
              >
                {isupdating && (user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"}
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
                className="btn btn-info m-1 cu_btn"
                type="button"
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
};
export default Add_Commodity;
