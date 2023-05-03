/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import {
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";

const OrganizationDataFormat = ({ data, data1 }) => {
  console.log("data=====", data)
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);

  const delete_organization = (id) => {
    axios
      .post(
        ServerAddress + "organization/delete_organization/",
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
          dispatch(setIsDeleted(false));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        alert(`Error While delete branch ${err}`);
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Sorting
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("name"));
    } else if (index === 1) {
      dispatch(setIndexValue("pan_no"));
    } else if (index === 2) {
      dispatch(setIndexValue("regd_no"));
    } else if (index === 3) {
      dispatch(setIndexValue("website"));
    } else if (index === 4) {
      dispatch(setIndexValue("email"));
    } else if (index === 5) {
      dispatch(setIndexValue("mobile_nop"));
    }
  }, [index]);

  //Multi Delete function
  const ids = useSelector((state) => state.datalist.ids);
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
    if (ids !== [] && select_all === true) {
      setselected(ids);
    }
  }, [ids]);
  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);
  useEffect(() => {
    if (delete_id === true) {
      delete_organization(ids);
    }
  }, [delete_id]);


  return (
    <>
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((organization, index) => {
          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              {( user.is_superuser) && (
                <td
                  className="selection-cell"
                  onClick={() => {
                    handlefunn(organization.id);
                    dispatch(setSelect(true));
                  }}
                  disabled
                >
                  {selected.includes(organization.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}

              <td>
                {user.is_superuser ? (
                  <Link
                    to="/organization/AddOrganization"
                    state={{ organization: organization }}
                  >
                    {toTitleCase(organization.name)}
                  </Link>
                ) : (
                  toTitleCase(organization.name)
                )}
              </td>
              <td>{organization.pan_no}</td>
              <td>
              
                {organization.organization_gst.length !== 0 &&
                 organization.organization_gst.map((organization, index) => {
                   return (
                  <span>{organization.gst_no +",  "}</span>
                   )
                }
                
                )}
              </td>
              <td>{organization.regd_no}</td>
              <td>{organization.website}</td>
              <td>{organization.email}</td>
              <td>{organization.mobile_nop}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default OrganizationDataFormat;
