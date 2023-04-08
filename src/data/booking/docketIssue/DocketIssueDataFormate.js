import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import { HiQuestionMarkCircle } from "react-icons/hi";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
import {
  Label,
  Input,
} from "reactstrap";
const DocketIssueDataFormate = ({ data, data1, can_delete }) => {
  console.log("Issue data", data)
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const ids = useSelector((state) => state.datalist.ids);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);

  // For Delete Commodity
  const delete_issue = (id) => {
    axios
      .post(
        ServerAddress + "booking/delete_issue/",
        {
          data: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(setDeleteId(false));
          dispatch(setIds([]));
          dispatch(setSelect(false));
          setselected([]);
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        alert(`Error While delete Commidity ${err}`);
      });
  };

  //Multi Delete
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);
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

  useEffect(() => {
    if (delete_id === true) {
      delete_issue(ids);
    }
  }, [delete_id]);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("universal_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("universal_type"));
    }else if (index === 2) {
      dispatch(setIndexValue("issue_location"));
    }else if (index === 3) {
      dispatch(setIndexValue("issue"));
    }else if (index === 4) {
      dispatch(setIndexValue("created_at"));
    }else if (index === 5) {
      dispatch(setIndexValue("barcode"));
    }else if (index === 6) {
      dispatch(setIndexValue("barcode_type"));
    }else if (index === 7) {
      dispatch(setIndexValue("is_solved"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Commodity" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);


  const [show, setShow] = useState(false);

  const handleClose = () => 
  {
    settoggle(false);
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [remarks, setremarks] = useState("")
  const [is_resolved, setis_resolved] = useState(false)
  const [toggle, settoggle] = useState(false)

  const update_issue = (id) => {

    axios
      .put(
        ServerAddress + "booking/update_issue/" + id,
        {
          is_solved: is_resolved,
          remarks: toTitleCase(remarks).toUpperCase(),
          change_fields: { 'is_solved': is_resolved, 'remarks':remarks, 'solved_by': user.username }
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
          dispatch(setToggle(true));
          setShow(false)
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          settoggle(false);
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };
  const [issue_id, setissue_id] = useState()
  console.log("issue_id=========", issue_id)
  const handleSubmit = (id, issue, remarks) =>{
    setissue_id(id)
    setis_resolved(issue)
    setremarks(remarks)
    handleShow()
  }

  useEffect(() => {
    if(toggle && issue_id !==""){
      update_issue(issue_id)
    }

  }, [toggle,issue_id])
  

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Label className="header-child">Is Resolved</Label>
            <br />
            <Input
              className="form-check-input-sm"
              type="checkbox"
              // value="false"
              id="defaultCheck1"
              onClick={() => {
                setis_resolved(!is_resolved);
              }}
              readOnly={true}
              checked={is_resolved}
            />
          </div>
          <div className="mb-2">
            <Label className="header-child">
              Remarks
            </Label>
            <Input
              value={remarks}
              onChange={(e)=>setremarks(e.target.value)
              }
              type="text"
              className="form-control-md"
              id="input"
              placeholder="Enter Remarks"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>settoggle(true)}>Save</Button>
        </Modal.Footer>
      </Modal>

      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((order, index) => {
          let f_date_f = order.created_at.split("T");
          let f_date = f_date_f[0];
          let f_time_r = String(f_date_f[1]).substring(0, 5);
          let l_fdate = f_date + " " + f_time_r;

          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              {(can_delete || user.is_superuser) && (
                <td
                  className="selection-cell"
                  onClick={() => {
                    handlefunn(order.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(order.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>
                {/* {can_update || user.is_superuser  ? ( */}
                {(can_update && order.cm_current_status !== "APPROVED") || user.is_superuser ? (

                  <a style={{ color: "blue" }}
                    onClick={() => handleSubmit(order.id, order.is_solved, order.remarks)}
                  >
                    {/* {toTitleCase(order.docket_no)} */}
                    {order.universal_no}

                  </a>

                ) : (
                  // toTitleCase(order.commodity_name)
                  order.universal_no
                )}
              </td>
              {/* <td>{order.manifest_no}</td> */}
              <td>{toTitleCase(order.universal_type)}</td>
              <td>{toTitleCase(order.issue_location)}</td>
              <td>{toTitleCase(order.issue)}</td>
              <td>{l_fdate}</td>
              {/* <td>{order.issue_type}</td> */}
              <td>{order.barcode}</td>
              <td>{toTitleCase(order.barcode_type)}</td>
              <td>
                {order.is_solved ? (
                  <div>
                    <img src={correct} width="16" height="16" />
                  </div>
                ) : (
                  <div>
                    <img src={cross} width="16" height="16" />
                  </div>
                )}
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default DocketIssueDataFormate;