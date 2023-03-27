/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
import {
  setFuther_conn_id,
  setGoing_hub_id,
  setIssue_id,
  setOrder_id,
} from "../../../store/manifest/RecieveManifest";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Input } from "reactstrap";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
const RecieveManifestTitle = [
  "Docket No",
  "Orgin",
  "Destination",
  "Consignee",
  "Shipper",
  "Date",
  "Qty",
  "ColdChain",
  // ["Futher Connected", false],
  // ["Is Going To Hub", false],
  "Issue Type",
];
{
  console.log("item11111----", RecieveManifestTitle[8]);
}
{
  console.log("item2222----", RecieveManifestTitle[9]);
}

const BreakManifest = ({
  data,
  is_issue,
  setis_issue,
  received,
  setReceived,
  notReceived,
  setNotReceived,
}) => {
  console.log("data------", data);
  console.log("issu 00000000------------", is_issue);
  const searchData = useSelector((state) => state.searchbar.search_item);
  const [refresh, setrefresh] = useState(false);
  const [selected_id, setselected_id] = useState([]);
  console.log()
  const [going_hub_id, setgoing_hub_id] = useState([]);
  const [issue_id, setissue_id] = useState([]);
  const loaded = useSelector((state) => state.manifest.loaded);

  const [issue, setissue] = useState([]);

  const dispatch = useDispatch();

  // const handle_checked = (id) => {
  //   if (selected_id.includes(id)) {
  //     let lis = [...selected_id];
  //     setselected_id(lis.filter((e) => e !== id));
  //   } else {
  //     setselected_id([...selected_id, id]);
  //   }
  // };

  // const handle_checked_hub = (id) => {
  //   console.log(id)
  //   if (going_hub_id.includes(id)) {
  //     let lis = [...going_hub_id];
  //     setgoing_hub_id(lis.filter((e) => e !== id));
  //   } else {
  //     setgoing_hub_id([...going_hub_id, id]);
  //   }
  // };

  const handle_checked = (
    id,
    stateSetter,
    oppositeStateSetter,
    oppositeState
  ) => {
    if (stateSetter === setgoing_hub_id && selected_id.includes(id)) {
      // Clear selected_id array if checkbox for going_hub_id is checked
      setselected_id((prev) => prev.filter((e) => e !== id));
    } else if (stateSetter === setselected_id && going_hub_id.includes(id)) {
      // Clear going_hub_id array if checkbox for selected_id is checked
      setgoing_hub_id((prev) => prev.filter((e) => e !== id));
    }
    stateSetter((prev) => {
      if (prev.includes(id)) {
        return prev.filter((e) => e !== id);
      } else {
        // Clear opposite state array if checkbox is checked
        oppositeStateSetter((prev) => prev.filter((e) => e !== id));
        return [...prev, id];
      }
    });
  };

  const handle_checked_issue = (id) => {
    if (issue_id.includes(id)) {
      let lis = [...issue_id];
      setissue_id(lis.filter((e) => e !== id));
      let updatedArr = issue.filter((obj) => obj.id !== id);
      console.log("updatedArr---", updatedArr);
      setissue(updatedArr);
    } else {
      setissue_id([...issue_id, id]);
    }
  };

  useEffect(() => {
    dispatch(setFuther_conn_id(selected_id));
    dispatch(setGoing_hub_id(going_hub_id));
    // dispatch(setIssue_id(issue));
  }, [selected_id, going_hub_id, issue]);

  useEffect(() => {
    let orderid_list = data.map((v) => v.id);
    dispatch(setOrder_id(orderid_list));
  }, [data]);

  useEffect(() => {
    console.log("issue----", issue);
    if (issue.length >= 1) {
      // dispatch(setIssue_id(issue));
    }
    dispatch(setIssue_id(issue));
  }, [loaded]);

  ///===
  const [issue_type_list, setissue_type_list] = useState([
    "Not Received",
    "Broken",
    "Damage",
    "Custom Check Failed",
    "Other",
  ]);
  const [issue_type, setissue_type] = useState("");
  const [issues, setIssues] = useState([]);

  useLayoutEffect(() => {
    console.log("issue _type", issue_type);
  }, [issue_type]);

  // const [is_issue, setis_issue] = useState(false);

  function handleIssueTypeChange(e, docketNo, index) {
    setis_issue(true);
    const issueType = e.target.value;
    let remarks = "";
    // if (issueType === "Other") {
    //   remarks = prompt("Enter remarks:");
    // }
    const orderInfo = { docketNo, issueType, remarks };
    if (["Broken", "Damage"].includes(issueType)) {
      setReceived((prevReceived) => {
        const newReceived = [...prevReceived];
        newReceived[index] = orderInfo;
        return newReceived;
      });
      setNotReceived((prevNotReceived) =>
        prevNotReceived.filter((o) => o.docketNo !== docketNo)
      );
    } else {
      setNotReceived((prevNotReceived) => {
        const newNotReceived = [...prevNotReceived];
        newNotReceived[index] = orderInfo;
        return newNotReceived;
      });
      setReceived((prevReceived) =>
        prevReceived.filter((o) => o.docketNo !== docketNo)
      );
    }
  }
  useLayoutEffect(() => {
    console.log("Recived", received);
    console.log("Not Recived", notReceived);
  }, [received]);

  return (
    <>
      <div className="table">
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {RecieveManifestTitle.map((item, index) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {item}{" "}
                    {typeof item === "object" ? (
                      <span
                        onClick={() => {
                          item[1] = !item[1];
                          setrefresh(!refresh);
                          if (item[0] === "Futher Connected") {
                            if (item[1]) {
                              let ord_list = data.map((v) => v.id);
                              setselected_id(ord_list);
                            } else {
                              setselected_id([]);
                            }
                          } else {
                            if (item[1]) {
                              let ord_list = data.map((v) => v.id);
                              setgoing_hub_id(ord_list);
                            } else {
                              setgoing_hub_id([]);
                            }
                          }
                        }}
                      >
                        {console.log("item----", item[0])}

                        {item[1] ? (
                          <FiCheckSquare size={15} />
                        ) : (
                          <FiSquare size={15} />
                        )}
                      </span>
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              data.map((order, index) => {
                let f_date_f = order.booking_at.split("T")[0];
                // .substring(0, 11);

                return (
                  <>
                    <tr
                      key={index}
                      style={{
                        borderWidth: 1,
                      }}
                    >
                      <td>{order.docket_no}</td>
                      <td>{toTitleCase(order.shipper_city)}</td>
                      <td>{toTitleCase(order.consignee_city)}</td>

                      <td>{toTitleCase(order.consignee_name)}</td>

                      <td>{toTitleCase(order.shipper_name)}</td>
                      <td>{f_date_f}</td>
                      <td>{order.total_quantity}</td>
                      <td>
                        {order.cold_chain ? (
                          <img src={cross} width="15" height="15" />
                        ) : (
                          <img src={correct} width="15" height="15" />
                        )}
                      </td>

                      {/* <td
                      onClick={() => {
                        handle_checked(order.id);
                      }}
                    >
                      {selected_id.includes(order.id) ? (
                        <FiCheckSquare size={15} />
                      ) : (
                        <FiSquare size={15} />
                      )}
                    </td>

                    <td
                      onClick={() => {
                        handle_checked_hub(order.id);
                      }}
                    >
                      {going_hub_id.includes(order.id) ? (
                        <FiCheckSquare size={15} />
                      ) : (
                        <FiSquare size={15} />
                      )}
                    </td> */}

                      
                      {/* <td
                      onClick={() => {
                        handle_checked_issue(order.id);
                      }}
                    >
                      {issue_id.includes(order.id) ? (
                        <FiCheckSquare size={15} />
                      ) : (
                        <FiSquare size={15} />
                      )}
                    </td>
                    {issue_id.includes(order.id) && ( */}
                      <td>
                        <select
                          onChange={(e) =>
                            handleIssueTypeChange(e, order.id, index)
                          }
                        >
                          <option defaultChecked>Select One Issue</option>
                          <option value="Not Received">Not Received</option>
                          <option value="Broken">Broken</option>
                          <option value="Damage">Damage</option>
                          <option value="Custom Check Failed">
                            Custom Check Failed
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </td>

                      {/* {issue_type ===     "Other"
 && <td>
                        <Input
                          value={
                            issue.find((obj) => obj.id === order.id)?.issue
                          }
                          onChange={(val) => {
                            const objToEdit = issue.find(
                              (obj) => obj.id === order.id
                            );
                            if (objToEdit) {
                              objToEdit.issue = val.target.value;
                              setissue([...issue]);
                            } else {
                              setissue([
                                ...issue,
                                { id: order.id, issue: val.target.value },
                              ]);
                            }
                          }}
                          placeholder="Enter Issue"
                        />
                      </td>} */}
                    </tr>
                    {notReceived[index] &&
                      notReceived[index]["issueType"] === "Other" && (
                        <tr>
                          <td colSpan={12}>
                            <Input
                              type="text"
                              placeholder="Enter Issue"
                              onChange={(val) => {
                                notReceived[index]["remarks"] =
                                  val.target.value;
                                setrefresh(!refresh);
                              }}
                            />
                          </td>
                        </tr>
                      )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BreakManifest;
