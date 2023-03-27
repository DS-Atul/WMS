/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./unmanifest.css";
import EditManifestTitle from "./EditManifestTitle";
import { Button } from "reactstrap";
import { ServerAddress } from "../../../../constants/ServerAddress";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../../store/alert/Alert";
import Modal from "react-bootstrap/Modal";
import Remove from "../../../../assets/images/bookings/remove.png";
import toTitleCase from "../../../../lib/titleCase/TitleCase";

const EditManifestDataFormat = ({ Manifest_list }) => {
  console.log("Manifest_list----", Manifest_list);
  const dispatch = useDispatch();
  const [data_title, setdata_title] = useState(EditManifestTitle);
  const [manifest_number, setmanifest_number] = useState("");
  const [openMoal, setopenMoal] = useState(false);
  const [order_id, setorder_id] = useState("");
  console.log("order_id-------", order_id)
  console.log("manifest_number-----", manifest_number)
  const accessToken = useSelector((state) => state.authentication.access_token);

  const handleClose = () => {
    setopenMoal(false);
  };
  const delete_order_row = (id) => {
    axios
      .post(
        ServerAddress + "manifest/delete_manifest_order/",
        {
          order_id: id,
          manifest_number: manifest_number,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          setopenMoal(false);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
        }
      })

      .catch((err) => {
        alert(`Error While delete Manifest Order ${err}`);
      });
  };

  const handleModal = (a, b) => {
    setorder_id(a);
    setmanifest_number(b);
    setopenMoal(true);
  };

  return (
    <>
      <Modal show={openMoal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ marginLeft: "170px" }}>
            <img src={Remove} width="100vw" height="100vh" />
          </div>
          <div
            style={{ marginTop: "20px", fontSize: "14px", fontWeight: "bold" }}
          >
            Do You Really Want To Delete This Order From Manifest{" "}
            {manifest_number} ?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button
              color="success"
              onClick={() => {
                delete_order_row(order_id);
              }}
            >
              Yes
            </Button>
            <Button
              color="danger"
              onClick={() => {
                handleClose();
              }}
            >
              {" "}
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="table">
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {data_title.map((item, index) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Manifest_list.length === 0 ? (
              <tr>
                <td>Select Docket To Create Manifest</td>
              </tr>
            ) : (
              Manifest_list.map((order, index) => {
                let booking_date_n = order.booking_at
                  ? order.booking_at.split(1, 2)
                  : "none";
                return (
                  <tr
                    key={index}
                    style={{
                      borderWidth: 1,
                    }}
                  >
                    <td>{order.docket_number}</td>
                    <td>{toTitleCase(order.shipper_name)}</td>
                    <td>{toTitleCase(order.consignee_name)}</td>
                    <td>{order.pcs}</td>
                    <td>{order.weight}</td>
                    <td>{booking_date_n}</td>
                    <td>{toTitleCase(order.status)}</td>
                    <td>
                      {Manifest_list.length > 1 && (
                        <div
                          onClick={() => {
                            handleModal(order.docket_no, order.manifest_no);
                          }}
                        >
                          <Button
                            size="sm"
                            outline
                            color="danger"
                            type="button"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditManifestDataFormat;
