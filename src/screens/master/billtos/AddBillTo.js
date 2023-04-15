import React, { useState, useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import {
  MdAdd,
  MdAddCircleOutline,
  MdDeleteForever,
  MdRemoveCircleOutline,
} from "react-icons/md";
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
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import Tab from "../../../components/formComponent/clientComponent/tab/Tab";
import { setLocalCal } from "../../../store/master/client/Client";
import ClientsDataTitle from "../../../data/master/customers/ClientsDataTitles";
import ClientsDataFormat from "../../../data/master/customers/ClientsDataFormat";
import DataList from "../../../components/listDisplay/dataList/DataList";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

const AddClient = () => {
  const { state: up_params } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const accessToken = useSelector((state) => state.authentication.access_token);

  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  //  Client details
  const [client, setclient] = useState({});
  const [client_id, setclient_id] = useState(0);
  const [isupdating, setisupdating] = useState(false);

  const [client_mode_short, setclient_mode_short] = useState("");
  const [client_mode, setclient_mode] = useState("");
  const [client_mode_error, setclient_mode_error] = useState(false);

  const [client_type, setclient_type] = useState("");
  const [client_type_short, setclient_type_short] = useState("");
  const [client_type_error, setclient_type_error] = useState(false);

  const [associate_branch_list_1, setassociate_branch_list_1] = useState([]);
  const [associate_branch_list_2, setassociate_branch_list_2] = useState([]);
  const [branch_page, setbranch_page] = useState(1);
  const [branch_search, setbranch_search] = useState("");

  const [credit_limit, setcredit_limit] = useState(false);

  // Location Info
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [state_loaded, setstate_loaded] = useState(false);
  const [state_count, setstate_count] = useState(1);

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false);
  const [city_count, setcity_count] = useState(1);

  const [by_pincode, setby_pincode] = useState(false);
  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode, setpincode] = useState("");
  const [select_pincode_error, setsetselect_pincode_error] = useState(false);
  const [pin_code_error, setpin_code_error] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);
  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_id, setpincode_id] = useState(0);
  const [loaded_pincode, setloaded_pincode] = useState(false);
  const [pincode_count, setpincode_count] = useState(1);

  const [locality, setlocality] = useState("");
  const [pincode_loaded, setpincode_loaded] = useState(false);
  const [locality_list_s, setlocality_list_s] = useState([]);
  const [locality_page, setlocality_page] = useState(1);
  const [locality_search_item, setlocality_search_item] = useState("");
  const [locality_id, setlocality_id] = useState(0);
  const [locality_error, setlocality_error] = useState(false);

  // GST NO
  const [package_id_list, setpackage_id_list] = useState([]);

  let dimension_list = ["", "", "", ""];
  const [row, setrow] = useState([dimension_list]);
  const [refresh, setrefresh] = useState(false);

  // Business Info
  const [agreement, setagreement] = useState(false);
  const [documentFile, setdocumentFile] = useState(null);
  const [agreement_date, setagreement_date] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0]
  );

  const [is_local_temp, setis_local_temp] = useState()

  //Permission
  const user = useSelector((state) => state.authentication.userdetails);
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_view, setcan_view] = useState(false);
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  // Card Control
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn4, setcircle_btn4] = useState(true);
  const toggle_circle4 = () => {
    setcircle_btn4(!circle_btn4);
  };

  const [circle_btn6, setcircle_btn6] = useState(true);
  const toggle_circle6 = () => {
    setcircle_btn6(!circle_btn6);
  };

  // Later For GST ROWS
  const addPackage = () => {
    dimension_list = ["", "", "", ""];
    setrow([...row, dimension_list]);
  };

  const deletePackage = (item) => {
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


  // Formik Yup validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: client.name || "",
      email: client.email || "",
      phone_number: client.phone_number || "",
      authorised_person_name: toTitleCase(client.authorised_person_name) || "",
      authorised_email: client.authorised_person_email || "",
      authorised_number: client.authorised_person_number || "",
      address_line_1: toTitleCase(client.address_line) || "",

      // Additional Charges
      sac_code: client.sac_code || "",
      sac_service: client.sac_service || "",
      pan_no: client.pan_no || "",
      credit_amount: client.credit_amount || 0,

    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone_number: Yup.string()
        .min(10, "Phone number must 10 digit long")
        .max(10, "Phone number must 10 digit long")
        .required("Phone number is required"),
      authorised_person_name: Yup.string().required(
        "Authorised person name is required"
      ),
      authorised_email: Yup.string()
        .email("Invalid email format")
        .required("Autherized email is required"),
      authorised_number: Yup.string()
        .min(10, "Authorized Phone number must 10 digit long")
        .max(10, "Authorized Phone number must 10 digit long")
        .required("Authorized Phone number is required"),
      address_line_1: Yup.string().required("Address line is required"),

    }),

    onSubmit: (values) => {
      isupdating ? updateBillTo(values) : addBillTo(values);
    },
  });

  // Locations Function

