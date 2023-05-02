import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import {
  bucket_address,
  ServerAddress,
} from "../../../constants/ServerAddress";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import DataList from "../../../components/listDisplay/dataList/DataList";
import StatusInfoDataTitle from "../../../data/booking/statusInfo/StatusInfoDataTitle";
import StatusInfoDataFormat from "../../../data/booking/statusInfo/StatusInfoDataFormat";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import {
  setCurOrderDocketNo,
  setCurOrderId,
} from "../../../store/booking/order/Order";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Main_c from "../.././../components/crop/main";
import { CleanHands } from "@mui/icons-material";
import DeliveryInfoDataTitle from "../../../data/booking/deliveryInfo/DeliveryInfoDataTitle";
import DeliveryInfoDataFormat from "../../../data/booking/deliveryInfo/DeliveryInfoDataFormat";
import {
  setBAccessToken,
  setEAccessToken,
  setOrgs,
} from "../../../store/ewayBill/EwayBill";
import { gstin_no } from "../../../constants/CompanyDetails";

const AddOrder = () => {
  const user = useSelector((state) => state.authentication.userdetails);
  const home_branch_id = useSelector(
    (state) => state.authentication.userdetails.home_branch
  );

  const user_l_state = useSelector((state) => state.authentication.userdetails.branch_location_state);
  const user_l_statecode = useSelector((state) => state.authentication.userdetails.branch_location_state_code);
  const data_len = useSelector((state) => state.pagination.data_length);
  // const page_num = useSelector((state) => state.pagination.page_number);
  const [page_num, setpage_num] = useState(1);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const search = useSelector((state) => state.searchbar.search_item);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setpage] = useState(1);

  //Get Updated Location Data
  const [order, setorder] = useState([]);
  console.log("orderorderorderorder", order);
  const [order_id, setorder_id] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [hash, sethash] = useState("");
  const [returned_data, setreturned_data] = useState([]);
  const [total_delivered_pcs, settotal_delivered_pcs] = useState(0);
  //Submit Buttom
  const [submit_btn, setsubmit_btn] = useState(false);

  // For Onfocus
  const [clicked, setclicked] = useState(false);

  //local delivery_type
  const [delivery_type, setdelivery_type] = useState("LOCAL");

  const [local_delivery_type_list, setlocal_delivery_type_list] = useState([
    "Sales",
    "Sample",
    "Expiry Goods",
  ]);
  const [local_delivery_type, setlocal_delivery_type] = useState("");

  // Entry Type
  const [entry_type_btn, setentry_type_btn] = useState("AUTO GENERATE");

  //Docket number
  const [docket_no_value, setdocket_no_value] = useState("");
  const [docket_error, setdocket_error] = useState(false);

  //Cold chain
  const [cold_chain, setcold_chain] = useState(false);
  const [nonecold_chain, setnonecold_chain] = useState(false);
  const [cod_list, setcod_list] = useState(["Yes", "No"]);
  const [asset_prov, setasset_prov] = useState(false);
  console.log("----------asset_prov", asset_prov);
  const [d_cod, setd_cod] = useState("No");

  const [state_list_c, setstate_list_c] = useState([]);
  console.log("state_list_c=========", state_list_c)
  const [state_s_c, setstate_s_c] = useState("");
  const [state_id_f_c, setstate_id_f_c] = useState(0);
  const [state_error_c, setstate_error_c] = useState(false);
  const [state_page_c, setstate_page_c] = useState(1);
  const [statec_count, setstatec_count] = useState(1)
  const [statec_loaded, setstatec_loaded] = useState(false)
  const [statec_bottom, setstatec_bottom] = useState(103)

  const [state_search_item_c, setstate_search_item_c] = useState("");
  const [city_list__c, setcity_list__c] = useState([]);
  const [city_c, setcity_c] = useState("");
  const [city_id_c, setcity_id_c] = useState(0);
  const [city_error_c, setcity_error_c] = useState(false);
  const [city_page_c, setcity_page_c] = useState(1);
  const [city_search_item_c, setcity_search_item_c] = useState("");
  const [cityc_loaded, setcityc_loaded] = useState(false)
  const [cityc_count, setcityc_count] = useState(1)
  const [cityc_bottom, setcityc_bottom] = useState(103)

  const [by_pincode_f_c, setby_pincode_f_c] = useState(false);
  const [pincode_list_f_c, setpincode_list_f_c] = useState([]);
  const [pincode_f_c, setpincode_f_c] = useState("");
  const [pin_code_error_c, setpin_code_error_c] = useState(false);
  const [pincode_error_f_c, setpincode_error_f_c] = useState(false);
  const [pincode_error2_f_c, setpincode_error2_f_c] = useState(false);
  const [pincode_page_c, setpincode_page_c] = useState(1);
  const [pincode_search_item_c, setpincode_search_item_c] = useState("");
  const [pincode_id_c, setpincode_id_c] = useState(0);
  const [pincode_loaded_f_c, setpincode_loaded_f_c] = useState(false);
  const [pincode_list_error_c, setpincode_list_error_c] = useState(false);
  const [locality_c, setlocality_c] = useState("");
  const [locality_list_s_c, setlocality_list_s_c] = useState([]);
  const [locality_page_c, setlocality_page_c] = useState(1);
  const [localityc_loaded, setlocalityc_loaded] = useState(false)
  const [localityc_count, setlocalityc_count] = useState(1)
  const [localityc_bottom, setlocalityc_bottom] = useState(103)

  const [locality_search_item_c, setlocality_search_item_c] = useState("");
  const [locality_id_f_c, setlocality_id_f_c] = useState(0);
  const [locality_error_c, setlocality_error_c] = useState(false);
  const [locality_error2_c, setlocality_error2_c] = useState(false);
  const [refresh_c, setrefresh_c] = useState(false);

  //Type of Booking
  const [type_of_booking_list, setype_of_booking_list] = useState([
    "Priority",
    "Economy",
  ]);

  const [type_of_booking, settype_of_booking] = useState(
    type_of_booking_list[1]
  );

  //For Booking Date
  const [booking_date, setbooking_date] = useState("");

  //Delivery Mode
  const [delivery_mode_list, setdelivery_mode_list] = useState([]);
  const [delivery_mode, setdelivery_mode] = useState("Door To Door");
  const [booking_through, setbooking_through] = useState(false);
  const [ewaybill_no, setewaybill_no] = useState("");

  //Client
  const [client_list, setclient_list] = useState([]);
  const [client, setclient] = useState("");
  const [client_id, setclient_id] = useState(0);
  const [selectClient, setselectClient] = useState([]);
  const [search_client, setsearch_client] = useState("");
  const [client_page, setclient_page] = useState(1);

  // Clients Commidities Lists
  const [clients_commidities_lists, setclients_commidities_lists] = useState(
    []
  );
  const [client_commidities_list, setclient_commidities_list] = useState([]);

  //Billto
  const [billto_list, setbillto_list] = useState([]);
  const [billto, setbillto] = useState("");
  const [billto_id, setbillto_id] = useState(0);
  const [selectbillto, setselectbillto] = useState([]);
  const [search_billto, setsearch_billto] = useState("");
  const [billto_page, setbillto_page] = useState(1);

  //transport Mode
  const [transport_mode_data_list, settransport_mode_data_list] = useState([
    "Air",
    "Surface",
    "Train",
  ]);
  const [transport_mode, settransport_mode] = useState("");
  // Shipper
  const [customer, setcustomer] = useState([]);

  const [shipper_details, setshipper_details] = useState([]);
  const [shipperdata, setshipperdata] = useState([]);
  const [shipper_list, setshipper_list] = useState([]);
  const [shipper, setshipper] = useState("");
  const [shipper_id, setshipper_id] = useState(null);
  const [shipper_page, setshipper_page] = useState("");
  const [shipper_search_item, setshipper_search_item] = useState("");

  const [shipper_state, setshipper_state] = useState("");
  const [shipper_city, setshipper_city] = useState("");
  const [shipper_pincode, setshipper_pincode] = useState("");
  const [shipper_locality, setshipper_locality] = useState("");
  const [shipper_locality_id, setshipper_locality_id] = useState(0);
  const [shipper_add_1, setshipper_add_1] = useState("");
  const [shipper_add_2, setshipper_add_2] = useState("");
  const [search_shipper, setsearch_shipper] = useState("");
  const [all_shipper_details, setall_shipper_details] = useState([]);
  //consignee
  const [consignee_details, setconsignee_details] = useState([]);
  const [consigneedata, setconsigneedata] = useState([]);
  const [consignee_list, setconsignee_list] = useState([]);
  const [consignee, setconsignee] = useState("");
  const [consignee_locality_id, setconsignee_locality_id] = useState(0);
  const [consignee_id, setconsignee_id] = useState(null);
  const [consignee_page, setconsignee_page] = useState("");
  const [consignee_search_item, setconsignee_search_item] = useState("");
  const [consignee_state, setconsignee_state] = useState("");
  const [consignee_city, setconsignee_city] = useState("");
  const [consignee_pincode, setconsignee_pincode] = useState("");
  const [pincodec_count, setpincodec_count] = useState(1)
  const [pincodec_bottom, setpincodec_bottom] = useState(103)
  const [loadc_pincode, setloadc_pincode] = useState(false)

  const [consignee_locality, setconsignee_locality] = useState("");
  const [consignee_add_1, setconsignee_add_1] = useState("");
  const [consignee_add_2, setconsignee_add_2] = useState("");
  const [search_consignee, setsearch_consignee] = useState("");
  const [all_consignee_details, setall_consignee_details] = useState([]);
  // Asset Info
  const [asset_idlist, setasset_idlist] = useState([]);
  const [assetdeleted_ids, setassetdeleted_ids] = useState([]);
  const [assetold_ids, setassetold_ids] = useState([]);
  const [assetnew_ids, setassetnew_ids] = useState([]);
  const [asset_info_list, setasset_info_list] = useState([
    // "None",
    "With Box",
    "With Logger",
    "With Box + With Logger",
  ]);
  const [asset_info_selected, setasset_info_selected] = useState("");
  const [box, setbox] = useState([]);
  const [logger, setlogger] = useState([]);
  const [both, setboth] = useState([]);

  //Box Type
  const [box_list, setbox_list] = useState([
    "CREDO",
    "VYPE",
    "COOL GUARD",
    "ISGO",
    "SAFE",
  ]);
  const [box_selected, setbox_selected] = useState("");

  //Box Number
  const [box_list_1, setbox_list_1] = useState([]);
  const [box_list_2, setbox_list_2] = useState([]);
  const [box_no_selected, setbox_no_selected] = useState("");
  const [box_selected_id, setbox_selected_id] = useState("");
  const [box_list_page, setbox_list_page] = useState(1);
  const [search_box_list, setsearch_box_list] = useState("");

  //Logger Number
  const [Logger_list, setLogger_list] = useState([]);
  const [Logger_Selected, setLogger_Selected] = useState([]);
  const [Logger_selected_id, setLogger_selected_id] = useState("");
  const [Logger_page, setLogger_page] = useState(1);
  const [search_logger, setsearch_logger] = useState("");

  //Temperature Type
  const [temp_list, settemp_list] = useState([
    "2c-8c",
    "15c-25c",
    "-25c To -15c",
    "Dry Ice",
    "All In One",
  ]);
  const [temp_selected, settemp_selected] = useState("");

  //Commodity
  const [commodity_data_list, setcommodity_data_list] = useState([]);
  const [commodity, setcommodity] = useState("");
  const [commodity_id, setcommodity_id] = useState(0);
  const [commodity_loaded, setcommodity_loaded] = useState(false)
  const [commodity_count, setcommodity_count] = useState(1)
  const [commodity_bottom, setcommodity_bottom] = useState(103)

  const [search_commodity, setsearch_commodity] = useState("");
  const e_acess_token = useSelector((state) => state.eway_bill.e_access_token);
  const b_acess_token = useSelector((state) => state.eway_bill.b_access_token);
  //Transportation cost
  const [transportation_cost, settransportation_cost] = useState("");

  //Actual Weight
  const [actual_weigth, setactual_weigth] = useState("0");

  // Status Info
  const [current_status, setcurrent_status] = useState("");
  console.log("current_status------oo----", current_status);

  //Multi Field List(Packages----)
  const [order_active_btn, setorder_active_btn] = useState("first");

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
  const [caption1, setcaption1] = useState("");

  let dimension_list1 = [selectedFile, caption1];
  const [row1, setrow1] = useState([dimension_list1]);

  const [documentOrder, setdocumentOrder] = useState("");
  let dimension_list3 = [documentOrder, caption1];
  const [row3, setrow3] = useState([["", ""]]);

  // useEffect(() => {
  //   console.log("SelectedFile-----------------", selectedFile);
  // }, [selectedFile]);
  // adding extra input fields in Invoice
  const [invoice_img, setinvoice_img] = useState("");
  const [today, settoday] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_value, setinvoice_value] = useState("");
  const [e_waybill_inv, sete_waybill_inv] = useState("");

  let dimension_list2 = [
    e_waybill_inv,
    today,
    invoice_no,
    invoice_value,
    invoice_img,
  ];
  const [row2, setrow2] = useState([dimension_list2]);
  const [row4, setrow4] = useState([["", "", "", ""]]);

  console.log("dimensionnnnnnnnnnnnnnn listttt", row2);
  //For Calculation Info
  const [cal_type, setcal_type] = useState("");

  //origincity
  const [origincity_list, setorigincity_list] = useState([]);
  const [origincity, setorigincity] = useState("");
  // console.log("origincity----", origincity)
  const [origincity_id, setorigincity_id] = useState(0);
  const [origincity_error, setorigincity_error] = useState(false);
  const [origincity_page, setorigincity_page] = useState(1);
  const [origincity_search_item, setorigincity_search_item] = useState("");

  //destinationcity
  const [destinationcity_list, setdestinationcity_list] = useState([]);
  const [destinationcity, setdestinationcity] = useState("");
  const [destinationcity_id, setdestinationcity_id] = useState(0);
  const [destinationcity_error, setdestinationcity_error] = useState(false);
  const [destinationcity_page, setdestinationcity_page] = useState(1);
  const [destinationcity_search_item, setdestinationcity_search_item] =
    useState("");

  //State
  const [state_list_s, setstate_list_s] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setstate_id] = useState(0);

  //Pincode
  const [pincode_list_s, setpincode_list_s] = useState([]);
  const [pincode_loaded, setpincode_loaded] = useState(false);
  const [pincode, setpincode] = useState("");
  const [by_pincode, setby_pincode] = useState(false);

  // Delivery Info
  const [delivery_info, setdelivery_info] = useState([]);
  const [delivered_date, setdelivered_date] = useState("");
  const [deliverySigFile, setdeliverySigFile] = useState(null);
  const [podSigFile, setpodSigFile] = useState(null);
  const [response_awb_no, setresponse_awb_no] = useState("");

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  const [circle_btn12, setcircle_btn12] = useState(true);
  const toggle_circle12 = () => {
    setcircle_btn12(!circle_btn12);
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

  const [circle_btn_a, setcircle_btn_a] = useState(true);
  const toggle_circle_a = () => {
    setcircle_btn_a(!circle_btn_a);
  };

  const [circle_btn_pod, setcircle_btn_pod] = useState(true);
  const toggle_pod = () => {
    setcircle_btn_pod(!circle_btn_pod);
  };

  const [circle_del_btn, setcircle_del_btn] = useState(true);
  const toggle_circle_del = () => {
    setcircle_del_btn(!circle_del_btn);
  };

  // Error State
  const [transportation_cost_err, settransportation_cost_err] = useState(false);
  const [pincode_error, setpincode_error] = useState(false);
  const [pincode_error2, setpincode_error2] = useState(false);
  // const [delivery_mode_error, setdelivery_mode_error] = useState(false);
  const [client_error, setclient_error] = useState(false);
  const [billto_error, setbillto_error] = useState(false);
  const [transport_mode_error, settransport_mode_error] = useState(false);
  const [order_hist, setorder_hist] = useState();
  const [origin_city_error, setorigin_city_error] = useState(false);
  const [destination_city_error, setdestination_city_error] = useState(false);
  const [shipper_error, setshipper_error] = useState(false);
  const [consignee_error, setconsignee_error] = useState(false);
  const [commodity_error, setcommodity_error] = useState(false);
  const [local_delivery_type_error, setlocal_delivery_type_error] =
    useState(false);
  const [d_cod_error, setd_cod_error] = useState(false);
  const [asset_info_selected_error, setasset_info_selected_error] =
    useState(false);
  const [box_selected_error, setbox_selected_error] = useState(false);
  const [box_no_selected_error, setbox_no_selected_error] = useState(false);
  const [Logger_Selected_error, setLogger_Selected_error] = useState(false);
  const [temp_selected_error, settemp_selected_error] = useState("");
  const [actual_weight_error, setactual_weight_error] = useState("");
  const [showModalOrder, setshowModalOrder] = useState({
    value: false,
    ind: "",
  });
  const [showModalInvoice, setshowModalInvoice] = useState({
    value: false,
    ind: "",
  });

  const [doc_result_image, setdoc_result_image] = useState([]);

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

  // Order Images

  const getOrderImages = () => {
    axios
      .get(
        ServerAddress + `booking/get-order-images/${location.state.order.id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        let data = res.data.Data;
        if (data) {
          let aa = [];
          let aaa = [];

          data?.map((e) => {
            let addImg = [bucket_address + e.image, e.caption, e.id];
            aa.unshift(addImg);
            aaa.unshift(["", "", e.id]);
          });
          setrow1(aa);
          setrow3(aaa);
        }
      })
      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };

  const deleteOrderImg = (item1) => {
    axios
      .delete(ServerAddress + `booking/delete-order-images/${item1[2]}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.message === "Image deleted successfully.") {
          deleteimage(item1);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        // console.log(console.log("err----delete---Order--", err))
      });
  };
  const deleteInvoiceImg = (item2) => {
    axios
      .delete(ServerAddress + `booking/delete-invoice-images/${item2[4]}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        deleteinvoice(item2);
      })
      .catch((err) => {
        // console.log(console.log("err----delete---invoice--", err))
      });
  };

  const getInvoiceImages = () => {
    axios
      .get(
        ServerAddress + `booking/get-invoice-images/${location.state.order.id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        let data = res.data.Data;
        let aa = [];
        data.map((e) => {
          let addImg = [
            bucket_address + e.invoice_image,
            e.invoice_at.split("T")[0],
            e.invoice_no,
            e.invoice_amount,
            e.id,
          ];
          aa.unshift(addImg);
        });
        // setrow2(aa);
      })
      .catch((err) => {
        // console.log("errrrrrrrrrrrrrankit----", err)
      });
  };

  useLayoutEffect(() => {
    if (isupdating && order_active_btn === "second") {
      getOrderImages();
    } else if (isupdating && order_active_btn === "third") {
      getInvoiceImages();
    }
  }, [order_active_btn]);

  const addorderimage = () => {
    setSelectedFile("");
    setcaption1("");
    dimension_list1 = ["", ""];
    setrow1([...row1, dimension_list1]);
    setrow3([...row3, ["", ""]]);
  };
  const deleteimage = (item1) => {
    let temp1 = [...row1];
    let temp3 = [...row3];

    const index1 = temp1.indexOf(item1);

    if (index1 > -1) {
      temp1.splice(index1, 1);
      temp3.splice(index1, 1);
    }

    setrow1(temp1);
    setrow3(temp3);
  };

  // Invoice
  const addinvoice = () => {
    setinvoice_img("");
    settoday("");
    setinvoice_no("");
    setinvoice_value("");
    dimension_list2 = ["", "", "", ""];
    setrow2([...row2, dimension_list2]);
    setrow4([...row4, ["", "", "", ""]]);
  };
  const deleteinvoice = (item2) => {
    let temp2 = [...row2];
    let temp4 = [...row4];
    const index2 = temp2.indexOf(item2);

    if (index2 > -1) {
      temp2.splice(index2, 1);
      temp4.splice(index2, 1);
    }
    setrow2(temp2);
    setrow4(temp4);
  };

  //Logger PDF

  const [logger_pdf, setlogger_pdf] = useState("");
  const [text, settext] = useState("");
  const dimension_list5 = [logger_pdf, text];
  const [row5, setrow5] = useState([dimension_list5]);

  useEffect(() => {
    if (Logger_Selected.length > 0) {
      let temp_log = [];
      for (let index = 0; index < Logger_Selected.length; index++) {
        const element = Logger_Selected[index];
        temp_log.push(["", element[1]]);
      }
      setrow5(temp_log);
    }
  }, [Logger_Selected]);

  const [logger_id_list, setlogger_id_list] = useState([]);
  let log = row.length - 1;
  const addLogger = () => {
    setlogger_pdf("");

    dimension_list = ["", "", "", ""];
    setrow5([...row5, dimension_list5]);
  };

  const deleteLogger = (item) => {
    setlogger_pdf("logger_pdf");

    let temp = [...row5];
    let temp_2 = [...logger_id_list];

    const index = temp.indexOf(item);

    if (index > -1) {
      temp.splice(index, 1);
      temp_2.splice(index, 1);
    }
    setrow5(temp);
    setlogger_id_list(temp_2);
  };

  const [same_as, setsame_as] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [toggle_order, settoggle_order] = useState(false);

  const [linked_order, setlinked_order] = useState("");
  const [order_type_list, setorder_type_list] = useState([
    "Normal",
    "Return",
    "Issue",
  ]);
  const [order_type, setorder_type] = useState(order_type_list[0]);
