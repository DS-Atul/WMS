/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdDeleteForever, MdAdd } from "react-icons/md";
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
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

import TransferList from "../../../components/formComponent/transferList/TransferList";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";

import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import EditManifestDataFormat from "./editManifestOrders/EditManifestDataFormat";
import AddAnotherOrder from "./AddAnotherOrder";

const EditRoughDocket = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const success = useSelector((state) => state.alert.show_alert);

  const [refresh, setrefresh] = useState("false");
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);
  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate(-1)
    // navigate("/manifest/pendingtomanifest");
  };
  const [order_active_btn, setorder_active_btn] = useState("first");
  const [manifest_data, setmanifest_data] = useState([])
  const [same_box, setsame_box] = useState(true)
  // adding extra input fields in Packages
  const [length, setlength] = useState("");
  const [breadth, setbreadth] = useState("");
  const [height, setheight] = useState("");
  const [pieces, setpieces] = useState("");
  const [package_id_list, setpackage_id_list] = useState("");
  const [packages_id, setpackages_id] = useState([]);
  const [deleted_packages_id, setdeleted_packages_id] = useState([]);

  let dimension_list = [length, breadth, height, pieces];
  const [row, setrow] = useState([dimension_list]);

  // adding extra input fields in Order Images
  const [selectedFile, setSelectedFile] = useState("");

  let dimension_list1 = [selectedFile];
  const [row1, setrow1] = useState([dimension_list1]);

  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");
  const [today, settoday] = useState("");

  let dimension_list2 = [invoice_img, today, invoice_no, invoice_value];
  const [row2, setrow2] = useState([dimension_list2]);

  // Packages
  let p = row.length - 1;
  const a = parseInt(row[p][3]) + parseInt(row[p][3]);

  // used for validation
  const [total_bag_error, settotal_bag_error] = useState(false);
  const [manifest_weight_error, setmanifest_weight_error] = useState(false);
  const [airway_bill_no_error, setairway_bill_no_error] = useState(false);
  const [flight_name_error, setflight_name_error] = useState(false);

  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);

  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [manifest_no, setmanifest_no] = useState("");
  const [manifest_id, setmanifest_id] = useState("");
  const [total_bags, settotal_bags] = useState(0);
  const [total_box, settotal_box] = useState(0)
  const [manifest_weight, setmanifest_weight] = useState("");
  const [airway_bill_no, setairway_bill_no] = useState("");
  const [coloader_mode, setcoloader_mode] = useState("");
  const [company_slected_list, setcompany_slected_list] = useState("");
  const [flight_name, setflight_name] = useState("");
  const [data, setdata] = useState([]);
  const [coloader_mode_list, setcoloader_mode_list] = useState([
    // "Direct Awb",
    // "Air Console",
    // "By Road (Surface)",
    // "By Train",
    // "Direct Vehicle",
    // "Partload",
  ]);
  useLayoutEffect(() => {
    let manifest_data = location_data.state.manifest;
    setmanifest_data(manifest_data)
    setmanifest_no(manifest_data.manifest_no);
    setmanifest_id(manifest_data.id);
    setfrom_branch(toTitleCase(manifest_data.from_branch_n));
    setto_branch(toTitleCase(manifest_data.to_branch_n));
    setcoloader_mode(toTitleCase(manifest_data.coloader_mode));
    setcoloader_id(manifest_data.coloader);
    setcoloader_selected(toTitleCase(manifest_data.coloader_name));
    settotal_bags(manifest_data.bag_count);
    settotal_box(manifest_data.box_count);
    setmanifest_weight(manifest_data.total_weight);
    setairway_bill_no(manifest_data.airwaybill_no);
    setflight_name(toTitleCase(manifest_data.carrier_name));
  }, []);

  const get_orderof_manifest = () => {
    axios
      .get(
        ServerAddress +
        `manifest/get_manifest_order/?manifest_no=${manifest_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    manifest_no && get_orderof_manifest();
  }, [manifest_no, success]);

  const updateManifest = () => {
    axios
      .put(
        ServerAddress + "manifest/update_manifest/" + manifest_id,
        {
          coloader_mode: coloader_mode,
          coloader: coloader_id,
          airwaybill_no: airway_bill_no,
          bag_count: total_bags,
          box_count: total_box,
          total_weight: manifest_weight,
          coloader_name: coloader_selected,
          carrier_name: flight_name,
          update: "True",
          forwarded: "False",
          manifested: "False",
          departed: "False",
          is_scanned:same_box ? manifest_data.is_scanned : false,
          modified_by: user_id,
          forwarded_branch_name: from_branch,
          forwarded_branch: location_data.state.manifest.forwarded_branch,
          manifest_packages: row,
          manifest_no: manifest_no,
          deleted_packages: deleted_packages_id,
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
            setDataExist(`Manifest of  ${manifest_no} Forwarded sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1);
        }
      })
      .catch(function (err) {
        alert(`Error While  Updating Manifest ${err}`);
      });
  };

 
  useEffect(() => {
    if (total_bags == manifest_data.bag_count && total_box == manifest_data.box_count) {
      setsame_box(true)
    }
    else {
      setsame_box(false)
    }

  }, [total_bags, total_box, manifest_data])
  console.log("total_bags-----", total_bags)
  console.log("total_box------", total_box)
  console.log("manifest_data-bag_count----", manifest_data.bag_count)
  console.log("manifest_data--box_count---", manifest_data.box_count)
  console.log("manifest_data-------", manifest_data)
  console.log("setsame_box----", same_box)


  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (total_bags == "") {
              settotal_bag_error(true);
            }
            if (manifest_weight == "") {
              setmanifest_weight_error(true);
            }
            if (airway_bill_no == "") {
              setairway_bill_no_error(true);
            }
            if (flight_name == "") {
              setflight_name_error(true);
            }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={"Edit Manifest"} />
            <Title title={"Edit Manifest"} parent_title="Manifests" />
          </div>

          {/* Company Info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Forwarding Info :
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
                          <Label className="header-child">Manifest No* :</Label>

                          <Input id="input" disabled value={manifest_no} />
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">From Branch* :</Label>
                          <Input id="input" disabled value={from_branch} />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">To Branch* :</Label>
                          <Input id="input" disabled value={to_branch} />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Total Bags </Label>
                          <Input
                            value={total_bags}
                            onChange={(e) => {
                              settotal_bags(e.target.value);
                            }}
                            onBlur={() => {
                              settotal_bag_error(true);
                            }}
                            invalid={total_bags == "" && total_bag_error}
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="total_bags"
                            placeholder="Enter No Of Bags"
                          />
                          {total_bags == "" && total_bag_error ? (
                            <FormFeedback type="invalid">
                              Total Bages is required
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Total Bags </Label>
                          <Input
                            value={total_box}
                            onChange={(e) => {
                              settotal_box(e.target.value);
                            }}
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="total_box"
                            placeholder="Enter No Of Bags"
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Colader Services */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Docket Info
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <AddAnotherOrder
                        id_m={manifest_no}
                        refresh={refresh}
                        setrefresh={setrefresh}
                      />
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
                  <CardBody>
                    <EditManifestDataFormat Manifest_list={data} />
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Footer */}
          <div className="m-3">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  onClick={() => {
                    updateManifest();
                  }}
                >
                  Save
                </Button>

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
    </>
  );
};

export default EditRoughDocket;
