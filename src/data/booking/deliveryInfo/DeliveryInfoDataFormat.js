/* eslint-disable */

import React, { useState, useEffect } from "react";
// import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { server_adgit dress } from '../../../constants/server_details';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { Modal } from "reactstrap";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Button } from "reactstrap";

const DeliveryInfoDataFormat = ({ order_id }) => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.alert.show_alert);

  // const active_order_last_del_info = useSelector(
  //   state => state.orders.last_active_order_del_info
  // );

  // Permissions
  const user_permissions = useSelector(
    (state) => state.permissions.user_permissions
  );

  // const active_order_id = useSelector(state => state.orders.active_order_id);
  // const active_order_no = useSelector(state => state.orders.active_order_no);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [delivery_list, setdelivery_list] = useState([]);

  const [modal_backdrop, setmodal_backdrop] = useState(false);
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

    // Get Order Delivery Data
    const getorder_delivery_data = () => {
      axios
        .get(
          ServerAddress +
          `booking/get_delivery_info/?order_id=${order_id}&p=1&records=50`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          console.log("response-----del----", response.data)
          setdelivery_list(response.data.results);
        })
        .catch((err) => {
          alert(`Error Occur while Order Delivery Info, ${err}`);
        });
    };

  // const delete_order_del_info = (id, del_info) => {
  //   axios
  //     .delete(ServerAddress + "booking/delete_order_del_info/" + id, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(function (resp) {
  //       if (resp.data.data == "Deleted") {
  //         dispatch(setShowAlert(true));
  //         dispatch(
  //           setDataExist(`del_info "${toTitleCase(del_info)}" Deleted Sucessfully`)
  //         );
  //         dispatch(setAlertType("danger"));
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error While delete Orders ${err}`);
  //     });
  // };

  useEffect(() => {
    if (order_id !=="") {
      getorder_delivery_data(order_id);
    }
  }, [order_id]);

  return (
    <>
      {delivery_list.length === 0
        ? " No Data Found"
        : delivery_list.map((del_info, index) => {
            let added_at = "-";
            if (del_info.created_date) {
              console.log("del_info.created_date----", del_info.created_date)
              let added_at_r = del_info.created_date.split("T");
              let date = added_at_r[0];
              let time = added_at_r[1].substring(0, 5);
              added_at = date + " " + time;
            }

            return (
              <>
                <tr
                  key={index}
                  style={{
                    borderWidth: 1,
                  }}
                >
                  <td>{toTitleCase(del_info.signature_person_name)}</td>
                  <td>
                      {del_info.signature_person_phone_number}
                  </td>
                  <td className="selection-cell">{added_at}</td>

                  <td>
                  <img src={del_info.pod_image} style={{width:70,height:50}}/>
                  </td>
                  <td>
                  <img src={del_info.image} style={{width:70,height:50}}/>
                  </td>
                </tr>

                <div></div>
              </>
            );
          })}
    </>
  );
};

export default DeliveryInfoDataFormat;