console.log("booking_through=====", booking_through)
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      ewaybill_no: "",
      consignor_city: "",
      consignor_state: "",
      consignor_pin_code: "",
      consignee_city: "",
      consignee_state: "",
      consignee_pin_code: "",
      total_quantity: order.total_quantity || "0",
      chargeable_weight: order.chargeable_weight || "0",
      e_way_bill_no: order.e_waybill_number || "",
      e_Way_Billpart_two: order.e_waybill_number_part_b || "",
      remarks: order.remarks || "",
      consignor_address_line1: order.shipper_address || "",
      consignor_address_line2: "",
      consignor_phone_no: order.mobile_shipper || "",
      consignee_address_line1: order.consignee_address || "",
      consignee_address_line2: "",
      consignee_phone_no: order.mobile_consignee || "",
    },

    validationSchema: Yup.object({
      total_quantity: Yup.string().required(" Total quantity is required"),
    }),

    onSubmit: (values) => {
      let total_no_of_pieces = 0;
      row.forEach((package_i) => {
        let no_pi = package_i[3];
        total_no_of_pieces += no_pi !== "" ? parseInt(no_pi) : 0;
      });
      // TO Scroll the page
      let doc_no_scroll = window.document.getElementById("doc_no");
      let shipper = window.document.getElementById("shipper");

      if (
        entry_type_btn === "MANUALLY" &&
        docket_no_value.length < 6
        // || (entry_type_btn === "MANUALLY" && docket_no_value.length < 6)
      ) {
        setdocket_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (transport_mode === "" && delivery_type !== "LOCAL") {
        settransport_mode_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (billto === "") {
        setbillto_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (client === "") {
        setclient_error(true);
        doc_no_scroll.scrollIntoView();
      }else if (state === "" && !booking_through) {
        setstate_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (city === "" && !booking_through) {
        setcity_error(true);
        doc_no_scroll.scrollIntoView();
      } else if (pincode === "" && !booking_through) {
        setpincode_list_error(true);
        doc_no_scroll.scrollIntoView();
      }else if (locality === "" && !booking_through) {
        setlocality_error(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (consginee_st === "" && !booking_through) {
        setstate_error_c(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (consginee_c === "" && !booking_through) {
        setcity_error_c(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (consignee_pincode === "" && !booking_through) {
        setpincode_list_error_c(true);
        doc_no_scroll.scrollIntoView();
      }
      else if (locality_c === "" && !booking_through) {
        setlocality_error_c(true);
        doc_no_scroll.scrollIntoView();
      }
      
       else if (commodity === "") {
        setcommodity_error(true);
      } else if (delivery_type === "LOCAL" && local_delivery_type === "") {
        setlocal_delivery_type_error(true);
      } else if (d_cod === "") {
        setd_cod_error(true);
      } else if (
        cal_type === "DIMENSION" &&
        (length === "" || breadth === "" || height === "" || pieces === "")
      ) {
        alert("Please Add Pakage Details");
      } else if (
        (length !== "" || breadth !== "" || height !== "" || pieces !== "") &&
        (length === "" || breadth === "" || height === "" || pieces === "")
      ) {
        alert(
          "Total Number Of Pieces Is Not Equal To Total Number Of Quantity"
        );
      } else if (total_no_of_pieces !== parseInt(values.total_quantity)) {
        alert(
          "Total Number Of Pieces Is Not Equal To Total Number Of Quantity"
        );
      } else if (d_cod === "Yes" && transportation_cost === "") {
        settransportation_cost_err(true);
      } else if (booking_date === "") {
        alert("Please Add Booking Date");
      } else {
        // setShowOrder(!isupdating && true);
        // aa(values)
      isupdating ? update_order(values) : send_order_data(values);
      console.log("hello ji");
      }
    },
  });

  //Barcode Box
  const [box_bq, setbox_bq] = useState("");
  let dimension_list8 = [box_bq];
  const [row6, setrow6] = useState([dimension_list8]);
  console.log("row6--------------------------", row6);
  console.log(
    "validation.values.total_quantity",
    validation.values.total_quantity
  );
  useEffect(() => {
    if (validation.values.total_quantity !== 0) {
      let val = validation.values.total_quantity;
      console.log("val----", val);
      let val_box = [];
      for (let index = 0; index < val; index++) {
        console.log("val--------", index);
        // const element = val[index];
        // console.log("element----", element)
        val_box.push([""]);
      }
      setrow6(val_box);
    }
  }, [validation.values.total_quantity]);

  // Get Packages
  const get_packages = () => {
    let temp = [];
    let temp_list = [];
    let temp_list2 = [];
    axios
      .get(ServerAddress + "booking/get-packages/?order_id=" + order_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        temp = response.data;
        // console.log("temp---------", temp);

        if (response.data.length !== 0) {
          for (let index = 0; index < response.data.length; index++) {
            temp_list.push([
              temp[index].length,
              temp[index].breadth,
              temp[index].height,
              temp[index].no_of_pieces,
              temp[index].id,
            ]);
            temp_list2.push(temp[index].id);
          }

          setrow(temp_list);
          setlength(temp_list[0][0]);
          setbreadth(temp_list[0][1]);
          setheight(temp_list[0][2]);
          setpieces(temp_list[0][3]);
          setpackage_id_list(temp_list2);
          setpackages_id(temp_list2);
        } else {
          setrow([["", "", "", ""]]);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting data  Data ${error}`);
      });
  };

  // Delivery List
  // const delivery_list = () => {
  //   if (delivery_type === "LOCAL") {
  //     setdelivery_mode_list(["Door To Door"]);
  //     setdelivery_mode("Door To Door");
  //   } else {
  //     setdelivery_mode_list(["Door To Door", "Airport To AirPort"]);
  //     setdelivery_mode("Door To Door");
  //   }
  // };

  // Get destination city
  const getDes_Cities = (place_id, filter_by) => {
    // let cities_list = [...origincity_list];
    let dcities_list = [...destinationcity_list];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${destinationcity_page}&records=${10}&city_search=${destinationcity_search_item}` +
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
          // if (origincity_page == 1) {
          //   cities_list = resp.data.results.map((v) => [
          //     v.id,
          //     toTitleCase(v.city),
          //   ]);
          // } else {
          //   cities_list = [
          //     ...origincity_list,
          //     ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
          //   ];
          // }

          if (destinationcity_page == 1) {
            dcities_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.city),
            ]);
          } else {
            dcities_list = [
              ...destinationcity_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
            ];
          }
          // cities_list = [...new Set(cities_list.map((v) => `${v}`))].map((v) =>
          //   v.split(",")
          // );
          dcities_list = [...new Set(dcities_list.map((v) => `${v}`))].map(
            (v) => v.split(",")
          );
          // setorigincity_list(cities_list);
          setdestinationcity_list(dcities_list);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get City, ${err}`);
      });
  };

  const check_ewb_attached = (ewb_no) => {
    axios
      .get(ServerAddress + "analytic/check_exits_eway/?ewb_no=" + ewb_no, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log("exitssssss or notttttt", response.data.result);
        if (response.data.result === true) {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`${ewb_no} Is Already Attached To Some Docket`)
          );
          dispatch(setAlertType("danger"));
        } else {
          get_eway_detail(ewb_no);
        }
      })
      .catch((error) => {
        alert(`Error Happen while Getting data  Data ${error}`);
      });
  };

  // useLayoutEffect(() => {
  //   check_ewb_attached();
  // }, [])
  // Get Client Shipper & Consignee
  const get_client_shipper = (client_id, origin_id) => {
    let shipperlist = [];
    axios
      .get(
        ServerAddress +
        `master/get_client_shipperconsignee/?client_id=${client_id}&city_id=${origin_id}&p=${shipper_page}&records=${10}&name_search=${shipper_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setshipperdata(response.data.results);
        shipperlist = response.data.results.map((v) => [
          v.id,
          toTitleCase(v.name),
        ]);
        setshipper_list(shipperlist);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  const get_client_consignee = (client_id, destination_id) => {
    let consigneelist = [];
    axios
      .get(
        ServerAddress +
        `master/get_client_shipperconsignee/?client_id=${client_id}&city_id=${destination_id}&p=${consignee_page}&records=${10}&name_search=${consignee_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setconsigneedata(response.data.results);
        consigneelist = response.data.results.map((v) => [
          v.id,
          toTitleCase(v.name),
        ]);
        setconsignee_list(consigneelist);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  // Get Order Delivery Data
  // const getorder_delivery_data = (order_id) => {
  //   axios
  //     .get(
  //       ServerAddress +
  //       "booking/get_delivery_info/?order_id=" +
  //       order_id,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("response-----del----", response.data)
  //       // setdelivery_info(response.data[0]);
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur while Order Delivery Info, ${err}`);
  //     });
  // };

  //Post Order Image
  const send_order_image = (awb) => {
    let newrow3 = row3.filter((e) => e[0] !== "" && e[1] !== "");
    const docket_imageform = new FormData();
    if (newrow3.length !== 0) {
      docket_imageform.append(`awb_no`, awb);
      docket_imageform.append(
        "docketcount",
        newrow3[0][0] !== "" ? newrow3.length : 0
      );
      if (newrow3.length !== 0 && newrow3[0][0] !== "") {
        for (let index = 0; index < newrow3.length; index++) {
          // docket_imageform.append("docketcount", row3[0][0] !== "" ? row3.length : 0);
          // if (row3.length !== 0 && row3[0][0] !== "") {
          //   for (let index = 0; index < row3.length; index++) {

          docket_imageform.append(
            `DocketImage${index}`,
            newrow3[index][0],
            newrow3[index][0]?.name
          );
          docket_imageform.append(
            `DocketImageCaption${index}`,
            newrow3[index][1]
          );
          docket_imageform.append(`id`, 0);
        }
      }

      docket_imageform.append(
        "invoice_count",
        row4[0][0] !== "" ? row4.length : 0
      );
      if (row4.length !== 0 && row4[0][0] !== "") {
        for (let index = 0; index < row4.length; index++) {
          docket_imageform.append(
            `InvoiceImage${index}`,
            row4[index][0],
            row4[index][0]?.nane
          );
          docket_imageform.append(`invoice_date${index}`, row4[index][1]);
          docket_imageform.append(`invoice_no${index}`, row4[index][2]);
          docket_imageform.append(`invoice_amount${index}`, row4[index][3]);
        }
      }

      console.log("docket_imageform----------", row4.length);
      axios
        .post(ServerAddress + "booking/add-order-images/", docket_imageform, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log("Order Image Response1111", res.data);
          if (res.data.Data === "Done") {
            // successMSg();
            alert(`Your Docket Image Saved Successfully`);
            // wipe_data();
            // setvisible(false);
          } else {
            // console.log("Ankkiii");
          }
        })
        .catch((err) => { });
    }
  };

  // Post Order Data
  const send_order_data = (values) => {
    axios
      .post(
        ServerAddress + "booking/add_order/",
        {
          docket_no: entry_type_btn === "AUTO GENERATE" ? "" : docket_no_value,
          entry_type: entry_type_btn,
          delivery_type: String(delivery_type).toUpperCase(),
          order_created_branch: user.home_branch,
          transportation_mode:
            delivery_type === "LOCAL"
              ? "LOCAL"
              : String(transport_mode).toUpperCase(),
          // delivery_mode: delivery_type === "LOCAL" ? "LOCAL" : String(delivery_mode).toUpperCase(),
          delivery_mode: "DOOR TO DOOR",
          order_channel: "WEB APP",
          billto: billto_id,
          client: client_id,
          shipper: eway_confirm ? eway_list.fromTrdName : shipper_n,
          consignee: eway_confirm ? eway_list.toTrdName : consignee_n,
          booking_at: booking_date,
          local_delivery_type: String(local_delivery_type).toUpperCase(),
          cold_chain: cold_chain ? true : false,
          actual_weight: actual_weigth,
          total_quantity: values.total_quantity,
          cod: String(d_cod).toUpperCase(),
          transportation_cost: d_cod === "Yes" ? transportation_cost : null,
          remarks: values.remarks,
          created_by: user.id,
          booking_type: String(type_of_booking).toUpperCase(),
          commodity: commodity_id,
          packageList: row,
          InvoiceList: [],
          notification: true,
          asset_type: asset_prov
            ? String(asset_info_selected).toUpperCase()
            : "NONE",
          asset:
            asset_info_selected === "With Box" &&
              asset_info_selected !== "None" &&
              cold_chain
              ? box
              : asset_info_selected === "With Logger" &&
                asset_info_selected !== "None" &&
                cold_chain
                ? logger
                : asset_info_selected === "With Box + With Logger" &&
                  asset_info_selected !== "None" &&
                  cold_chain
                  ? both
                  : [],
          current_branch: home_branch_id,
          client_name: client.toUpperCase(),
          branch_name: user.branch_nm ? user.branch_nm : "BRANCH NOT SET",
          shipper_name: shipper.toUpperCase(),
          consignee_name: consignee.toUpperCase(),
          commodity_name: commodity.toUpperCase(),
          shipper_address: shipper_add_1.toUpperCase(),
          shipper_location: eway_confirm ? locality_id : locality_id_f,
          consignee_location: eway_confirm ? locality_id_to : locality_id_f_c,
          with_ewayBill: eway_confirm ? "True" : "False",
          eway_bill_no: ewaybill_no,
          consignee_address1: eway_confirm
            ? eway_list.toAddr1.toUpperCase() +
            "," +
            eway_list.toAddr2.toUpperCase()
            : consignee_address.toUpperCase(),
          shipper_address1: eway_confirm
            ? eway_list.fromAddr1.toUpperCase() + "," + eway_list.fromAddr2
            : shipper_address.toUpperCase(),

          billto_name: billto.toUpperCase(),
          consignee_address: consignee_add_1.toUpperCase(),
          order_origin: all_shipper_details.toUpperCase(),
          order_destination: all_consignee_details.toUpperCase(),
          origin_city: origincity.toUpperCase(),
          origin_state: shipper_state.toUpperCase(),
          origin_pincode: shipper_pincode,
          origin_locality: shipper_locality,
          destination_city: destinationcity,
          destination_state: consignee_state.toUpperCase(),
          destination_pincode: consignee_pincode,
          destination_locality: consignee_locality,
          billto_name: billto.toUpperCase(),
          eway_detail: eway_confirm ? eway_detail_l : null,
          is_docket_entry: user.is_docket_entry ? user.is_docket_entry : false,
          starting_docket_no: user.starting_docket_no
            ? user.starting_docket_no
            : "",
          barcode_no: row6,
          linked_order: order_type === "Normal" ? null : linked_order,
          order_type: order_type === "Normal" ? null : order_type.toUpperCase(),

          cm_current_department: user.user_department,
          cm_current_status:
            user.user_department_name + " " + user.designation_name ===
              "DATA ENTRY OPERATOR" ||
              user.user_department_name + " " + user.designation_name ===
              "CUSTOMER SERVICE EXECUTIVE"
              ? "NOT APPROVED"
              : cm_current_status.toUpperCase(),
          cm_transit_status:
            user.user_department_name + " " + user.designation_name ===
              "DATA ENTRY OPERATOR" ||
              user.user_department_name + " " + user.designation_name ===
              "CUSTOMER SERVICE EXECUTIVE"
              ? "NOT APPROVED"
              : cm_current_status.toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          // console.log("///////Harshiiiiiiiiittttttttt",response.data)
          eway_confirm && update_ewayBill(response.data.docket_no, response.data.eway_bill_no)
          if (row3[0][0] !== "" || row4[0][0] !== "") {
            send_order_image(response.data.data.docket_no);
          }
          dispatch(setToggle(true));
          setsubmit_btn(true);
          setresponse_awb_no(response.data.awb_no);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Order  ${docket_no_value} Added sucessfully`));
          dispatch(setAlertType("success"));
          setShowOrder(true);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Order  Data ${error}`);
      });
  };
  // Update Order
  const update_order = (values) => {
    let id = order.id;

    let fields_names = Object.entries({
      actual_weight: actual_weigth,
      asset_type: asset_info_selected,
      billto_name: billto,
      // booking_at: booking_date,
      booking_type: type_of_booking,
      branch_name: user.branch_nm,
      client_name: client,
      // chargeable_weight: values.branch_phone_number,
      cod: d_cod,
      cold_chain: cold_chain,
      commodity_name: commodity,
      consignee_address_line: consignee_address, //
      consignee_city: destinationcity,
      consignee_locality: locality_c,
      consignee_name: consignee_n,
      consignee_pincode: consignee_pincode,
      // delivery_mode: delivery_mode,
      delivery_type: delivery_type.toUpperCase(),
      entry_type: entry_type_btn,

      local_delivery_type: local_delivery_type,
      remarks: values.remarks,

      shipper_address_line: shipper_address,
      shipper_city: origincity,
      shipper_locality: shipper_locality,
      shipper_name: shipper_n,
      shipper_pincode: shipper_pincode,
      shipper_state: shipper_state,
      total_quantity: values.total_quantity,
      transportation_mode: transport_mode,

      // billto_name: billto,
    });
    console.log("fields_names----============", fields_names);
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
        ServerAddress + "booking/update_order/" + id,
        {
          change_fields: change_fields,
          docket_no: docket_no_value,
          entry_type: entry_type_btn,
          delivery_type: String(delivery_type).toUpperCase(),
          order_created_branch: user.home_branch,
          transportation_mode:
            delivery_type === "LOCAL"
              ? "LOCAL"
              : String(transport_mode).toUpperCase(),
          // delivery_mode: delivery_type === "LOCAL" ? "LOCAL" : String(delivery_mode).toUpperCase(),
          delivery_mode: "DOOR TO DOOR",
          order_channel: "WEB APP",
          billto: billto_id,
          client: client_id,
          // shipper: eway_confirm ? eway_list.fromTrdName : shipper_n,
          // consignee: eway_confirm ?eway_list.,
          booking_at: booking_date,
          local_delivery_type: String(local_delivery_type).toUpperCase(),
          cold_chain: cold_chain,
          actual_weight: actual_weigth,
          total_quantity: values.total_quantity,
          cod: String(d_cod).toUpperCase(),
          transportation_cost: d_cod === "Yes" ? transportation_cost : null,
          remarks: values.remarks,
          modified_by: user.id,
          booking_type: String(type_of_booking).toUpperCase(),
          commodity: commodity_id,
          packageList: row,
          deleted_packages: deleted_packages_id,
          InvoiceList: [],
          notification: true,
          asset_type:
            cold_chain === true && asset_prov
              ? String(asset_info_selected).toUpperCase()
              : "NONE",
          asset:
            asset_info_selected === "With Box" &&
              asset_info_selected !== "None" &&
              cold_chain
              ? box
              : asset_info_selected === "With Logger" &&
                asset_info_selected !== "None" &&
                cold_chain
                ? logger
                : asset_info_selected === "With Box + With Logger" &&
                  asset_info_selected !== "None" &&
                  cold_chain
                  ? both
                  : [],

          client_name: client.toUpperCase(),
          branch_name: user.branch_nm ? user.branch_nm : "BRANCH NOT SET",
          shipper_name: shipper_n.toUpperCase(),
          consignee_name: consignee_n.toUpperCase(),
          commodity_name: commodity.toUpperCase(),
          shipper_address: shipper_address.toUpperCase(),
          consignee_address: consignee_address.toUpperCase(),
          order_origin: all_shipper_details.toUpperCase(),
          order_destination: all_consignee_details.toUpperCase(),
          origin_city: origincity.toUpperCase(),
          origin_state: shipper_state.toUpperCase(),
          origin_pincode: shipper_pincode.toUpperCase(),
          origin_locality: shipper_locality.toUpperCase(),
          destination_city: destinationcity.toUpperCase(),
          destination_state: consignee_state.toUpperCase(),
          destination_pincode: consignee_pincode.toUpperCase(),
          destination_locality: consignee_locality.toUpperCase(),
          billto_name: billto.toUpperCase(),
          shipper_location: shipper_locality_id,
          consignee_location: consignee_locality_id,
          assetdeleted_ids: assetdeleted_ids,
          assetold_ids: assetold_ids,
          assetnew_ids: assetnew_ids,
          linked_order: order_type === "Normal" ? null : linked_order,
          order_type: order_type === "Normal" ? null : order_type.toUpperCase(),

          cm_transit_status: status_toggle === true ? cm_current_status : "",
          cm_current_status: cm_current_status.toUpperCase(),
          cm_remarks: toTitleCase(message).toUpperCase(),
          shipper: eway_confirm ? eway_list.fromTrdName : shipper_n,
          consignee: eway_confirm ? eway_list.shipToTradeName : consignee_n,
          shipper_location: eway_confirm ? locality_id : locality_id_f,
          consignee_location: eway_confirm ? locality_id_to : locality_id_f_c,
          with_ewayBill: eway_confirm ? "True" : "False",
          eway_bill_no: ewaybill_no,
          consignee_address1: consignee_address.toUpperCase(),
          shipper_address1: shipper_address.toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          send_order_image(order.docket_no);
          dispatch(setToggle(true));
          dispatch(setDataExist(`Order Updated Sucessfully`));
          dispatch(setAlertType("info"));
          dispatch(setShowAlert(true));
          navigate("/booking/orders");
        }
      })
      .catch(function () {
        alert(" Error While  Updateing Orders");
      });
  };

  const [clientdata, setclientdata] = useState([]);
  const [data, setdata] = useState(false);

  const getBillto = () => {
    let b_temp2 = [...billto_list];
    let b_data = [];
    axios
      .get(
        ServerAddress +
        `master/all_billtoes/?search=${""}&p=${billto_page}&records=${10}&name_search=${search_billto}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        b_data = response.data.results;
        for (let index = 0; index < b_data.length; index++) {
          b_temp2.push([b_data[index].id, toTitleCase(b_data[index].name)]);
        }
        b_temp2 = [...new Set(b_temp2.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setbillto_list(b_temp2);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const getClient = () => {
    let temp2 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_clients/?bill_to=${billto_id}&search=${""}&p=${client_page}&records=${10}&name_search=${search_client}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;

        console.log("clients data", data);

        let com_list_cl = data.map((v) => [v.id, v.commodities]);
        console.log("com_list_cl", com_list_cl);
        setclients_commidities_lists(com_list_cl);
        for (let index = 0; index < data.length; index++) {
          temp2.push([data[index].id, toTitleCase(data[index].name)]);
        }
        temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
        setclient_list(temp2);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Get Commodity
  const getCommidityData = () => {
    let data = [];
    let temp3 = [...commodity_data_list];
    axios
      .get(
        ServerAddress +
        `master/all_commodities/?search=${""}&p=${page}&records=${10}&commodity_type=${[
          "",
        ]}&commodity_name=${[
          "",
        ]}&commodity_name_search=${search_commodity}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          if (response.data.next === null) {
            setcommodity_loaded(false);
          } else {
            setcommodity_loaded(true);
          }
          data = response.data.results;
          console.log("data-------", data);
          for (let index = 0; index < data.length; index++) {
            temp3.push([
              data[index].id,
              toTitleCase(data[index].commodity_name),
            ]);
          }
          temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          setcommodity_count(commodity_count + 2);
          setcommodity_data_list(temp3);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Get Order Assets
  const get_orderasset = (order_id, box, logger) => {
    axios
      .get(
        ServerAddress +
        `master/get_orderasset/?order_id=${order_id}&p=1&records=10`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        let temp = [];
        let temp2 = [];
        let deleted_id = [];
        for (let index = 0; index < response.data.results.length; index++) {
          const order_asset = response.data.results[index];
          if (order_asset.asset_type === "TEMPERATURE CONTROL BOX") {
            temp.push([
              order_asset.asset,
              order_asset.asset_id +
              "-" +
              order_asset.box_type +
              "-" +
              order_asset.product_id,
            ]);
            deleted_id.push(order_asset.asset);
          } else {
            temp2.push([
              order_asset.asset,
              order_asset.asset_id +
              "-" +
              order_asset.box_type +
              "-" +
              order_asset.manufacturer_name,
            ]);
            deleted_id.push(order_asset.asset);
          }
        }
        setasset_idlist(deleted_id);
        setbox_list_2(temp);
        setLogger_Selected(temp2);
        let temp3 = [];
        let other_boxes = [];
        let temp4 = [];
        let other_logger = [];

        //Box
        for (let index = 0; index < temp.length; index++) {
          const element2 = temp[index][1];
          temp3.push(element2);
        }

        for (let index = 0; index < box.length; index++) {
          const element = box[index][1];
          if (temp3.includes(element) === false) {
            other_boxes.push(box[index]);
          }
        }

        //Logger
        for (let index = 0; index < temp2.length; index++) {
          const element2 = temp2[index][1];
          temp4.push(element2);
        }

        for (let index = 0; index < logger.length; index++) {
          const element = logger[index][1];
          if (temp4.includes(element) === false) {
            other_logger.push(logger[index]);
          }
        }
        setbox_list_1(other_boxes);
        setLogger_list(other_logger);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  //  Get Asset Details
  const getassetData = () => {
    let data = [];
    let box = [...box_list_1];
    let logger = [...Logger_list];

    axios
      .get(
        ServerAddress +
        `master/get_asset_details/?p=${asset_info_selected === "With Logger" ? Logger_page : box_list_page
        }&records=${10}&asset_type=${String(
          asset_info_selected
        ).toUpperCase()}&product_id_search=${search_logger}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.asset_type === "TEMPERATURE CONTROL BOX") {
            box.push([
              element.id,
              element.asset_id +
              "-" +
              element.box_type +
              "-" +
              element.product_id,
            ]);
          } else {
            logger.push([
              element.id,
              element.asset_id +
              "-" +
              element.box_type +
              "-" +
              element.manufacturer_name,
            ]);
          }
        }
        logger = [...new Set(logger.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        box = [...new Set(box.map((v) => `${v}`))].map((v) => v.split(","));
        setbox_list_1(box);
        setLogger_list(logger);
        if (isupdating && order_id !== "") {
          get_orderasset(order_id, box, logger);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/booking/orders");
  };

  // Type Of Booking
  const booking_type = () => {
    if (cold_chain === true) {
      settype_of_booking(type_of_booking_list[0]);
    } else {
      settype_of_booking(type_of_booking_list[1]);
    }
  };

  useEffect(() => {
    let date = new Date();
    let added_date_time =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());
    let month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    let year = String(date.getFullYear());

    let hour =
      String(date.getHours()).length === 1
        ? "0" + String(date.getHours())
        : String(date.getHours());
    let minutes =
      String(date.getMinutes()).length === 1
        ? "0" + String(date.getMinutes())
        : date.getMinutes();
    setbooking_date(`${year}-${month}-${added_date_time}T${hour}:${minutes}`);
  }, []);

  useEffect(() => {
    booking_type();
  }, [cold_chain]);

  useLayoutEffect(() => {
    if (asset_info_selected !== "None" && asset_info_selected) {
      getassetData();
    }
  }, [asset_info_selected, search_logger, search_box_list, box_list_page]);

  useEffect(() => {
    getBillto();
  }, [billto_page, search_billto]);

  useEffect(() => {
    // setdata(false);
    if (billto_id !== 0) {
      getClient();
    }
  }, [billto_id, search_client, client_page]);

  useEffect(() => {
    if (billto_id !== 0) {
      if (!isupdating && returned_data.length === 0) {
        setclient("");
        setclient_id("");
      }
    }
  }, [billto_id]);

  useEffect(() => {
    getCommidityData();
  }, [page, search_commodity]);

  useEffect(() => {
    if (order_id !== "") {
      get_packages();
    }
  }, [order_id]);

  useEffect(() => {
    if (data === true && isupdating === true && returned_data.length === 0) {
      setclient_id(order.client);
    }
    if (location.state === null && order_type == "Normal") {
      setorigincity("");
      setorigincity_id("");
      setshipper_id("");
      setdestinationcity("");
      setdestinationcity_id("");
      setconsignee_id("");
    }
    // Setting Client Commidities After Selecting Client
    if (client_id != 0 && clients_commidities_lists.length !== 0) {
      let sel_com = clients_commidities_lists.find((v) => v[0] == client_id)[1];
      console.log("commodity_data_list", commodity_data_list);
      console.log("sel_com", sel_com);
      let tmp_com_data_list = commodity_data_list.filter((v) =>
        sel_com.includes(parseInt(v[0]))
      );

      console.log("tmp_com_data_list", tmp_com_data_list);
      setclient_commidities_list(tmp_com_data_list);
    }
  }, [client_id, data, clients_commidities_lists]);

  useEffect(() => {
    setcustomer([]);
    let temp = [];
    selectClient.map((value) => {
      temp.push([value.id, value.name]);
      setcustomer(temp);
    });
  }, [selectClient]);

  useLayoutEffect(() => {
    if (shipper_id !== "") {
      let selected_shipper = shipperdata.filter(
        (value) => value.id === shipper_id
      );
      setshipper_details(selected_shipper[0]);
    }
  }, [shipper_id, shipperdata]);

  useEffect(() => {
    let selected_consignee = consigneedata.filter(
      (val) => val.id === consignee_id
    );
    setconsignee_details(selected_consignee[0]);
  }, [consignee_id, consigneedata]);

  // useLayoutEffect(() => {
  //   if (shipper_details) {
  //     setshipper_state(toTitleCase(shipper_details.state_name));
  //     setshipper_city(toTitleCase(shipper_details.city_name));
  //     setshipper_pincode(toTitleCase(shipper_details.pincode_name));
  //     setshipper_add_1(toTitleCase(shipper_details.address_line1));
  //     setshipper_locality(toTitleCase(shipper_details.locality_name));
  //     setshipper_locality_id(shipper_details.location);
  //   }
  // }, [shipper_details, shipper_id]);

  // useLayoutEffect(() => {
  //   console.log("consignee_details========", consignee_details)
  //   if (consignee_details) {
  //     setconsignee_state(toTitleCase(consignee_details.state_name));
  //     setconsignee_city(toTitleCase(consignee_details.city_name));
  //     setconsignee_pincode(toTitleCase(consignee_details.pincode_name));
  //     setconsignee_add_1(toTitleCase(consignee_details.address_line1));
  //     setconsignee_locality(toTitleCase(consignee_details.locality_name));
  //     setconsignee_locality_id(consignee_details.location);
  //   }
  // }, [consignee_details,consignee_id]);

  useEffect(() => {
    if (location.state === null && returned_data.length === 0) {
      setshipper("");
      setshipper_state("");
      setshipper_city("");
      setshipper_pincode("");
      setshipper_add_1("");
      setshipper_add_2("");
      setconsignee("");
      setconsignee_state("");
      setconsignee_city("");
      setconsignee_pincode("");
      setconsignee_add_1("");
      setconsignee_add_2("");
    }
  }, [client_id]);

  useEffect(() => {
    let date = new Date();
    let date_n =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());
    let month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    settoday(`${year}-${month}-${date_n}`);
  }, []);

  // useEffect(() => {
  //   if(isupdating && order.is_delivered)
  //   {
  //     getorder_delivery_data(order.id);
  //   }
  // }, [isupdating,order]);

  useLayoutEffect(() => {
    try {
      let order_data = location.state.order;
      setshipper_n(order_data.shipper);
      setorder_type(toTitleCase(order_data.order_type));
      setlinked_order(
        order_data.order_type === "RETURN" || order_data.order_type === "ISSUE"
          ? order_data.linked_order_value
          : ""
      );

      setstate(order_data.shipper_state);
      setlocality_id_f(order_data.shipper_location);
      setcity(order_data.shipper_city);
      setconsignee_n(order_data.consignee);
      setpincode(order_data.shipper_pincode);
      setconsginee_st(order_data.consignee_state);
      setlocality_sel_to(order_data.consignee_locality);
      setlocality_id_to(order_data.consignee_location);
      setlocality_sel(order_data.shipper_locality);
      setlocality_id(order_data.shipper_location);
      setconsignee_address(order_data.consignee_address1);
      setconsginee_c(order_data.consignee_city);
      setconsignee_pincode(order_data.consignee_pincode);
      setlocality_c(order_data.consignee_locality);
      setlocality_id_f_c(order_data.consignee_location);
      setlocality(order_data.shipper_locality);
      setshipper_address(order_data.shipper_address1);
      setewaybill_no(order_data.eway_bill_no);
      setbooking_through(order_data.with_ewayBill);
      seteway_confirm(order_data.with_ewayBill);
      seteway_detail_l(order_data);
      // seteway_confirm(order_data)
      if (location.state.hash) {
        sethash(location.state.hash);
        let hsh = location.state.hash;
        if (hsh === "images") {
          setorder_active_btn("second");
        }
      }
      setorder(location.state.order);
      setcurrent_status(order_data.current_status);
      setdocket_no_value(order_data.docket_no);
      setisupdating(true);
      setorder_id(order_data.id);
      setdocket_no_value(order_data.docket_no);
      dispatch(setCurOrderId(order_data.id));
      dispatch(setCurOrderDocketNo(order_data.docket_no));
      settype_of_booking(toTitleCase(order_data.booking_type));
      settransport_mode(toTitleCase(order_data.transportation_mode));
      // setdelivery_mode(order_data.delivery_mode);
      settransportation_cost(order_data.transportation_cost);

      setcommodity(order_data.commodity_name);
      setcommodity_id(order.commodity);
      setd_cod(toTitleCase(order_data.cod));
      if (order_data.cod === "Yes") {
        settransportation_cost(order_data.transportation_cost);
      }
      setcold_chain(order_data.cold_chain);
      setdelivery_type(order_data.delivery_type);
      setentry_type_btn(order_data.entry_type);
      setactual_weigth(order_data.actual_weight);
      setcommodity(toTitleCase(order_data.commodity_name));
      setclient(toTitleCase(order_data.client_name));
      setclient_id(order_data.client);
      setbillto(toTitleCase(order_data.billto_name));
      setbillto_id(order_data.billto);
      // setclient_id(order_data.client)
      setshipper(toTitleCase(order_data.shipper_name));
      setshipper_id(order_data.shipper);
      setshipper_state(toTitleCase(order_data.shipper_state));
      setshipper_city(toTitleCase(order_data.shipper_city));
      setshipper_pincode(order_data.shipper_pincode);
      setshipper_add_2(toTitleCase(order_data.shipper_address_line_2));
      setorigincity(toTitleCase(order_data.shipper_city));
      setorigincity_id(toTitleCase(order_data.shipper_city_id));
      setshipper_locality(toTitleCase(order_data.shipper_locality));

      setconsignee(toTitleCase(order_data.consignee_name));
      setconsignee_id(order_data.consignee);
      setconsignee_state(toTitleCase(order_data.consignee_state));
      setconsignee_city(toTitleCase(order_data.consignee_city));
      setconsignee_pincode(order_data.consignee_pincode);
      setconsignee_add_1(toTitleCase(order_data.consignee_address_line));
      setconsignee_locality(toTitleCase(order_data.consignee_locality));
      setconsignee_add_2(toTitleCase(order_data.consignee_address_line_2));
      setlocal_delivery_type(toTitleCase(order_data.local_delivery_type));
      setasset_info_selected(toTitleCase(order_data.asset_type));
      if (order_data.asset_type === "NONE") {
        setasset_prov(false);
      } else {
        setasset_prov(true);
      }
      setcal_type(order_data.local_cal_type);

      setshipper_add_1(toTitleCase(order_data.shipper_address_line));
      setdestinationcity(toTitleCase(order_data.consignee_city));
      setdestinationcity_id(toTitleCase(order_data.consignee_city_id));
    } catch (error) { }
  }, []);

  useEffect(() => {
    if (asset_info_selected === "With Box") {
      let box = box_list_2.map((data) => data[0]);
      setbox(box);
    } else if (asset_info_selected === "With Logger") {
      let logger = Logger_Selected.map((data) => data[0]);
      setlogger(logger);
    }
  }, [box_list_2, Logger_Selected, Logger_list, box_list_1]);

  useEffect(() => {
    if (asset_info_selected === "With Box + With Logger") {
      let box = box_list_2.map((data) => data[0]);
      let logger = Logger_Selected.map((data) => data[0]);

      let final = box.concat(logger);
      setboth(final);
    }
  }, [
    asset_info_selected,
    Logger_Selected,
    box_list_2,
    Logger_list,
    box_list_1,
  ]);

  useEffect(() => {
    setall_shipper_details(
      shipper_state + "," + shipper_city + "," + shipper_pincode
    );
  }, [shipper_state, shipper_city, shipper_pincode]);

  useEffect(() => {
    setall_consignee_details(
      consignee_state + "," + consignee_city + "," + consignee_pincode
    );
  }, [consignee_state, consignee_city, consignee_pincode]);

  useEffect(() => {
    if (box !== [] && asset_info_selected === "With Box") {
      let item = asset_idlist.filter((p) => box.indexOf(p) == -1);
      setassetdeleted_ids(item);
      let item2 = asset_idlist.filter((p) => box.indexOf(p) !== -1);
      setassetold_ids(item2);
      let item3 = box.filter((a) => asset_idlist.indexOf(a) == -1);
      setassetnew_ids(item3);
    } else if (logger !== [] && asset_info_selected === "With Logger") {
      let item = asset_idlist.filter((p) => logger.indexOf(p) == -1);
      setassetdeleted_ids(item);
      let item2 = asset_idlist.filter((p) => logger.indexOf(p) !== -1);
      setassetold_ids(item2);
      let item3 = logger.filter((a) => asset_idlist.indexOf(a) == -1);
      setassetnew_ids(item3);
    } else {
      let item = asset_idlist.filter((p) => both.indexOf(p) == -1);
      setassetdeleted_ids(item);
      let item2 = asset_idlist.filter((p) => both.indexOf(p) !== -1);
      setassetold_ids(item2);
      let item3 = both.filter((a) => asset_idlist.indexOf(a) == -1);
      setassetnew_ids(item3);
    }
  }, [asset_idlist, box, logger, both]);

  useEffect(() => {
    if (package_id_list !== "") {
      let id_list = packages_id.filter(
        (p) => package_id_list.indexOf(p) === -1
      );
      setdeleted_packages_id(id_list);
    }
  }, [package_id_list, packages_id]);

  const [ewaybill, setewaybill] = useState(false);

  // useLayoutEffect(() => {
  //   getCities("all", "all");
  // }, [origincity_page, origincity_search_item]);

  useLayoutEffect(() => {
    getDes_Cities("all", "all");
  }, [destinationcity_page, destinationcity_search_item]);

  useEffect(() => {
    if (client_id && origincity_id) {
      get_client_shipper(client_id, origincity_id);
    }
  }, [client_id, origincity_id, shipper_page, shipper_search_item]);

  useEffect(() => {
    if (client_id && destinationcity_id) {
      get_client_consignee(client_id, destinationcity_id);
    }
  }, [client_id, destinationcity_id, consignee_page, consignee_search_item]);

  // useLayoutEffect(() => {
  //   if (!isupdating) {
  //     if (delivery_type === "DOMESTIC") {
  //       settransport_mode_data_list(["Air", "Surface", "Train"]);
  //     } else {
  //       settransport_mode_data_list(["Local"]);
  //     }
  //     settransport_mode("");
  //   }
  // }, [delivery_type]);

  //Cold chain
  // const [cold_chain, setcold_chain] = useState(false);
  // const [nonecold_chain, setnonecold_chain] = useState(true)
  // const [cod_list, setcod_list] = useState(["Yes", "No"]);

  // useEffect(() => {
  //   if(nonecold_chain){
  //    setcold_chain(false)
  //   }
  //  }, [nonecold_chain])

  //  useEffect(() => {
  //    if(cold_chain){
  //    setnonecold_chain(false)
  //   }
  //  }, [cold_chain])

  //  useLayoutEffect(() => {
  //   if(cold_chain){
  //     setnonecold_chain(false)
  //   }
  //   else{
  //     setnonecold_chain(true)
  //   }
  //  }, [cold_chain])

  useEffect(() => {
    if (location.state !== null || returned_data.length !== 0) {
      if (cold_chain) {
        setcold_chain(true);
        setnonecold_chain(false);
      } else {
        setnonecold_chain(true);
        setcold_chain(false);
      }
    }
  }, [cold_chain, returned_data]);

  useEffect(() => {
    if (cold_chain && location.state === null && returned_data.length === 0) {
      setcold_chain(true);
      setnonecold_chain(false);
    }
  }, [cold_chain]);

  useEffect(() => {
    if (
      nonecold_chain &&
      location.state === null &&
      returned_data.length === 0
    ) {
      setnonecold_chain(true);
      setcold_chain(false);
    }
  }, [nonecold_chain]);

  // useEffect(() => {
  //   if (!location.state) {
  //     if (nonecold_chain) {
  //       setcold_chain(false);
  //     } else {
  //       setcold_chain(true);
  //     }
  //   }
  // }, [nonecold_chain,]);

  // useEffect(() => {
  //   if(delivery_type === "LOCAL"){
  //     settransport_mode("LOCAL")
  //   }
  // }, [delivery_type])

  const labelArray = ["Step 1", "Step 2", "Step 3"];
  const [currentStep, updateCurrentStep] = useState(1);

  function updateStep(step) {
    if (step === 1) {
      setorder_active_btn("first");
    } else if (step === 2) {
      setorder_active_btn("second");
    } else {
      setorder_active_btn("third");
    }
    updateCurrentStep(step);
  }

  useEffect(() => {
    if (
      delivery_type === "LOCAL" &&
      location.state === null &&
      returned_data.length === 0 &&
      returned_data.length === 0
    ) {
      settransport_mode("LOCAL");
    } else if (
      delivery_type === "DOMESTIC" &&
      location.state === null &&
      returned_data.length === 0 &&
      returned_data.length === 0
    ) {
      settransport_mode("");
    }
  }, [delivery_type]);

  useEffect(() => {
    if (!asset_prov && location.state == null) {
      setasset_info_selected("");
    }
  }, [asset_prov]);

  //For Checker & Maker
  const [toggle_rejected, settoggle_rejected] = useState(false);
  const [message, setmessage] = useState("");
  const [message_error, setmessage_error] = useState(false);
  const [status_toggle, setstatus_toggle] = useState(false);
  const [cm_current_status, setcm_current_status] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setmessage_error(false);
  };

  useEffect(() => {
    settoggle_rejected(false);
  }, []);

  const update_orderstatus = (id) => {
    axios
      .put(
        ServerAddress + "booking/reject_order/" + id,
        {
          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          // transit_status: current_status,
          change_fields: { cm_current_status: "REJECTED" },
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
          navigate("/booking/orders");
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
      update_orderstatus(order.id);
      setShow(false);
    }
  };

  useEffect(() => {
    if (
      user.user_department_name + " " + user.designation_name ===
      "CUSTOMER SERVICE EXECUTIVE" ||
      user.user_department_name + " " + user.designation_name ===
      "DATA ENTRY OPERATOR"
    ) {
      setcm_current_status("NOT APPROVED");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "OPERATION MANAGER"
    ) {
      setcm_current_status("VERIFIED OPERATION MANAGER");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "CUSTOMER SUPPORT MANAGER"
    ) {
      setcm_current_status("VERIFIED CUSTOMER SUPPORT MANAGER");
      setstatus_toggle(true);
    } else if (user.user_department_name === "ACCOUNTANT") {
      setcm_current_status("VERIFIED ACCOUNTANT");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "ACCOUNT MANAGER"
    ) {
      setcm_current_status("VERIFIED ACCOUNT MANAGER");
      setstatus_toggle(true);
    } else if (user.user_department_name === "ADMIN" || user.is_superuser) {
      setcm_current_status("APPROVED");
      setstatus_toggle(true);
    } else {
      setcm_current_status("NOT APPROVED");
      // setstatus_toggle(false)
    }
  }, [user, isupdating]);

  //If Same Client
  // const [same_as, setsame_as] = useState(false)
  // const [showOrder, setShowOrder] = useState(false);
  // const [toggle_order, settoggle_order] = useState(false)
  console.log("showOrder-----", showOrder);
  console.log("same_as----", same_as);
  console.log("toggle_order----", toggle_order);

  const handleCloseOrder = () => setShowOrder(false);

  // const handleShowOrder = () => {
  //   setShowOrder(true);
  //   setsame_as(false)
  //   settoggle_order(false)
  // }

  const handleSubmitOrder = () => {
    // setShowOrder(false);
    settoggle_order(true);
    setsame_as(true);
  };
  const handleClsOrder = () => {
    settoggle_order(true);
    setShowOrder(false);
  };

  //   useEffect(() => {
  // if(toggle_order===true){
  //   alert("111111")
  // }
  //   }, [toggle_order])
  console.log("showOrder-----", showOrder);
  console.log("same_as------", same_as);

  useEffect(() => {
    if (same_as && showOrder) {
      navigate("/booking/orders");
    }
  }, [showOrder, same_as]);

  //  step 1
  const [eway_confirm, seteway_confirm] = useState(false);
  const [eway_list, seteway_list] = useState([]);
  const [from_address, setfrom_address] = useState([]);
  const [to_address, setto_address] = useState([]);
  const [locality_list, setlocality_list] = useState([]);
  const [locality_id, setlocality_id] = useState("");
  const [locality_sel, setlocality_sel] = useState("");
  const step_1 = () => {
    axios
      .post(
        "https://dev.api.easywaybill.in/ezewb/v1/auth/initlogin",

        {
          userid: "test.easywaybill@gmail.com",
          password: "Abcd@12345",
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("response-------eway bill step 1", response.data.response);
        console.log("token", response.data);
        dispatch(setEAccessToken(response.data.response.token));
        dispatch(setOrgs(response.data.response.orgs));
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const business_token = () => {
    axios
      .post(
        "https://dev.api.easywaybill.in/ezewb/v1/auth/completelogin",
        {
          token: `${e_acess_token}`,
          orgid: "4",
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("responseblogin", response.data);
        console.log("token", response.data.response.token);
        dispatch(setBAccessToken(response.data.response.token));
      })
      .catch((error) => {
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Eway Bill Server Is Currently Down`));
        dispatch(setAlertType("danger"));
      });
  };

  const [eway_detail_l, seteway_detail_l] = useState([]);

  const get_eway_detail = (eway) => {
    let inv_list = [];
    axios
      .get(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/data?ewbNo=${eway}&gstin=${gstin_no}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response=======eway bill detail", response.data.response);
        if (response.data.response !== null) {

          seteway_detail_l(response.data.response);
          seteway_confirm(true);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Eway Bill nO Details Matched`));
          dispatch(setAlertType("success"));
          seteway_list(response.data.response);
          gefilterlocalityfrom(response.data.response.fromPincode);
          gefilterlocalityto(response.data.response.toPincode);
        }
        else {
          seteway_confirm(false);
          seteway_detail_l([])
          seteway_list([])
        }

      })
      .catch((error) => {
        seteway_confirm(false);
        console.log("response=======eway bill detail", error);
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Entered EwayBill No Is Wrong`));
        dispatch(setAlertType("danger"));
      });
  };

  const gefilterlocalityfrom = (pincode) => {
    let locality_from = [];
    axios
      .get(ServerAddress + `master/filter_locality/?pincode=${pincode}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setfrom_address(response.data[0]);
        for (let index = 0; index < response.data.length; index++) {
          const element = [response.data[index].id, response.data[index].name];
          locality_from.push(element);
        }
        setlocality_list(locality_from);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const [locslity_to_list, setlocslity_to_list] = useState([]);
  const [locality_sel_to, setlocality_sel_to] = useState("");
  const [locality_id_to, setlocality_id_to] = useState("");
  const gefilterlocalityto = (pincode) => {
    let localityto = [];
    axios
      .get(ServerAddress + `master/filter_locality/?pincode=${pincode}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setto_address(response.data[0]);
        for (let index = 0; index < response.data.length; index++) {
          const element = [response.data[index].id, response.data[index].name];
          console.log("Element{{{{{}}}}}}", element);
          localityto.push(element);
        }
        console.log("localityto+++++++++++", localityto);
        setlocslity_to_list(localityto);
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };
  //  For Step 1 Eway bill
  useLayoutEffect(() => {
    step_1();
  }, []);

  // For Step 2 Eway Bill
  useLayoutEffect(() => {
    if (e_acess_token != "") {
      business_token();
    }
  }, [e_acess_token]);

  // Location Info
  // Address Line 1 Shipper and consignee started
  const [shipper_n, setshipper_n] = useState("");
  const [consignee_n, setconsignee_n] = useState("");
  const [consignee_address, setconsignee_address] = useState("");
  const [shipper_address, setshipper_address] = useState("");
  // Address Line 1 Shipper and consignee Ended
  const [state_error, setstate_error] = useState(false);
  const [state_page, setstate_page] = useState(1);
  const [state_search_item, setstate_search_item] = useState("");
  const [state_loaded, setstate_loaded] = useState(false)
  const [state_count, setstate_count] = useState(1)
  const [state_bottom, setstate_bottom] = useState(103)
  const [togstate, settogstate] = useState(false)

  const [city_list_s, setcity_list_s] = useState([]);
  const [city, setcity] = useState("");
  const [city_id, setcity_id] = useState(0);
  const [city_error, setcity_error] = useState(false);
  const [city_page, setcity_page] = useState(1);
  const [city_search_item, setcity_search_item] = useState("");
  const [city_loaded, setcity_loaded] = useState(false)
  const [city_count, setcity_count] = useState(1)
  const [city_bottom, setcity_bottom] = useState(103)
  const [togcity, settogcity] = useState(false)

  const [pincode_page, setpincode_page] = useState(1);
  const [pincode_search_item, setpincode_search_item] = useState("");
  const [pincode_id, setpincode_id] = useState(0);
  const [load_pincode, setload_pincode] = useState(false)
  const [pincode_count, setpincode_count] = useState(1)
  const [pincode_bottom, setpincode_bottom] = useState(103)
  const [togpincode, settogpincode] = useState(false)

  const [pincode_list_error, setpincode_list_error] = useState(false);
  const [locality, setlocality] = useState("");
  const [locality_list_s, setlocality_list_s] = useState([]);
  const [locality_page, setlocality_page] = useState(1);
  const [locality_loaded, setlocality_loaded] = useState(false)
  const [locality_bottom, setlocality_bottom] = useState(103)
  const [locality_count, setlocality_count] = useState(1)

  const [locality_search_item, setlocality_search_item] = useState("");
  const [locality_id_f, setlocality_id_f] = useState(0);
  const [locality_error, setlocality_error] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [consginee_st, setconsginee_st] = useState("");
  const [consginee_c, setconsginee_c] = useState("");
  const [consignee_p_id, setconsignee_p_id] = useState(0);
  
  const [togstate_c, settogstate_c] = useState(false)
  const [togcity_c, settogcity_c] = useState(false)
  const [togpincode_c, settogpincode_c] = useState(false)

  const getStates = () => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page}&records=${10}&state_search=${state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        settogstate(true);
        if (resp.data.results.length > 0) {
          if (resp.data.next === null) {
            setstate_loaded(false);
          } else {
            setstate_loaded(true);
          }
          if (state_page == 1) {
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
        setstate_count(state_count + 2);
        setstate_list_s(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  const getCities = (place_id, filter_by, val) => {

    setby_pincode(false);
    setby_pincode_f_c(false);
    let cities_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_cities/?search=${""}&p=${val === "Shipper" ? city_page : city_page_c}&records=${10}&city_search=${val === "Shipper" ? city_search_item : city_search_item_c}` +
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
          if (val === "Shipper") {
            settogcity(true);
            if (resp.data.next === null) {
              setcity_loaded(false);
            } else {
              setcity_loaded(true);
            }
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
            setcity_count(city_count + 2);
            setcity_list_s(cities_list);
          }
          else {
            settogcity_c(true)
            if (resp.data.next === null) {
              setcityc_loaded(false);
            } else {
              setcityc_loaded(true);
            }
            if (city_page_c == 1) {
              cities_list = resp.data.results.map((v) => [
                v.id,
                toTitleCase(v.city),
              ]);
            } else {
              cities_list = [
                ...city_list__c,
                ...resp.data.results.map((v) => [v.id, toTitleCase(v.city)]),
              ];
            }
            setcityc_count(cityc_count + 2);
            setcity_list__c(cities_list);
          }
        }

        else {
          setcity_list_s([]);
          setcity_list__c([]);
        }
      })
      .catch((err) => {
        console.warn(`Error Occur in Get City, ${err}`);
      });
  };

  const getPincode = (place_id, filter_by, val) => {
    let pincode_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_pincode/?search=${""}&p=${val === "Shipper" ? pincode_page : pincode_page_c}&records=${10}&pincode_search=${val === "Shipper" ? pincode_search_item : pincode_search_item_c}` +
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
  
          if (val === "Shipper") {
            settogpincode(true)
            if (resp.data.next === null) {
              setload_pincode(false);
            } else {
              setload_pincode(true);
            }
            if (pincode_page == 1) {
              pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
            } else {
              pincode_list = [
                ...pincode_list_s,
                ...resp.data.results.map((v) => [v.id, v.pincode]),
              ];
            }
            setpincode_count(pincode_count + 2);
            setpincode_list_s(pincode_list);
          }
          else {
            settogpincode_c(true)
            if (resp.data.next === null) {
              setloadc_pincode(false);
            } else {
              setloadc_pincode(true);
            }
            if (pincode_page_c == 1) {
              pincode_list = resp.data.results.map((v) => [v.id, v.pincode]);
            } else {
              pincode_list = [
                ...pincode_list_f_c,
                ...resp.data.results.map((v) => [v.id, v.pincode]),
              ];
            }
            setpincodec_count(pincodec_count + 2);
            setpincode_list_f_c(pincode_list);
          }
        }
        else if (resp.data.results.length > 0 && val === "Shipper") {

          setcity(toTitleCase(resp.data.results[0].city_name));
          setcity_id(resp.data.results[0].city);
          setstate(toTitleCase(resp.data.results[0].state_name));
          setstate_id(resp.data.results[0].state);
          setpincode(resp.data.results[0].pincode);
          setpincode_id(resp.data.results[0].id);
        }
        else if (resp.data.results.length > 0 && val === "Consignee") {
          setconsginee_c(toTitleCase(resp.data.results[0].city_name));
          setcity_id_c(resp.data.results[0].city);
          setconsginee_st(toTitleCase(resp.data.results[0].state_name));
          setstate_id_f_c(resp.data.results[0].state);
          setconsignee_pincode(resp.data.results[0].pincode);
          setconsignee_p_id(resp.data.results[0].id);
        }
        else {
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
      })
      .catch((err) => {
        console.warn(`Error Occur in Get City, ${err}`);
      });
  };

  const getLocality = (place_id, filter_by, val) => {
    let locality_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_locality/?search=${""}&p=${val === "Shipper" ? locality_page : locality_page_c}&records=${10}` +
        `&place_id=${place_id}&filter_by=${filter_by}&name_search=${val === "Shipper" ? locality_search_item : locality_search_item_c}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (filter_by !== "locality") {
          if (resp.data.results.length > 0) {
            if (val === "Shipper") {
              if (resp.data.next === null) {
                setlocality_loaded(false);
              } else {
                setlocality_loaded(true);
              }

              if (locality_page == 1) {
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

              locality_list = [...new Set(locality_list.map((v) => `${v}`))].map(
                (v) => v.split(",")
              );
              setlocality_count(locality_count + 2);
              setlocality_list_s(locality_list);
            }
            else {
              if (resp.data.next === null) {
                setlocalityc_loaded(false);
              } else {
                setlocalityc_loaded(true);
              }
              if (locality_page_c == 1) {
                locality_list = resp.data.results.map((v) => [
                  v.id,
                  toTitleCase(v.name),
                ]);
              } else {
                locality_list = [
                  ...locality_list_s_c,
                  ...resp.data.results.map((v) => [v.id, toTitleCase(v.name)]),
                ];
              }

              locality_list = [...new Set(locality_list.map((v) => `${v}`))].map(
                (v) => v.split(",")
              );
              setlocalityc_count(localityc_count + 2);
              setlocality_list_s_c(locality_list);
              console.log("locality_list=c========", locality_list)
            }
          }
          else {
            setlocality_list_s([]);
          }

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
      })
      .catch((err) => {
        alert(`Error Occur in Get Pincode , ${err}`);
      });
  };

  useLayoutEffect(() => {
    if (state_id !== 0) {
      setcity_page(1);
      setcity_count(1);
      setcity_bottom(103)
      setcity_loaded(true);
    }
  }, [state_id])

  useEffect(() => {
    let timeoutId;
    if (state_id !== 0) {
      timeoutId = setTimeout(() => {
        getCities(state_id, "state", "Shipper");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [state_id, city_page, city_search_item]);

  useLayoutEffect(() => {
    if (state_id_f_c !== 0) {
      setcity_page_c(1);
      setcityc_count(1);
      setcityc_bottom(103)
      setcityc_loaded(true);

    }
  }, [state_id_f_c])

  useEffect(() => {
    let timeoutId;
    if (state_id_f_c !== 0) {
      timeoutId = setTimeout(() => {
        getCities(state_id_f_c, "state", "Consignee");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [state_id_f_c, city_page_c, state_search_item_c]);

  useLayoutEffect(() => {
    if (state != "") {
      setpincode_loaded(true);
    }
  }, [state]);
  useLayoutEffect(() => {
    if (consginee_st != "") {
      setpincode_loaded_f_c(true);
    }
  }, [consginee_st]);

  useLayoutEffect(() => {
    if (pincode_id !== 0) {
      setlocality_page(1);
      setlocality_count(1);
      setlocality_bottom(103)
      setlocality_loaded(true);
    }
  }, [pincode_id])

  useEffect(() => {

    let timeoutId;
    if (pincode_id !== 0) {
      timeoutId = setTimeout(() => {
        getLocality(pincode_id, "pincode", 'Shipper');
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [pincode_id, locality_page, locality_search_item]);

  useLayoutEffect(() => {
    if (consignee_p_id !== 0) {
      setlocality_page_c(1);
      setlocalityc_count(1);
      setlocalityc_bottom(103)
      setlocalityc_loaded(true);
    }
  }, [consignee_p_id])

  useEffect(() => {
    let timeoutId;
    if (consignee_p_id !== 0) {
      timeoutId = setTimeout(() => {
        getLocality(consignee_p_id, "pincode", 'Consignee');
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [consignee_p_id, locality_page_c, locality_search_item_c]);

  useLayoutEffect(() => {
    getStates();
  }, [state_page, state_search_item, refresh]);

  const getStates_c = () => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&place_id=all&filter_by=all&p=${state_page_c}&records=${10}&state_search=${state_search_item_c}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        settogstate_c(true)
        if (resp.data.results.length > 0) {
          if (resp.data.next === null) {
            setstatec_loaded(false);
          } else {
            setstatec_loaded(true);
          }
          if (state_page_c == 1) {
            state_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state),
            ]);
          } else {
            state_list = [
              ...state_list_c,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            ];
          }
        }
        setstatec_count(statec_count + 2);
        setstate_list_c(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  // useLayoutEffect(() => {
  //   if (state != "") {
  //     setpincode_loaded(true);
  //   }
  // }, [state_s_c]);

  useLayoutEffect(() => {
    getStates_c();
  }, [state_page_c, state_search_item_c, refresh_c]);
  ////////
  useLayoutEffect(() => {
    if (city_id !== 0) {
      setpincode_page(1);
      setpincode_count(1);
      setpincode_bottom(103)
      setload_pincode(true)
    }
  }, [city_id])

  useEffect(() => {
    let timeoutId;
    if (city_id !== 0) {
      timeoutId = setTimeout(() => {
        getPincode(city_id, "city", "Shipper");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [city_id, pincode_page, pincode_search_item]);

  useLayoutEffect(() => {
    if (city_id_c !== 0) {
      setpincode_page_c(1);
      setpincodec_count(1);
      setpincodec_bottom(103)
      setloadc_pincode(true)
    }
  }, [city_id_c])

  useEffect(() => {
    let timeoutId;
    if (city_id_c !== 0) {
      timeoutId = setTimeout(() => {
        getPincode(city_id_c, "city", "Consignee");
      }, 1);
    }
    return () => clearTimeout(timeoutId);
  }, [city_id_c, pincode_page_c, pincode_search_item_c]);

  // Get Return Order

  const getReturnOrder = () => {
    let temp2 = [];
    let data = [];
    axios
      .get(
        ServerAddress + `booking/get_return_order/?docket_no=${linked_order}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length === 0) {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Docket Number Does not Exist`));
          dispatch(setAlertType("warning"));
        } else {
          setreturned_data(response.data.results);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };
  useEffect(() => {
    if (
      returned_data.length !== 0 &&
      (order_type === "Return" || order_type === "Issue") &&
      location.state === null
    ) {
      setorder(returned_data[0]);
      settransport_mode(toTitleCase(returned_data[0].transportation_mode));
      setorder_type(order_type === "Issue" ? "Issue" : "Return");
      setcurrent_status(returned_data[0].current_status);
      // setdocket_no_value(returned_data[0].docket_no);
      // setisupdating(true);
      setorder_id(returned_data[0].id);
      setdocket_no_value(returned_data[0].docket_no);
      dispatch(setCurOrderId(returned_data[0].id));
      dispatch(setCurOrderDocketNo(returned_data[0].docket_no));
      settype_of_booking(toTitleCase(returned_data[0].booking_type));

      // setdelivery_mode(returned_data[0].delivery_mode);
      settransportation_cost(returned_data[0].transportation_cost);

      setcommodity(returned_data[0].commodity_name);
      setcommodity_id(returned_data[0].commodity);
      setd_cod(toTitleCase(returned_data[0].cod));
      if (returned_data[0].cod === "Yes") {
        settransportation_cost(returned_data[0].transportation_cost);
      }
      settotal_delivered_pcs(
        parseInt(returned_data[0].total_quantity) -
        returned_data[0].issue_notreceived.length
      );
      setcold_chain(returned_data[0].cold_chain);
      setdelivery_type(returned_data[0].delivery_type);
      setentry_type_btn(returned_data[0].entry_type);
      setactual_weigth(returned_data[0].actual_weight);
      setcommodity(toTitleCase(returned_data[0].commodity_name));
      setclient(toTitleCase(returned_data[0].client_name));
      setclient_id(returned_data[0].client);
      setbillto(toTitleCase(returned_data[0].billto_name));
      setbillto_id(returned_data[0].billto);
      // setclient_id(returned_data[0].client)
      setshipper_n(toTitleCase(returned_data[0].shipper));
      // setshipper_id(returned_data[0].shipper);
      setstate(toTitleCase(returned_data[0].shipper_state));
      setcity(toTitleCase(returned_data[0].shipper_city));
      setpincode(returned_data[0].shipper_pincode);
      setshipper_address(toTitleCase(returned_data[0].shipper_address1));
      setorigincity(toTitleCase(returned_data[0].shipper_city));
      setorigincity_id(toTitleCase(returned_data[0].shipper_city_id));
      setlocality(toTitleCase(returned_data[0].shipper_locality));

      setconsignee_n(toTitleCase(returned_data[0].consignee));
      // setconsignee_id(returned_data[0].consignee);
      setconsginee_st(toTitleCase(returned_data[0].consignee_state));
      setconsginee_c(toTitleCase(returned_data[0].consignee_city));
      setconsignee_pincode(returned_data[0].consignee_pincode);
      setconsignee_address(toTitleCase(returned_data[0].consignee_address1));
      setlocality_c(toTitleCase(returned_data[0].consignee_locality));
      setconsignee_add_2(
        toTitleCase(returned_data[0].consignee_address_line_2)
      );
      setlocal_delivery_type(toTitleCase(returned_data[0].local_delivery_type));
      setasset_info_selected(toTitleCase(returned_data[0].asset_type));
      if (returned_data[0].asset_type === "NONE") {
        setasset_prov(false);
      } else {
        setasset_prov(true);
      }
      setcal_type(returned_data[0].local_cal_type);

      setshipper_add_1(toTitleCase(returned_data[0].shipper_address1));
      setdestinationcity(toTitleCase(returned_data[0].consignee_city));
      setdestinationcity_id(toTitleCase(returned_data[0].consignee_city_id));

      setlocality_id_f(returned_data[0].shipper_location);
      setlocality_id_f_c(returned_data[0].consignee_location);
    }
  }, [returned_data, order_type]);

  useEffect(() => {
    if (
      location.state === null &&
      order_type !== "Return" &&
      order_type !== "Issue"
    ) {
      setorder([]);
      settransport_mode("");
      setcurrent_status("");
      // setdocket_no_value(returned_data[0].docket_no);
      // setisupdating(true);
      setorder_id("");
      setdocket_no_value("");
      settype_of_booking(type_of_booking_list[1]);

      // setdelivery_mode(returned_data[0].delivery_mode);
      settransportation_cost("");

      setcommodity("");
      setcommodity_id("");
      setd_cod(toTitleCase(""));

      setcold_chain(false);
      setdelivery_type("LOCAL");
      setentry_type_btn("AUTO GENERATE");
      setactual_weigth("0");
      setcommodity("");
      setclient("");
      setclient_id("");
      setbillto("");
      setbillto_id("");
      // setclient_id(returned_data[0].client)
      setshipper_n("");
      setstate("");
      setcity("");
      setpincode("");
      setshipper_address("");
      setorigincity("");
      setorigincity_id("");
      setlocality("");
      setlocality_id_f(0);
      setlocality_id_f_c(0);

      setconsignee_n("");
      setconsginee_st("");
      setconsignee_city("");
      setconsignee_pincode("");
      setconsignee_address("");
      setlocality_c("");
      setconsignee_add_2("");
      setlocal_delivery_type("");
      setasset_info_selected("");
      // if (returned_data[0].asset_type === "NONE") {
      //   setasset_prov(false)
      // }
      // else {
      //   setasset_prov(true)
      // }
      setcal_type("");

      setshipper_add_1("");
      setdestinationcity("");
      setdestinationcity_id("");
    }
  }, [returned_data, order_type]);

  useEffect(() => {
    if (
      linked_order.length >= 6 &&
      (order_type === "Return" || order_type === "Issue") &&
      location.state === null
    ) {
      getReturnOrder();
    }
  }, [linked_order]);

  // Used for History
  const handlClk = () => {
    navigate("/booking/orders/orderHistory/OrderHistoryPage", {
      state: { Booking: order },
    });
  };
  useEffect(() => {
    console.log("ewayyy 222222222222222", eway_detail_l)
    if (eway_detail_l.length != 0) {
      console.log("ewayyy invoice work done", eway_detail_l)
      let temp_list = [];
      temp_list.push([eway_detail_l.ewbNo, eway_detail_l.docDate, eway_detail_l.docNo, eway_detail_l.totInvValue, ""]);
      setrow2(temp_list);
      console.log("temp_list=============", temp_list);
      setinvoice_value(eway_detail_l.docNo);
    }
  }, [eway_detail_l]);


  const update_ewayBill = (dkt_no, eway_no) => {
    let inv_list = [];
    axios
      .put(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/updatePartBByNo?gstin=${gstin_no}`,
        {

          "transMode": "1",
          "fromPlace": user_l_state,
          "fromState": user_l_statecode,
          "transDocNo": dkt_no,
          "transDocDate": null,
          "vehicleNo": "MH03YX1234",
          "reasonCode": "1",
          "reasonRem": "test",
          "userGstin": "05AAAAT2562R1Z3",
          "ewbNo": eway_no
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response(((((9999999999", response);
        dispatch(setToggle(true));
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(`${eway_no} Sucessfully Attached To Docket No =>${dkt_no}`)
        )
        dispatch(setAlertType("success"));

      })
      .catch((error) => {

      });
  };

  useEffect(() => {
    if (client !== "") {
      setclient_error(false);
    }
    if (billto !== "") {
      setbillto_error(false);
    }
    if (state !== "") {
      setstate_error(false);
    }
    if (city !== "") {
      setcity_error(false);
    }  
    if (pincode !== "") {
      setpincode_list_error(false);
    }  
    if (locality !== "") {
      setlocality_error(false);
    } 
    if (consginee_st !== "") {
      setstate_error_c(false);
    }
    if (consginee_c !== "") {
      setcity_error_c(false);
    }
    if (consignee_pincode !== "") {
      setpincode_list_error_c(false);
    }
    if (locality_c !== "") {
      setlocality_error_c(false);
    }
    if (transport_mode !== "") {
      settransport_mode_error(false);
    }
    if (shipper !== "") {
      setshipper_error(false);
    }
    if (consignee !== "") {
      setconsignee_error(false);
    }
    if (commodity !== "") {
      setcommodity_error(false);
    }
    if (local_delivery_type !== "") {
      setlocal_delivery_type_error(false);
    }
    if (d_cod !== "") {
      setd_cod_error(false);
    }
  }, [
    temp_selected,
    client,
    transport_mode,
    shipper,
    consignee,
    commodity,
    local_delivery_type,
    d_cod,
    billto, 
    state,
    city,
    pincode,
    locality,
    consginee_st,
    consginee_c,
    consignee_pincode,
    locality_c,
  ]);

  useEffect(() => {
    console.log("by_pincode========", by_pincode)
    if (!location.state && state && !by_pincode) {
      setcity("");
      setcity_list_s([]);
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [state]);

  useEffect(() => {
    if (state !== "" && togstate) {
      setcity("");
      setcity_list_s([]);
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [state]);

  useEffect(() => {
    if (!location.state && city && !by_pincode) {
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [city]);

  useEffect(() => {
    if (city !== "" && togcity) {
      setpincode("");
      setpincode_list_s([]);
      setlocality("");
      setlocality_list_s([]);
    }
  }, [city]);

  useEffect(() => {
    if (!location.state && pincode && !by_pincode) {
      setlocality("");
      setlocality_list_s([]);
    }
  }, [pincode]);

  useEffect(() => {
    if (pincode !== "" && togpincode) {
      setlocality("");
      setlocality_list_s([]);
    }
  }, [pincode]);

  useEffect(() => {
    if (isupdating) {
      settogstate(false);
      settogcity(false);
      settogpincode(false)
    }
  }, []);

  useEffect(() => {
    console.log("by_pincode_f_c========", by_pincode_f_c)
    if (!location.state && consginee_st && !by_pincode_f_c) {
      setconsginee_c("");
      setcity_list__c([]);
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_st]);

  useEffect(() => {
    if (consginee_st !== "" && togstate_c) {
      setconsginee_c("");
      setcity_list__c([]);
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_st]);

  useEffect(() => {
    if (!location.state && consginee_c && !by_pincode_f_c) {
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_c]);

  useEffect(() => {
    if (consginee_c !== "" && togcity_c) {
      setconsignee_pincode("");
      setpincode_list_f_c([]);
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consginee_c]);

  useEffect(() => {
    if (!location.state && consignee_pincode && !by_pincode_f_c) {
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consignee_pincode]);
 
  useEffect(() => {
    if (consignee_pincode !== "" && togpincode_c) {
      setlocality_c("");
      setlocality_list_s_c([]);
    }
  }, [consignee_pincode]);

  useEffect(() => {
    if (isupdating) {
      settogstate_c(false);
      settogcity_c(false);
      settogpincode_c(false)
    }
  }, []);

  return (
    <div>
      <Modal show={showOrder} onHide={handleCloseOrder}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>If Client is same as previous Client</Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={handleClsOrder}>
            Yes
          </Button>
          <Button type="button" variant="primary" onClick={handleSubmitOrder}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
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
          validation.handleSubmit(e.values);
          return false;
        }}
        encType="multipart/form-data"
      >
        {/* Booking type */}

        <div className="m-3">
          <div
            className=" mb-2 main-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>{isupdating ? "Update Order" : "Add Order"}</div>
            {/* {isupdating ? (
              <div style={{ justifyContent: "right", display: "flex" }}>
              <Button
              type="button"
              onClick={() => {
                handlClk();
              }}
              >History</Button>
            </div>
            ):(
              <></>
            )} */}

            {/* 
            <div>
              <Button
                type="button"
                style={{ padding: "5.8px" }}
                className="btn-rounded fluid btn btn-success"
                onClick={() => {
                  navigate("/bookings/airport_orders/add_airport_orders");
                }}
              >
                <i className="mdi mdi-plus me-1" />
                Airport Order
              </Button>
            </div> */}
            {/* {isupdating &&
              <div>
                <Button size="sm" outline color="warning" type="button" onClick={handleShow}>
                  Return
                </Button>
              </div>
            } */}
            {isupdating && (
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
            )}
          </div>
          <Col lg={12}>
            <Card className="shadow bg-white rounded" id="doc_no">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Booking Info
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
                  {/* Booking Info */}

                  <Row>

                    <Col lg={(order_type == "Return" || order_type == "Issue") ? 2 : 4} md={6} sm={6}>
                      <Label className="header-child">Booking For</Label>
                      <div className="">
                        <NSearchInput
                          data_list={order_type_list}
                          data_item_s={order_type}
                          show_search={false}
                          set_data_item_s={setorder_type}
                          disable_me={isupdating}
                        />
                      </div>
                    </Col>
                    {(order_type == "Return" || order_type == "Issue") && (
                      <Col lg={2} md={6} sm={6}>
                        <Label className="header-child">
                          Refrence Docket No
                        </Label>
                        <div className="">
                          <Input
                            type="number"
                            className="form-control-md"
                            id="input"
                            value={linked_order}
                            onChange={(e) => setlinked_order(e.target.value)}
                            placeholder="Enter Docket Number"
                            disabled={isupdating}
                          />
                        </div>
                      </Col>
                    )}

                    <Col lg={4} md={6} sm={6}>
                      <Label className="header-child">Bill To*</Label>
                      <SearchInput
                        data_list={billto_list}
                        setdata_list={setbillto_list}
                        data_item_s={billto}
                        set_data_item_s={setbillto}
                        set_id={setbillto_id}
                        disable_me={isupdating}
                        page={billto_page}
                        setpage={setbillto_page}
                        setsearch_item={setsearch_billto}
                        error_message={"Plesae Select Any Bill To"}
                        error_s={billto_error}
                      />
                      {/* <div className="mt-1 error-text" color="danger">
                        {billto_error ? "Please Select Client " : null}
                      </div> */}
                    </Col>

                    {billto && (
                      <Col lg={4} md={6} sm={6}>
                        <Label className="header-child">Client *</Label>
                        <SearchInput
                          data_list={client_list}
                          setdata_list={setclient_list}
                          data_item_s={client}
                          set_data_item_s={setclient}
                          // error_message="Select Client "
                          set_id={setclient_id}
                          disable_me={isupdating}
                          page={client_page}
                          setpage={setclient_page}
                          setsearch_item={setsearch_client}
                          error_message={"Plesae Select Any Client"}
                          error_s={client_error}
                        />
                        {/* <div className="mt-1 error-text" color="danger">
                          {client_error ? "Please Select Client " : null}
                        </div> */}
                      </Col>
                    )}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Booking Through</Label>
                        <Row>
                          <Col lg={5} md={6} sm={6}>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input "
                                type="checkbox"
                                name="booking_through"
                                id="OrderTypeRadio"
                                // disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setbooking_through(!booking_through);
                                }}
                                checked={booking_through}
                                readOnly={true}
                              />
                              <label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                With Eway Bill No.
                              </label>
                            </div>
                          </Col>
                          {booking_through && (
                            <Col lg={7} md={6} sm={6}>
                              <div className="">
                                <Input
                                  type="number"
                                  className="form-control-md"
                                  id="input"
                                  maxLength="12"
                                  value={ewaybill_no}
                                  onChange={(e) => {
                                    console.log("maxlength", e.target.value);
                                    if (e.target.value.length === 12) {
                                       setewaybill_no(e.target.value);
                                      check_ewb_attached(e.target.value);
                                    } else if (e.target.value.length < 12) {
                                       setewaybill_no(e.target.value);
                                    }
                                  }}
                                  placeholder="Enter Eway Bill Number"
                               
                                />
                              </div>
                            </Col>
                          )}
                        </Row>
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Delivery Type</Label>
                        <Row>
                          <Col lg={3} md={3} sm={3}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="delivery_type"
                                id="exampleRadios2"
                                value="LOCAL"
                                disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setdelivery_type("LOCAL");
                                }}
                                checked={delivery_type === "LOCAL"}
                                readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                Local
                              </Label>
                            </div>
                          </Col>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input "
                                type="radio"
                                name="delivery_type"
                                id="exampleRadios1"
                                value="DOMESTIC"
                                disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setdelivery_type("DOMESTIC");
                                }}
                                checked={delivery_type === "DOMESTIC"}
                                readOnly={true}
                              />

                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                Domestic
                              </Label>
                            </div>
                          </Col>

                          <Col lg={5} md={5} sm={5}>
                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="delivery_type"
                                id="exampleRadios2"
                                value="International"
                                disabled={isupdating ? delivery_type : ""}
                                onClick={() => {
                                  setdelivery_type("International");
                                }}
                                checked={delivery_type === "International"}
                                readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                International
                              </Label>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child text-color">
                          Entry Type
                        </Label>
                        <Row>
                          <Col md={4} sm={5}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="entry_type"
                                id="exampleRadios3"
                                value="MANUALLY"
                                disabled={isupdating ? entry_type_btn : ""}
                                onClick={() => {
                                  setentry_type_btn("MANUALLY");
                                }}
                                checked={entry_type_btn === "MANUALLY"}
                                readOnly={true}
                              />
                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios2"
                              >
                                Manually
                              </Label>
                            </div>
                          </Col>
                          <Col md={6} sm={7}>
                            <div className="form-check mb-2">
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="entry_type"
                                id="exampleRadios4"
                                value="AUTO GENERATE"
                                disabled={isupdating ? entry_type_btn : ""}
                                onClick={() => {
                                  setentry_type_btn("AUTO GENERATE");
                                }}
                                checked={entry_type_btn === "AUTO GENERATE"}
                                readOnly={true}
                              />

                              <Label
                                className="form-check-label input-box"
                                htmlFor="exampleRadios1"
                              >
                                Auto Genrate
                              </Label>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {entry_type_btn === "MANUALLY" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Docket Number *
                          </Label>
                          <Input
                            min={0}
                            value={docket_no_value}
                            disabled={isupdating ? docket_no_value : ""}
                            onChange={(event) => {
                              setdocket_no_value(event.target.value);
                              if (event.target.value.length != 6) {
                                setdocket_error(true);
                              } else {
                                setdocket_error(false);
                              }
                            }}
                            // onFocus={() => {
                            //   setclicked(true);
                            // }}
                            invalid={
                              docket_no_value === "" && docket_error
                                ? true
                                : false
                            }
                            type="number"
                            label="First Name"
                            name="docket_no"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Docket Number"
                          />
                          {docket_error && (
                            <div className="mt-1 error-text" color="danger">
                              {/* <FormFeedback type="invalid"> */}
                              Docket number must be 8 digit
                              {/* </FormFeedback> */}
                            </div>
                          )}
                        </div>
                      </Col>
                    ) : null}
                    {/* Field */}
                    {entry_type_btn === "AUTO GENERATE" && isupdating ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Docket Number *
                          </Label>
                          <Input
                            onBlur={validation.handleBlur}
                            value={isupdating ? docket_no_value : ""}
                            type="text"
                            label="First Name"
                            // name="docket_no"
                            id="input"
                            className="form-control-md"
                            placeholder="Auto Generate"
                            disabled
                          />
                        </div>
                      </Col>
                    ) : null}
                    {(user.view_coldchain || user.is_superuser) && (
                      <Col lg={2} md={2} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">Cold Chain</Label>
                          <br />
                          <Input
                            className="form-check-input-sm"
                            type="checkbox"
                            // value="false"
                            id="defaultCheck1"
                            onClick={() => {
                              setcold_chain(!cold_chain);
                            }}
                            readOnly={true}
                            checked={cold_chain}
                            disabled={isupdating}
                          />
                        </div>
                      </Col>
                    )}
                    <Col
                      lg={user.view_coldchain || user.is_superuser ? 2 : 4}
                      md={2}
                      sm={6}
                    >
                      <div className="mb-3">
                        <Label className="header-child">Non Cold Chain</Label>
                        <br />
                        <Input
                          className="form-check-input-sm"
                          type="checkbox"
                          // value="false"
                          id="defaultCheck1"
                          onClick={() => {
                            setnonecold_chain(!nonecold_chain);
                          }}
                          readOnly={true}
                          checked={nonecold_chain}
                          disabled={isupdating}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Type Of Booking</Label>
                        <NSearchInput
                          data_list={type_of_booking_list}
                          data_item_s={type_of_booking}
                          set_data_item_s={settype_of_booking}
                          show_search={false}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Booking Date & Time
                        </Label>
                        <div>
                          <input
                            type="datetime-local"
                            className="form-control d-block form-control-md "
                            id="input"
                            value={booking_date}
                            onChange={(val) => {
                              setbooking_date(val.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Delivery Mode</Label>
                        <NSearchInput
                          data_list={delivery_mode_list}
                          data_item_s={delivery_mode}
                          set_data_item_s={setdelivery_mode}
                          show_search={false}
                        />
                        <div className="mt-1 error-text" color="danger">
                          {delivery_mode_error
                            ? "Delivery Mode is required"
                            : null}
                        </div>
                      </div>
                    </Col> */}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Delivery Mode</Label>
                        <NSearchInput
                          data_list={delivery_mode_list}
                          data_item_s={delivery_mode}
                          set_data_item_s={setdelivery_mode}
                          show_search={false}
                        />
                        {/* <div className="mt-1 error-text" color="danger">
                          {delivery_mode_error
                            ? "Delivery Mode is required"
                            : null}
                        </div> */}
                      </div>
                    </Col>

                    {delivery_type !== "LOCAL" && (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Transport Mode *
                          </Label>
                          <NSearchInput
                            data_list={transport_mode_data_list}
                            data_item_s={transport_mode}
                            set_data_item_s={settransport_mode}
                            error_message="Select Transport Mode"
                            error_s={transport_mode_error}
                            show_search={false}
                          />
                        </div>
                      </Col>
                    )}

                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">By Ewaybill</Label>
                        <br />
                        <Input
                          className="form-check-input-sm"
                          type="checkbox"
                          // value="false"
                          id="defaultCheck1"
                          onClick={() => {
                            setewaybill(!ewaybill);
                          }}
                          readOnly={true}
                          checked={ewaybill}
                        />
                      </div>
                    </Col> */}
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Manually Entry through  Shipper Info*/}
        {eway_confirm ? null : (
          <div className="m-3" id="shipper">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Shipper Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle12}>
                        {circle_btn12 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn12 ? (
                  <CardBody>
                    <Row>
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Shipper*</Label>
                            <Input
                              placeholder="Enter shipper name"
                              id="input"
                              value={shipper_n}
                              onChange={(e) => {
                                setshipper_n(e.target.value);
                              }}
                            />
                          </div>
                        </Col>

                        <>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">State*</Label>
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
                                bottom={state_bottom}
                                setbottom={setstate_bottom}
                              />
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
                                bottom={city_bottom}
                                setbottom={setcity_bottom}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            {pincode_loaded ? (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*
                                </Label>
                                <SearchInput
                                  data_list={pincode_list_s}
                                  setdata_list={setpincode_list_s}
                                  data_item_s={pincode}
                                  set_data_item_s={setpincode}
                                  set_id={setpincode_id}
                                  page={pincode_page}
                                  setpage={setpincode_page}
                                  search_item={pincode_search_item}
                                  setsearch_item={setpincode_search_item}
                                  error_message={"Please Select Any Pincode"}
                                  error_s={pincode_list_error}
                                  loaded={load_pincode}
                                  count={pincode_count}
                                  bottom={pincode_bottom}
                                  setbottom={setpincode_bottom}
                                />
                              </div>
                            ) : (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*
                                </Label>
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
                                        getPincode(
                                          pincode,
                                          "pincode",
                                          "Shipper"
                                        );
                                        setpincode_error2(false);
                                        setby_pincode(true);
                                      }
                                    }
                                  }}
                                  value={pincode}
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
                                  <div
                                    style={{
                                      color: "#F46E6E",
                                      fontSize: "11.4px",
                                    }}
                                  >
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
                            <div className="mb-2">
                              <Label className="header-child">Locality*</Label>
                              <SearchInput
                                data_list={locality_list_s}
                                setdata_list={setlocality_list_s}
                                data_item_s={locality}
                                set_data_item_s={setlocality}
                                set_id={setlocality_id_f}
                                page={locality_page}
                                setpage={setlocality_page}
                                setsearch_item={setlocality_search_item}
                                error_message={"Please Select Any Locality"}
                                error_s={locality_error}
                                loaded={locality_loaded}
                                count={locality_count}
                                bottom={locality_bottom}
                                setbottom={setlocality_bottom}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Address Line
                              </Label>
                              <Input
                                value={shipper_address}
                                type="text"
                                className="form-control-md"
                                id="input"
                                onChange={(e) => {
                                  setshipper_address(e.target.value);
                                }}
                              />
                            </div>
                          </Col>
                        </>
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}

        {/* Manually Entry Cosignee Info*/}
        {eway_confirm ? null : (
          <div className="m-3" id="consignee">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Consignee Info
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
                      <>
                        <Col lg={4} md="6" sm="6">
                          <div className="mb-3">
                            <Label className="header-child">Consignee *</Label>
                            <Input
                              value={consignee_n}
                              id="input"
                              onChange={(e) => {
                                setconsignee_n(e.target.value);
                              }}
                              placeholder="Enter Consignee Name"
                            />
                          </div>
                        </Col>

                        <>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">State*</Label>
                              <SearchInput
                                data_list={state_list_c}
                                setdata_list={setstate_list_c}
                                data_item_s={consginee_st}
                                set_data_item_s={setconsginee_st}
                                set_id={setstate_id_f_c}
                                page={state_page_c}
                                setpage={setstate_page_c}
                                error_message={"Please Select Any State"}
                                error_s={state_error_c}
                                search_item={state_search_item_c}
                                setsearch_item={setstate_search_item_c}
                                loaded={statec_loaded}
                                count={statec_count}
                                bottom={statec_bottom}
                                setbottom={setstatec_bottom}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">City*</Label>

                              <SearchInput
                                data_list={city_list__c}
                                setdata_list={setcity_list__c}
                                data_item_s={consginee_c}
                                set_data_item_s={setconsginee_c}
                                set_id={setcity_id_c}
                                page={city_page_c}
                                setpage={setcity_page_c}
                                error_message={"Please Select Any City"}
                                error_s={city_error_c}
                                search_item={city_search_item_c}
                                setsearch_item={setcity_search_item_c}
                                loaded={cityc_loaded}
                                count={cityc_count}
                                bottom={cityc_bottom}
                                setbottom={setcityc_bottom}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6} sm={6}>
                            {pincode_loaded_f_c ? (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*
                                </Label>
                                <SearchInput
                                  data_list={pincode_list_f_c}
                                  setdata_list={setpincode_list_f_c}
                                  data_item_s={consignee_pincode}
                                  set_data_item_s={setconsignee_pincode}
                                  set_id={setconsignee_p_id}
                                  page={pincode_page_c}
                                  setpage={setpincode_page_c}
                                  search_item={pincode_search_item_c}
                                  setsearch_item={setpincode_search_item_c}
                                  error_message={"Please Select Any Pincode"}
                                  error_s={pincode_list_error_c}
                                  loaded={loadc_pincode}
                                  count={pincodec_count}
                                  bottom={pincodec_bottom}
                                  setbottom={setpincodec_bottom}
                                />
                              </div>
                            ) : (
                              <div className="mb-2">
                                <Label className="header-child">
                                  Pin Code*
                                </Label>
                                <Input
                                  onChange={(val) => {
                                    setconsignee_pincode(val.target.value);
                                    if (val.target.value.length !== 0) {
                                      setpincode_error_f_c(false);
                                      if (val.target.value.length === 6) {
                                        setpincode_error2_f_c(false);
                                      } else {
                                        setpincode_error2_f_c(true);
                                      }
                                    } else {
                                      setpincode_error_f_c(true);
                                    }
                                  }}
                                  onBlur={() => {
                                    if (consignee_pincode.length === 0) {
                                      setpincode_error_f_c(true);
                                    } else {
                                      if (consignee_pincode.length !== 6) {
                                        setpincode_error_f_c(false);
                                        setpincode_error2_f_c(true);
                                      } else {
                                        getPincode(
                                          consignee_pincode,
                                          "pincode",
                                          "Consignee"
                                        );
                                        setpincode_error2_f_c(false);
                                        setby_pincode_f_c(true);
                                      }
                                    }
                                  }}
                                  value={consignee_pincode}
                                  invalid={
                                    validation.touched.consignee_pincode &&
                                      validation.errors.consignee_pincode
                                      ? true
                                      : false
                                  }
                                  type="number"
                                  className="form-control-md"
                                  id="input"
                                  name="pincode1"
                                  placeholder="Enter Pin code"
                                />

                                {pincode_loaded_f_c === false &&
                                  pincode_error_f_c === true ? (
                                  <div
                                    style={{
                                      color: "#F46E6E",
                                      fontSize: "11.4px",
                                    }}
                                  >
                                    Please add pincode
                                  </div>
                                ) : null}

                                {pincode_loaded_f_c === false &&
                                  pincode_error_f_c === false &&
                                  pincode_error2_f_c === true ? (
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
                            <div className="mb-2">
                              <Label className="header-child">Locality*</Label>
                              <SearchInput
                                data_list={locality_list_s_c}
                                setdata_list={setlocality_list_s_c}
                                data_item_s={locality_c}
                                set_data_item_s={setlocality_c}
                                set_id={setlocality_id_f_c}
                                page={locality_page_c}
                                setpage={setlocality_page_c}
                                setsearch_item={setlocality_search_item_c}
                                search_item={locality_search_item_c}
                                error_message={"Please Select Any Locality"}
                                error_s={locality_error_c}
                                loaded={localityc_loaded}
                                count={localityc_count}
                                bottom={localityc_bottom}
                                setbottom={setlocalityc_bottom}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Address Line
                              </Label>
                              <Input
                                value={consignee_address}
                                id="input"
                                onChange={(e) => {
                                  setconsignee_address(e.target.value);
                                }}
                              />
                            </div>
                          </Col>
                        </>
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}

        {/*Eway Bill through  Shipper Info*/}
        {eway_confirm ? (
          <div className="m-3" id="shipper">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Shipper Info
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle12}>
                        {circle_btn12 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </CardTitle>
                {circle_btn12 ? (
                  <CardBody>
                    <Row>
                      <>
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-3">
                            <Label className="header-child">Shipper *</Label>
                            {isupdating ? (
                              <Input value={eway_detail_l.shipper} disabled />
                            ) : (
                              <Input value={eway_list?.fromTrdName} disabled />
                            )}
                          </div>
                        </Col>

                        <>
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">State</Label>

                              {isupdating ? (
                                <Input
                                  value={eway_detail_l.shipper_state}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              ) : (
                                <Input
                                  value={from_address.state_name}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              )}
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Pincode</Label>
                              {isupdating ? (
                                <Input
                                  value={eway_detail_l.shipper_pincode}
                                  disabled
                                />
                              ) : (
                                <Input
                                  value={from_address.pincode_name}
                                  type="text"
                                  className="form-control-md"
                                  id="input"
                                  disabled
                                />
                              )}
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Locality shipper
                              </Label>

                              <NSearchInput
                                data_list={locality_list}
                                data_item_s={locality_sel}
                                set_data_item_s={setlocality_sel}
                                set_id={setlocality_id}
                                show_search={false}
                                error_message={"Please Select Locality Type"}
                              // error_s={branch_type_error}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Address Line
                              </Label>
                              {
                                isupdating ? (
                                  <div
                                    style={{
                                      border: "1px solid",
                                      padding: "8px",
                                      backgroundColor: "#eff2f7",
                                      borderRadius: 5,
                                      borderColor: "#aaa",
                                    }}
                                  >
                                    {eway_detail_l.shipper_address1}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      border: "1px solid",
                                      padding: "8px",
                                      backgroundColor: "#eff2f7",
                                      borderRadius: 5,
                                      borderColor: "#aaa",
                                    }}
                                  >
                                    {eway_list.fromAddr1 +
                                      "," +
                                      eway_list.fromAddr2}
                                  </div>
                                )
                                // {/* <Input

                                //                                 value={eway_list.fromAddr1 + eway_list.fromAddr2}
                                //                                 type="text"
                                //                                 className="w-100"
                                //                                 id="input"
                                //                                 disabled
                                //                               /> */}
                              }
                            </div>
                          </Col>
                        </>
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        ) : null}

        {/* Eway Bill Through Cosignee Info*/}
        {eway_confirm ? (
          <div className="m-3" id="consignee">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Consignee Info
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
                      <>
                        <Col lg={4} md="6" sm="6">
                          <div className="mb-3">
                            <Label className="header-child">Consignee *</Label>
                            {isupdating ? (
                              <Input value={eway_detail_l.consignee} disabled />
                            ) : (
                              <Input value={eway_list?.toTrdName} disabled />
                            )}
                          </div>
                        </Col>

                        {eway_list && (
                          <>
                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">State</Label>
                                {isupdating ? (
                                  <Input
                                    value={eway_detail_l.consignee_state}
                                    disabled
                                  />
                                ) : (
                                  <Input
                                    value={to_address.state_name}
                                    disabled
                                  />
                                )}
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Pincode</Label>
                                {isupdating ? (
                                  <Input
                                    value={eway_detail_l.consignee_pincode}
                                    disabled
                                  />
                                ) : (
                                  <Input
                                    value={to_address.pincode_name}
                                    disabled
                                  />
                                )}
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">Locality</Label>
                                <NSearchInput
                                  data_list={locslity_to_list}
                                  data_item_s={locality_sel_to}
                                  set_data_item_s={setlocality_sel_to}
                                  set_id={setlocality_id_to}
                                  show_search={false}
                                  error_message={"Please Select Locality Type"}
                                // error_s={branch_type_error}
                                />
                              </div>
                            </Col>

                            <Col lg={4} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Address Line
                                </Label>
                                {isupdating ? (
                                  <Input
                                    value={eway_detail_l.consignee_address1}
                                    disabled
                                  />
                                ) : (
                                  // <Input value={eway_list?.toAddr1} disabled />
                                  <div
                                    style={{
                                      border: "1px solid",
                                      padding: "8px",
                                      backgroundColor: "#eff2f7",
                                      borderRadius: 5,
                                      borderColor: "#aaa",
                                    }}
                                  >
                                    {eway_list.toAddr1 +
                                      "," +
                                      eway_list.toAddr2}
                                  </div>
                                )}
                              </div>
                            </Col>
                          </>
                        )}
                      </>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        ) : null}

        {/*  Cold Chain Info Started  */}
        {cold_chain && (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Cold Chain Info
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
                      <Col lg={2} md={2} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Qil Provide Asset
                          </Label>
                          <br />
                          <Input
                            className="form-check-input-sm"
                            type="checkbox"
                            // value="false"
                            id="defaultCheck1"
                            onClick={() => {
                              setasset_prov(!asset_prov);
                            }}
                            readOnly={true}
                            checked={asset_prov}
                            disabled={isupdating}
                          />
                        </div>
                      </Col>
                      {asset_prov && (
                        <Col lg={4} md={6} sm={6}>
                          <div className="mb-2">
                            <Label className="header-child">Asset Type *</Label>
                            <NSearchInput
                              data_list={asset_info_list}
                              data_item_s={asset_info_selected}
                              show_search={false}
                              set_data_item_s={setasset_info_selected}
                            />
                          </div>
                        </Col>
                      )}
                      {asset_info_selected === "With Box" ? (
                        <>
                          <Col lg={12} md={6} sm={6}>
                            <Label className="header-child">Box No*</Label>
                            <TransferList
                              list_a={box_list_1}
                              setlist_a={setbox_list_1}
                              list_b={box_list_2}
                              setlist_b={setbox_list_2}
                              page={box_list_page}
                              setpage={setbox_list_page}
                              setsearch_item={setsearch_logger}
                            // setlist_id={}
                            />
                          </Col>
                        </>
                      ) : null}

                      {asset_info_selected === "With Logger" ? (
                        <>
                          <Col lg={12} md={6} sm={6}>
                            <Label className="header-child">Logger No *</Label>
                            <TransferList
                              list_a={Logger_list}
                              setlist_a={setLogger_list}
                              list_b={Logger_Selected}
                              setlist_b={setLogger_Selected}
                              page={Logger_page}
                              setpage={setLogger_page}
                              setsearch_item={setsearch_logger}
                            // setlist_id={}
                            />
                          </Col>
                        </>
                      ) : null}

                      {asset_info_selected === "With Box + With Logger" ? (
                        <>
                          <Col lg={6} md={6} sm={6}></Col>
                          <Col lg={6} md={6} sm={12}>
                            <div style={{ width: "" }}>
                              <Label className="header-child">
                                Logger No *
                              </Label>
                              <TransferList
                                list_a={Logger_list}
                                setlist_a={setLogger_list}
                                list_b={Logger_Selected}
                                setlist_b={setLogger_Selected}
                                page={Logger_page}
                                setpage={setLogger_page}
                                setsearch_item={setsearch_logger}
                                width={"width"}
                              // setlist_id={}
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <div style={{ width: "", marginLeft: "" }}>
                              <Label className="header-child">Box No. *</Label>
                              <TransferList
                                list_a={box_list_1}
                                setlist_a={setbox_list_1}
                                list_b={box_list_2}
                                setlist_b={setbox_list_2}
                                width={"width"}
                                page={box_list_page}
                                setpage={setbox_list_page}
                                setsearch_item={setsearch_logger}
                              // setlist_id={}
                              />
                            </div>
                          </Col>
                        </>
                      ) : null}
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )}

        {/* Eway Bill  */}
        {/* {ewaybill && (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Eway Bill Info
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
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">Ewaybill No *</Label>
                          <Input
                            onBlur={validation.handleBlur}
                            value={validation.values.ewaybill_no}
                            type="text"
                            label="First Name"
                            // name="docket_no"
                            id="input"
                            className="form-control-md"
                            placeholder="Enter Ewaybill No"
                           
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
          </div>
        )} */}

        {/* Tariff Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Tariff Info
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
                    <Col lg={4} md={6} sm={6}>
                      <Label className="header-child">Commodity *</Label>
                      <SearchInput
                        data_list={client_commidities_list}
                        setdata_list={setclient_commidities_list}
                        data_item_s={commodity}
                        set_data_item_s={setcommodity}
                        set_id={setcommodity_id}
                        page={page}
                        setpage={setpage}
                        setsearch_item={setsearch_commodity}
                        error_message={"Please Select Any Commodity"}
                        error_s={commodity_error}
                        loaded={commodity_loaded}
                        count={commodity_count}
                        bottom={commodity_bottom}
                        setbottom={setcommodity_bottom}
                      />
                      {/* {commodity_error ? (
                        <div className="mt-1 error-text" color="danger">
                          Please Select Any Commodity
                        </div>
                      ) : null} */}
                    </Col>

                    {delivery_type === "LOCAL" ? (
                      <Col lg={4} md={6} sm={6}>
                        <Label className="header-child">
                          Local Delivery Type *{" "}
                        </Label>
                        <NSearchInput
                          data_list={local_delivery_type_list}
                          data_item_s={local_delivery_type}
                          set_data_item_s={setlocal_delivery_type}
                          error_message={"Select local delivery type"}
                          show_search={false}
                          error_s={local_delivery_type_error}
                        />
                      </Col>
                    ) : null}

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">COD *</Label>
                        <NSearchInput
                          data_list={cod_list}
                          data_item_s={d_cod}
                          set_data_item_s={setd_cod}
                          show_search={false}
                          error_message={"Select any option"}
                          error_s={d_cod_error}
                        />
                        {/* <div className="mt-1 error-text" color="danger">
                          {d_cod_error ? "Select COD Type" : null}
                        </div> */}
                      </div>
                    </Col>

                    {d_cod === "Yes" ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label className="header-child">
                            Transportation cost
                          </Label>
                          <Input
                            min={0}
                            onChange={(val) => {
                              settransportation_cost(val.target.value);
                              if (val.target.value !== "") {
                                settransportation_cost_err(false);
                              }
                            }}
                            onBlur={() => {
                              if (transportation_cost === "") {
                                settransportation_cost_err(true);
                              }
                            }}
                            value={transportation_cost}
                            type="number"
                            name="transportation_cost"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Transportation cost"
                          />
                        </div>

                        {transportation_cost_err && (
                          <div
                            style={{
                              color: "red",
                              marginTop: -15,
                              fontSize: 12,
                            }}
                          >
                            Please Add Transportation Cost
                          </div>
                        )}
                      </Col>
                    ) : null}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Total Quantity *</Label>
                        <Input
                          min={0}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.total_quantity || ""}
                          invalid={
                            validation.touched.total_quantity &&
                              validation.errors.total_quantity
                              ? true
                              : false
                          }
                          type="number"
                          name="total_quantity"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Total Quantity"
                        />
                        {validation.touched.total_quantity &&
                          validation.errors.total_quantity ? (
                          <FormFeedback type="invalid">
                            {validation.errors.total_quantity}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {order_type == "Issue" && returned_data.length !== 0 && (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Total Delivered PCS
                          </Label>
                          <Input
                            value={total_delivered_pcs}
                            type="number"
                            name="total_delivered_pcs"
                            className="form-control-md"
                            id="input"
                            disabled
                          />
                        </div>
                      </Col>
                    )}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Actual Weight</Label>
                        <Input
                          min={0}
                          onChange={(e) => setactual_weigth(e.target.value)}
                          value={actual_weigth}
                          type="number"
                          name="actual_weight"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Actual Weight"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Chargeable Weight
                        </Label>
                        <Input
                          disabled
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chargeable_weight || ""}
                          type="number"
                          lname="chargeable_weight"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Chargeable Weight"
                        />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-2">
                        <Label className="header-child">Remarks</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.remarks || ""}
                          type="Text"
                          name="remarks"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Remarks"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Status Info */}
        {isupdating ? (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded" id="status_info">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Status Info
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {
                        // current_status !== "Shipment Arrived at Hub" &&
                        // current_status !== "Shipment In Transit" &&
                        // current_status !==
                        // "Shipment Arrived at Destination Hub" &&
                        // current_status !== "Shipment Delivered" &&
                        user.is_superuser && (
                          <span>
                            <Button
                              type="button"
                              className="btn btn-info mx-1 cu_btn "
                              onClick={() => {
                                if (
                                  order.current_status === "SHIPMENT PICKED UP"
                                ) {
                                  navigate("/manifest/pickeduporders");
                                } else {
                                  navigate("/booking/orders/adddocketstatus", {
                                    state: { order: order, type: "add" },
                                  });
                                }
                              }}
                            >
                              Add Status
                            </Button>
                          </span>
                        )
                      }

                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle_a}>
                          {circle_btn_a ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </div>
                </CardTitle>
                {circle_btn_a ? (
                  <>
                    <div
                      style={{
                        maxHeight: "351px",
                        // maxHeight: "70px",
                        overflowY: "scroll",
                      }}
                    >
                      <DataList
                        Data_Title={StatusInfoDataTitle}
                        Data_Format={StatusInfoDataFormat}
                        order_id={order.docket_no}
                        checkbox={"NO"}
                      />
                    </div>
                  </>
                ) : null}
              </Card>
            </Col>
          </div>
        ) : null}

        {/*Delivery Info */}
        {isupdating && user.is_superuser && order.is_delivered ? (
          <div className="m-3">
            <Col lg={12}>
              <Card className="shadow bg-white rounded" id="status_info">
                <CardTitle className="mb-1 header">
                  <div className="header-text-icon header-text">
                    Delivery Info
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <IconContext.Provider
                        value={{
                          className: "header-add-icon",
                        }}
                      >
                        <div onClick={toggle_circle_del}>
                          {circle_del_btn ? (
                            <MdRemoveCircleOutline />
                          ) : (
                            <MdAddCircleOutline />
                          )}
                        </div>
                      </IconContext.Provider>
                    </div>
                  </div>
                </CardTitle>
                {circle_del_btn ? (
                  <>
                    <div
                      style={{
                        maxHeight: "351px",
                        // maxHeight: "70px",
                        overflowY: "scroll",
                      }}
                    >
                      <DataList
                        Data_Title={DeliveryInfoDataTitle}
                        Data_Format={DeliveryInfoDataFormat}
                        order_id={order.id}
                        checkbox={"NO"}
                      />
                    </div>
                  </>
                ) : null}
              </Card>
            </Col>
          </div>
        ) : null}

        {/* Packages */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 ">
                <div className="btn-header">
                  <div className="btn-subheader">
                    <div
                      id="packages"
                      value="first"
                      style={{
                        background:
                          order_active_btn === "first" ? "#C4D7FE" : null,
                      }}
                      className="btn1 footer-text"
                      onClick={() => {
                        setorder_active_btn("first");
                        updateCurrentStep(1);
                      }}
                    >
                      Packages
                    </div>
                    <div
                      id="images"
                      value="second"
                      style={{
                        background:
                          order_active_btn === "second" ? "#C4D7FE" : null,
                      }}
                      className="btn2 footer-text"
                      onClick={() => {
                        setorder_active_btn("second");
                        updateCurrentStep(2);
                      }}
                    >
                      Order Images
                    </div>
                    <div
                      style={{
                        background:
                          order_active_btn === "third" ? "#C4D7FE" : null,
                      }}
                      className="btn3 footer-text"
                      onClick={() => {
                        setorder_active_btn("third");
                        updateCurrentStep(3);
                      }}
                    >
                      Invoices
                    </div>
                    {cold_chain && (
                      <div
                        style={{
                          background:
                            order_active_btn === "forth" ? "#C4D7FE" : null,
                        }}
                        className="btn3 footer-text"
                        onClick={() => {
                          setorder_active_btn("forth");
                          // updateCurrentStep(3);
                        }}
                      >
                        Logger Report
                      </div>
                    )}
                    {validation.values.total_quantity > 0 && (
                      <div
                        style={{
                          background:
                            order_active_btn === "fifth" ? "#C4D7FE" : null,
                        }}
                        className="btn3 footer-text"
                        onClick={() => {
                          setorder_active_btn("fifth");
                          // updateCurrentStep(3);
                        }}
                      >
                        Box Barcode
                      </div>
                    )}
                  </div>
                  <div className="btn-icon">
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
                </div>
              </CardTitle>

              {circle_btn4 ? (
                <CardBody>
                  {order_active_btn === "first" ? (
                    <>
                      <Row className="hide">
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Length (Cm)</Label>
                            {row.map((item, index) => {
                              return (
                                <Input
                                  min={0}
                                  key={index}
                                  value={item[0]}
                                  type="number"
                                  className="form-control-md"
                                  id="input"
                                  style={{ marginBottom: "15px" }}
                                  placeholder="Enter Packages Length "
                                  onChange={(val) => {
                                    setlength(val.target.value);
                                    item[0] = val.target.value;
                                  }}
                                  onFocus={() => {
                                    setclicked(true);
                                  }}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Breadth (Cm)</Label>
                            {row.map((item, index) => (
                              <Input
                                min={0}
                                key={index}
                                value={item[1]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Packages Breadth"
                                onChange={(val) => {
                                  setbreadth(val.target.value);
                                  item[1] = val.target.value;
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                        <Col md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Height (Cm)</Label>
                            {row.map((item, index) => (
                              <Input
                                min={0}
                                key={index}
                                value={item[2]}
                                type="number"
                                className="form-control-md d"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Packages Height"
                                onChange={(val) => {
                                  setheight(val.target.value);
                                  item[2] = val.target.value;
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                        <Col md={row.length > 1 ? 2 : 3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">No of Pieces</Label>
                            {row.map((item, index) => (
                              <Input
                                min={0}
                                key={index}
                                // value={item[3] + pieces}
                                value={item[3]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter No of Pieces"
                                onChange={(val) => {
                                  setpieces(val.target.value);
                                  item[3] = val.target.value;
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
                              if (length && breadth && height && pieces) {
                                addPackage();
                              } else {
                                alert("Packages is required");
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
                            Add Another Packages
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {order_active_btn === "second" ? (
                    <Row className="hide">
                      <Col md={5} sm={5}>
                        <div className="mb-3">
                          <Label className="header-child">Image</Label>
                          {/* {row1.map((item1, index1) => (
                            <Input
                              style={{ marginBottom: "15px" }}
                              key={index1}
                              className="form-control-md"
                              type="file"
                              id="input"
                              onClick={(event) => {
                                // setshowModalOrder(true)
                                setSelectedFile(event.target.files[0]);
                                item1[0] = event.target.files;
                              }}
                            />
                          ))} */}
                          {row1[row1.length - 1][0] !== ""
                            ? row1
                              .filter((e) => e[0] !== "")
                              .map((item1, index1) => {
                                // console.log("item!1111111111111111111111111111111111",item1)
                                return (
                                  <div style={{ width: "100%" }} key={index1}>
                                    <img
                                      src={item1[0]}
                                      style={{
                                        height: "110px",
                                        width: "110px",
                                        borderRadius: "10px",
                                        padding: 20,
                                      }}
                                      onClick={() => {
                                        // setshowModalOrder({
                                        //   ...showModalOrder,
                                        //   value: true,
                                        //   ind: index1,
                                        // });
                                      }}
                                    />
                                  </div>
                                );
                              })
                            : null}

                          {row1[row1.length - 1][0] === "" ? (
                            <div style={{ height: "110px", paddingTop: 35 }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  border: "0.5px solid #dad7d7",
                                  alignItems: "center",
                                  height: "38px",
                                  borderRadius: 5,
                                  height: 31,
                                }}
                                onClick={() => {
                                  setshowModalOrder({
                                    ...showModalOrder,
                                    value: true,
                                  });
                                }}
                              >
                                <a style={{ marginLeft: "3px", fontSize: 11 }}>
                                  Chooose File
                                </a>
                                <div
                                  style={{
                                    fontSize: "25px",
                                    color: "#dad7d7",
                                    marginLeft: "5px",
                                  }}
                                >
                                  |
                                </div>
                                {selectedFile === "" ? (
                                  <a style={{ fontSize: 11 }}>
                                    Image Not Uploaded
                                  </a>
                                ) : (
                                  <a style={{ fontSize: 11 }}>Image Uploaded</a>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={5} sm={5}>
                        <div className="mb-3">
                          <Label className="header-child">Caption</Label>
                          {row1.map((item1, index1) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index1}
                            >
                              {console.log("222222222222222222222222", item1)}
                              <select
                                disabled={item1[2] ? true : false}
                                style={{
                                  marginBottom: "15px",
                                  boxShadow: "none",
                                }}
                                className="form-select"
                                placeholder="Select status"
                                id="input"
                                value={item1[1]}
                                onChange={(val) => {
                                  setcaption1(val.target.value);
                                  item1[1] = val.target.value;
                                  row3[index1][1] = val.target.value;
                                }}
                                defaultValue="Select status"
                              >
                                <option value={item1[1]} disabled selected>
                                  {item1[1] ? item1[1] : "Select Value"}
                                </option>
                                <option>Parcel Image</option>
                                <option>eWaybill Image</option>
                                <option>Order Image</option>
                                <option>Weight Image</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </Col>
                      {/* <Col md={1} sm={5}>
                        <Button title="Add" style={{ backgroundColor: "blue", marginTop: 25, maxHeight: 32, alignItems: 'center', justifyContent: 'center' }}>Add</Button>
                      </Col> */}
                      {showModalOrder.value ? (
                        <Main_c
                          modal={showModalOrder.value}
                          modal_set={() => {
                            setshowModalOrder({
                              ...showModalOrder,
                              value: false,
                            });
                          }}
                          upload_image={(val) => {
                            setdocumentOrder(val);
                            if (showModalOrder.ind !== "") {
                              row3[showModalOrder.ind][0] = val;
                              setshowModalOrder({
                                ...showModalOrder,
                                value: false,
                                ind: "",
                              });
                            } else {
                              row3[row3.length - 1][0] = val;
                            }
                          }}
                          result_image={(val) => {
                            setSelectedFile(val);
                            if (showModalOrder.ind !== "") {
                              row1[showModalOrder.ind][0] = val;
                            } else {
                              row1[row1.length - 1][0] = val;
                            }
                            // setdoc_result_image([...doc_result_image, val])
                          }}
                        />
                      ) : null}
                      <Col md={1}>
                        <div className="mb-3" style={{ textAlign: "center" }}>
                          {row1.length > 1 ? (
                            <Label className="header-child">Delete</Label>
                          ) : null}
                          {row1.map((item1, index1) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index1}
                            >
                              <IconContext.Provider
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row1.length > 1 ? (
                                  <>
                                    <div
                                      onClick={() => {
                                        if (item1[2]) {
                                          deleteOrderImg(item1);
                                          console.log(
                                            "11111111111111",
                                            item1[2]
                                          );
                                        } else {
                                          deleteimage(item1);
                                          setSelectedFile(
                                            row1[row1.length - 1][0]
                                          );
                                          setcaption1(row1[row1.length - 1][1]);
                                        }
                                      }}
                                    >
                                      <MdDeleteForever
                                        color="red"
                                        size={26}
                                        style={{
                                          alignItems: "center",
                                          background: "",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            </div>
                          ))}
                        </div>
                      </Col>

                      <div>
                        <span
                          className="link-text"
                          onClick={() => {
                            if (
                              row1[row1.length - 1][0] &&
                              row1[row1.length - 1][1]
                            ) {
                              setshowModalOrder({
                                ...showModalOrder,
                                value: false,
                                ind: "",
                              });
                              addorderimage();
                            } else {
                              alert("Order images is required");
                            }
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              className: "icon",
                            }}
                          >
                            <MdAdd />
                          </IconContext.Provider>
                          Add Another Order Images
                        </span>
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}
                  {order_active_btn === "third" ? (
                    <Row>
                      {showModalInvoice.value ? (
                        <Main_c
                          modal={showModalInvoice.value}
                          modal_set={() => {
                            setshowModalInvoice({
                              ...showModalInvoice,
                              value: false,
                            });
                          }}
                          upload_image={(val) => {
                            if (showModalInvoice.ind !== "") {
                              row4[showModalInvoice.ind][0] = val;
                              setshowModalInvoice({
                                ...showModalInvoice,
                                value: false,
                                ind: "",
                              });
                            } else {
                              row4[row4.length - 1][0] = val;
                            }
                          }}
                          result_image={(val) => {
                            if (showModalInvoice.ind !== "") {
                              row2[showModalInvoice.ind][0] = val;
                            } else {
                              row2[row2.length - 1][0] = val;
                              setinvoice_img(val);
                            }
                          }}
                        />
                      ) : null}
                      <Col md={row2.length > 1 ? 3 : 2} sm={2}>
                        <div className="mb-3">
                          <Label className="header-child">EwayBill No</Label>
                          {row2.map((item2, index2) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index2}
                            >
                              <Input
                                min={0}
                                key={index2}
                                value={item2[0]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter EwayBill No"
                                onChange={(val) => {
                                  if (val.target.value.length === 13) {
                                    sete_waybill_inv(val.target.value);
                                    item2[0] = val.target.value;
                                    row4[index2][0] = val.target.value;
                                  } else if (val.target.value.length < 13) {
                                    sete_waybill_inv(val.target.value);
                                    item2[0] = val.target.value;
                                    row4[index2][0] = val.target.value;
                                  }
                                }}
                                disabled={eway_confirm && index2 == 0}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                      <Col md={2} sm={2}>
                        <div className="mb-3">
                          <Label className="header-child">Invoices Date</Label>
                          {row2.map((item2, index2) => (
                            <div
                              key={index2}
                              style={{ height: "110px", paddingTop: 35 }}
                            >
                              <input
                                style={{ marginBottom: "15px" }}
                                type="date"
                                className="form-control d-block form-control-md"
                                id="input"
                                value={row2[index2][1]}
                                onChange={(event) => {
                                  settoday(event.target.value[1]);
                                  item2[1] = event.target.value;
                                  row4[index2][1] = event.target.value;
                                }}
                                disabled={eway_confirm && index2 == 0}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                      <Col md={2} sm={2}>
                        <div className="mb-3">
                          <Label className="header-child">Invoice Number</Label>
                          {row2.map((item2, index2) => {
                            return (
                              <div
                                style={{ height: "110px", paddingTop: 35 }}
                                key={index2}
                              >
                                {console.log("item99999999=======", item2)}

                                {eway_confirm ? (
                                  <Input
                                    min={0}
                                    key={index2}
                                    value={item2[2]}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Invoice No"
                                    onChange={(val) => {
                                      setinvoice_no(val.target.value);
                                      item2[2] = val.target.value;
                                      // row4[index2][2] = eway_list.docNo;
                                    }}
                                  />
                                ) : (
                                  <Input
                                    min={0}
                                    key={index2}
                                    value={item2[2]}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Invoice No"
                                    onChange={(val) => {
                                      setinvoice_no(val.target.value);
                                      item2[2] = val.target.value;
                                      row4[index2][2] = val.target.value;
                                    }}
                                    disabled={eway_confirm && index2 == 0}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                      <Col md={2} sm={2}>
                        <div className="mb-3">
                          <Label className="header-child">Invoice Amount</Label>
                          {row2.map((item2, index2) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index2}
                            >
                              {/* {
                                row2[0]
                              } */}
                              <Input
                                min={0}
                                key={index2}
                                value={item2[3]}
                                type="number"
                                className="form-control-md"
                                id="input"
                                style={{ marginBottom: "15px" }}
                                placeholder="Enter Amount"
                                onChange={(val) => {
                                  setinvoice_value(val.target.value);
                                  item2[3] = val.target.value;
                                  row4[index2][3] = val.target.value;
                                }}
                                disabled={eway_confirm && index2 == 0}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                      <Col md={2} sm={2}>
                        <div className="mb-3">
                          <Label className="header-child">Invoice Images</Label>

                          {/* {row2[row2.length - 1][0] !== ""
                            ? row2
                                .filter((e) => e[0] !== "")
                                .map((item1, index1) => {
                                  return (
                                    <div style={{ width: "100%" }} key={index1}>
                                      <img
                                        src={item1[0]}
                                        style={{
                                          height: "110px",
                                          width: "110px",
                                          borderRadius: "10px",
                                          // padding: 20,
                                        }}
                                        onClick={() => {
                                          setshowModalInvoice({
                                            ...showModalInvoice,
                                            value: true,
                                            ind: index1,
                                          });
                                        }}
                                      />
                                    </div>
                                  );
                                })
                            : null} */}
                          {row2[row2.length - 1][0] === "" ? (
                            <div style={{ height: "110px", paddingTop: 35 }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  border: "0.5px solid #dad7d7",
                                  alignItems: "center",
                                  height: "38px",
                                  borderRadius: 5,
                                  height: 31,
                                }}
                                onClick={() => {
                                  setshowModalInvoice({
                                    ...showModalInvoice,
                                    value: true,
                                  });
                                }}
                              >
                                <a style={{ marginLeft: "3px", fontSize: 11 }}>
                                  Chooose File
                                </a>
                                <div
                                  style={{
                                    fontSize: "25px",
                                    color: "#dad7d7",
                                    marginLeft: "5px",
                                  }}
                                >
                                  |
                                </div>
                                {invoice_img === "" ? (
                                  <a style={{ fontSize: 11 }}>
                                    Image Not Uploaded
                                  </a>
                                ) : (
                                  <a style={{ fontSize: 11 }}>Image Uploaded</a>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={1}>
                        <div className="mb-3" style={{ textAlign: "center" }}>
                          {row2.length > 1 ? (
                            <Label className="header-child">Delete</Label>
                          ) : null}
                          {row2.map((item2, index2) => (
                            <div
                              style={{ height: "110px", paddingTop: 35 }}
                              key={index2}
                            >
                              <IconContext.Provider
                                key={index2}
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row2.length > 1 ? (
                                  <>
                                    <div
                                      onClick={() => {
                                        if (item2[4]) {
                                          console.log(
                                            "item2aaaaaaaaaaaaa",
                                            item2[4]
                                          );
                                          deleteInvoiceImg(item2);
                                        } else {
                                          deleteinvoice(item2);
                                          setinvoice_img(
                                            row2[row2.length - 1][0]
                                          );
                                          settoday(row2[row2.length - 1][1]);
                                          setinvoice_no(
                                            row2[row2.length - 1][2]
                                          );
                                          setinvoice_value(
                                            row2[row2.length - 1][3]
                                          );
                                        }
                                      }}
                                    >
                                      <MdDeleteForever
                                        color="red"
                                        size={27}
                                        style={{
                                          alignItems: "center",
                                          background: "",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </IconContext.Provider>
                            </div>
                          ))}
                        </div>
                      </Col>
                      <div>
                        <span
                          className="link-text"
                          onClick={() => {
                            if (
                              row2[row2.length - 1][0] !== "" &&
                              row2[row2.length - 1][1] !== "" &&
                              row2[row2.length - 1][2] !== "" &&
                              row2[row2.length - 1][3] !== ""
                            ) {
                              setshowModalInvoice({
                                ...showModalInvoice,
                                value: false,
                                ind: "",
                              });
                              addinvoice();
                            } else {
                              alert("Invoice is required");
                            }
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              className: "icon",
                            }}
                          >
                            <MdAdd />
                          </IconContext.Provider>
                          Add Another Invoices
                        </span>
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}
                  {order_active_btn === "forth" && cold_chain ? (
                    <>
                      <Row className="hide">
                        <Col lg={3} md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">
                              Upload Report
                            </Label>
                            {row5.map((item, index) => {
                              console.log("row5---log----", row5);
                              return (
                                <Input
                                  min={0}
                                  key={index}
                                  // value={item[0]}
                                  type="file"
                                  className="form-control-md"
                                  id="input"
                                  style={{ marginBottom: "15px" }}
                                  placeholder="Enter Packages Length "
                                  onChange={(val) => {
                                    setlogger_pdf(val.target.files[0]);
                                    item[0] = val.target.files;
                                  }}
                                  onFocus={() => {
                                    setclicked(true);
                                  }}
                                />
                              );
                            })}
                          </div>
                        </Col>

                        <Col lg={4} md={3} sm={3}>
                          <div className="mb-3">
                            <Label className="header-child">Details</Label>
                            {row5.map((item, index) => {
                              return (
                                <div style={{ height: "50px" }}>{item[1]}</div>
                              );
                            })}
                          </div>
                        </Col>

                        <Col lg={1}>
                          <div className="mb-3" style={{ textAlign: "center" }}>
                            {row5.length > 1 ? (
                              <Label className="header-child">Delete</Label>
                            ) : null}
                            {row5.map((item, index) => (
                              <IconContext.Provider
                                key={index}
                                value={{
                                  className: "icon multi-input",
                                }}
                              >
                                {row5.length > 1 ? (
                                  <>
                                    <div style={{ height: "14px" }}></div>
                                    <div
                                      onClick={() => {
                                        deleteLogger(item);
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
                              if (logger_pdf) {
                                addLogger();
                              } else {
                                alert("Logger Report is required");
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
                            Add Another Report
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {order_active_btn === "fifth" &&
                    validation.values.total_quantity > 0 && (
                      <>
                        <Row className="hide">
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Enter Value*
                              </Label>
                              {row6.map((item, index) => {
                                console.log("item-------", item);
                                return (
                                  <Input
                                    min={0}
                                    key={index}
                                    value={item[0]}
                                    type="text"
                                    className="form-control-md"
                                    id="input"
                                    style={{ marginBottom: "15px" }}
                                    placeholder="Enter Value"
                                    onChange={(val) => {
                                      setbox_bq(val.target.value);
                                      item[0] = val.target.value;
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Footer Btn*/}

        <div className="page-control m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              {currentStep !== 1 && (
                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  disabled={currentStep === 1}
                  onClick={() => updateStep(currentStep - 1)}
                >
                  <BiSkipPrevious size={18} /> Previous
                </Button>
              )}
              {currentStep !== labelArray.length && (
                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  // disabled={currentStep === labelArray.length}
                  onClick={() => updateStep(currentStep + 1)}
                >
                  Next <BiSkipNext size={18} />
                </Button>
              )}
              {currentStep === labelArray.length && (
                <Button
                  type="submit"
                  className={
                    isupdating &&
                      (user.user_department_name + " " + user.designation_name ===
                        "DATA ENTRY OPERATOR" ||
                        user.user_department_name +
                        " " +
                        user.designation_name ===
                        "CUSTOMER SERVICE EXECUTIVE")
                      ? "btn btn-info m-1"
                      : !isupdating
                        ? "btn btn-info m-1"
                        : "btn btn-success m-1"
                  }
                  onClick={() => setsame_as(false)}
                >
                  {isupdating &&
                    (user.user_department_name + " " + user.designation_name ===
                      "DATA ENTRY OPERATOR" ||
                      user.user_department_name + " " + user.designation_name ===
                      "CUSTOMER SERVICE EXECUTIVE" ||
                      user.is_superuser)
                    ? "Update"
                    : !isupdating
                      ? "Save"
                      : "Approved"}
                </Button>
              )}

              {isupdating &&
                user.user_department_name + " " + user.designation_name !==
                "DATA ENTRY OPERATOR" &&
                user.user_department_name + " " + user.designation_name !==
                "CUSTOMER SERVICE EXECUTIVE" &&
                !user.is_superuser &&
                currentStep === labelArray.length && (
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
  );
};

export default AddOrder;
