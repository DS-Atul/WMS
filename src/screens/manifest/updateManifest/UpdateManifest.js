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
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
const UpdateManifest = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const alert = useSelector((state) => state.alert.show_alert);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const userdepartment = useSelector(
    (state) => state.authentication.userdepartment
  );
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location---------", location)
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };
  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };
  //////////////Manifest///////////////////
  const [manifest_no, setmanifest_no] = useState("")
  const [manifest_data, setmanifest_data] = useState([])

  const [isupdating, setisupdating] = useState(false);
  const [origin_branch, setorigin_branch] = useState("")
  const [destination_branch, setdestination_branch] = useState("")
const [destination_city, setdestination_city] = useState("")

  const [refresh, setrefresh] = useState("false");
  const [coloader_mode_list, setcoloader_mode_list] = useState([
  ]);
  const [coloader_selcted_m, setcoloader_selcted_m] = useState("");
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [forward_branch, setforward_branch] = useState("");
  const [today, settoday] = useState("");
  console.log("today-----=========", today)
  const [open_box, setopen_box] = useState(false);
  const [box_quantity, setbox_quantity] = useState("");
  const [coloader_mode_error, setcoloader_mode_error] = useState(false);
  const [forwording_date_error, setforwording_date_error] = useState(false);
  const [docket_weight, setdocket_weight] = useState("")

  const [coloader_list, setcoloader_list] = useState([]);
  // Manifest
  const [commodity_type_id, setcommodity_type_id] = useState(0);
  const [commodity_type_list, setcommodity_type_list] = useState([]);
  const [approved_entry, setapproved_entry] = useState(false);
  const [commodity_type, setcommodity_type] = useState("");
  const [commodity_type_error, setcommodity_type_error] = useState(false);
  const [commodity_type_page, setcommodity_type_page] = useState(1);
  const [commodity_type_search_item, setcommodity_type_search_item] =
    useState("");
    const validation = useFormik({
      enableReinitialize: true,
      initialValues: {
        coloader_no: manifest_data.airwaybill_no || "",
        flight_no: toTitleCase(manifest_data.carrier_name) || "",
        no_of_bags: manifest_data.bag_count || "",
        actual_weight: manifest_data.total_weight || "",
        chargeable_weight: manifest_data.chargeable_weight || "",
        no_of_box: manifest_data.box_count || ""
      },
  
      validationSchema: Yup.object({
        coloader_no: Yup.string().required("Coloader No is required"),
        flight_no: Yup.string().required("Flight Name is required"),
        no_of_bags: Yup.string().required("Bags is required"),
        no_of_box: Yup.string().required("Box is required"),
        actual_weight: Yup.string().required("Enter Manifest Weight"),
        chargeable_weight: Yup.string().required("Enter Chargable Weight"),
        actual_weight: Yup.string().required("Enter Actual Weight"),
      }),
  
      onSubmit: (values) => {
        // if (docket_weight + 5 >= values.actual_weight) {
        //   updateManifest(values);
        // }
        // else {
        //   const result = window.confirm('Docket Weight Is Not Equal To Coloader Actual Weight Are you sure you want to proceed?');
        //   if (result) {
        //     updateManifest(values);
        //   }
        // }
      },
    });
    const get_coloader = () => {
      axios
        .get(
          ServerAddress +
          `master/get_coloader/?p=${page}&records=${10}&name_search=${search}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          let temp = [];
          let temp2 = [...coloader_list];
          temp = response.data.results;
          for (let index = 0; index < temp.length; index++) {
            temp2.push([temp[index].id, toTitleCase(temp[index].name)]);
          }
          temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
          setcoloader_list(temp2);
        })
        .catch((err) => {
          alert(`Error While Loading Client , ${err}`);
        });
    };
  
    const getVendorService = (id) => {
      let temp = [];
  
      axios
        .get(ServerAddress + `master/get_vendorservice/?vendor_id=${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((resp) => {
          console.log("vendor res------", resp)
  
          for (let index = 0; index < resp.data.vendor_service.length; index++) {
            const data = resp.data.vendor_service[index];
            if (data.service_type === 'AIRWAY BILL') {
              temp.push('Direct AWB')
            }
            // else if (data.service_type === 'DIRECT VEHICLE') {
            //   temp.push('Direct Vehicle')
            // }
            else if (data.service_type === 'CONSOLE CONNECTION') {
              temp.push('Air Console')
            }
            // else if (data.service_type === 'PART LOAD VEHICLE') {
            //   temp.push('Part Load')
            // }
            // else if (data.service_mode === 'FORWARDING BY TRAIN') {
            //   temp.push('By Train')
            // }
            // else if (data.service_type === 'DIRECT VEHICLE' || data.service_type === 'KG WISE' || data.service_type === 'PART LOAD VEHICLE') {
            //   temp.push('By Road')
            // }
  
          }
          setcoloader_mode_list([...new Set(temp)])
  
        })
        .catch((err) => {
          alert(`Error Occur in Get vendor service, ${err}`);
        });
    };
    useLayoutEffect(() => {
      get_coloader();
    }, [search, page]);
  
    useEffect(() => {
      if (coloader_id !== "") {
        getVendorService(coloader_id)
  
      }
    }, [coloader_id])
  useEffect(() => {
    try {
      let data = location.state.manifest
      setmanifest_data(location.state.manifest);
      setcoloader_selcted_m(toTitleCase(data.coloader_mode))
      setmanifest_no(data.manifest_no)
      setdestination_branch(toTitleCase(data.to_branch_n))
      setorigin_branch(toTitleCase(data.from_branch_n))
      setdestination_city(toTitleCase(data.destination_branch_n))
      setcoloader_selected(toTitleCase(data.coloader_name))
      setcoloader_id(data.coloader)
      // settoday(data.forwarded_at)
      
      // let a=  2023-04-11T11:26:47.268447+05:30
      let a = data.forwarded_at
      console.log("data========", a)
      let b = a.split("+")[0]
      console.log("11111111111", b)
      settoday(b)
    } catch (error) { }
  }, []);

  return (
    <div>

      {/* For Checker Maker */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Manifest */}
        <div className="mt-3">
          <PageTitle page="Update Manifest" />
          <Title
            title="Update Manifest"
            parent_title="Manifest"
          />
        </div>
        <div className="m-3">
          {/* //Added For History */}

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Manifest Info :</div>
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
                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Manifest No.*</Label>
                        <Input
                          value={manifest_no}
                          type="text"
                          name="manifest_no"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Origin Branch*</Label>
                        <Input
                          value={origin_branch}
                          type="text"
                          name="origin_branch"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Destination Branch*</Label>
                        <Input
                          value={destination_branch}
                          type="text"
                          name="destination_branch"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Destination City* :</Label>
                            <Input id="input" disabled value={destination_city} />
                          </div>
                        </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Coloader info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Coloader Info
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
              </CardTitle>
              {circle_btn1 ? (
                <CardBody>
                  <Row>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Select Coloader* :
                        </Label>
                        <SearchInput
                          data_list={coloader_list}
                          setdata_list={setcoloader_list}
                          data_item_s={coloader_selected}
                          set_data_item_s={setcoloader_selected}
                          set_id={setcoloader_id}
                          page={page}
                          setpage={setpage}
                          error_message={"Please Select Colader"}
                          search_item={search}
                          setsearch_item={setsearch}
                        />
                      </div>
                    </Col>


                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Coloader Mode* :
                        </Label>
                        <span>
                        {/* <span onClick={() => setby_pincode(false)}> */}
                          <NSearchInput
                            data_list={coloader_mode_list}
                            data_item_s={coloader_selcted_m}
                            set_data_item_s={setcoloader_selcted_m}
                            show_search={false}
                            error_message={"Please Select Coloader Mode"}
                            error_s={coloader_mode_error}
                          />
                        </span>
                      </div>
                    </Col>

                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Co-loader No / Airway bill no* :
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.coloader_no || ""}
                          invalid={
                            validation.touched.coloader_no &&
                              validation.errors.coloader_no
                              ? true
                              : false
                          }
                          type="text"
                          className="form-control-md"
                          id="input"
                          name="coloader_no"
                          placeholder="Enter Coloader No:"
                        />
                        {validation.touched.coloader_no &&
                          validation.errors.coloader_no ? (
                          <FormFeedback type="invalid">
                            {validation.errors.coloader_no}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {(coloader_selcted_m === "Direct AWB" || coloader_selcted_m === "Air Console") &&
                      <Col lg={3} md={3} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Flight Name & Number :
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.flight_no}
                            invalid={
                              validation.touched.flight_no &&
                                validation.errors.flight_no
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="flight_no"
                            placeholder="Enter Flight Name"
                          />
                          {validation.touched.flight_no &&
                            validation.errors.flight_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.flight_no}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    }
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Forwarding Date* :
                        </Label>
                        <Input
                          type="datetime-local"
                          className="form-control d-block form-control-md "
                          id="input"
                          value={today}
                          onChange={(val) => {
                            settoday(val.target.value);
                          }}
                          onBlur={() => {
                            setforwording_date_error(true);
                          }}
                          invalid={today == "" && forwording_date_error}
                        />
                        {today == "" && forwording_date_error ? (
                          <FormFeedback type="invalid">
                            Date is required
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

        {/*Package info*/}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Package Info :
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle2}>
                      {circle_btn2 ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn2 ? (
                <CardBody>
                  <Row>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">No of Bags* :</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.no_of_bags || ""}
                          invalid={
                            validation.touched.no_of_bags &&
                              validation.errors.no_of_bags
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          className="form-control-md"
                          id="input"
                          name="no_of_bags"
                          placeholder="Enter Total  Bags"
                        />
                        {validation.touched.no_of_bags &&
                          validation.errors.no_of_bags ? (
                          <FormFeedback type="invalid">
                            {validation.errors.no_of_bags}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">No of Box* :</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.no_of_box || ""}
                          invalid={
                            validation.touched.no_of_box &&
                              validation.errors.no_of_box
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          className="form-control-md"
                          id="input"
                          name="no_of_box"
                          placeholder="Enter Total Box"
                        />
                        {validation.touched.no_of_box &&
                          validation.errors.no_of_box ? (
                          <FormFeedback type="invalid">
                            {validation.errors.no_of_box}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Docket Weight* :
                        </Label>
                        <Input
                          id="input"
                          disabled
                          placeholder="Docket Weight"
                          value={docket_weight}
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">TSP* :</Label>
                        <Input id="input" disabled placeholder="TSP Value" />
                      </div>
                    </Col>

                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Coloader Actual Weight* :
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.actual_weight || ""}
                          invalid={
                            validation.touched.actual_weight &&
                              validation.errors.actual_weight
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          className="form-control-md"
                          id="input"
                          name="actual_weight"
                          placeholder="Enter Manifest Weight"
                        />
                      </div>
                    </Col>

                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Coloader Chargeable Weight* :
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chargeable_weight || ""}
                          invalid={
                            validation.touched.chargeable_weight &&
                              validation.errors.chargeable_weight
                              ? true
                              : false
                          }
                          type="number"
                          min={0}
                          className="form-control-md"
                          id="input"
                          name="chargeable_weight"
                          placeholder="Enter Manifest Weight"
                        />
                      </div>
                    </Col>

                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Rate* :</Label>
                        <Input id="input" disabled placeholder="Enter Rate" />
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Other Charges* :
                        </Label>
                        <Input
                          id="input"
                          disabled
                          placeholder="Enter Charges"
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Carrier Charges
                        </Label>
                        <Input
                          id="input"
                          disabled
                          placeholder="Enter Charges"
                        />
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Tax Slab</Label>
                        <Input
                          id="input"
                          disabled
                          placeholder="Enter Tax Slab"
                        />
                      </div>
                    </Col>
                    {/* <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Open Box</Label>
                            {
                              open_box ? 
                              <FiCheckSquare onClick={()=>{
                                setopen_box(!open_box)
                              }} />:
                              <FiSquare  onClick={()=>{
                                setopen_box(!open_box);
                               }}/>
                            }
                          
                          </div>
                        </Col>
                        {open_box &&
                        
                        <Col lg={3} md={3} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Box Quantity</Label>
                            <Input
                              id="input"
                              placeholder="Enter Box Quantity"
                              value={box_quantity}
                              onChange={(e)=>{
                                setbox_quantity(e.target.value);
                              }}
                            />
                          </div>
                        </Col>
                        }
                         */}
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
                className={"btn btn-success m-1"}
              >
                Approved
                {/* {(user.user_department_name === "ADMIN" || user.is_superuser) ? "Update" : !isupdating ? "Save" : "Approved"} */}
              </button>

              {
              // isupdating && (user.user_department_name !== "ADMIN" && !user.is_superuser) &&
                <button
                  type="button"
                  className="btn btn-danger m-1"
                // onClick={handleShow}
                >
                  Rejected
                </button>
              }
              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={() => navigate(-1)}
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
export default UpdateManifest;
