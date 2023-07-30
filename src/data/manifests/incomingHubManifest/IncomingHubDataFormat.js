import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
// import { setMain_checkbox } from "../../../store/Components/ListDisplay/Main_Checkbox/action";
import axios from "axios";
import pdf from "../../../assets/images/Pdf/printer.png";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setIsDeleted,
  setPageNumber,
  setToggle,
} from "../../../store/pagination/Pagination";
import {
  setClose,
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Button, Input } from "reactstrap";
import { MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import cross from "../../../assets/images/ComponentsIcon/cross.png";
import correct from "../../../assets/images/ComponentsIcon/check-mark.png";
import { BsPrinterFill } from "react-icons/bs";

const IncomingHubDataFormat = ({ data, data1 }) => {
  console.log("data-hub-----", data)
  // Permissions
  const user_permissions = useSelector(
    (state) => state.permissions.user_permissions
  );

  const dispatch = useDispatch();
  const cust_user_permissions = useSelector(
    (state) => state.permissions.cust_user_permissions
  );

  const searchData = useSelector((state) => state.searchbar.search_item);
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const select = useSelector((state) => state.datalist.select);
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);
  const [manifest_no, setmanifest_no] = useState("")
  //    UseState
  const [openModal, setopenModal] = useState(false);
  const closeModal = () => setopenModal(false);
  const [asset_barcode, setasset_barcode] = useState("");
  const [asset_id, setasset_id] = useState("");
  const ids = useSelector((state) => state.datalist.ids);
  let is_superuser = useSelector(
    (state) => state.authentication.userdetails.is_superuser
  );

  const [click, setclick] = useState(true);

  // const deleteCharge = (id) => {
  //   axios
  //     .post(
  //       ServerAddress + "master/delete-asset-info/",
  //       {
  //         data: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       if (response.statusText === "OK") {
  //         dispatch(setDeleteId(false));
  //         setclick(false);
  //         dispatch(setIds([]));
  //         dispatch(setSelect(false));
  //         setselected([]);
  //         dispatch(setShowAlert(true));
  //         dispatch(setDataExist(`Data Deleted Sucessfully`));
  //         dispatch(setAlertType("danger"));
  //         dispatch(setIsDeleted("Yes"));
  //         dispatch(setToggle(true));
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error While delete Asset ${err}`);
  //     });
  // };

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  const handlefunn = (id) => {
    if (selected.includes(id)) {
      let lis = [...selected];
      setselected(lis.filter((e) => e !== id));
    } else {
      setselected([...selected, id]);
    }
  };

  useEffect(() => {
    dispatch(setIds(selected));
  }, [selected]);

  useEffect(() => {
    if (select_all === true) {
      setselected(ids);
    }
  }, [select_all, ids]);

  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);

  useEffect(() => {
    if (close === true) {
      setselected([]);
    }
  }, [close]);

  // useEffect(() => {
  //   if (delete_id == true) {
  //     deleteCharge(ids);
  //   }
  // }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index == 0) {
      dispatch(setIndexValue("asset_id"));
    } else if (index == 1) {
      dispatch(setIndexValue("barcode"));
    }
  }, [index]);


  const handleModal = (manifest_no) => {
    setmanifest_no(manifest_no);
    setopenModal(true);
  };

  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((hub, index) => {
          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              {/* <td
                className="selection-cell"
                onClick={() => {
                  handlefunn(hub.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(hub.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td> */}

              <td>{hub.hub_transfer_no}</td>
              <td>{toTitleCase(hub.orgin_s)}</td>
              <td>{toTitleCase(hub.destination_s)}</td>
              <td>{hub.orders.length}</td>
              {/* <td>{toTitleCase(hub.coloader_name)}</td> */}
              <td>{hub.bag_count}</td>
              <td>{hub.box_count}</td>
              <td>{hub.total_weight}</td>
              <td>
                <div>
                  <Link
                    to="/manifest/branch_pdf"
                    state={{ manifest: hub }}
                  >
                    <img src={pdf} width="20" height="20" />
                  </Link>
                </div>
              </td>
              <td>
                <div style={{ marginLeft: "20px" }}>
                  {hub.is_recieved ? (
                    <Link
                      to="/manifest/breakhubmanifest"
                      state={{ hub: hub }}
                    >
                      <Button
                        size="sm"
                        outline
                        color="warning"
                        type="button"
                        onClick={() => handleModal(hub.hub_transfer_no)}
                        disabled={hub.is_broken}
                      >
                        Break
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      to="/manifest/recieve_hub_manifest"
                      state={{ hub: hub }}
                      disabled={hub.is_received === true}
                    >
                      <Button size="sm" outline color="success">
                        Receive
                      </Button>
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default IncomingHubDataFormat;
