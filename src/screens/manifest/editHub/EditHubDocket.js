/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdAdd } from "react-icons/md";
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
import EditManifestDataFormat from "./editManifestOrders/EditManifestDataFormat";
import AddAnotherOrder from "./AddAnotherOrder";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

const EditHubDocket = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
  const [page, setpage] = useState(1);
  const user_branch = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );
  const [refresh, setrefresh] = useState("false");
  const dispatch = useDispatch();
  const location_data = useLocation();
  const [same_box, setsame_box] = useState(true)
  console.log("location_data--------hub-", location_data)
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const navigate = useNavigate();
  const [hub_data, sethub_data] = useState([])
  //Circle Toogle Btn
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
  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate(-1);
  };

  const [order_active_btn, setorder_active_btn] = useState("first");

  //  State For Cropping In React Crop
  const [showModal, setshowModal] = useState(false);
  const [document, setdocument] = useState([]);
  const [doc_result_image, setdoc_result_image] = useState([]);

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

  let dimension_list2 = [invoice_img, invoice_no, invoice_value];
  const [row2, setrow2] = useState([dimension_list2]);

  // Packages
  let p = row.length - 1;
  const a = parseInt(row[p][3]) + parseInt(row[p][3]);
  const addPackage = () => {
    setlength("");
    setbreadth("");
    setheight("");
    setpieces("");
    dimension_list = ["", "", "", ""];
    setrow([...row, dimension_list]);
  };

  const deletePackage = (item) => {
    setlength("length");
    setbreadth("breadth");
    setheight("height");
    setpieces("pieces");

    let temp = [...row];
    let temp_2 = [...package_id_list];

    const index = temp.indexOf(item);

    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow(temp);
    setpackage_id_list(temp_2);
  };
  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [hub_no, sethub_no] = useState("");
  const [hub_id, sethub_id] = useState("");
  const success = useSelector((state) => state.alert.show_alert);

  const [data, setdata] = useState([]);

  const [coloader_mode_list, setcoloader_mode_list] = useState([

  ]);
  const [coloader_mode, setcoloader_mode] = useState("");
  const [search_text, setsearch_text] = useState("")
  const [coloader_list, setcoloader_list] = useState([]);
  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");

  const [total_bags, settotal_bags] = useState("");
  const [total_box, settotal_box] = useState("")
  const [total_bag_error, settotal_bag_error] = useState(false);

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      coloader_no: hub_data.airwaybill_no || "",
      vehicle_no: hub_data.vehicle_no || "",
      actual_weight: hub_data.total_weight || "",
      chargeable_weight: hub_data.chargeable_weight || "",
      driver_name: hub_data.driver_name || "",
      supporting_staff: hub_data.supporting_staff || "",
    },

    validationSchema: Yup.object({
      // coloader_no: Yup.string().required("Coloader No is required"),
      // vehicle_no: Yup.string().required("Vehicle Number is required"),
      // actual_weight: Yup.string().required("Manifest Weight is required"),
      // driver_name: Yup.string().required("Driver Name is required"),
      // supporting_staff: Yup.string().required("Spporting Staff Name is required"),
    }),

    onSubmit: (values) => {
      updateManifest(values);
    },
  });


  useLayoutEffect(() => {
    let manifest_data = location_data.state.hub;
    sethub_data(manifest_data)
    sethub_no(manifest_data.hub_transfer_no);
    sethub_id(manifest_data.id);
    setfrom_branch(toTitleCase(manifest_data.orgin_branch_name));
    setto_branch(toTitleCase(manifest_data.destination_branch_name));
    settotal_bags(manifest_data.bag_count);
    settotal_box(manifest_data.box_count);
  }, []);

  const get_orderof_manifest = () => {
    axios
      .get(ServerAddress + `manifest/get_hub_orders/?hub_no=${hub_no}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    hub_no && get_orderof_manifest();
  }, [hub_no,success]);

  const updateManifest = (values) => {
    axios
      .put(
        ServerAddress + "manifest/update_hub_manifest/" + hub_data.id,
        {
          coloader_mode: coloader_mode.toUpperCase(),
          coloader: coloader_id,
          airwaybill_no: values.coloader_no,
          // forwarded_at: today,
          bag_count: total_bags,
          box_count: total_box,
          total_weight: 0,
          chargeable_weight: 0,
          coloader_name: coloader_selected.toUpperCase(),
          carrier_name: toTitleCase(values.vehicle_no).toUpperCase(),
          
          is_scanned:same_box ? hub_data.is_scanned : false,
          update: "True",
          forwarded_by: user_id,
          forwarded: "False",
          departed: "False",
          forwarded_branch: null,
          modified_by: user_id,
          hub_packages: row,
          vehicle_no: values.vehicle_no,
          driver_name: values.driver_name,
          supporting_staff: values.supporting_staff,
          deleted_packages: deleted_packages_id,
          hubtransfer_no:hub_no,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("response-----", response.data)
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest Updated sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1)
          let form = new FormData();
          if (document.length !== 0) {
            document.forEach((e, i) => {
              form.append(`manifestImage${i}`, e, e.name);
            });
            let imageLength = document.length;
            form.append(`manifest_count`, imageLength);
            form.append(`manifest_no`, response.data.data.manifest_no);
            axios
              .post(ServerAddress + `manifest/add-manifest-image/`, form, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "content-type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log("ImageResssssssssssssssssssss", res.data);
                successMSg();
              })
              .catch((err) => {
                console.log("ImaeErrrrrrrrrrrrrrrrrrr", err);
              });
          } else {
            console.log("Manifest created without image");
          }
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function (err) {
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };
  useEffect(() => {
    if (total_bags == hub_data.bag_count && total_box == hub_data.box_count) {
      setsame_box(true)
    }
    else {
      setsame_box(false)
    }

  }, [total_bags, total_box, hub_data])
  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={"Edit Hub Manifest"} />
            <Title title={"Edit Hub Manifest"} parent_title="Manifests" />
          </div>

          {/* Company Info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Hub Manifest Info :
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

                          <Input id="input" disabled value={hub_no} />
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
                        id_m={hub_no}
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
                <Button type="submit" className="btn btn-info m-1 cu_btn">
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

export default EditHubDocket;
