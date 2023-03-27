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
const UpdateDeliveryInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const userdepartment = useSelector(
    (state) => state.authentication.userdepartment
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [delivery_data, setdelivery_data] = useState([])

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // toTitleCase(commodity.person_name) || "",
      docket_no: delivery_data.docket_no  || "",
      person_name: toTitleCase(delivery_data.signature_person_name) || "",
      phone_no: delivery_data.signature_person_phone_number || "",
    },
    validationSchema: Yup.object({
      person_name: Yup.string().required("Commodity name is required"),
    }),
    onSubmit: (values) => {
    update_delivery_info(values);
    },
  });
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const update_delivery_info = (values) => {
    let id = delivery_data.id;
    let fields_names = Object.entries({
      docket_no: values.docket_no,
      signature_person_name: values.person_name,
      signature_person_phone_number: values.phone_no,
    });
    let change_fields = {};

      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location.state.order[`${ele[0]}`];
        let new_v = ele[1];
        if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
          change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
        }
      }
    
    axios
      .put(
        ServerAddress + "booking/update_delivery_info/" + id,
        {
          order: delivery_data.order,
          signature_person_name: values.person_name,
          signature_person_phone_number: values.phone_no,
          change_fields: change_fields,
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
          navigate(-1);
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };
console.log("location-----", location)

useEffect(() => {
  try {
    setdelivery_data(location.state.order);
  } catch (error) { }
}, []);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={ "Update Delivery Info"} />
          <Title
            title={"Update Delivery Info"}
            parent_title="Booking"
          />
        </div>

        <div className="m-3">
     
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
                        <Label className="header-child">Docket Number*</Label>
                        <Input
                          onChange={validation.handleChange}
                          value={validation.values.docket_no}                    
                          type="text"
                          name="docket_no"
                          className="form-control-md"
                          id="input"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Person Name*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.person_name}
                          invalid={
                            validation.touched.person_name &&
                              validation.errors.person_name
                              ? true
                              : false
                          }
                          type="text"
                          name="person_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Name"
                        />
                        {validation.touched.person_name &&
                          validation.errors.person_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.person_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Phone Number*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone_no}
                          invalid={
                            validation.touched.phone_no &&
                              validation.errors.phone_no
                              ? true
                              : false
                          }
                          type="text"
                          name="phone_no"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Phone Number"
                        />
                        {validation.touched.phone_no &&
                          validation.errors.phone_no ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone_no}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">POD*</Label>
                        <Input
                            className="form-control-md"
                            id="input"
                            name="pod"
                            type="file"
                          />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Signature*</Label>
                        <Input
                            className="form-control-md"
                            id="input"
                            name="signature"
                            type="file"
                          />
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
                className={"btn btn-info m-1"}
              >
               Update
              </button>
              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={()=>navigate(-1)}
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
export default UpdateDeliveryInfo;
