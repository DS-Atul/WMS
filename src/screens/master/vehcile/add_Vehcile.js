import React, { useState, useEffect, useLayoutEffect } from "react";
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
  FormGroup,
  Button,
} from "reactstrap";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setToggle } from "../../../store/pagination/Pagination";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

const Add_Vehcile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location_data = useLocation();
  console.log("location_data =====================", location_data)
  // vendor State
  const [vendor_list, setvendor_list] = useState([]);
  const [vendor_name, setvendor_name] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [vendor_n_page, setvendor_n_page] = useState(1);
  const [search_vendor_name, setsearch_vendor_name] = useState("");
  const [vendor_error, setvendor_error] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [is_updating, setis_updating] = useState(false);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn, setcircle_btn] = useState(true);
  //   State For Saving For Data
  const [vehcile_type, setvehcile_type] = useState([
    "Owned Vehicle",
    "Partner Vehicle",
  ]);
  const [active_list, setactive_list] = useState(["Active", "Unactive"]);
  const [active_selected, setactive_selected] = useState("Active");
  const [vehcile_type_s, setvehcile_type_s] = useState("");
  const [trans_name, settrans_name] = useState("");
  const [vehcile_no, setvehcile_no] = useState("");
  const [vehcile_img, setvehcile_img] = useState("");
  const [vehcile_img_error, setvehcile_img_error] = useState(false);
  const [vehcile_model, setvehcile_model] = useState("");
  const [vendor_data, setvendor_data] = useState([]);
  const [vehcile, setvehicle] = useState([]);

  const [branch_id, setbranch_id] = useState("");
  const [branch_list, setbranch_list] = useState([]);
  const [branch, setbranch] = useState("");
  const [search_branch, setsearch_branch] = useState("");
  const [branch_count, setbranch_count] = useState(1)
  const [branch_loaded, setbranch_loaded] = useState(false)
  const [branch_bottom, setbranch_bottom] = useState(103)
  const [branch_err, setbranch_err] = useState("");
  const [page, setpage] = useState(1);

  useEffect(() => {
    try {
      if (location_data.state.vehcile) {

        setis_updating(true);
        let vehicle_data = location_data.state.vehcile;
        setvehicle(vehicle_data);
        setbranch(toTitleCase(vehicle_data.branch_name));
        setbranch_id(vehicle_data.branch);
        setvehcile_type_s(toTitleCase(vehicle_data.vehcile_type));
        setvehcile_no(vehicle_data.vehcile_no);
        setvehcile_model(toTitleCase(vehicle_data.vehcile_model));
        setactive_selected(vehicle_data.active_selected);
        setvendor_name(toTitleCase(vehicle_data.transporter));
        if (vehicle_data.vehcile_status === true) {
          setactive_selected("Active")
        }
        else {
          setactive_selected("Unactive")

        }
      }

    } catch (error) { }
  }, []);

  //   Api For Posting Data
  const add_vehcile = () => {
    axios
      .post(
        ServerAddress + "master/add_vehcile/",
        {
          vehcile_no: toTitleCase(vehcile_no).toUpperCase(),
          vehcile_model: toTitleCase(vehcile_model).toUpperCase(),
          vehcile_status: active_selected === "Active" ? "True" : "False",
          vehcile_type: (vehcile_type_s).toUpperCase(),
          transporter_name: vendor_id,
          branch: branch_id,
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
              `Vehcile  "${vehcile_no.toUpperCase()}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/master/Vehcile");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Vehcile No "${vehcile_no.toUpperCase()}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Vehicle  Data ${error}`);
      });
  };

  const upadte_vehcile = (values) => {
    let id = vehcile.id;
    let fields_names = Object.entries({
      branch_name: branch,
      transporter: vendor_name ? vendor_name : "",
      vehcile_model: vehcile_model,
      vehcile_no: vehcile_no,
      vehcile_type: vehcile_type_s,
    });
    let change_fields = {};
    console.log("fields_names ========", fields_names)
    var prom = new Promise((resolve, reject) => {
      for (let j = 0; j < fields_names.length; j++) {
        const ele = fields_names[j];
        let prev = location_data.state.vehcile[`${ele[0]}`];
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
          ServerAddress + "master/update_vehicle/" + id,
          {
            vehcile_no: toTitleCase(vehcile_no).toUpperCase(),
            vehcile_model: toTitleCase(vehcile_model).toUpperCase(),
            vehcile_status: active_selected === "Active" ? "True" : "False",
            vehcile_type: (vehcile_type_s).toUpperCase(),
            transporter_name: vendor_id,
            branch: branch_id,
            change_fields: change_fields,
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
                `"${toTitleCase(
                  vehcile_no
                )}" Updated sucessfully`
              )
            );
            dispatch(setAlertType("info"));
            navigate(-1);
          } else if (response.data === "duplicate") {
            dispatch(setShowAlert(true));
            dispatch(
              setDataExist(
                `"${toTitleCase(
                  vehcile_no
                )}" already exists`
              )
            );
            dispatch(setAlertType("warning"));
          }
        })
        .catch(function () {
          alert("Error Error While  Updateing Vehicle");
        });
    });
  };
  const get_vendor = () => {
    let vendor_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_vendor/?search=${""}&p=${vendor_n_page}&records=${10}&name_search=${search_vendor_name}&vendor_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        console.log("data printing", data);
        setvendor_data(data);
        if (response.data.results.length > 0) {
          if (vendor_n_page == 1) {
            vendor_temp = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            vendor_temp = [
              ...vendor_list,
              ...response.data.results.map((v) => [v.id, v.name]),
            ];
          }
        }
        setvendor_list(vendor_temp);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  const getBranches = () => {
    let temp3 = [];

    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&vendor=${[""]}&branch_search=${search_branch}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setbranch_loaded(false);
        } else {
          setbranch_loaded(true);
        }

        if (response.data.results.length > 0) {
          if (page === 1) {
            temp3 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp3 = [
              ...branch_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setbranch_count(branch_count+2)
          setbranch_list(temp3);
        }
        else{
          setbranch_list([]);
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  useLayoutEffect(() => {
    getBranches();
  }, [page, search_branch]);
  
  useLayoutEffect(() => {
    get_vendor();
  }, [vendor_n_page, search_vendor_name, refresh]);

  // used for error
  const [vehicle_type_error, setvehicle_type_error] = useState(false);
  const [vehicle_number_error, setvehicle_number_error] = useState(false);
  const [vehicle_model_error, setvehicle_model_error] = useState(false);
  const [vehicle_len_error, setvehicle_len_error] = useState(false);
  useEffect(() => {
    if (branch) {
      setbranch_err(false);
    }
    if (vehcile_type_s !== "") {
      setvehicle_type_error(false);
    }
    if (vehcile_type_s === "PARTNER VEHCILE" && vendor_name !== "") {
      setvendor_error(false);
    }
    if (vehcile_no !== "") {
      setvehicle_number_error(false);
    }
    if (vehcile_model !== "") {
      setvehicle_model_error(false);
    }
    if (vehcile_img !==""){
      setvehcile_img_error(false)
    }
    if (vehcile_no !== "" && vehcile_no.length !== 10) {
      setvehicle_len_error(true);
    } else {
      setvehicle_len_error(false);
    }
  }, [vehcile_type_s, vehcile_no, vehcile_model,vehcile_img]);

  return (
    <div>
      <Form 
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   ValidationError.handleSubmit(e.values);
      //   return false;
      // }}
      >
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={is_updating ? "Update Vehicle" : "Add Vehicle"} />
          <Title
            title={is_updating ? "Update Vehicle" : "Add Vehicle"}
            parent_title="Masters"
          />
        </div>
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
                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Type*</Label>
                      <NSearchInput
                        data_list={vehcile_type}
                        data_item_s={vehcile_type_s}
                        set_data_item_s={setvehcile_type_s}
                        show_search={false}
                        error_message={"Please Select Vehicle Type"}
                        error_s={vehicle_type_error}
                      />
                    </div>
                  </Col>
                  {vehcile_type_s === "Partner Vehicle" && (
                    <Col lg={4} md={4} sm={4}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Transporter Name*
                        </Label>
                        <SearchInput
                          data_list={vendor_list}
                          setdata_list={setvendor_list}
                          data_item_s={vendor_name}
                          set_data_item_s={setvendor_name}
                          set_id={setvendor_id}
                          page={vendor_n_page}
                          setpage={setvendor_n_page}
                          search_item={search_vendor_name}
                          setsearch_item={setsearch_vendor_name}
                          error_message={"Please Select Any Vendor"}
                          error_s={vendor_error}
                        />
                      </div>
                    </Col>
                  )}

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Number*</Label>
                      <Input
                        name="VEHCILE_NUMBER"
                        type="text"
                        id="input"
                        maxLength={10}
                        value={vehcile_no}
                        onChange={(e) => {
                          setvehcile_no(e.target.value);
                        }}
                        invalid={vehicle_number_error}
                      />
                      {vehicle_number_error && (
                        <div style={{ fontSize: "10.5px", color: "#f46a6a" }}>
                           Vehicle No is required
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Branch *:</Label>
                        <SearchInput
                          data_list={branch_list}
                          setdata_list={setbranch_list}
                          data_item_s={branch}
                          set_data_item_s={setbranch}
                          page={page}
                          setpage={setpage}
                          set_id={setbranch_id}
                          setsearch_item={setsearch_branch}
                          error_message={"Please Select Any Branch"}
                          error_s={branch_err}
                          loaded={branch_loaded}
                          count={branch_count}
                          bottom={branch_bottom}
                          setbottom={setbranch_bottom}
                        />
                      </div>
                      {/* <div className="mt-1 error-text" color="danger">
                        {branch_err ? "Please Select Any Branch" : null}
                      </div> */}
                    </Col>

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehicle Model*</Label>
                      <Input
                        name="VEHCILE_MODEL"
                        type="text"
                        id="input"
                        value={vehcile_model}
                        onChange={(e) => {
                          setvehcile_model(e.target.value);
                        }}
                        invalid={vehicle_model_error}
                      />
                      {vehicle_model_error && (
                        <div style={{ fontSize: "10.5px", color: "#f46a6a" }}>
                           Vehicle Model Name is required
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3" id="vehicle_img">
                      <Label className="header-child">Vehicle Image*</Label>
                      <Input type="file" name="file" id="input" invalid={vehcile_img_error} 
                       onChange={(val) => {
                        setvehcile_img(val.target.value);
                       }}
                      />
                      <FormFeedback type="invalid">
                       Vehcile Image is required
                      </FormFeedback>
                    </div>
                  </Col>

                  <Col lg={4} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Active Status</Label>
                      <NSearchInput
                        data_list={active_list}
                        data_item_s={active_selected}
                        set_data_item_s={setactive_selected}
                        show_search={false}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>
        {/*  Button Footer */}
        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                onClick={() => {
                  if (vehcile_type_s === "") {
                    setvehicle_type_error(true);
                  } else if (
                    vehcile_type_s === "Partner Vehicle" &&
                    vendor_name === ""
                  ) {
                    setvendor_error(true);
                  } else if (vehcile_no === "" || vehcile_no.length !== 10) {
                    setvehicle_number_error(true);
                  } else if (branch === "") {
                    setbranch_err(true);
                  } else if (vehcile_model === "") {
                    setvehicle_model_error(true);
                  } else if (vehcile_img ===""){
                    setvehcile_img_error(true);
                  }
                  else {
                    is_updating ? upadte_vehcile() :
                      add_vehcile();
                  }
                }}
              >
                {is_updating ? "Update" : "Save"

                }

              </Button>

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

export default Add_Vehcile;
