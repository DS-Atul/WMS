import React, { useState } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import {
  Col,
  Card,
  CardTitle,
  CardBody,
  Label,
  Form,
  Row,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector, useDispatch } from "react-redux";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const AddModel = () => {
  const accesstoken = useSelector((state) => state.authentication.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //This State is used for toggle
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  //Used for date
  const [make_date, setmake_date] = useState("");
  const [make_date_error, setmake_date_error] = useState(false);

  //Used for validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      model_name: "",
      make: "",
    },

    validationSchema: Yup.object({
      model_name: Yup.string().required("Model name is required"),
      make: Yup.string().required("Make is required"),
    }),

    onSubmit: (values) => {
      alert("--------");
      send_model_data(values);
    },
  });

  //funcation to send the data
  const send_model_data = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehiclemodel/",
        {
          model_name: toTitleCase(values.model_name).toUpperCase(),
          make: toTitleCase(values.make).toUpperCase(),
          make_year: make_date,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(
              `Vehicle Model Added ${values.model_name} Added Sucessfully`
            )
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (make_date === "") {
            setmake_date_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page=" Vehicle Model" />
          <Title title=" Add Vehicles Model" parent_title="Vms" />
        </div>

        {/*  Vehicle modal*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Vehicle Model
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
                        <Label className="header-child">Model Name:*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.model_name || ""}
                          invalid={
                            validation.touched.model_name &&
                            validation.errors.model_name
                              ? true
                              : false
                          }
                          type="text"
                          name="model_name"
                          placeholder="Enter Model Name"
                          className="form-control-md "
                          id="input"
                        />
                        {validation.touched.model_name &&
                        validation.errors.model_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.model_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Make:*</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.make || ""}
                          invalid={
                            validation.touched.make && validation.errors.make
                              ? true
                              : false
                          }
                          type="text"
                          name="make"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter Make Name"
                        />
                        {validation.touched.make && validation.errors.make ? (
                          <FormFeedback type="invalid">
                            {validation.errors.make}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className='header-child"'>Make Year</Label>
                        <Input
                          value={make_date}
                          onChange={(val) => {
                            setmake_date(val.target.value);
                          }}
                          onBlur={() => {
                            setmake_date_error(true);
                          }}
                          invalid={make_date === "" && make_date_error}
                          className="form-control-md "
                          id="input"
                          type="date"
                        />
                        {make_date === "" && make_date_error ? (
                          <FormFeedback type="invalid">
                            Make Date is required
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
        <div className=" m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button type="submit" className="btn btn-info m-1">
                Save
              </Button>

              <Button
                type="button"
                className="btn btn-info m-1 "
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

export default AddModel;