const getStates = async () => {
  let state_list = [];

  try {
    const resp = await axios.get(ServerAddress +
      `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page}&records=${10}&state_search=${state_search_item}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if(resp.data.next ===null) {
      setstate_loaded(false);
    } else {
      setstate_loaded(true);
    }

    if (resp.data.results.length > 0) {
      if (state_page == 1) {
        state_list = resp.data.results.map((v) => [
          v.id,
          toTitleCase(v.state),
        ]);
      }
      else {
        state_list = [
          ...state_list_s,
          ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
        ];
      }
    }

    setstate_count(state_count+2);
    setcity_list_s([]);
    setstate_list_s(state_list);

  } catch (err) {
    alert(`Error Occur in Get States, ${err}`);
  }
};

  const getCities = async (place_id, filter_by) => {
    setby_pincode(false);
    let cities_list = [];
  
    try {
      const resp = await axios.get(ServerAddress +
        `master/all_cities/?search=${""}&p=${city_page}&records=${10}&city_search=${city_search_item}` +
        "&place_id=" +
        place_id +
        "&filter_by=" +
        filter_by,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      if(resp.data.next ===null) {
        setcity_loaded(false);
      } else {
        setcity_loaded(true);
      }
  
      if (resp.data.results.length > 0) {
        if (city_page == 1) {
          cities_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.city),
          ]);
        } else {
          cities_list = [
            ...city_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
          ];
        }
        setcity_count(city_count+2);
        setcity_list_s(cities_list);
      } else {
        setcity_list_s([]);
      }
  
    } catch (err) {
      alert(`Error Occur in Get City, ${err}`);
    }
  };
  
const getPincode = async (place_id, filter_by) => {
  let pincode_list = [];
  try {
    const resp = await axios.get(
      ServerAddress +
      `master/all_pincode/?search=${""}&p=${pincode_page}&records=${10}&pincode_search=${pincode_search_item}` +
      "&place_id=" +
      place_id +
      "&filter_by=" +
      filter_by,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    
    if(resp.data.next ===null){
      setloaded_pincode(false);
    } else {
      setloaded_pincode(true);
    }

    if (filter_by !== "pincode") {
      if (pincode_page == 1) {
        pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
      } else {
        pincode_list = [          ...pincode_list_s,          ...resp.data.results.map((v) => [v.id, v.pincode]),
        ];
      }
      setpincode_count(pincode_count+2);
      setpincode_list_s(pincode_list);
    } else if (resp.data.results.length > 0) {
      setcity(toTitleCase(resp.data.results[0].city_name));
      setcity_id(resp.data.results[0].city);
      setstate(toTitleCase(resp.data.results[0].state_name));
      setstate_id(resp.data.results[0].state);
      setpincode(resp.data.results[0].pincode);
      setpincode_id(resp.data.results[0].id);
    } else {
      dispatch(
        setDataExist(
          "You entered invalid pincode or pincode not available in database"
        )
      );
      dispatch(setAlertType("warning"));
      dispatch(setShowAlert(true));
      setcity("");
      setcity_id("");
      // setstate("");
      setstate_id("");
    }
  } catch (err) {
    alert(`Error Occur in Get City, ${err}`);
  }
};

  const getLocality = async (place_id, filter_by) => {
    let locality_list = [];
    try {
      const resp = await axios.get(
        ServerAddress +
          `master/all_locality/?search=${""}&p=${locality_page}&records=${10}` +
          `&place_id=${place_id}&filter_by=${filter_by}&name_serach=${locality_search_item}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (filter_by !== "locality") {
        if (pincode_page == 1) {
          locality_list = resp.data.results.map((v) => [
            v.id,
            toTitleCase(v.name),
          ]);
        } else {
          locality_list = [
            ...locality_list_s,
            ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
          ];
        }
  
        setlocality_list_s(locality_list);
      } else if (resp.data.results.length > 0) {
        setlocality(toTitleCase(resp.data.results[0].name));
        setlocality_id(resp.data.results[0].id);
        setcity(toTitleCase(resp.data.results[0].city_name));
        setstate(toTitleCase(resp.data.results[0].state_name));
        setpincode(resp.data.results[0].pincode_name);
        setpincode_id(resp.data.results[0].pincode);
      } else {
        dispatch(setDataExist("You entered invalid Locality"));
        dispatch(setAlertType("warning"));
        dispatch(setShowAlert(true));
      }
    } catch (err) {
      alert(`Error Occur in Get Pincode , ${err}`);
    }
  };

const getBranches = async () => {
  let temp_2 = [];
  let temp = [];
  try {
    const response = await axios.get(
      ServerAddress +
      `master/all-branches/?search=${branch_search}&p=${page_num}&records=${data_len}&branch_name=${[
        "",
      ]}&branch_city=${[""]}&vendor=&data=all`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    temp = response.data.results;
    console.log("resp",response.data)
    if (temp.length > 0) {
      temp_2 = temp.map((v) => [v.id, toTitleCase(v.name)]);
      console.log("temp_2========",temp_2)
      let client_up = up_params?.client;
      let cl_brncs = [];
      let f_brnch = [];
      if (client_up?.branches.length > 0) {
        console.log("====================eeeee")
        cl_brncs = temp_2.filter((v) =>
          client_up.branches.map((b) => b).includes(v[0])
        );
        f_brnch = temp_2.filter(
          (v) => !client_up.branches.map((b) => b).includes(v[0])
        );
        setassociate_branch_list_2(cl_brncs);
        setassociate_branch_list_1(f_brnch);
      } else {
        setassociate_branch_list_1(temp_2);
      }
    }
  } catch (err) {
    console.log(`Error Occur in Get Branches, ${err}`);
  }
};
console.log("associate_branch_list_1", associate_branch_list_1)

  // Bill To API Functions
  const addBillTo = (values) => {
    let branches_id_list = associate_branch_list_2.map((v) => v[0]);

    axios
      .post(
        ServerAddress + "master/add_billto/",
        {
          email: values.email,
          name: toTitleCase(values.name).toUpperCase(),
          phone_number: values.phone_number,
          address_line: toTitleCase(values.address_line_1).toUpperCase(),
          location: locality_id,
          authorised_person_name: toTitleCase(
            values.authorised_person_name
          ).toUpperCase(),
          authorised_person_email: values.authorised_email,
          authorised_person_number: values.authorised_number,
          branches: branches_id_list,

          pan_no: toTitleCase(values.pan_no).toUpperCase(),
          credit_limit: credit_limit,
          credit_amount: values.credit_amount,
          created_by: user_id,
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
      .then(function (resp) {
        if (resp.status === 201) {
          navigate("/master/billtos");
          dispatch(
            setDataExist(
              `New BillTo '${toTitleCase(values.name)}' Added Successfully`
            )
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
        } else if (resp.data == "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `BillTo Name "${toTitleCase(values.name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while adding client  ${error}`);
      });
  };

  const updateBillTo = (values) => {
    let branches_id_list = associate_branch_list_2.map((v) => v[0]);
    let client_up = up_params.client;

    let fields_names = Object.entries({
      email: values.email,
      name: toTitleCase(values.name).toUpperCase(),
      phone_number: values.phone_number,
      address_line: toTitleCase(values.address_line_1).toUpperCase(),
      location: locality_id,
      authorised_person_name: toTitleCase(
        values.authorised_person_name
      ).toUpperCase(),
      authorised_person_email: values.authorised_email,
      authorised_person_number: values.authorised_number,
      branches: branches_id_list,

      // Additional Field Data
      // sac_code: toTitleCase(values.sac_code).toUpperCase(),
      // sac_service: toTitleCase(values.sac_service).toUpperCase(),
      pan_no: toTitleCase(values.pan_no).toUpperCase(),
      credit_limit: credit_limit,
      credit_amount: values.credit_amount,
    });

    let change_fields = {};

    if (!branches_id_list.every((ele) => client_up["branches"].includes(ele))) {
      change_fields[`branches`] = branches_id_list;
    }

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = client_up[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev) !== String(new_v)) {
        change_fields[`${ele[0]}`] = new_v;
      }
    }

    axios
      .put(
        ServerAddress + "master/update_billto/" + client.id,
        {
          email: values.email,
          name: toTitleCase(values.name).toUpperCase(),
          phone_number: values.phone_number,
          address_line: toTitleCase(values.address_line_1).toUpperCase(),
          location: locality_id,
          authorised_person_name: toTitleCase(
            values.authorised_person_name
          ).toUpperCase(),
          authorised_person_email: values.authorised_email,
          authorised_person_number: values.authorised_number,
          branches: branches_id_list,

          // Additional Field Data
          // sac_code: toTitleCase(values.sac_code).toUpperCase(),
          // sac_service: toTitleCase(values.sac_service).toUpperCase(),
          pan_no: toTitleCase(values.pan_no).toUpperCase(),
          credit_limit: credit_limit,
          credit_amount: values.credit_amount,
          modified_by: user_id,
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
      .then(function (resp) {
        // console.log("billto update resp", resp);
        if (resp.data.status === "success") {
          navigate("/master/billtos");
          dispatch(setDataExist(`BillTo '${values.name}' Updated Sucessfully`));
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
        } else if (resp.data == "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `BillTo Name "${toTitleCase(values.name)}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function () {
        alert("Error Error While  Updating client");
      });
  };

  // Location Functions Call
  useEffect(() => {
    if (state_id !== 0 && by_pincode === false) {
      // setcity_page(1);
      getCities(state_id, "state");
      // setpincode("");
      setpincode_list_s([]);
      // setlocality("");
      setlocality_list_s([]);
    }
  }, [state_id, city_page, city_search_item]);

  useEffect(() => {
    if (pincode_id !== 0) {
      setlocality_page(1);
      getLocality(pincode_id, "pincode");
    }
  }, [pincode_id, locality_page, locality_search_item]);

  useEffect(() => {
    if (city_id !== 0 && by_pincode === false) {
      setpincode_page(1);
      getPincode(city_id, "city");
      // setpincode("")
    }
  }, [city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    getStates();
    setcity_list_s([]);
  }, [state_page, state_search_item, refresh]);

  useLayoutEffect(() => {
    getBranches();
  }, [branch_page, branch_search]);

  useLayoutEffect(() => {
    try {
      let client_up = up_params.client;
      setclient(client_up);
      setclient_id(client_up.id);
      setisupdating(true);

      setstate(toTitleCase(client_up.state_name));
      setstate_id(client_up.state_id);
      setcity_id(client_up.city_id);
      setcity(toTitleCase(client_up.city_name));
      setpincode(client_up.pincode_name);
      setpincode_id(client_up.pincode);
      setlocality(toTitleCase(client_up.locality_name));
      setlocality_id(client_up.location);

      setcredit_limit(client_up.credit_limit);
    } catch (error) {
      // setEmpty();
    }
  }, []);

  useLayoutEffect(() => {
    if (state !== "") {
      setpincode_loaded(true);
    }
  }, [state, city]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Client" && e.read === true)
    ) {
      setcan_view(true);
    } else {
      setcan_view(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Client" && e.write === true)
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Client" && e.delete === true)
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

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

  const update_billtostatus = (id) => {

    axios
      .put(
        ServerAddress + "master/update_billto/" + id,
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
      update_billtostatus(client.id)
      setShow(false)
    }
  }

  // for history
  const handlClk = () => {
    navigate("/master/billtos/billtoHistory/BilltoHistoryPage", {
      state: { client : client },
    });
  };
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
          if (state === "") {
            setstate_error(true);
          }
          if (city === "") {
            setcity_error(true);
          } if (pincode === "") {
            setpincode_error(true);
          }
          if (pincode_loaded && pincode === "") {
            setsetselect_pincode_error(true);
          } if (locality === "") {
            setlocality_error(true);
          }
          if (pincode_loaded && locality === "") {
            setlocality_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        {/* Client details */}
        <div
          className="m-4"
        >
          <div className="mb-2 main-header">
            {isupdating ? "Update Bill To" : "Add Bill To"}
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
            {/* Add For History Button */}

          {/* <Col lg={12}> */}
          <Card className="shadow bg-white rounded" >
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text" id="1">
                Bill To Details
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
            {circle_btn && (
              <CardBody>
                <Row>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Name*</Label>
                      <Input
                        onChange={validation.handleChange}

                        onBlur={validation.handleBlur}

                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                        type="text"
                        name="name"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Name"
                      />
                      {validation.touched.name && validation.errors.name && (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      )}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child">Email*</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                        type="email"
                        name="email"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Email"
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <Label className="header-child">Phone number*</Label>
                    <div className="mb-3">
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_number || ""}
                        invalid={
                          validation.touched.phone_number &&
                            validation.errors.phone_number
                            ? true
                            : false
                        }
                        type="number"
                        name="phone_number"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter phone number"
                      />
                      {validation.touched.phone_number &&
                        validation.errors.phone_number ? (
                        <FormFeedback type="invalid">
                          {validation.errors.phone_number}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Label className="header-child">Associated Branch</Label>
                  <Col lg={12} md={12} sm={12}>
                    <TransferList
                      list_a={associate_branch_list_1}
                      setlist_a={setassociate_branch_list_1}
                      list_b={associate_branch_list_2}
                      setlist_b={setassociate_branch_list_2}
                      page={branch_page}
                      setpage={setbranch_page}
                      error_message={"Please Select Any Option"}
                      setsearch_item={setbranch_search}
                    />
                  </Col>
                  {/* <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child"> SAC Code</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.sac_code || ""}
                        type="text"
                        name="sac_code"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Name"
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-3">
                      <Label className="header-child"> SAC Services</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.sac_service || ""}
                        type="text"
                        name="sac_service"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Name"
                      />
                    </div>
                  </Col> */}

                  <Col md={2}>
                    <div className="mb-3">
                      <Label className="header-child">Credit Limit</Label>
                      <div
                        onClick={() => {
                          setcredit_limit(!credit_limit);
                        }}
                      >
                        {credit_limit ? (
                          <FiCheckSquare size={20} />
                        ) : (
                          <FiSquare size={20} />
                        )}
                      </div>
                    </div>
                  </Col>

                  {credit_limit && (
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child"> Credit Amount</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.credit_amount || ""}
                          step={0.1}
                          type="number"
                          name="credit_amount"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Amount"
                        />
                      </div>
                    </Col>
                  )}
                </Row>
              </CardBody>
            )}
          </Card>
        </div>

        {/*GST info authorised*/}
        <div className="m-4">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  GST info
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle6}>
                      {circle_btn6 ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn6 ? (
                <CardBody>
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">PAN Number</Label>
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
                          className="form-control-md"
                          id="input"
                          name="pan_no"
                          placeholder="Enter PAN Number"
                        />
                        {validation.touched.pan_no &&
                          validation.errors.pan_no ? (
                          <FormFeedback type="invalid">
                            {validation.errors.pan_no}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <>
                    <Row className="hide">
                      <Col md={3} sm={3}>
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
                                placeholder="Enter GST Number"
                                onChange={(val) => {
                                  item[0] = val.target.value;
                                  setrefresh(!refresh);
                                }}
                                onFocus={() => {
                                  // setclicked(true);
                                }}
                              />
                            );
                          })}
                        </div>
                      </Col>
                      <Col md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">State Code</Label>
                          {row.map((item, index) => (
                            <Input
                              min={0}
                              key={index}
                              value={item[1]}
                              type="number"
                              className="form-control-md"
                              id="input"
                              style={{ marginBottom: "15px" }}
                              placeholder="Enter State Code"
                              onChange={(val) => {
                                // setbreadth(val.target.value);
                                item[1] = val.target.value;
                                setrefresh(!refresh);
                              }}
                            />
                          ))}
                        </div>
                      </Col>
                      <Col md={3} sm={3}>
                        <div className="mb-3">
                          <Label className="header-child">State Name</Label>
                          {row.map((item, index) => (
                            <Input
                              min={0}
                              key={index}
                              value={item[2]}
                              type="text"
                              className="form-control-md d"
                              id="input"
                              style={{ marginBottom: "15px" }}
                              placeholder="Enter State Name"
                              onChange={(val) => {
                                // setheight(val.target.value);
                                item[2] = val.target.value;
                                setrefresh(!refresh);
                              }}
                            />
                          ))}
                        </div>
                      </Col>

                      <Col lg={1}>
                        <div className="mb-3" style={{ textAlign: "center" }}>
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
                                      deletePackage(item);
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

                    {row.length < 20 && (
                      <div>
                        <span
                          className="link-text"
                          onClick={() => {
                            addPackage();
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
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Location Info */}
        <div className=" m-4">
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Primary Address
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
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Address Line *</Label>
                      <Input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.address_line_1 || ""}
                        invalid={
                          validation.touched.address_line_1 &&
                            validation.errors.address_line_1
                            ? true
                            : false
                        }
                        type="text"
                        className="form-control-md"
                        id="input"
                        name="address_line_1"
                        placeholder="Enter Address Line 1"
                      />
                      {validation.touched.address_line_1 &&
                        validation.errors.address_line_1 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.address_line_1}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  {/* location */}
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">State*</Label>
                      <span onClick={() => setby_pincode(false)}>
                        <SearchInput
                          data_list={state_list_s}
                          setdata_list={setstate_list_s}
                          data_item_s={state}
                          set_data_item_s={setstate}
                          set_id={setstate_id}
                          page={state_page}
                          setpage={setstate_page}
                          error_message={"Please Select Any State"}
                          error_s={state_error}
                          search_item={state_search_item}
                          setsearch_item={setstate_search_item}
                          loaded={state_loaded}
                          count={state_count}
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
                        data_list={city_list_s}
                        setdata_list={setcity_list_s}
                        data_item_s={city}
                        set_data_item_s={setcity}
                        set_id={setcity_id}
                        page={city_page}
                        setpage={setcity_page}
                        error_message={"Please Select Any City"}
                        error_s={city_error}
                        search_item={city_search_item}
                        setsearch_item={setcity_search_item}
                        loaded={city_loaded}
                        count={city_count}
                      />
                      {/* <div className="mt-1 error-text" color="danger">
                        {city_error ? "Please Select Any City" : null}
                      </div> */}
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    {pincode_loaded ? (
                      <div className="mb-2">
                        <Label className="header-child">Pin Code*</Label>

                        <SearchInput
                          data_list={pincode_list_s}
                          setdata_list={setpincode_list_s}
                          data_item_s={pincode}
                          set_data_item_s={setpincode}
                          set_id={setpincode_id}
                          page={pincode_page}
                          setpage={setpincode_page}
                          error_message={"Please Select Any Pincode"}
                          error_s={select_pincode_error}
                          search_item={pincode_search_item}
                          setsearch_item={setpincode_search_item}
                          loaded={loaded_pincode}
                          count={pincode_count}
                        />
                      </div>
                    ) : (
                      <div className="mb-2">
                        <Label className="header-child">Pin Code*</Label>
                        <Input
                          onChange={(val) => {
                            setpincode(val.target.value);
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
                            if (pincode.length === 0) {
                              setpincode_error(true);
                            } else {
                              if (pincode.length !== 6) {
                                setpincode_error(false);
                                setpincode_error2(true);
                              } else {
                                getPincode(pincode, "pincode");
                                setpincode_error2(false);
                                setby_pincode(true);
                              }
                            }
                          }}
                          value={pincode}
                          // invalid={
                          //   validation.touched.pincode &&
                          //     validation.errors.pincode
                          //     ? true
                          //     : false
                          // }
                          invalid ={pincode_error}
                          type="number"
                          className="form-control-md"
                          id="input"
                          name="pincode1"
                          placeholder="Enter Pin Code"
                        />

                        {pincode_loaded === false && pincode_error === true ? (
                          <div style={{
                            fontSize: "10.5px",
                            color: " #f46a6a",
                          }}>Please add pincode</div>
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
                    {pincode_loaded ? (
                      <div className="mb-2">
                        <Label className="header-child">Locality*</Label>

                        <SearchInput
                          data_list={locality_list_s}
                          setdata_list={setlocality_list_s}
                          data_item_s={locality}
                          set_data_item_s={setlocality}
                          set_id={setlocality_id}
                          page={locality_page}
                          setpage={setlocality_page}
                          error_message={"Please Select Any Locality"}
                          error_s={locality_error}
                          search_item={locality_search_item}
                          setsearch_item={setlocality_search_item}
                        />
                      </div>
                    ) : (
                      <div className="mb-2">
                        <Label className="header-child">Locality*</Label>
                        <Input
                          onChange={(val) => {
                            setlocality(val.target.value);
                            if (val.target.value.length !== 0) {
                              setlocality_error(false);
                            } else {
                              setlocality_error(true);
                            }
                          }}
                          onBlur={() => {
                            if (locality.length === 0) {
                              setlocality_error(true);
                            } else {
                              getLocality(locality.toUpperCase(), "locality");
                            }
                          }}
                          value={locality}
                          // invalid={
                          //   validation.touched.locality &&
                          //     validation.errors.locality
                          //     ? true
                          //     : false
                          // }
                          invalid={locality_error}
                          type="text"
                          className="form-control-md"
                          id="input"
                          name="pincode1"
                          placeholder="Enter Locality"
                        />

                        {pincode_loaded === false &&
                          locality_error === true ? (
                          <div
                            style={{
                              fontSize: "10.5px",
                              color: " #f46a6a",
                            }}
                          >
                            Please add Locality
                          </div>
                        ) : null}

                        {/* {pincode_loaded === false &&
                              pincode_error === false &&
                              pincode_error2 === true ? (
                              <div
                                style={{
                                  fontSize: "10.5px",
                                  color: " #f46a6a",
                                }}
                              >
                                pincode should 6 digit
                              </div>
                            ) : null} */}
                      </div>
                    )}
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Communication info authorised*/}
        <div className="m-4">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Communication info authorised
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
                    <Col lg={4} md="6" sm="6">
                      <div className="mb-3">
                        <Label className="header-child">
                          Authorised Person Name
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.authorised_person_name || ""}
                          invalid={
                            validation.touched.authorised_person_name &&
                              validation.errors.authorised_person_name
                              ? true
                              : false
                          }
                          type="text"
                          name="authorised_person_name"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Authorised Person Name"
                        />
                        {validation.touched.authorised_person_name &&
                          validation.errors.authorised_person_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.authorised_person_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md="6" sm="6">
                      <div className="mb-2">
                        <Label className="header-child">
                          Authorised Person Email
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.authorised_email || ""}
                          invalid={
                            validation.touched.authorised_email &&
                              validation.errors.authorised_email
                              ? true
                              : false
                          }
                          type="email"
                          name="authorised_email"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Authorised Email"
                        />
                        {validation.touched.authorised_email &&
                          validation.errors.authorised_email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.authorised_email}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md="6" sm="6">
                      <div className="mb-2">
                        <Label className="header-child">
                          Authorised Person Number
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.authorised_number || ""}
                          invalid={
                            validation.touched.authorised_number &&
                              validation.errors.authorised_number
                              ? true
                              : false
                          }
                          type="number"
                          name="authorised_number"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Authorised Person Number"
                        />
                        {validation.touched.authorised_number &&
                          validation.errors.authorised_number ? (
                          <FormFeedback type="invalid">
                            {validation.errors.authorised_number}
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

        {/* Tab For Client  */}

        {isupdating && (can_view || user.is_superuser) && (
          <div className="m-4" id="customer">
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Clients
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle4}>
                      <Button
                        type="button"
                        className="btn-rounded fluid btn btn-success mx-3"
                        onClick={() => {
                          navigate("/master/clients/addclient", {
                            state: {
                              // billto : client,
                              bill_to_name: validation.values.name,
                              bill_to_email: validation.values.email,
                              bill_to_phone_number:
                                validation.values.phone_number,
                              bill_to_address_line_1:
                                validation.values.address_line_1,
                              bill_to_locality_name: locality,
                            },
                          });
                        }}
                      >
                        Same As BillTo
                      </Button>
                      {(can_add || user.is_superuser) && (
                        <Button
                          type="button"
                          className="btn-rounded fluid btn btn-success mx-3"
                          onClick={() => {
                            navigate("/master/clients/addclient", {
                              state: {
                                bill_to_id: client.id,
                                bill_to_nm: client.name,
                              },
                            });
                          }}
                        >
                          Add Client
                        </Button>
                      )}
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
                <>
                  <DataList
                    can_delete={can_delete}
                    Data_Title={ClientsDataTitle}
                    Data_Format={ClientsDataFormat}
                    path={`master/all_clients/?bill_to=${client_id}&p=${page_num}&records=${data_len}`}
                  />
                  <NumPagination path={"path"} />
                </>
              ) : null}
            </Card>
            {/* )} */}
          </div>
        )}

        {/*Button */}
        <div className=" m-4">
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

              <button
                type="button"
                className="btn btn-info m-1"
                onClick={() => navigate("/master/billtos")}
              >
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default AddClient;
