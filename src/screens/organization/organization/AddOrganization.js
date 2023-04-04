/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
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
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
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
import { MdAdd, MdDeleteForever } from "react-icons/md";
import MultiRowSearchInput from "../../../components/formComponent/multiRowSearchInput/MultiRowSearchInput";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

function handleLogoUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    setLogo(reader.result);
  };
}

const AddOrganization = () => {
  //Redux State
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);

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

  // Discription
  const [descripation, setdescripation] = useState("");

  // Location Info

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode, setpincode] = useState("");

  const [pincode_id, setpincode_id] = useState(0);
  const [pincode_loaded, setpincode_loaded] = useState(false);


  const [state_error, setstate_error] = useState(false);
  const [city_error, setcity_error] = useState(false);
  const [pin_code_error, setpin_code_error] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);


  const [isupdating, setisupdating] = useState(false);
  //Get Updated Location Data
  const [organization, setOrganization] = useState([]);
  const [organizationname, setOrganizationname] = useState([]);

  const [refresh, setrefresh] = useState(false);

  const [active_tab, setactive_tab] = useState("first");
  const [same_as_billing_add, setsame_as_billing_add] = useState(false);

  // Office Address
  const [state_list_s, setstate_list_s] = useState([]);
  const [office_add_line1, setoffice_add_line1] = useState("");
  const [office_add_line2, setoffice_add_line2] = useState("");
  const [office_state, setoffice_state] = useState("");
  const [office_state_id, setoffice_state_id] = useState("");
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [office_id, setoffice_id] = useState(0)

  const [office_city, setoffice_city] = useState("");
  const [office_city_id, setoffice_city_id] = useState("");
  const [office_city_list, setoffice_city_list] = useState([]);
  const [office_pincode, setoffice_pincode] = useState("");
  const [office_pincode_list, setoffice_pincode_list] = useState([]);
  const [office_pincode_id, setoffice_pincode_id] = useState("");
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");

  const [office_locality, setoffice_locality] = useState("");
  const [office_locality_list, setoffice_locality_list] = useState("");
  const [office_locality_id, setoffice_locality_id] = useState("");
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");


  // ForBilling Address
  const [billing_add_line1, setbilling_add_line1] = useState("");
  const [billing_add_line2, setbilling_add_line2] = useState("");
  const [billing_state, setbilling_state] = useState("");
  const [billing_state_id, setbilling_state_id] = useState("");
  const [billing_state_page, setbilling_state_page] = useState(1);
  const [billing_state_search_item, setbilling_state_search_item] = useState("");
  const [billing_city, setbilling_city] = useState("");
  const [billing_city_list, setbilling_city_list] = useState([]);
  const [billing_city_id, setbilling_city_id] = useState("");
  const [billing_city_page, setbilling_city_page] = useState(1);
  const [billing_city_search_item, setbilling_city_search_item] = useState("");
  const [billing_pincode, setbilling_pincode] = useState("");
  const [billing_pincode_list, setbilling_pincode_list] = useState([]);
  const [billing_pincode_id, setbilling_pincode_id] = useState("");
  const [billing_pincode_page, setbilling_pincode_page] = useState(1)
  const [billing_pincode_search_item, setbilling_pincode_search_item] = useState("")
  const [billing_id, setbilling_id] = useState(0)

  const [billing_locality, setbilling_locality] = useState("");
  const [billing_locality_list, setbilling_locality_list] = useState([]);
  const [billing_locality_id, setbilling_locality_id] = useState("");
  const [billing_locality_page, setbilling_locality_page] = useState(1)
  const [billing_locality_search_item, setbilling_locality_search_item] = useState("")

  //data Load
  const [billing_pincode_loaded, setbilling_pincode_loaded] = useState(false);
  const [office_pincode_loaded, setoffice_pincode_loaded] = useState(false);

  const [updated_gstaddress, setupdated_gstaddress] = useState([])
  console.log("updated_gstaddress----", updated_gstaddress)

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      organisation_name: toTitleCase(organization.name) || "",
      toll_free_number: organization.tollfree_no || "",
      registeration_number: organization.regd_no || "",
      pan_no: organization.pan_no || "",
      phone_numberp: organization.mobile_nop || "",
      phone_numbers: organization.mobile_nos || "",
      email: organization.email || "",
      web_url: organization.website || "",
      contact_person_name: toTitleCase(organization.contact_person) || "",
      description: toTitleCase(organization.description) || "",
      contact_person_email: organization.contact_person_email || "",
      contact_person_ph_no: organization.contact_person_mobile || "",
    },

    validationSchema: Yup.object({
      organisation_name: Yup.string().required("Organisation Name is required"),
      registeration_number: Yup.string().required(
        "Registeratin Number is required"
      ),
      toll_free_number: Yup.string().required("Toll Free Number is required"),
      pan_no: Yup.string()
        .min(10)
        .max(10)
        .required("PAN Number is required"),
      email: Yup.string().email().required("Email is required"),
      web_url: Yup.string().required("Website URL is required"),
      phone_numberp: Yup.string().required(
        "Phone Number is required"
      ),
      contact_person_email: Yup.string().email().required("Email is required"),
      contact_person_ph_no: Yup.string().required("Phone Number is required"),
    }),

    onSubmit: (values) => {
      isupdating ? update_organisation(values) : send_organisation_data(values);
    },
  });

  // Post Branch
  const send_organisation_data = (values) => {
    axios
      .post(
        ServerAddress + "organization/add_organization/",
        {
          name: toTitleCase(values.organisation_name).toUpperCase(),
          regd_no: values.registeration_number,
          tollfree_no: values.toll_free_number,
          mobile_nop: values.phone_numberp,
          mobile_nos: values.phone_numbers ? values.phone_numbers : null,
          email: values.email,
          description: toTitleCase(descripation).toUpperCase(),
          pan_no: toTitleCase(values.pan_no).toUpperCase(),
          website: values.web_url,
          contact_person: toTitleCase(values.contact_person_name).toUpperCase(),
          contact_person_email: values.contact_person_email,
          contact_person_mobile: values.contact_person_ph_no,
          logo_uploaded_by: user.id,
          created_by: user.id,
          address: [
            [
              "HEAD OFFICE ADDRESS",
              toTitleCase(office_add_line1).toUpperCase(),
              toTitleCase(office_add_line2).toUpperCase(),
              office_pincode_id,
              office_locality_id,
            ],
            [
              "BILLING ADDRESS",
              toTitleCase(billing_add_line1).toUpperCase(),
              toTitleCase(billing_add_line2).toUpperCase(),
              billing_pincode_id,
              billing_locality_id,
            ],
          ],
          gst_address: row,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log("response---", response)
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          dispatch(
            setDataExist(
              `Organisation "${values.organisation_name}" Created Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          navigate(-1);
        }
        else if (response.data.data.pan_no && response.data.data.pan_no[0] === "organization with this PAN Number * already exists.") {
          dispatch(
            setDataExist(
              `"${values.pan_no}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
        else if (response.data.data.website && response.data.data.website[0] === "organization with this Website Address already exists.") {
          dispatch(
            setDataExist(
              `"${values.web_url}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
        else if (response.data.data.website && response.data.data.website[0] === "Enter a valid URL.") {
          dispatch(
            setDataExist(
              `Website Address "${values.web_url}" Is Invalid`
            )
          );
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Oranisation  Data ${error}`);
      });
  };

  // Update Branch
  const update_organisation = (values) => {
    let id = organization.id;


    let fields_names = Object.entries({
      contact_person: values.contact_person_name,
      contact_person_email: values.contact_person_email,
      contact_person_mobile: values.contact_person_ph_no,
      description: descripation,

      email: values.email,
      mobile_nop: values.phone_numberp,
      mobile_nos: values.phone_numbers,
      name: values.organisation_name,

      pan_no: values.pan_no,
      regd_no: values.registeration_number,
      tollfree_no: values.toll_free_number,

      website: values.web_url,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location_data.state.organization[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() != String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }

    axios
      .put(
        ServerAddress + "organization/update_organization/" + id,
        {
          name: toTitleCase(values.organisation_name).toUpperCase(),
          regd_no: values.registeration_number,
          tollfree_no: values.toll_free_number,
          mobile_nop: values.phone_numberp,
          mobile_nos: values.phone_numbers ? values.phone_numbers : null,
          email: values.email,
          description: toTitleCase(descripation).toUpperCase(),
          pan_no: toTitleCase(values.pan_no).toUpperCase(),
          website: values.web_url,
          contact_person: toTitleCase(values.contact_person_name).toUpperCase(),
          contact_person_email: values.contact_person_email,
          contact_person_mobile: values.contact_person_ph_no,
          logo_uploaded_by: user.id,
          address: [
            [
              "HEAD OFFICE ADDRESS",
              toTitleCase(office_add_line1).toUpperCase(),
              toTitleCase(office_add_line2).toUpperCase(),
              office_pincode_id,
              office_locality_id,
              office_id
            ],
            [
              "BILLING ADDRESS",
              toTitleCase(billing_add_line1).toUpperCase(),
              toTitleCase(billing_add_line2).toUpperCase(),
              billing_pincode_id,
              billing_locality_id,
              billing_id
            ],
          ],
          gst_address: row,
          modified_by: user.id,
          deleted_gst: deleted_gst_id,
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
          dispatch(
            setDataExist(`"${values.organisation_name}" Updated Sucessfully`)
          );
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate(-1);
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Name "${toTitleCase(values.organisation_name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function () {
        alert("Error Error While Updateing Organization");
      });
  };
  // Locations Function
  const getStates = (place_id, filter_by) => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=${place_id}&filter_by=${filter_by}&p=${billing_state_page}&records=${10}&state_search=${billing_state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (billing_state_page == 1) {
            state_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state),
            ]);
          } else {
            state_list = [
              ...state_list_s,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            ];
          }
        }
        setstate_list_s(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  const getCities = (place_id, filter_by, state_type) => {
    setby_pincode(false);
    let cities_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${active_tab == "first" ? city_page : billing_city_page}&records=${10}&city_search=${active_tab == "first" ? city_search_item : billing_city_search_item}` +
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
          if (city_page == 1) {
            cities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            if (state_type === "billing_state_id") {
              cities_list = [
                ...billing_city_list,
                ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
              ];
            } else {
              cities_list = [
                ...office_city_list,
                ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
              ];
            }
          }
          if (state_type === "billing_state_id") {
            setbilling_city_list(cities_list);
          } else {
            setoffice_city_list(cities_list);
          }
        } else {
          // setcity("");
          setbilling_city_list([]);
          setoffice_city_list([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  const getPincode = (place_id, filter_by, city_type) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${active_tab == "first" ? pincode_page : billing_pincode_page}&records=${10}&pincode_search=${active_tab == "first" ? pincode_search_item : billing_pincode_search_item}` +
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
          if (pincode_page == 1) {
            pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
          } else {
            if (city_type == "billin_city") {
              pincode_list = [
                ...billing_pincode_list,
                ...resp.data.results.map((v) => [v.id, v.pincode]),
              ];
            } else {
              pincode_list = [
                ...office_pincode_list,
                ...resp.data.results.map((v) => [v.id, v.pincode]),
              ];
            }
          }

          if (city_type == "billin_city") {
            setbilling_pincode_list(pincode_list);
          } else {
            setoffice_pincode_list(pincode_list);
          }
        } else if (city_type == "billin_city") {
          setbilling_state(toTitleCase(resp.data.results[0].state_name));
          setbilling_state_id(resp.data.results[0].state);

          setbilling_city(toTitleCase(resp.data.results[0].city_name));
          setbilling_city_id(resp.data.results[0].city);

          setbilling_pincode(resp.data.results[0].pincode);
          setbilling_pincode_id(resp.data.results[0].id);
        } else if (city_type == "office_city") {
          setoffice_state(toTitleCase(resp.data.results[0].state_name));
          setoffice_state_id(resp.data.results[0].state);
          setoffice_city(toTitleCase(resp.data.results[0].city_name));
          setoffice_city_id(resp.data.results[0].city);
          setoffice_pincode(resp.data.results[0].pincode);
          setoffice_pincode_id(resp.data.results[0].id);
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
        alert(`Error Occur in Get Pin Code, ${err}`);
      });
  };

  const getLocality = (place_id, filter_by, pincode_type) => {
    let locality_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${active_tab == "first" ? locality_page : billing_locality_page}&records=${10}` +
        `&place_id=${place_id}&filter_by=${filter_by}&name_search=${active_tab == "first" ? locality_search_item : billing_locality_search_item}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (filter_by !== "locality") {
          if (pincode_page == 1) {
            locality_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            if (pincode_type == "billing_pincode") {
              locality_list = [
                ...billing_locality_list,
                ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
              ];
            } else {
              locality_list = [
                ...office_locality_list,
                ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
              ];
            }
          }
          // setgst_locality_list(locality_list)
          if (pincode_type == "billing_pincode") {
            setbilling_locality_list(locality_list);
          } else {
            setoffice_locality_list(locality_list);
          }
        }
        else {
          dispatch(setDataExist("You entered invalid Locality"));
          dispatch(setAlertType("warning"));
          dispatch(setShowAlert(true));
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Locality , ${err}`);
      });
  };

  useLayoutEffect(() => {
    try {
      setOrganization(location_data.state.organization);
      setisupdating(true);
      setOrganizationname(toTitleCase(location_data.state.organization.name))
      setdescripation(toTitleCase(location_data.state.organization.description))
      setoffice_add_line1(toTitleCase(location_data.state.organization.organization_address[0].address_line1))
      setoffice_add_line2(toTitleCase(location_data.state.organization.organization_address[0].address_line2))
      setoffice_state(toTitleCase(location_data.state.organization.organization_address[0].state_name))
      setoffice_pincode_id(location_data.state.organization.organization_address[0].pincode_id)
      setoffice_locality_id(location_data.state.organization.organization_address[0].location)
      setoffice_state_id(location_data.state.organization.organization_address[0].state_id)
      setoffice_city_id(location_data.state.organization.organization_address[0].city_id)
      setoffice_city(toTitleCase(location_data.state.organization.organization_address[0].city_name))
      setoffice_pincode(location_data.state.organization.organization_address[0].pincode)
      setoffice_locality(toTitleCase(location_data.state.organization.organization_address[0].location_name))
      setoffice_id(location_data.state.organization.organization_address[0].id)
      console.log("location_data.state.organization.organization_gst1111111----", location_data.state.organization)
      setbilling_add_line1(toTitleCase(location_data.state.organization.organization_address[1].address_line1))
      // console.log("location_data.state.organization.organization_gst55555----", location_data.state.organization.organization_address[0])
      setbilling_add_line2(toTitleCase(location_data.state.organization.organization_address[1].address_line2))
      console.log("location_data.state.organization.organization_gst44444----", location_data.state.organization)
      setbilling_state(toTitleCase(location_data.state.organization.organization_address[1].state_name))
      console.log("location_data.state.organization.organization_gst333333----", location_data.state.organization)
      setbilling_pincode_id(location_data.state.organization.organization_address[1].pincode_id)
      setbilling_locality_id(location_data.state.organization.organization_address[1].location)
      setbilling_state_id(location_data.state.organization.organization_address[1].state_id)
      console.log("location_data.state.organization.organization_gst2222222----", location_data.state.organization)
      setbilling_city_id(location_data.state.organization.organization_address[1].city_id)
      setbilling_city(toTitleCase(location_data.state.organization.organization_address[1].city_name))
      setbilling_pincode(location_data.state.organization.organization_address[1].pincode)
      setbilling_locality(toTitleCase(location_data.state.organization.organization_address[1].location_name))
      setupdated_gstaddress(location_data.state.organization.organization_gst)
      console.log("location_data.state.organization.organization_gst----", location_data.state.organization)
      setbilling_id(location_data.state.organization.organization_address[1].id)
    } catch (error) { }
  }, []);


  useLayoutEffect(() => {
    getStates("all", "all");
  }, [billing_state_page, billing_state_search_item]);

  useLayoutEffect(() => {
    if (billing_state_id != "" && by_pincode === false) {
      getCities(billing_state_id, "state", "billing_state_id");
    }
  }, [billing_state_id, billing_city_page, billing_city_search_item]);

  useLayoutEffect(() => {
    if (billing_city_id != "" && by_pincode === false) {
      getPincode(billing_city_id, "city", "billin_city");
    }
  }, [billing_city_id, billing_pincode_page, billing_pincode_search_item]);

  useLayoutEffect(() => {
    if (billing_pincode_id != "") {
      getLocality(billing_pincode_id, "pincode", "billing_pincode");
    }
  }, [billing_pincode_id, billing_locality_page, billing_locality_search_item]);

  useLayoutEffect(() => {
    if (office_state_id != "" && !by_pincode) {
      getCities(office_state_id, "state", "office_state_id");
    }
  }, [office_state_id, city_page, city_search_item]);

  useLayoutEffect(() => {
    if (office_city_id != "") {
      getPincode(office_city_id, "city", "office_city");
    }
  }, [office_city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    if (office_pincode_id !== "") {
      getLocality(office_pincode_id, "pincode", "office_pincode");
    }
  }, [office_pincode_id, locality_page, locality_search_item]);

  useLayoutEffect(() => {
    if (billing_city_id !== "") {
      setbilling_pincode_loaded(true);
    }
    if (office_city_id !== "") {
      setoffice_pincode_loaded(true);
    }
  }, [billing_city_id, office_city_id]);

  //Gst address
  const [gst_state_id, setgst_state_id] = useState("")
  const [gst_no, setgst_no] = useState("");
  const [gst_address, setgst_address] = useState("");
  const [gst_state, setgst_state] = useState(['', '']);
  const [gst_state_list, setgst_state_list] = useState([])
  const [gst_city_list, setgst_city_list] = useState([])
  const [gst_city, setgst_city] = useState(["", "", ""]);
  const [gst_pincode, setgst_pincode] = useState(["", ""])
  const [gstpincode_list, setgstpincode_list] = useState([])
  const [gst_pincode_page, setgst_pincode_page] = useState(1)
  const [gst_pincode_search_item, setgst_pincode_search_item] = useState("")

  const [gst_locality_list, setgst_locality_list] = useState([])
  const [gst_locality, setgst_locality] = useState(['', ''])
  const [gst_locality_page, setgst_locality_page] = useState(1)
  const [gst_locality_search_item, setgst_locality_search_item] = useState("")

  const [gst_city_page, setgst_city_page] = useState(1)
  const [gst_city_search_item, setgst_city_search_item] = useState("")
  const [selected, setselected] = useState([]);
  const [active, setactive] = useState(false)

  const [gst_id_list, setgst_id_list] = useState([]);
  const [gst_ids, setgst_ids] = useState([])
  const [deleted_gst_id, setdeleted_gst_id] = useState([])

  let dimension_list = [gst_no, gst_city, gst_pincode, gst_locality, gst_address, active];
  const [row, setrow] = useState([dimension_list]);
  const addGST = () => {
    dimension_list = ["", ['', '', ''], ['', ''], ['', ''], "", false];
    setrow([...row, dimension_list]);
  };

  const deleteGST = (item) => {
    setgst_no("gst_no");
    setgst_state("state");
    setgst_city("city");
    setgst_pincode("pincode")
    setgst_locality("gst_locality")
    setgst_address("gst_address")
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

  useEffect(() => {
    if (same_as_billing_add) {
      setbilling_add_line1(office_add_line1)
      setbilling_add_line2(office_add_line2)
      setbilling_pincode_id(office_pincode_id)
      setbilling_locality_id(office_locality_id)
    }

  }, [same_as_billing_add])
  const getGstStates = (place_id, filter_by) => {
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
          state_list = resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            setgst_state_list(state_list)
          setgst_state_id(resp.data.results[0].id)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  const getGstCities = (place_id, filter_by) => {
    let cities_list = [];
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
              v.id, toTitleCase(v.state_name) + "-" + toTitleCase(v.city), v.state
            ]);
          } else {
            cities_list = [
              ...gst_city_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.state_name) + "-" + toTitleCase(v.city), v.state]),
            ];
          }
          setgst_city_list(cities_list);
        } else {
          setgst_city_list([]);
        }


      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  const getGstPincode = (place_id, filter_by) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${gst_pincode_page}&records=${10}&pincode_search=${gst_pincode_search_item}` +
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
          if (gst_pincode_page === 1) {
            pincode_list = resp.data.results.map((v) => [
              v.id, v.pincode
            ]);
          } else {
            pincode_list = [
              ...gstpincode_list,
              ...resp.data.results.map((v) => [v.id, v.pincode]),
            ];
          }
          setgstpincode_list(pincode_list);
        } else {
          setgstpincode_list([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  const getGstLocality = (place_id, filter_by) => {
    let loc_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${gst_locality_page}&records=${10}&name_search=${gst_locality_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by + "&state=&city=&name=&data=all",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (gst_pincode_page === 1) {
            loc_list = resp.data.results.map((v) => [
              v.id, toTitleCase(v.name)
            ]);
          } else {
            loc_list = [
              ...gst_locality_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setgst_locality_list(loc_list);
        } else {
          setgst_locality_list([]);
        }


      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };


  useEffect(() => {
    if (gst_state_id !== "" && !by_pincode) {
      getGstCities(gst_state_id, "state")
    }
  }, [gst_state_id, gst_city_page, gst_city_search_item])

  const [gst_city_id, setgst_city_id] = useState("")
  const [gst_pincode_id, setgst_pincode_id] = useState("")
  const [gst_val, setgst_val] = useState("")
  useLayoutEffect(() => {
    let result = row[row.length - 1][0].substring(0, 12)
    setgst_val(result)
    setgst_city_id(row[row.length - 1][1][0])
    setgst_pincode_id(row[row.length - 1][2][0])

  }, [dimension_list])

  useLayoutEffect(() => {
    if (gst_city_id != "") {
      getGstPincode(gst_city_id, "city");
    }
  }, [gst_city_id, gst_pincode_page, gst_pincode_search_item]);

  useLayoutEffect(() => {
    if (gst_pincode_id !== "") {
      getGstLocality(gst_pincode_id, "pincode");
    }
  }, [gst_pincode_id, gst_locality_page, gst_locality_search_item]);

  useEffect(() => {
    if (isupdating) {

      if (updated_gstaddress.length !== 0) {
        let temp = [];
        let temp_list = [];
        let temp_list2 = [];
        temp = updated_gstaddress

        for (let index = 0; index < updated_gstaddress.length; index++) {
          temp_list.push([
            temp[index].gst_no,
            [temp[index].city_id, toTitleCase(temp[index].city_name), temp[index].state],
            [temp[index].pincode, temp[index].pincode_name],
            [temp[index].location, toTitleCase(temp[index].location_name)],
            toTitleCase(temp[index].address),
            temp[index].is_active,
            temp[index].id
          ]);
          temp_list2.push(temp[index].id);

        }
        console.log("temp_list------", temp_list)
        setrow(temp_list);
        setgst_ids(temp_list2)
        setgst_id_list(temp_list2)
      }
    }

  }, [isupdating])

  useEffect(() => {
    if (gst_id_list !== "") {
      let id_list = gst_ids.filter(
        (p) => gst_id_list.indexOf(p) === -1
      );
      setdeleted_gst_id(id_list);
    }
  }, [gst_id_list, gst_ids]);

  console.log("location_data----", location_data.state)
  useEffect(() => {
    let temp = []
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      if (element[5] !== false) {
        temp.push(element)
      }
    }
    console.log("temp.length ======", temp.length )
    if (temp.length !== 0 && !location_data.state) {
      let b = temp[0][1][1].split("-")
      setoffice_add_line1(toTitleCase(temp[0][4]))
      setoffice_state(b[0])
      setoffice_state_id(temp[0][1][2])
      setoffice_city(b[1])
      setoffice_city_id(temp[0][1][0])
      setoffice_pincode(temp[0][2][1])
      setoffice_pincode_id(temp[0][2][0])
      setoffice_locality(temp[0][3][1])
      setoffice_locality_id(temp[0][3][0])
    }
    else if(temp.length !== 0 && location_data.state === null) {
      setoffice_add_line1("")
      setoffice_state("")
      setoffice_state_id(0)
      setoffice_city("")
      setoffice_city_id(0)
      setoffice_pincode("")
      setoffice_pincode_id(0)
      setoffice_locality("")
      setoffice_locality_id(0)
    }
  }, [dimension_list])
  // for history
  const handlClk = () => {
    navigate("/organization/organization/organizationHistory/OrganizationHistoryPage", {
      state: { organization : organization },
    });
  };

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
            <PageTitle
              page={isupdating ? "Update Organization" : "Add Organization"}
            />
            <Title
              title={isupdating ? "Update Organization" : "Add Organization"}
              parent_title="Masters"
            />
          </div>
          {/* Add For History Button */}
   {isupdating && 
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
          }

          {/* organisation Info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Organization Info
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
                          <Label className="header-child">
                            Name*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.organisation_name || ""}
                            invalid={
                              validation.touched.organisation_name &&
                                validation.errors.organisation_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="organisation_name"
                            placeholder="Enter Organisation Name"
                          />
                          {validation.touched.organisation_name &&
                            validation.errors.organisation_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.organisation_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Email:</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                                validation.errors.email
                                ? true
                                : false
                            }
                            className="form-control-md"
                            id="input"
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                          />
                          {validation.touched.email &&
                            validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Toll Free Number:*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.toll_free_number || ""}
                            invalid={
                              validation.touched.toll_free_number &&
                                validation.errors.toll_free_number
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="toll_free_number"
                            placeholder="Enter Registeration Number"
                          />
                          {validation.touched.toll_free_number &&
                            validation.errors.toll_free_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.toll_free_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Registration/Incorporation No:
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.registeration_number || ""}
                            invalid={
                              validation.touched.registeration_number &&
                                validation.errors.registeration_number
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="registeration_number"
                            placeholder="Enter Registration Number"
                          />
                          {validation.touched.registeration_number &&
                            validation.errors.registeration_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.registeration_number}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">PAN Number:</Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.pan_no || ""}
                            invalid={
                              validation.touched.pan_no &&
                                validation.errors.pan_no
                                ? true
                                : false
                            }
                            type="text"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="pan_no"
                            placeholder="Enter Pan Number"
                          />
                          {validation.touched.pan_no &&
                            validation.errors.pan_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.pan_no}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Primary Mobile No.
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone_numberp || ""}
                            invalid={
                              validation.touched.phone_numberp &&
                                validation.errors.phone_numberp
                                ? true
                                : false
                            }
                            className="form-control-md"
                            id="input"
                            type="number"
                            name="phone_numberp"
                            placeholder="Enter Phone Number"
                          />
                          {validation.touched.phone_numberp &&
                            validation.errors.phone_numberp ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phone_numberp}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Secondary Mobile No.
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone_numbers || ""}
                            className="form-control-md"
                            id="input"
                            name="phone_numbers"
                            type="number"
                            placeholder="Enter Phone Number"
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Upload logos</Label>
                          <Input
                            className="form-control-md"
                            id="input"
                            name="logo"
                            type="file"
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Website Address:
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.web_url || ""}
                            invalid={
                              validation.touched.web_url &&
                                validation.errors.web_url
                                ? true
                                : false
                            }
                            className="form-control-md"
                            id="input"
                            name="web_url"
                            type="text"
                            placeholder="Enter Website URL"
                          />
                          {validation.touched.web_url &&
                            validation.errors.web_url ? (
                            <FormFeedback type="invalid">
                              {validation.errors.web_url}
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

          {/*  GST Address */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    GST Address
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
                                      let itm = item[0]

                                      if (item[0].length == 15 && gst_val == itm[0] + itm[1] + validation.values.pan_no) {
                                        getGstStates(itm[0] + itm[1], "state_code")
                                      }
                                      else if (item[0].length > 10 && row.length - 1 === index) {
                                        dispatch(setShowAlert(true));
                                        dispatch(
                                          setDataExist(
                                            `Invalid GST Number`
                                          )
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
                            <div className="mb-3" >
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
                                    page={gst_pincode_page}
                                    setpage={setgst_pincode_page}
                                    setsearch_txt={setgst_pincode_search_item}
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
                              <Label className="header-child">Locality </Label>
                              {row.map((item, index) => (
                                <div className="mb-3">
                                  <MultiRowSearchInput
                                    data_list={gst_locality_list}
                                    setdata_list={setgst_locality_list}
                                    data_item_s={row[index][3]}
                                    page={gst_locality_page}
                                    setpage={setgst_locality_page}
                                    setsearch_txt={setgst_locality_search_item}
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
                                      item[4] = val.target.value;
                                      setrefresh(!refresh);
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </Col>
                          <Col lg={1} md={3} sm={3}>
                            <div className="mb-3"
                              style={{ textAlign: "center" }}
                            >
                              <Label className="header-child">H.O</Label>
                              {row.map((item, index) => {
                                return (
                                  <div
                                    onClick={() => {
                                      if (selected.includes(index)) {
                                        let lis = [...selected];
                                        setselected(lis.filter((e) => e !== index));
                                        setactive(false)
                                        item[5] = false
                                      } else {
                                        setselected([...selected, index]);
                                        setactive(true)
                                        item[5] = true
                                      }
                                    }}
                                  >
                                    {item[5] ? (
                                      <FiCheckSquare style={{ marginBottom: "40px" }} />
                                    ) : (
                                      <FiSquare style={{ marginBottom: "40px" }} />
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
                        <>
                          {row.length < 20 && (
                            <div style={{ margin: " 0 0 20px 0" }}>
                              <span
                                className="link-text"
                                onClick={() => {
                                  if (row[row.length - 1][0].length != 15) {
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
                      </>
                    </Row>

                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/* Address info */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1">
                  <div className="btn-header">
                    <div className="btn-subheader">
                      <div
                        style={{
                          background: active_tab == "first" ? "#C4D7FE" : null,
                        }}
                        className="btn1 footer-text"
                        value="first"
                        onClick={() => {
                          setactive_tab("first");
                        }}
                      >
                        Head Office Address
                      </div>

                      <div
                        style={{
                          background: active_tab == "second" ? "#C4D7FE" : null,
                        }}
                        className="btn1 footer-text"
                        value="second"
                        onClick={() => {
                          setactive_tab("second");
                        }}
                      >
                        Billing Address
                      </div>
                    </div>
                    <div className="btn-icon">
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
                    <Row>
                      {active_tab == "first" ? (
                        /*billing address*/
                        <Row>
                          <div style={{ display: "flex" }}>
                            <Label className="add">
                              *IF BILLING ADDRESS IS SAME AS HEAD OFFICE ADDRESS {" "}
                            </Label>
                            <Input
                              style={{
                                width: "15px",
                                margin: "-1px 5px 5px 5px",
                              }}
                              type="checkbox"
                              onChange={() => {
                                setsame_as_billing_add(!same_as_billing_add);
                              }}
                              checked={same_as_billing_add}
                            />
                          </div>
                          <Col lg={4} md={6} sm={6}>

                            <div className="mb-2">
                              <Label className="header-child">
                                Address Line 1:*
                              </Label>
                              <Input
                                value={office_add_line1}
                                onChange={(val) => {
                                  setoffice_add_line1(val.target.value);
                                }}
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="office_add_line1"
                                placeholder="Enter Address Line1"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Address Line 2
                              </Label>
                              <Input
                                onChange={(val) => {
                                  setoffice_add_line2(val.target.value);

                                }}
                                value={office_add_line2}
                                type="text"
                                className="form-control-md"
                                id="input"
                                name="office_add_line2"
                                placeholder="Enter Address Line2"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">State*</Label>
                              <span onClick={() => setby_pincode(false)}>
                                <SearchInput
                                  data_list={state_list_s}
                                  setdata_list={setstate_list_s}
                                  data_item_s={office_state}
                                  set_data_item_s={setoffice_state}
                                  set_id={setoffice_state_id}
                                  page={billing_state_page}
                                  setpage={setbilling_state_page}
                                  setsearch_item={setbilling_state_search_item}
                                />
                              </span>
                              {/* <div className="mt-1 error-text" color="danger">
                                {state_error ? "Please Select Any State" : null}
                              </div> */}
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">City*</Label>
                              <SearchInput
                                data_list={office_city_list}
                                setdata_list={setoffice_city_list}
                                data_item_s={office_city}
                                set_data_item_s={setoffice_city}
                                set_id={setoffice_city_id}
                                page={city_page}
                                setpage={setcity_page}
                                search_item={city_search_item}
                                setsearch_item={setcity_search_item}
                              />
                              <div className="mt-1 error-text" color="danger">
                                {city_error ? "Please Select Any City" : null}
                              </div>
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            {office_pincode_loaded ? (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*
                                </Label>

                                <SearchInput
                                  data_list={office_pincode_list}
                                  setdata_list={setoffice_pincode_list}
                                  data_item_s={office_pincode}
                                  set_data_item_s={setoffice_pincode}
                                  set_id={setoffice_pincode_id}
                                  page={pincode_page}
                                  setpage={setpincode_page}
                                  search_item={pincode_search_item}
                                  setsearch_item={setpincode_search_item}
                                />
                              </div>
                            ) : (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*
                                </Label>
                                <Input
                                  onChange={(val) => {
                                    setoffice_pincode(val.target.value);
                                    if (val.target.value.length !== 0) {
                                      setpincode_error(false);
                                      if (val.target.value.length === 6) {
                                        setpincode_error2(false);
                                      } else {
                                        setpincode_error2(true);
                                      }
                                    } else {
                                      setpincode_error(true);
                                    }
                                  }}
                                  onBlur={() => {
                                    if (office_pincode.length === 0) {
                                      setpincode_error(true);
                                    } else {
                                      if (office_pincode.length !== 6) {
                                        setpincode_error(false);
                                        setpincode_error2(true);
                                      } else {
                                        getPincode(
                                          office_pincode,
                                          "pincode",
                                          "office_city"
                                        );
                                        setpincode_error2(false);
                                        setby_pincode(true);
                                      }
                                    }
                                  }}
                                  value={office_pincode}
                                  invalid={
                                    validation.touched.pincode &&
                                      validation.errors.pincode
                                      ? true
                                      : false
                                  }
                                  type="number"
                                  className="form-control-md"
                                  id="input"
                                  name="pincode1"
                                  placeholder="Enter Pin code"
                                />

                                {pincode_loaded === false &&
                                  pincode_error === true ? (
                                  <div style={{ color: "red" }}>
                                    Please add pincode
                                  </div>
                                ) : null}

                                {pincode_loaded === false &&
                                  pincode_error === false &&
                                  pincode_error2 === true ? (
                                  <div
                                    style={{
                                      color: "#F46E6E",
                                      fontSize: "10.4px",
                                      marginTop: "4px",
                                    }}
                                  >
                                    pincode should 6 digit
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            {office_pincode_loaded && (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Locality*
                                </Label>

                                <SearchInput
                                  data_list={office_locality_list}
                                  setdata_list={setoffice_locality_list}
                                  data_item_s={office_locality}
                                  set_data_item_s={setoffice_locality}
                                  set_id={setoffice_locality_id}
                                  page={locality_page}
                                  setpage={setlocality_page}
                                  setsearch_item={setlocality_search_item}
                                />
                              </div>
                            )}
                          </Col>
                        </Row>
                      ) : null}

                      {active_tab == "second" ? (
                        // Office address
                        <Row>
                          {same_as_billing_add ?
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 1:*
                                </Label>
                                <Input
                                  value={office_add_line1}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                            :
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 1:*
                                </Label>
                                <Input
                                  value={
                                    same_as_billing_add
                                      ? office_add_line1
                                      : billing_add_line1
                                  }
                                  onChange={(val) => {
                                    setbilling_add_line1(val.target.value);
                                  }}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  name="billing_add_line1"
                                  placeholder="Enter Address Line1"
                                />
                              </div>
                            </Col>
                          }
                          {same_as_billing_add ?
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 2
                                </Label>
                                <Input
                                  value={office_add_line2}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                            :
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line 2
                                </Label>
                                <Input
                                  onChange={(val) => {
                                    setbilling_add_line2(val.target.value);
                                  }}
                                  value={
                                    same_as_billing_add
                                      ? office_add_line2
                                      : billing_add_line2
                                  }
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  name="billing_add_line2"
                                  placeholder="Enter Address Line2"
                                />
                              </div>
                            </Col>
                          }
                          {same_as_billing_add ?
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  State*
                                </Label>
                                <Input
                                  value={office_state}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                            :
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">State*</Label>
                                <span onClick={() => setby_pincode(false)}>
                                  <SearchInput
                                    data_list={state_list_s}
                                    setdata_list={setstate_list_s}
                                    data_item_s={
                                      billing_state
                                    }
                                    set_data_item_s={
                                      setbilling_state
                                    }
                                    set_id={setbilling_state_id}
                                    page={billing_state_page}
                                    setpage={setbilling_state_page}
                                    setsearch_item={setbilling_state_search_item}
                                  />
                                </span>
                                <div className="mt-1 error-text" color="danger">
                                  {state_error ? "Please Select Any State" : null}
                                </div>
                              </div>
                            </Col>
                          }
                          {same_as_billing_add ?
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  City*
                                </Label>
                                <Input
                                  value={office_city}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                            :
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">City*</Label>
                                <SearchInput
                                  data_list={billing_city_list}
                                  setdata_list={setbilling_city_list}
                                  data_item_s={
                                    billing_city
                                  }
                                  set_data_item_s={
                                    setbilling_city
                                  }
                                  set_id={setbilling_city_id}
                                  page={billing_city_page}
                                  setpage={setbilling_city_page}
                                  search_item={billing_city_search_item}
                                  setsearch_item={setbilling_city_search_item}
                                />
                                <div className="mt-1 error-text" color="danger">
                                  {city_error ? "Please Select Any City" : null}
                                </div>
                              </div>
                            </Col>
                          }
                          {same_as_billing_add ?
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pincode*
                                </Label>
                                <Input
                                  value={office_pincode}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                            :
                            <Col lg={4} md={6} sm={6}>
                              {billing_pincode_loaded ? (
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Pin Code*
                                  </Label>

                                  <SearchInput
                                    data_list={billing_pincode_list}
                                    setdata_list={setbilling_pincode_list}
                                    data_item_s={
                                      billing_pincode
                                    }
                                    set_data_item_s={
                                      setbilling_pincode
                                    }
                                    set_id={setbilling_pincode_id}
                                    page={billing_pincode_page}
                                    setpage={setbilling_pincode_page}
                                    setsearch_item={setbilling_pincode_search_item}
                                  />
                                </div>
                              ) : (
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Pin Code*
                                  </Label>
                                  <Input
                                    onChange={(val) => {
                                      setbilling_pincode(val.target.value);
                                      if (val.target.value.length !== 0) {
                                        setpincode_error(false);
                                        if (val.target.value.length === 6) {
                                          setpincode_error2(false);
                                        } else {
                                          setpincode_error2(true);
                                        }
                                      } else {
                                        setpincode_error(true);
                                      }
                                    }}
                                    onBlur={() => {
                                      if (billing_pincode.length === 0) {
                                        setpincode_error(true);
                                      } else {
                                        if (billing_pincode.length !== 6) {
                                          setpincode_error(false);
                                          setpincode_error2(true);
                                        } else {
                                          getPincode(billing_pincode, "pincode", "billin_city");
                                          setpincode_error2(false);
                                          setby_pincode(true);
                                        }
                                      }
                                    }}
                                    value={billing_pincode}
                                    invalid={
                                      validation.touched.pincode &&
                                        validation.errors.pincode
                                        ? true
                                        : false
                                    }
                                    type="number"
                                    className="form-control-md"
                                    id="input"
                                    name="pincode1"
                                    placeholder="Enter Pin code"
                                  />

                                  {pincode_loaded === false &&
                                    pincode_error === true ? (
                                    <div style={{ color: "red" }}>
                                      Please add pincode
                                    </div>
                                  ) : null}

                                  {pincode_loaded === false &&
                                    pincode_error === false &&
                                    pincode_error2 === true ? (
                                    <div
                                      style={{
                                        color: "#F46E6E",
                                        fontSize: "10.4px",
                                        marginTop: "4px",
                                      }}
                                    >
                                      pincode should 6 digit
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </Col>
                          }
                          {same_as_billing_add ?
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pincode*
                                </Label>
                                <Input
                                  value={office_locality}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              </div>
                            </Col>
                            :
                            <Col lg={4} md={6} sm={6}>
                              {billing_pincode_loaded && (
                                <div className="mb-2">
                                  <Label className="header-child">
                                    Locality*
                                  </Label>
                                  <SearchInput
                                    data_list={billing_locality_list}
                                    setdata_list={setbilling_locality_list}
                                    data_item_s={billing_locality}
                                    set_data_item_s={setbilling_locality}
                                    set_id={setbilling_locality_id}
                                    page={billing_locality_page}
                                    setpage={setbilling_locality_page}
                                    setsearch_item={setbilling_locality_search_item}
                                  />
                                </div>
                              )}
                            </Col>
                          }
                        </Row>
                      ) : null}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>

          {/*Employee info*/}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Contact Person Info
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
                          <Label className="header-child">
                            Contact Person:*{" "}
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contact_person_name || ""}
                            invalid={
                              validation.touched.contact_person_name &&
                                validation.errors.contact_person_name
                                ? true
                                : false
                            }
                            type="text"
                            className="form-control-md"
                            id="input"
                            name="contact_person_name"
                            placeholder="Enter Name"
                          />
                          {validation.touched.contact_person_name &&
                            validation.errors.contact_person_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contact_person_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Contact Person Email*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contact_person_email || ""}
                            invalid={
                              validation.touched.contact_person_email &&
                                validation.errors.contact_person_email
                                ? true
                                : false
                            }
                            type="email"
                            className="form-control-md"
                            id="input"
                            name="contact_person_email"
                            placeholder="Enter Email"
                          />
                          {validation.touched.contact_person_email &&
                            validation.errors.contact_person_email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contact_person_email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Contact Person Phone Number*
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contact_person_ph_no || ""}
                            invalid={
                              validation.touched.contact_person_ph_no &&
                                validation.errors.contact_person_ph_no
                                ? true
                                : false
                            }
                            type="number"
                            min={0}
                            className="form-control-md"
                            id="input"
                            name="contact_person_ph_no"
                            placeholder="Enter Phone Number"
                          />
                          {validation.touched.contact_person_ph_no &&
                            validation.errors.contact_person_ph_no ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contact_person_ph_no}
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

          {/* Dispription */}
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Discription
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
                      <Col>
                        <div className="mb-2">
                          <Label className="header-child">Description:</Label>
                          <br />
                          <textarea
                            style={{
                              width: "700px",
                              height: "200px",
                              borderRadius: "8px",
                            }}
                            type="text"
                            cols="20"
                            wrap="hard"
                            maxLength="200"
                            rows="1"
                            max-rows="3"
                            value={descripation}
                            onChange={(val) => {
                              setdescripation(val.target.value);
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
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
                  type="submit"
                  name="submit"
                  className="btn btn-info m-1 cu_btn"
                >
                  {isupdating ? "Update" : "Save"}
                </Button>

                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  onClick={() => {
                    navigate(-1);
                  }}
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

export default AddOrganization;
``
