/* eslint-disable */
import React, { useState, useLayoutEffect, useEffect } from "react";
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
  FormGroup,
} from "reactstrap";
import { IconContext } from "react-icons";
import Modal from "react-bootstrap/Modal";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import Tab from "../../../components/formComponent/clientComponent/tab/Tab";
import MultiRowSearchInput from "../../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

const AddVendor = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const user = useSelector((state) => state.authentication.userdetails);
  const [refresh, setrefresh] = useState(false);

  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();

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
  const [circle_btn3, setcircle_btn3] = useState(true);
  const toggle_circle3 = () => {
    setcircle_btn3(!circle_btn3);
  };
  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  // Used for Company Type list
  const [company_type, setcompany_type] = useState("");
  const [company_type_list, setcompany_type_list] = useState([
    "Individual",
    "Pvt Ltd / Ltd",
    "Partnership",
    "LLP",
    "Others",
  ]);

  const [business_selected, setbusiness_selected] = useState("");
  const [business_list, setbusiness_list] = useState([
    "Manufacturing",
    "Production",
    "Transportation",
    "Inventory",
    "Coloader",
  ]);

  const [service_region_selected, setservice_region_selected] = useState("");
  const [service_region_list, setservice_region_list] = useState([
    "Pan India",
    "State",
  ]);

  const [msme_registerd, setmsme_registerd] = useState(false);
  const [msme_registerd_number, setmsme_registerd_number] = useState("");
  const [msme_registerd_number_error, setmsme_registerd_number_error] =
    useState(false);
  const [msme_No_length, setmsme_No_length] = useState(false);
  const [msme_certificate, setmsme_certificate] = useState("");
  //Service Offered
  const [by_air, setby_air] = useState([]);
  const [by_air2, setby_air2] = useState([]);
  const [by_road, setby_road] = useState([]);
  const [by_road1, setby_road1] = useState([]);
  const [by_road2, setby_road2] = useState([]);
  const [by_road3, setby_road3] = useState([]);
  const [by_train, setby_train] = useState([]);
  const [by_channel, setby_channel] = useState([]);
  const [by_patner, setby_patner] = useState([]);

  //For Service Offered ids
  const [air_id, setair_id] = useState();
  const [console_conection_id, setconsole_conection_id] = useState();
  const [by_road_id, setby_road_id] = useState();
  const [by_roadid1, setby_roadid1] = useState();
  const [by_roadid2, setby_roadid2] = useState();
  const [by_roadid3, setby_roadid3] = useState();
  const [by_trainid, setby_trainid] = useState();
  const [by_channelid, setby_channelid] = useState();
  const [by_patnerid, setby_patnerid] = useState();
  const [del_id, setdel_id] = useState([]);

  //Others Service
  const [other_id, setother_id] = useState([]);
  const [other_deletedid, setother_deletedid] = useState([]);
  const [id_list, setid_list] = useState([]);

  //used for Logistic Partner type
  const [forward_by_air, setforward_by_air] = useState(false);
  const [forward_by_road, setforward_by_road] = useState(false);
  const [forward_by_train, setforward_by_train] = useState(false);
  const [channel_partner, setchannel_partner] = useState(false);
  const [delivery_partner, setdelivery_partner] = useState(false);
  const [others_services_offerd, setothers_services_offerd] = useState(false);

  const [airway_bill, setairway_bill] = useState(false);
  const [console_connect, setconsole_connect] = useState(false);

  const [emptyregisterd_number_errr, setemptyregisterd_number_errr] =
    useState(false);

  const [direct_vehicle, setdirect_vehicle] = useState(false);
  const [part_load_vehicle, setpart_load_vehicle] = useState(false);
  const [kg_wise, setkg_wise] = useState(false);

  const [temp_control_vehicle, settemp_control_vehicle] = useState(false);
  const [normal_vehicle, setnormal_vehicle] = useState(false);

  // used for error
  const [company_type_error, setcompany_type_error] = useState(false);
  const [business_line_error, setbusiness_line_error] = useState(false);
  const [service_region_selected_error, setservice_region_selected_error] =
    useState(false);

  // used to get data for update
  const [isupdating, setisupdating] = useState(false);
  const [vendor_data, setvendor_data] = useState("");
  const [updated_gstaddress, setupdated_gstaddress] = useState([]);

  //used for others services
  const [other_service, setother_service] = useState("");
  let others_list = [other_service];
  const [row1, setrow1] = useState([others_list]);
  const add_other_service = () => {
    setother_service("");
    others_list = [""];
    setrow1([...row1, others_list]);
  };
  const [other_list_id, setother_list_id] = useState([]);
  const delete_other_services = (item1) => {
    let temp = [...row1];
    let temp1 = [...other_list_id];
    const index = temp.indexOf(item1);
    if (index > -1) {
      temp.splice(index, 1);
      temp1.splice(index, 1);
    }
    setrow1(temp);
    setother_list_id(temp1);
  };

  // Calculation Info
  const local_cal_cust = useSelector((state) => state.customer.local_cal_cust);
  const local_cal = useSelector((state) => state.client.local_cal);
  const air_cal = useSelector((state) => state.client.air_cal);
  // active Tabs
  let temp_active_tabs = [
    local_cal.cal_type,
    air_cal.cal_type,
    "DONT",
    "DONT",
    "DONT",
    "DONT",
  ];
  const [active_tabs, setactive_tabs] = useState(temp_active_tabs);

  const [is_local, setis_local] = useState(true);
  const [is_air, setis_air] = useState(true);
  const [is_surface, setis_surface] = useState(true);
  const [is_train, setis_train] = useState(true);
  const [is_cargo, setis_cargo] = useState(true);
  const [is_courier, setis_courier] = useState(true);
  const [is_warehouse, setis_warehouse] = useState(true);

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      vendor_name: toTitleCase(vendor_data.name) || "",
      // msme_registration_no: toTitleCase(vendor_data.msme_registration_no) || "",
      vendor_email: vendor_data.emailp || "",
      vendor_ph_no: vendor_data.mobile_numberp || "",
      vendor_email1: vendor_data.emails || "",
      vendor_ph_no1: vendor_data.mobile_numbers || "",
      pan_number: vendor_data.pan_no || "",
    },

    validationSchema: Yup.object({
      vendor_name: Yup.string().required("Vendor Name is required"),
      vendor_email: Yup.string().email().required("Vendor Email is required"),
      vendor_ph_no: Yup.string()
        .min(10, "Phone number must 10 digit long")
        .max(10, "Phone number must 10 digit long")
        .required("Vendor Phone No is require"),
      pan_number: Yup.string()
        .min(10, "Pan number must be 10 characters")
        .max(10, "Pan number must be 10 characters")
        .required("Pan No Is Required"),
    }),

    onSubmit: (values) => {
      if (company_type === "") {
        document.getElementById("vendor_servies").scrollIntoView();
        setcompany_type_error(true);
      } else if (business_selected === "") {
        document.getElementById("vendor_servies").scrollIntoView();
        setbusiness_line_error(true);
      } else if (service_region_selected === "") {
        document.getElementById("vendor_servies").scrollIntoView();
        setservice_region_selected_error(true);
      } else if (
        Select_forward_by_air === false &&
        Select_forward_by_road === false &&
        forward_by_train === false &&
        channel_partner === false &&
        delivery_partner === false &&
        Select_other_service_offerd === false
      ) {
        alert("Please Select Any Service Offered");
      } else {
        isupdating ? update_vendor(values) : add_vendor(values);
      }
    },
  });


  const [forwarding_by_air_value, setforwarding_by_air_value] = useState("");
  useEffect(() => {
    if (forward_by_air && airway_bill && console_connect) {
      setforwarding_by_air_value("AirWay Bill & Console COnnect");
    }
  }, [airway_bill, console_connect, forward_by_air]);

  useEffect(() => {
    if (msme_registerd_number) {
      setemptyregisterd_number_errr(false);
    }
  }, [msme_registerd_number]);

  // Post Vendor
  const add_vendor = (values) => {
    let vendor_other_data = [];
    for (let i = 0; i < row1.length; i++) {
      vendor_other_data.push([String(row1[i]).toUpperCase()]);
    }
    axios
      .post(
        ServerAddress + "master/add_vendor/",
        {
          name: toTitleCase(values.vendor_name).toUpperCase(),
          is_msme_regitered: msme_registerd,

          emailp: values.vendor_email,
          mobile_numberp: values.vendor_ph_no,

          emails: values.vendor_email1,
          mobile_numbers:
            values.vendor_ph_no1 !== "" ? values.vendor_ph_no1 : null,

          company_type: company_type.toUpperCase(),
          lob: business_selected.toUpperCase(),
          service_region: service_region_selected.toUpperCase(),
          pan_no: toTitleCase(values.pan_number).toUpperCase(),
          created_by: user_id,
          msme_registration_no: msme_registerd_number,
          service_offered: [
            by_air.length !== 0 && by_air,
            by_air2.length !== 0 && by_air2,
            by_road.length !== 0 && by_road,
            by_road1.length !== 0 && by_road1,
            by_road2.length !== 0 && by_road2,
            by_road3.length !== 0 && by_road3,
            by_train.length !== 0 && by_train,
            by_channel.length !== 0 && by_channel,
            by_patner.length !== 0 && by_patner,
          ],
          others: others_services_offerd && vendor_other_data,
          gst_address: row,
          //For C&M
          cm_current_department: user.user_department,
          cm_current_status:
            user.user_department_name === "ADMIN"
              ? "NOT APPROVED"
              : current_status.toUpperCase(),
          cm_transit_status:
            user.user_department_name === "ADMIN"
              ? "NOT APPROVED"
              : current_status.toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("response----", response);
        if (response.statusText === "Created") {
          dispatch(setToggle(true));
          dispatch(
            setDataExist(`New Vendor "${values.vendor_name}" Added Sucessfully`)
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Vendor Name "${toTitleCase(values.vendor_name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        } else if (
          response.data.data.pan_no &&
          response.data.data.pan_no[0] ===
            "vendor with this PAN Number already exists."
        ) {
          dispatch(setDataExist(`"${values.pan_number}" already exists`));
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Braches Data ${error}`);
      });
  };

  //update Vendor
  const update_vendor = (values) => {
    let vendor_other_data = [];
    for (let i = 0; i < row1.length; i++) {
      vendor_other_data.push([String(row1[i][0]).toUpperCase(), row1[i][1]]);
    }

    let fields_names = Object.entries({
      company_type: company_type,
      emailp: values.vendor_email,
      emails: values.vendor_email1,
      is_msme_regitered: msme_registerd,
      lob: business_selected,
      mobile_numberp: values.vendor_ph_no,
      mobile_numbers: values.vendor_ph_no1,
      name: values.vendor_name,
      pan_no: values.pan_number,
      service_region: service_region_selected,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.vendor[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    axios
      .put(
        ServerAddress + "master/update_vendor/" + vendor_data.id,

        {
          name: toTitleCase(values.vendor_name).toUpperCase(),
          is_msme_regitered: msme_registerd,

          emailp: values.vendor_email,
          mobile_numberp: values.vendor_ph_no,

          emails: values.vendor_email1,
          mobile_numbers:
            values.vendor_ph_no1 !== "" ? values.vendor_ph_no1 : null,
          msme_registration_no: msme_registerd_number,
          company_type: company_type.toUpperCase(),
          lob: business_selected.toUpperCase(),
          service_region: service_region_selected.toUpperCase(),
          pan_no: toTitleCase(values.pan_number).toUpperCase(),
          modified_by: user_id,
          service_offered: [
            by_air.length !== 0 && by_air,
            by_air2.length !== 0 && by_air2,
            by_road.length !== 0 && by_road,
            by_road1.length !== 0 && by_road1,
            by_road2.length !== 0 && by_road2,
            by_road3.length !== 0 && by_road3,
            by_train.length !== 0 && by_train,
            by_channel.length !== 0 && by_channel,
            by_patner.length !== 0 && by_patner,
          ],
          deleted_id: del_id,
          others: others_services_offerd && vendor_other_data,
          other_deleted_id: other_deletedid,
          gst_address: row,
          deleted_gst: deleted_gst_id,
          change_fields: change_fields,
          //For C&M
          cm_transit_status: status_toggle === true ? current_status : "",
          cm_current_status: current_status.toUpperCase(),
          cm_remarks: "",
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
          dispatch(
            setDataExist(`Vendor "${values.vendor_name}" Updated Sucessfully`)
          );
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Vendor Name "${toTitleCase(values.vendor_name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Braches Data ${error}`);
      });
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/vendor/Vendor");
  };

  useLayoutEffect(() => {
    try {
      setvendor_data(location_data.state.vendor);
      setisupdating(true);
      setmsme_registerd_number(location_data.state.vendor.msme_registration_no);
      setupdated_gstaddress(location_data.state.vendor.vendor_gst);
      setbusiness_selected(toTitleCase(location_data.state.vendor.lob));
      setservice_region_selected(
        toTitleCase(location_data.state.vendor.service_region)
      );
      setmsme_registerd(location_data.state.vendor.is_msme_regitered);
      setcompany_type(toTitleCase(location_data.state.vendor.company_type));
    } catch (error) {}
  }, []);

  useLayoutEffect(() => {
    if (forward_by_air && airway_bill) {
      setby_air(["FORWARDING BY AIR", "AIRWAY BILL", "", air_id]);
    } else {
      setby_air([]);
      setairway_bill(false);
    }
  }, [forward_by_air, airway_bill, air_id]);

  useLayoutEffect(() => {
    if (forward_by_air && console_connect) {
      setby_air2([
        "FORWARDING BY AIR",
        "CONSOLE CONNECTION",
        "",
        console_conection_id,
      ]);
    } else {
      setby_air2([]);
      setconsole_connect(false);
    }
  }, [forward_by_air, console_connect, console_conection_id]);

  useLayoutEffect(() => {
    if (forward_by_road && direct_vehicle && temp_control_vehicle) {
      setby_road([
        "FORWARDING BY ROAD",
        "DIRECT VEHICLE",
        "TEMPRATURE CONTROL VEHICLE",
        by_road_id,
      ]);
    } else {
      setby_road([]);
      settemp_control_vehicle(false);
    }
  }, [forward_by_road, direct_vehicle, temp_control_vehicle, by_road_id]);

  useLayoutEffect(() => {
    if (forward_by_road && direct_vehicle && normal_vehicle) {
      setby_road1([
        "FORWARDING BY ROAD",
        "DIRECT VEHICLE",
        "NORMAL VEHICLE",
        by_roadid1,
      ]);
    } else {
      setby_road1([]);
      setnormal_vehicle(false);
    }
  }, [forward_by_road, direct_vehicle, normal_vehicle, by_roadid1]);

  useLayoutEffect(() => {
    if (forward_by_road && part_load_vehicle) {
      setby_road2(["FORWARDING BY ROAD", "PART LOAD VEHICLE", "", by_roadid2]);
    } else {
      setby_road2([]);
      setpart_load_vehicle(false);
    }
  }, [forward_by_road, part_load_vehicle, by_roadid2]);

  useLayoutEffect(() => {
    if (forward_by_road && kg_wise) {
      setby_road3(["FORWARDING BY ROAD", "KG WISE", "", by_roadid3]);
    } else {
      setby_road3([]);
      setkg_wise(false);
    }
  }, [forward_by_road, kg_wise, by_roadid3]);

  useLayoutEffect(() => {
    if (forward_by_train) {
      setby_train(["FORWARDING BY TRAIN", "", "", by_trainid]);
    } else {
      setby_train([]);
      setforward_by_train(false);
    }
  }, [forward_by_train, by_trainid]);

  useLayoutEffect(() => {
    if (channel_partner) {
      setby_channel(["CHANNEL PATNER", "", "", by_channelid]);
    } else {
      setby_channel([]);
      setchannel_partner(false);
    }
  }, [channel_partner, by_channelid]);

  useLayoutEffect(() => {
    if (delivery_partner) {
      setby_patner(["DELIVERY PATNER", "", "", by_patnerid]);
    } else {
      setby_patner([]);
      setdelivery_partner(false);
    }
  }, [delivery_partner, by_patnerid]);

  let temp2 = [];
  const getVendorService = (id) => {
    let temp = [];

    let ids = [];
    axios
      .get(ServerAddress + `master/get_vendorservice/?vendor_id=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        for (let index = 0; index < resp.data.vendor_service.length; index++) {
          const data = resp.data.vendor_service[index];

          if (data.service_mode === "FORWARDING BY AIR") {
            setforward_by_air(true);
          }
          if (data.service_type === "AIRWAY BILL") {
            setair_id(data.id);
            setairway_bill(true);
          }
          if (data.service_type === "CONSOLE CONNECTION") {
            setconsole_conection_id(data.id);
            setconsole_connect(true);
          }
          if (data.service_mode === "FORWARDING BY ROAD") {
            setforward_by_road(true);
          }
          if (data.service_type === "PART LOAD VEHICLE") {
            setby_roadid2(data.id);
            setpart_load_vehicle(true);
          }
          if (data.service_type === "KG WISE") {
            setby_roadid3(data.id);
            setkg_wise(true);
          }
          if (data.service_type === "DIRECT VEHICLE") {
            setdirect_vehicle(true);
          }
          if (data.service_name === "TEMPRATURE CONTROL VEHICLE") {
            setby_road_id(data.id);
            settemp_control_vehicle(true);
          }
          if (data.service_name === "NORMAL VEHICLE") {
            setby_roadid1(data.id);
            setnormal_vehicle(true);
          }
          if (data.service_mode === "FORWARDING BY TRAIN") {
            setby_trainid(data.id);
            setforward_by_train(true);
          }
          if (data.service_mode === "CHANNEL PATNER") {
            setby_channelid(data.id);
            setchannel_partner(true);
          }
          if (data.service_mode === "DELIVERY PATNER") {
            setby_patnerid(data.id);
            setdelivery_partner(true);
          }
          if (data.service_mode === "OTHERS") {
            setothers_services_offerd(true);
            temp.push([toTitleCase(data.service_type), data.id]);
            temp2.push(data.id);
          }
          if (data.service_mode !== "OTHERS") {
            ids.push(data.id);
          }
        }
        setrow1(temp);
        setother_list_id(temp2);

        setother_id(temp2);
        setid_list(ids);
      })
      .catch((err) => {
        alert(`Error Occur in Get vendor service, ${err}`);
      });
  };

  useEffect(() => {
    if (isupdating === true && vendor_data.id) {
      getVendorService(vendor_data.id);
    }
  }, [isupdating]);

  useLayoutEffect(() => {
    if (msme_registerd === true && msme_registerd_number !== "") {
      setmsme_registerd_number_error(false);
    }
    if (msme_registerd_number !== "" && msme_registerd_number.length === 12) {
      setmsme_No_length(false);
    }
  }, [msme_registerd, msme_registerd_number]);

  useEffect(() => {
    if (other_list_id !== "") {
      let id_list = other_id.filter((p) => other_list_id.indexOf(p) === -1);
      setother_deletedid(id_list);
    }
  }, [other_list_id, other_id]);

  useEffect(() => {
    if (isupdating) {
      let temp_a = [];
      temp_a.push(
        by_air[3],
        by_air2[3],
        by_road[3],
        by_road1[3],
        by_road2[3],
        by_road3[3],
        by_train[3],
        by_channel[3],
        by_patner[3]
      );
      let temp_b = id_list.filter((p) => temp_a.indexOf(p) === -1);
      setdel_id(temp_b);
    }
  }, [
    by_air,
    by_air2,
    by_road,
    by_road1,
    by_road2,
    by_road3,
    by_train,
    by_channel,
    by_patner,
    id_list,
  ]);

  useEffect(() => {
    if (!others_services_offerd) {
      setother_list_id([]);
    } else {
      setother_list_id(other_id);
    }
  }, [others_services_offerd]);

  //Gst address
  const [gst_state_id, setgst_state_id] = useState("");
  const [gst_no, setgst_no] = useState("");
  const [gst_address, setgst_address] = useState("");
  const [gst_state, setgst_state] = useState(["", ""]);
  const [gst_state_list, setgst_state_list] = useState([]);
  const [gst_city_list, setgst_city_list] = useState([]);
  const [gst_city, setgst_city] = useState(["", "", ""]);
  const [gst_pincode, setgst_pincode] = useState(["", ""]);
  const [gstpincode_list, setgstpincode_list] = useState([]);
  const [gst_pincodepage, setgst_pincodepage] = useState(1);
  const [gst_pincode_search, setgst_pincode_search] = useState("");
  const [gst_locality_list, setgst_locality_list] = useState([]);
  const [gst_locality, setgst_locality] = useState(["", ""]);
  const [gst_localitypage, setgst_localitypage] = useState(1);
  const [gst_locality_search, setgst_locality_search] = useState("");

  const [gst_city_page, setgst_city_page] = useState(1);
  const [gst_city_search_item, setgst_city_search_item] = useState("");
  const [selected, setselected] = useState([]);
  const [active, setactive] = useState(false);

  const [gst_id_list, setgst_id_list] = useState([]);
  const [gst_ids, setgst_ids] = useState([]);
  const [deleted_gst_id, setdeleted_gst_id] = useState([]);

  let dimension_list = [
    gst_no,
    gst_city,
    gst_pincode,
    gst_locality,
    gst_address,
    active,
  ];
  const [row, setrow] = useState([dimension_list]);
  // console.log("selected---", selected)

  const addGST = () => {
    dimension_list = ["", ["", "", ""], ["", ""], ["", ""], "", false];
    setrow([...row, dimension_list]);
  };

  const deleteGST = (item) => {
    setgst_no("gst_no");
    setgst_state("state");
    setgst_city("city");
    setgst_pincode("pincode");
    setgst_locality("gst_locality");
    setgst_address("gst_address");
    let temp = [...row];
    let temp_2 = [...gst_id_list];
    const index = temp.indexOf(item);
    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow(temp);
    setgst_id_list(temp_2);
  };

  const getGstStates = (place_id, filter_by) => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_states/?search=${""}&place_id=${place_id}&filter_by=${filter_by}&p=${1}&records=${10}&state_search=${""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          (state_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.state),
          ])),
            setgst_state_list(state_list);
          setgst_state_id(resp.data.results[0].id);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  const getGstCities = (place_id, filter_by) => {
    let cities_list = [...gst_city_list];
    axios
      .get(
        ServerAddress +
          `master/all_cities/?search=${""}&p=${gst_city_page}&records=${10}&city_search=${gst_city_search_item}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (gst_city_page === 1) {
            cities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state_name) + "-" + toTitleCase(v.city),
              v.state,
            ]);
          } else {
            cities_list = [
              ...gst_city_list,
              ...resp.data.results.map((v) => [
                v.id,
                toTitleCase(v.state_name) + "-" + toTitleCase(v.city),
                v.state,
              ]),
            ];
          }
          setgst_city_list(cities_list);
        } else {
          setgst_city_list([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City11111111, ${err}`);
      });
  };

  const getPincode = (place_id, filter_by) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_pincode/?search=${""}&p=${gst_pincodepage}&records=${10}&pincode_search=${gst_pincode_search}` +
          "&place_id=" +
          place_id +
          "&filter_by=" +
          filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (filter_by !== "pincode") {
          if (gst_pincodepage == 1) {
            pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
          } else {
            pincode_list = [
              ...gstpincode_list,
              ...resp.data.results.map((v) => [v.id, v.pincode]),
            ];
          }
          setgstpincode_list(pincode_list);
        } else {
          dispatch(
            setDataExist(
              "You entered invalid pincode or pincode not available in database"
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  const getLocality = (place_id, filter_by) => {
    let locality_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_locality/?search=${""}&p=${gst_localitypage}&records=${10}` +
          `&place_id=${place_id}&filter_by=${filter_by}&name_search=${gst_locality_search}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (filter_by !== "locality") {
          if (gst_localitypage == 1) {
            locality_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            locality_list = [
              ...gst_locality_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setgst_locality_list(locality_list);
        } else {
          dispatch(setDataExist("You entered invalid Locality"));
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Pincode , ${err}`);
      });
  };

  useEffect(() => {
    if (gst_state_id !== "") {
      getGstCities(gst_state_id, "state");
    }
  }, [gst_state_id, gst_city_page, gst_city_search_item]);

  const [gst_city_id, setgst_city_id] = useState("");
  const [gst_pincode_id, setgst_pincode_id] = useState("");
  const [gst_val, setgst_val] = useState("");
  useLayoutEffect(() => {
    let result = row[row.length - 1][0].substring(0, 12);
    setgst_val(result);
    setgst_city_id(row[row.length - 1][1][0]);
    setgst_pincode_id(row[row.length - 1][2][0]);
  }, [dimension_list]);

  useLayoutEffect(() => {
    if (gst_city_id != "") {
      getPincode(gst_city_id, "city");
    }
  }, [gst_city_id, gst_pincodepage, gst_pincode_search]);

  useLayoutEffect(() => {
    if (gst_pincode_id !== "") {
      getLocality(gst_pincode_id, "pincode");
    }
  }, [gst_pincode_id, gst_localitypage, gst_locality_search]);

  useEffect(() => {
    if (isupdating) {
      if (updated_gstaddress.length !== 0) {
        let temp = [];
        let temp_list = [];
        let temp_list2 = [];
        temp = updated_gstaddress;

        for (let index = 0; index < updated_gstaddress.length; index++) {
          temp_list.push([
            temp[index].gst_no,
            [
              temp[index].city_id,
              toTitleCase(temp[index].city_name),
              temp[index].state,
            ],
            [temp[index].pincode, temp[index].pincode_name],
            [temp[index].location, toTitleCase(temp[index].location_name)],
            toTitleCase(temp[index].address),
            temp[index].is_active,
            temp[index].id,
          ]);
          temp_list2.push(temp[index].id);
        }
        setrow(temp_list);
        setgst_ids(temp_list2);
        setgst_id_list(temp_list2);
      } else {
      }
    }
  }, [isupdating]);

  useEffect(() => {
    if (gst_id_list !== "") {
      let id_list = gst_ids.filter((p) => gst_id_list.indexOf(p) === -1);
      setdeleted_gst_id(id_list);
    }
  }, [gst_id_list, gst_ids]);

  let validation_list = [
    [forward_by_air, airway_bill, console_connect],
    forward_by_road,
    [
      direct_vehicle,
      [temp_control_vehicle, normal_vehicle],
      part_load_vehicle,
      kg_wise,
    ],
    forward_by_train,
    channel_partner,
    delivery_partner,
    others_services_offerd,
    [row1],
  ];
  // console.log("List",validation_list)

  // Service Offerd
  const [Select_forward_by_air, setSelect_forward_by_air] = useState(false);
  const [Select_forward_by_road_direct, setSelect_forward_by_road_direct] =
    useState(false);
  const [Select_forward_by_road, setSelect_forward_by_road] = useState(false);
  const [Select_other_service_offerd, setSelect_other_service_offerd] =
    useState(false);
  useLayoutEffect(() => {
    //Forwarding By Air
    if (
      (forward_by_air && airway_bill) ||
      (forward_by_air && console_connect)
    ) {
      setSelect_forward_by_air(true);
      console.log(" True By Air Selected", Select_forward_by_air);
    } else {
      setSelect_forward_by_air(false);
      console.log(" False By Air Selected", Select_forward_by_air);
    }

    if (forward_by_road && direct_vehicle) {
      if (
        (direct_vehicle && temp_control_vehicle) ||
        (direct_vehicle && normal_vehicle)
      ) {
        setSelect_forward_by_road_direct(true);
      } else {
        setSelect_forward_by_road_direct(false);
      }
    }
    // Forwarding By Road
    if (
      (forward_by_road && part_load_vehicle) ||
      (forward_by_road && kg_wise) ||
      (forward_by_road && direct_vehicle)
    ) {
      setSelect_forward_by_road(true);
      console.log("By Road Selected", Select_forward_by_road);
    } else {
      setSelect_forward_by_road(false);
    }

    if (others_services_offerd === true && row1[0].length===0) {
      setSelect_other_service_offerd(true);
    } else {
      setSelect_other_service_offerd(false);
    }
    console.log(
      "Other service data ===>>",
      row1[0] == "" ? "ram" : "sita",
      Select_other_service_offerd
    );
  }, [
    forward_by_air,
    airway_bill,
    console_connect,
    Select_forward_by_air,
    forward_by_road,
    direct_vehicle,
    part_load_vehicle,
    kg_wise,
    Select_forward_by_road,
    forward_by_train,
    channel_partner,
    delivery_partner,
    others_services_offerd,
    row1,
    Select_other_service_offerd,
  ]);
  //For Checker Maker
  const [current_status, setcurrent_status] = useState("");
  const [status_toggle, setstatus_toggle] = useState(false);
  const [message, setmessage] = useState("");
  const [message_error, setmessage_error] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setmessage_error(false);
  };

  useEffect(() => {
    if (user.user_department_name === "ADMIN") {
      setcurrent_status("NOT APPROVED");
      setstatus_toggle(true);
    } else if (
      user.user_department_name === "ACCOUNTANT" ||
      user.user_department_name === "ACCOUNTANT" ||
      user.user_department_name + " " + user.designation_name ===
        "ACCOUNT MANAGER" ||
      user.is_superuser
    ) {
      setcurrent_status("APPROVED");
      setstatus_toggle(true);
    } else {
      setcurrent_status("NOT APPROVED");
      // setstatus_toggle(false)
    }
  }, [user, isupdating]);

  const update_vendorstatus = (id) => {
    axios
      .put(
        ServerAddress + "master/update_vendor/" + id,
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
          navigate(-1);
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  const handleSubmit = () => {
    if (message == "") {
      setmessage_error(true);
    } else {
      update_vendorstatus(vendor_data.id);
      setShow(false);
    }
  };
  const handlClk = () => {
    navigate("/master/vendor/vendorHistory/VendorHistoryPage", {
      state: { vendor: vendor_data },
    });
  };

  return (
    <>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reject Resion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Label for="exampleText">Text Area</Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                style={{ height: "90px" }}
                onChange={(e) => {
                  setmessage(e.target.value);
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

            let all_state = Object.entries(validation.values);
            let filter_value = all_state.filter(
              (v) => v[1] === "" || v[1] === 0
            );
            let map_value = filter_value.map((m) => m[0]);
            let all_value = map_value[0];

            let filed1 = ["vendor_name"];
            let field2 = ["vendor_email", "vendor_ph_no"];
            let field3 = ["pan_number"];

            if (filed1.includes(all_value)) {
              document.getElementById("vendor_info").scrollIntoView();
            }

            if (field2.includes(all_value)) {
              document.getElementById("contact_info").scrollIntoView();
            }

            if (field3.includes(all_value)) {
              document.getElementById("vendor_servies").scrollIntoView();
            }
            if (msme_registerd === true && msme_registerd_number === "") {
              setmsme_registerd_number_error(true);
              document.getElementById("vendor_info").scrollIntoView();
            }
            if (
              msme_registerd_number !== "" &&
              msme_registerd_number.length !== 12
            ) {
              document.getElementById("vendor_info").scrollIntoView();
              setmsme_No_length(true);
            }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <div className="mt-3">
            <PageTitle page={"Add Vendor"} />
            <Title
              title={isupdating ? "Update Vendor" : "Add Vendor"}
              parent_title="Masters"
            />
          </div>

          {/* Vendor Info */}
          <div className="m-3">
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
            ) : null}

            <Col lg={12} id="vendor_info">
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Vendor Info
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
                          <Label className="header-child">Vendor Name * </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.vendor_name || ""}
                            invalid={
                              validation.touched.vendor_name &&
                              validation.errors.vendor_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="vendor_name"
                            placeholder="Enter Vendor Name"
                          />
                          {validation.touched.vendor_name &&
                          validation.errors.vendor_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.vendor_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            MSME Registered *
                          </Label>
                          <Row>
                            <Col lg={6} md={4} sm={4}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input "
                                  type="radio"
                                  name="MSME_REG"
                                  // id="MSMEREG"
                                  value={msme_registerd}
                                  onClick={() => {
                                    setmsme_registerd(true);
                                  }}
                                  checked={msme_registerd === true}
                                  readOnly={true}
                                />

                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios1"
                                >
                                  YES
                                </Label>
                              </div>
                            </Col>

                            <Col lg={6} md={3} sm={3}>
                              <div className="form-check mb-2">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="MSME_REG"
                                  // id="MSMEREG"
                                  value={msme_registerd}
                                  onClick={() => {
                                    setmsme_registerd(false);
                                  }}
                                  checked={msme_registerd === false}
                                  readOnly={true}
                                />
                                <Label
                                  className="form-check-label input-box"
                                  htmlFor="exampleRadios2"
                                >
                                  NO
                                </Label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      {msme_registerd && (
                        <>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                MSME Reg. Number *{" "}
                              </Label>
                              <Input
                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={
                                //   validation.values.msme_registration_no || ""
                                // }
                                // invalid={
                                //   validation.touched.msme_registration_no &&
                                //   validation.errors.msme_registration_no
                                //     ? true
                                //     : false
                                // }
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="msme_registration_no"
                                placeholder="Enter Registration Number"
                                value={msme_registerd_number}
                                onChange={(val) => {
                                  setmsme_registerd_number(val.target.value);
                                }}
                                invalid={msme_registerd_number_error}
                              />
                              <div className="mt-1 error-text" color="danger">
                                {msme_registerd_number_error
                                  ? " MSME No is required"
                                  : null}
                              </div>

                              {msme_No_length && (
                                <div className="mt-1 error-text" color="danger">
                                  MSME number must 12 digit long
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label className="header-child">
                                {/* Callibration */}
                                MSME Certificate *
                              </Label>
                              <Input
                                style={{ marginBottom: "10px" }}
                                value={msme_certificate}
                                className="form-control-md"
                                id="input"
                                name="logo"
                                type="file"
                                onChange={(val) => {
                                  setmsme_certificate(val.target.value);
                                }}
                              />
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Vendor Registered Office Contact info */}
          <div className="m-3" id="contact_info">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Vendor Registered Office Contact Info
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
                      <Col lg={6} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Vendor Email *</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.vendor_email || ""}
                            invalid={
                              validation.touched.vendor_email &&
                              validation.errors.vendor_email
                                ? true
                                : false
                            }
                            type="email"
                            className="form-control-md"
                            id="input"
                            name="vendor_email"
                            placeholder="Enter Vendor Email"
                          />
                          {validation.touched.vendor_email &&
                          validation.errors.vendor_email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.vendor_email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={6} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Vendor Ph.No *</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.vendor_ph_no || ""}
                            invalid={
                              validation.touched.vendor_ph_no &&
                              validation.errors.vendor_ph_no
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="vendor_ph_no"
                            placeholder="Enter Phone Number"
                          />
                          {validation.touched.vendor_ph_no &&
                          validation.errors.vendor_ph_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.vendor_ph_no}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={6} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Vendor Email 2{" "}
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            value={validation.values.vendor_email1 || ""}
                            type="email"
                            className="form-control-md"
                            id="input"
                            name="vendor_email1"
                            placeholder="Enter Vendor Email"
                          />
                        </div>
                      </Col>

                      <Col lg={6} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Vendor Ph.No 2</Label>
                          <Input
                            onChange={validation.handleChange}
                            value={validation.values.vendor_ph_no1 || ""}
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="vendor_ph_no1"
                            placeholder="Enter Phone Number"
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Vendor Services/ Address Info */}
          <div className="m-3" id="address_info">
            <Col lg={12} id="vendor_servies">
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Vendor Servies / Address Info
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
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Company Type *</Label>
                          <NSearchInput
                            data_list={company_type_list}
                            data_item_s={company_type}
                            set_data_item_s={setcompany_type}
                            show_search={false}
                            error_message={"Please Select Company Type"}
                            error_s={company_type_error}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Line Of Business *
                          </Label>
                          <NSearchInput
                            data_list={business_list}
                            data_item_s={business_selected}
                            set_data_item_s={setbusiness_selected}
                            show_search={false}
                            error_message={"Please Select Line Of Business"}
                            error_s={business_line_error}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Service Region *
                          </Label>
                          <NSearchInput
                            data_list={service_region_list}
                            data_item_s={service_region_selected}
                            set_data_item_s={setservice_region_selected}
                            error_message={"Please Select Service Region"}
                            error_s={service_region_selected_error}
                            show_search={false}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Pan Number *</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.pan_number || ""}
                            invalid={
                              validation.touched.pan_number &&
                              validation.errors.pan_number
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="pan_number"
                            placeholder="Enter Pan Number"
                          />
                          {validation.touched.pan_number &&
                          validation.errors.pan_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.pan_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Row>
                        <>
                          <Row className="hide">
                            <Col lg={2} md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">GST No</Label>
                                {row.map((item, index) => {
                                  return (
                                    <Input
                                      min={0}
                                      key={index}
                                      value={item[0]}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      style={{ marginBottom: "15px" }}
                                      placeholder="Enter GST No. "
                                      onChange={(val) => {
                                        // setlength(val.target.value);
                                        item[0] = val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                      onMouseLeave={() => {
                                        // setclicked(true);
                                        // alert("----")
                                        let itm = item[0];

                                        if (
                                          item[0].length == 15 &&
                                          gst_val ==
                                            itm[0] +
                                              itm[1] +
                                              validation.values.pan_number
                                        ) {
                                          getGstStates(
                                            itm[0] + itm[1],
                                            "gst_code"
                                          );
                                        } else if (
                                          item[0].length > 10 &&
                                          row.length - 1 === index
                                        ) {
                                          dispatch(setShowAlert(true));
                                          dispatch(
                                            setDataExist(`Invalid GST Number`)
                                          );
                                          dispatch(setAlertType("warning"));
                                        }
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </Col>

                            <Col lg={2} md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child"> City</Label>
                                {row.map((item, index) => (
                                  <div className="mb-3">
                                    <MultiRowSearchInput
                                      data_list={gst_city_list}
                                      setdata_list={setgst_city_list}
                                      data_item_s={row[index][1]}
                                      page={gst_city_page}
                                      setpage={setgst_city_page}
                                      setsearch_txt={setgst_city_search_item}
                                      error_message={"Please Select Any Option"}
                                      refresh={refresh}
                                      setrefresh={setrefresh}
                                      idx={index}
                                    />
                                  </div>
                                ))}
                              </div>
                            </Col>

                            <Col lg={2} md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">Pincode </Label>
                                {row.map((item, index) => (
                                  <div className="mb-3">
                                    <MultiRowSearchInput
                                      data_list={gstpincode_list}
                                      setdata_list={setgstpincode_list}
                                      data_item_s={row[index][2]}
                                      page={gst_pincodepage}
                                      setpage={setgst_pincodepage}
                                      setsearch_txt={setgst_pincode_search}
                                      refresh={refresh}
                                      setrefresh={setrefresh}
                                      idx={index}
                                    />
                                  </div>
                                ))}
                              </div>
                            </Col>
                            <Col lg={2} md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Locality{" "}
                                </Label>
                                {row.map((item, index) => (
                                  <div className="mb-3">
                                    <MultiRowSearchInput
                                      data_list={gst_locality_list}
                                      setdata_list={setgst_locality_list}
                                      data_item_s={row[index][3]}
                                      page={gst_localitypage}
                                      setpage={setgst_localitypage}
                                      setsearch_txt={setgst_locality_search}
                                      refresh={refresh}
                                      setrefresh={setrefresh}
                                      idx={index}
                                    />
                                  </div>
                                ))}
                              </div>
                            </Col>

                            <Col lg={2} md={3} sm={3}>
                              <div className="mb-3">
                                <Label className="header-child">Address</Label>
                                {row.map((item, index) => {
                                  return (
                                    <Input
                                      min={0}
                                      key={index}
                                      value={item[4]}
                                      type="text"
                                      className="form-control-md"
                                      id="input"
                                      style={{ marginBottom: "15px" }}
                                      placeholder="Enter Address "
                                      onChange={(val) => {
                                        // setlength(val.target.value);
                                        item[4] = val.target.value;
                                        setrefresh(!refresh);
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </Col>
                            <Col lg={1} md={3} sm={3}>
                              <div
                                className="mb-3"
                                style={{ textAlign: "center" }}
                              >
                                <Label className="header-child">H.O</Label>
                                {row.map((item, index) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        if (selected.includes(index)) {
                                          let lis = [...selected];
                                          setselected(
                                            lis.filter((e) => e !== index)
                                          );
                                          setactive(false);
                                          item[5] = false;
                                        } else {
                                          setselected([...selected, index]);
                                          setactive(true);
                                          item[5] = true;
                                        }
                                      }}
                                    >
                                      {item[5] ? (
                                        <FiCheckSquare
                                          style={{ marginBottom: "40px" }}
                                        />
                                      ) : (
                                        <FiSquare
                                          style={{ marginBottom: "40px" }}
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </Col>
                            <Col lg={1}>
                              <div
                                className="mb-3"
                                style={{ textAlign: "center" }}
                              >
                                {row.length > 1 ? (
                                  <Label className="header-child">Delete</Label>
                                ) : null}
                                {row.map((item, index) => (
                                  <IconContext.Provider
                                    key={index}
                                    value={{
                                      className: "icon multi-input",
                                    }}
                                  >
                                    {row.length > 1 ? (
                                      <>
                                        <div style={{ height: "14.5px" }}></div>
                                        <div
                                          onClick={() => {
                                            // isupdating
                                            // && item[4] && delete_package(item[4])
                                            deleteGST(item);
                                          }}
                                        >
                                          <MdDeleteForever
                                            style={{
                                              justifyContent: "center",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </div>
                                      </>
                                    ) : null}
                                  </IconContext.Provider>
                                ))}
                              </div>
                            </Col>
                          </Row>

                          {service_region_selected === "Pan India" && (
                            <>
                              {row.length < 20 && (
                                <div style={{ margin: " 0 0 20px 0" }}>
                                  <span
                                    className="link-text"
                                    onClick={() => {
                                      if (row[row.length - 1][0].length != 15) {
                                        alert("GST No must be 15 digit");
                                      } else {
                                        addGST();
                                      }
                                    }}
                                  >
                                    <IconContext.Provider
                                      value={{
                                        className: "link-text",
                                      }}
                                    >
                                      <MdAdd />
                                    </IconContext.Provider>
                                    Add Another GST
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      </Row>

                      {/*Service Offerd  */}
                      <Row>
                        <Label className="header-child mb-3">
                          Service Offered *
                        </Label>

                        <Col lg={7} md={6} sm={6}>
                          <div
                            style={{
                              background: "transparent",
                              padding: "30px",
                              border: "2px solid gray",
                              borderRadius: "5px",
                            }}
                          >
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Input
                                  style={{ margin: "0 6.5px 0 6.5px" }}
                                  className="form-control-md"
                                  id="input"
                                  type="checkbox"
                                  onClick={() => {
                                    setforward_by_air(!forward_by_air);
                                  }}
                                  checked={forward_by_air}
                                />
                                <Label className="header-child">
                                  Forwarding By Air
                                </Label>
                              </div>
                            </Col>
                            {forward_by_air && (
                              <>
                                <Col>
                                  <Col lg={5} md={6} sm={6}>
                                    <div
                                      className="mb-1"
                                      style={{ marginLeft: "30.5px" }}
                                    >
                                      <Input
                                        style={{ marginRight: "6.5px" }}
                                        className="form-control-md"
                                        id="input"
                                        type="checkbox"
                                        onClick={() => {
                                          setairway_bill(!airway_bill);
                                        }}
                                        checked={airway_bill}
                                      />
                                      <Label className="header-child">
                                        AirWay Bill
                                      </Label>
                                    </div>
                                  </Col>

                                  <Col lg={5} md={6} sm={6}>
                                    <div
                                      className="mb-1"
                                      style={{ marginLeft: "30.5px" }}
                                    >
                                      <Input
                                        style={{ marginRight: "6.5px" }}
                                        className="form-control-md"
                                        id="input"
                                        type="checkbox"
                                        onClick={() => {
                                          setconsole_connect(!console_connect);
                                        }}
                                        checked={console_connect}
                                      />
                                      <Label className="header-child">
                                        Console Connect
                                      </Label>
                                    </div>
                                  </Col>
                                </Col>
                              </>
                            )}

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Input
                                  style={{ margin: "0 6.5px 0 6.5px" }}
                                  className="form-control-md"
                                  id="input"
                                  type="checkbox"
                                  onClick={() => {
                                    setforward_by_road(!forward_by_road);
                                  }}
                                  checked={forward_by_road}
                                />
                                <Label className="header-child">
                                  Forwarding By Road
                                </Label>
                              </div>
                            </Col>
                            {forward_by_road && (
                              <>
                                <Col lg={5} md={6} sm={6}>
                                  <div
                                    className="mb-2"
                                    style={{ marginLeft: "30.5px" }}
                                  >
                                    <Input
                                      style={{ margin: "0 6.5px 0 6.5px" }}
                                      className="form-control-md"
                                      id="input"
                                      type="checkbox"
                                      onClick={() => {
                                        setdirect_vehicle(!direct_vehicle);
                                      }}
                                      checked={direct_vehicle}
                                    />
                                    <Label className="header-child">
                                      Direct vehicle
                                    </Label>
                                  </div>
                                </Col>

                                {direct_vehicle && (
                                  <>
                                    <Col lg={6} md={6} sm={6}>
                                      <div
                                        className="mb-2"
                                        style={{ marginLeft: "55.5px" }}
                                      >
                                        <Input
                                          style={{
                                            margin: "0 6.5px 0 6.5px",
                                          }}
                                          className="form-control-md"
                                          id="input"
                                          type="checkbox"
                                          onClick={() => {
                                            settemp_control_vehicle(
                                              !temp_control_vehicle
                                            );
                                          }}
                                          checked={temp_control_vehicle}
                                        />
                                        <Label className="header-child">
                                          Temperature Control Vehicle
                                        </Label>
                                      </div>
                                    </Col>

                                    <Col lg={5} md={6} sm={6}>
                                      <div
                                        className="mb-2"
                                        style={{ marginLeft: "55.5px" }}
                                      >
                                        <Input
                                          style={{
                                            margin: "0 6.5px 0 6.5px",
                                          }}
                                          className="form-control-md"
                                          id="input"
                                          type="checkbox"
                                          onClick={() => {
                                            setnormal_vehicle(!normal_vehicle);
                                          }}
                                          checked={normal_vehicle}
                                        />
                                        <Label className="header-child">
                                          Normal Vehicle
                                        </Label>
                                      </div>
                                    </Col>
                                  </>
                                )}

                                <Col lg={5} md={6} sm={6}>
                                  <div
                                    className="mb-2"
                                    style={{ marginLeft: "30.5px" }}
                                  >
                                    <Input
                                      style={{ margin: "0 6.5px 0 6.5px" }}
                                      className="form-control-md"
                                      id="input"
                                      type="checkbox"
                                      onClick={() => {
                                        setpart_load_vehicle(
                                          !part_load_vehicle
                                        );
                                      }}
                                      checked={part_load_vehicle}
                                    />
                                    <Label className="header-child">
                                      Part Load Vehicle
                                    </Label>
                                  </div>
                                </Col>

                                <Col lg={5} md={6} sm={6}>
                                  <div
                                    className="mb-2"
                                    style={{ marginLeft: "30.5px" }}
                                  >
                                    <Input
                                      style={{ margin: "0 6.5px 0 6.5px" }}
                                      className="form-control-md"
                                      id="input"
                                      type="checkbox"
                                      onClick={() => {
                                        setkg_wise(!kg_wise);
                                      }}
                                      checked={kg_wise}
                                    />
                                    <Label className="header-child">
                                      KG Wise
                                    </Label>
                                  </div>
                                </Col>
                              </>
                            )}

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Input
                                  style={{ margin: "0 6.5px 0 6.5px" }}
                                  className="form-control-md"
                                  id="input"
                                  type="checkbox"
                                  onClick={() => {
                                    setforward_by_train(!forward_by_train);
                                  }}
                                  checked={forward_by_train}
                                />
                                <Label className="header-child">
                                  Forwarding By Train
                                </Label>
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Input
                                  style={{ margin: "0 6.5px 0 6.5px" }}
                                  className="form-control-md"
                                  id="input"
                                  type="checkbox"
                                  onClick={() => {
                                    setchannel_partner(!channel_partner);
                                  }}
                                  checked={channel_partner}
                                />
                                <Label className="header-child">
                                  Channel Partner
                                </Label>
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Input
                                  style={{ margin: "0 6.5px 0 6.5px" }}
                                  className="form-control-md"
                                  id="input"
                                  type="checkbox"
                                  onClick={() => {
                                    setdelivery_partner(!delivery_partner);
                                  }}
                                  checked={delivery_partner}
                                />
                                <Label className="header-child">
                                  Delivery Partner
                                </Label>
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Input
                                  style={{ margin: "0 6.5px 0 6.5px" }}
                                  className="form-control-md"
                                  id="input"
                                  type="checkbox"
                                  onClick={() => {
                                    setothers_services_offerd(
                                      !others_services_offerd
                                    );
                                  }}
                                  checked={others_services_offerd}
                                />
                                <Label className="header-child">Others</Label>
                              </div>
                            </Col>

                            {others_services_offerd && (
                              <>
                                <Row>
                                  <Col lg={4} md={6} sm={6}>
                                    <div className="mb-2">
                                      <Label className="header-child">
                                        Others Services
                                      </Label>

                                      {row1.map((item, index) => {
                                        return (
                                          <Input
                                            // min={0}
                                            key={index}
                                            value={item[0]}
                                            className="form-control-md d"
                                            id="input"
                                            style={{ marginBottom: "15px" }}
                                            type="text"
                                            // value={other_service}
                                            onChange={(val) => {
                                              item[0] = val.target.value;
                                              // setother_service(val.target.value);
                                              setrefresh(!refresh);
                                            }}
                                          />
                                        );
                                      })}
                                    </div>
                                  </Col>

                                  <Col lg={1}>
                                    <div
                                      className="mb-3"
                                      style={{ textAlign: "center" }}
                                    >
                                      {row1.length > 1 ? (
                                        <Label className="header-child">
                                          Delete
                                        </Label>
                                      ) : null}
                                      {row1.map((item1, index) => (
                                        <IconContext.Provider
                                          key={index}
                                          value={{
                                            className: "icon multi-input",
                                          }}
                                        >
                                          {row1.length > 1 ? (
                                            <>
                                              <div
                                                style={{ height: "12.5px" }}
                                              ></div>
                                              <div
                                                onClick={() => {
                                                  // isupdating
                                                  // && item[4] && delete_package(item[4])
                                                  // deletePackage(item);
                                                  delete_other_services(item1);
                                                }}
                                              >
                                                <MdDeleteForever
                                                  style={{
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : null}
                                        </IconContext.Provider>
                                      ))}
                                    </div>
                                  </Col>
                                </Row>

                                <div
                                  style={{
                                    color: "purple",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    add_other_service();
                                  }}
                                >
                                  + Add Another
                                </div>
                              </>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* {vendor Dimension  Calculation} */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Vendor Dimension Calculation
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle4}>
                        {circle_btn4 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn4 ? (
                  <CardBody>
                    <Row>
                      <Col lg={12}>
                        <Tab
                          forp={"vendor"}
                          // active tabs
                          active_tabs={active_tabs}
                          setactive_tabs={setactive_tabs}
                          // Checkis
                          is_local={is_local}
                          is_air={is_air}
                          is_surface={is_surface}
                          is_cargo={is_cargo}
                          is_train={is_train}
                          is_courier={is_courier}
                          is_warehouse={is_warehouse}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
          {/* {vendor Billing Info} */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Vendor Billing Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle3}>
                        {circle_btn3 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn3 ? (
                  <CardBody>
                    <Row></Row>
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
                  className={
                    isupdating && user.user_department_name === "ADMIN"
                      ? "btn btn-info m-1"
                      : !isupdating
                      ? "btn btn-info m-1"
                      : "btn btn-success m-1"
                  }
                >
                  {isupdating &&
                  (user.user_department_name === "ADMIN" || user.is_superuser)
                    ? "Update"
                    : !isupdating
                    ? "Save"
                    : "Approved"}
                </button>

                {isupdating &&
                  user.user_department_name !== "ADMIN" &&
                  !user.is_superuser && (
                    <button
                      type="button"
                      className="btn btn-danger m-1"
                      onClick={handleShow}
                    >
                      Rejected
                    </button>
                  )}

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

export default AddVendor;
