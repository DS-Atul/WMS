import React, { useState,useEffect,useLayoutEffect } from "react";
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
    const navigate=useNavigate();
const dispatch= useDispatch();
const location_data=useLocation();
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
    "OWNED VEHCILE",
    "PARTNER VEHCILE",
  ]);
  const [active_list, setactive_list] = useState([
    "ACTIVE",
    "UNACTIVE",
  ]);
  const [active_selected, setactive_selected] = useState("");
  const [vehcile_type_s, setvehcile_type_s] = useState("");
  const [trans_name, settrans_name] = useState("");
  const [vehcile_no, setvehcile_no] = useState("");
  const [vehcile_model, setvehcile_model] = useState("");
  const [vendor_data, setvendor_data] = useState([]);

useEffect(() => {
    try {
      console.log("hello jiii",location_data.state.vehcile);
      if (location_data.state.vehcile) {
          setis_updating(true)
       let vehicle_data=location_data.state.vehcile
        setvehcile_type_s(vehicle_data.vehcile_type)
        setvehcile_no(vehicle_data.vehcile_no)
        setvehcile_model(vehicle_data.vehcile_model)
        
      }
    
 } catch (error) {
    
 }
}, [])


//   Api For Posting Data
const add_vehcile = () => {
    axios
      .post(
        ServerAddress + "master/add_vehcile/",
        {
         
            vehcile_no:vehcile_no,
            vehcile_model:vehcile_model,
            vehcile_status:active_selected === "Active" ? "True" :"False",
            vehcile_type:vehcile_type_s,
            transporter_name:vendor_id,
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
              `Vehcile  "${toTitleCase(
                vehcile_no
              )}" Added sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          navigate("/master/Vehcile");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Vehcile No "${toTitleCase(
                vehcile_no
              )}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Vehcile  Data ${error}`);
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
        console.log("data printing",data)
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

 
  useLayoutEffect(() => {
    get_vendor();
  }, [vendor_n_page, search_vendor_name, refresh]);
  
  return (
    <div>
      <Form>
        {/* Commodity */}
        <div className="mt-3">
          <PageTitle page={is_updating ? "Update Vehcile" : "Add Vehcile"} />
          <Title
            title={is_updating ? "Update Vehcile" : "Add  Vehcile"}
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
                  <Col lg={3} md={4} sm={4}>
                    <div className="mb-3">
                      <Label className="header-child">Vehcile Type*</Label>
                      <NSearchInput
                        data_list={vehcile_type}
                        data_item_s={vehcile_type_s}
                        set_data_item_s={setvehcile_type_s}
                        show_search={false}
                      />
                    </div>
                  </Col>
                  {vehcile_type_s === "PARTNER VEHCILE" &&
                 <Col lg={3} md={4} sm={4}>
                 <div className="mb-3">
                   <Label className="header-child">Transporter Name*</Label>
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
                }
                <Col lg={3} md={4} sm={4}>
                 <div className="mb-3">
                   <Label className="header-child">Vehcile Number*</Label>
                   <Input
                     name="VEHCILE_NUMBER"
                     type="text"
                     id="input"
                     maxLength={40}
                     value={vehcile_no}
                     onChange={(e) => {
                       setvehcile_no(e.target.value);
                     }}
                   />
                 </div>
                 </Col>
             
                 <Col lg={3} md={4} sm={4}>
                 <div className="mb-3">
                   <Label className="header-child">Vehcile Model*</Label>
                   <Input
                     name="VEHCILE_MODEL"
                     type="text"
                     id="input"
                     maxLength={40}
                     value={vehcile_model}
                     onChange={(e) => {
                       setvehcile_model(e.target.value);
                     }}
                   />
                 </div>
               </Col>
               <Col lg={3} md={4} sm={4}>
                 <div className="mb-3">
                   <Label className="header-child">Vehcile Image*</Label>
                   <Input
                     type="file" name="file" id="exampleFile"
                   />
                 </div>
               </Col>
               <Col lg={3} md={4} sm={4}>
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
              onClick={()=>{
                add_vehcile()
              }}
              >
                Save
              </Button>

              
              <Button
                className="btn btn-info m-1 cu_btn"
                type="button"
                // onClick={handleAction}
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
