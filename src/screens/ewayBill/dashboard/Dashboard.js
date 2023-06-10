import React, { useLayoutEffect, useState, useEffect } from "react";
import assign from "../../../assets/images/eway/assignment.png";
import {
  setBAccessToken,
  setBusinesssAccessToken,
  setEAccessToken,
  setOrgs,
} from "../../../store/ewayBill/EwayBill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gstin_no } from "../../../constants/CompanyDetails";
import { EServerAddress, ServerAddress } from "../../../constants/ServerAddress";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";

const EwayDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const b_acess_token = useSelector((state) => state.eway_bill.business_access_token);

  const [expire_ewb_yesterday, setexpire_ewb_yesterday] = useState("");
  const [expiring_today, setexpiring_today] = useState("");
  const [part_b_12, setpart_b_12] = useState("");
  const [my_eway, setmy_eway] = useState("")

  //  Get Expired Eway Bill 
  const get_expired_eway = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
        {
          "type": "EWB_EXPIRED_YESTERDAY",
          "defaultquery": null
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response=======eway bill detail", response.data.response);
        setexpire_ewb_yesterday(response.data.response)
      })
      .catch((error) => { });
  };
  // Get Expiring eway today
  const get_expiring_eway = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
        {
          "type": "EWB_EXPIRING_TODAY",
          "defaultquery": null,
          "page": "0",
          "size": 10,
          "sortfield": "ewbDate",
          "sortdir": "desc",
          "addlquery": {
            "operator": "and",
            "criterias": [
              {
                "p": "godownId",
                "o": "eq",
                "v": "-1"
              }
            ]
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response=======eway bill detail todayyyy", response.data.response);
        setexpiring_today(response.data.response);
      })
      .catch((error) => { });
  };
  // get part b not updated for 12 days
  const get_partb_12 = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
        {
          "type": "PARTB_NOT_UPDATED_FOR_12D",
          "defaultquery": null
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response=======eway bill part b 12", response.data.response);
        setpart_b_12(response.data.response);

      })
      .catch((error) => { });
  };

  //My Eway Bill
  const get_my_eway = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
        {
          "type": "My_EWB",
          "defaultquery": null
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response=======eway bill part b 12", response.data.response);
        setmy_eway(response.data.response);

      })
      .catch((error) => { });
  };

  const [today_date, settoday_date] = useState("");
  const [prev_date, setprev_date] = useState("");
  const [assigned, setassigned] = useState("");
  useEffect(() => {
    const currentDate = new Date();

    // Get date 48 hours before current date
    const beforeDate = new Date(currentDate.getTime() - (72 * 60 * 60 * 1000));

    // Format dates as strings with slashes
    const currentDateStr = currentDate.toISOString().slice(0, 10).replace(/-/g, '/');
    const beforeDateStr = beforeDate.toISOString().slice(0, 10).replace(/-/g, '/');
    settoday_date(currentDateStr);
    setprev_date(beforeDateStr)
    console.log("Current date:", currentDateStr);
    console.log("48 hours before date:", beforeDateStr);
  }, [])



  const get_assigned_to_me = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
        {

          "type": "MY_EWB",
          "defaultquery": null,
          "page": "0",
          "size": 100,
          "addlquery": {
            "operator": "and",
            "criterias": [
              {
                "p": "ewbDt",
                "o": "gte",
                "v": prev_date,
              },
              {
                "p": "ewbDt",
                "o": "lte",
                "v": today_date,
              }
            ]
          }
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${b_acess_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("assigned to me", response.data.response)
        setassigned(response.data.response)
      })
      .catch((error) => { });
  };
  useEffect(() => {
    get_expired_eway();
    get_expiring_eway();
    get_partb_12();
    get_my_eway();
  }, []);

  useEffect(() => {
    if (today_date && prev_date) {
      get_assigned_to_me();
    }
  }, [today_date && prev_date])

  //For Eway Bill

  const orgId = useSelector((state) => state.eway_bill?.orgs[0]?.orgId);

  const org_name = useSelector(
    (state) => state.authentication.userdetails.organization
  );
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);

  const e_access_token = useSelector((state) => state.eway_bill.e_access_token);

  const [ass_token, setass_token] = useState(false);
  const [euser_name, seteuser_name] = useState("");
  const [epass, setepass] = useState("");
  const [id_is, setid_is] = useState("");

  const [AccessToken_Modifiedat, setAccessToken_Modifiedat] = useState("");
  const [time_diff, settime_diff] = useState("");

  const getEwayAccessToken = () => {
    axios
      .get(
        ServerAddress +
        `organization/get_eway_accesstoken/?org_name=${org_name}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {
        console.log("first get ressssss ===>>", response.data);
        if (response.data.results.length !== 0) {
          let res_data = response.data.results[0];
          setid_is(res_data.id);
          seteuser_name(res_data.username);
          setepass(res_data.password);
          setAccessToken_Modifiedat(res_data.AccessToken_Modifiedat);
          if (e_access_token === "") {
            dispatch(setEAccessToken(res_data.access_token));
          }
          if (business_access_token === "") {
            dispatch(setBusinesssAccessToken(res_data.business_token));
          }

          if (response.data.results[0].access_token === null) {
            setass_token(true);
          } else {
            setass_token(false);
          }
        }
        else {
          dispatch(setEAccessToken(""));
          dispatch(setBusinesssAccessToken(""));
        }
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const AddEwayAccessToken = () => {
    axios
      .post(
        EServerAddress + "ezewb/v1/auth/initlogin",

        {
          // userid: "test.easywaybill@gmail.com",
          // password: "Abcd@12345",
          userid: euser_name,
          password: epass,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("AddEwayAccessToken response----", response)
        if (response.data.message !== "Please verify account (or sign up first).") {
          dispatch(setEAccessToken(response.data.response.token));
          dispatch(setOrgs(response.data.response.orgs));
          if (response.data.status === 1 && id_is !== "") {
            postAssToken(response.data.response.token);
          }
        }
        else {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Invalid Username And Password Sign Up First`));
          dispatch(setAlertType("warning"));
        }
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const postAssToken = (access_token) => {
    axios
      .put(
        ServerAddress + "organization/update_token/" + id_is,

        {
          type: "access_token",
          access_token: access_token,
        },

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {

      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };


  const GetBusiness_token = () => {
    axios
      .post(
        EServerAddress + "ezewb/v1/auth/completelogin",
        {
          token: `${e_access_token}`,
          orgid: orgId,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(setBusinesssAccessToken(response.data.response.token));
        if (response.data.status === 1 && id_is !== "") {
          postBusinessToken(response.data.response.token);
        }
      })
      .catch((error) => {
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Eway Bill Server Is Currently Down`));
        dispatch(setAlertType("danger"));
      });
  };

  const postBusinessToken = (business_token) => {
    axios
      .put(
        ServerAddress + "organization/update_token/" + id_is,

        {
          type: "business_token",
          business_token: business_token,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(function (response) {
        console.log("post busines token res ===>>", response.data);

      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  useLayoutEffect(() => {
    if (ass_token) {
      AddEwayAccessToken();
    }
    if (time_diff >= 6) {
      AddEwayAccessToken();
    }
  }, [ass_token, time_diff]);

  //  For Step 1 Eway bill
  useLayoutEffect(() => {
    if (org_name) {
      getEwayAccessToken();
    }
  }, []);

  // For Step 2 Eway Bill
  useLayoutEffect(() => {
    if (e_access_token != "" && ass_token && orgId) {
      GetBusiness_token();
    }
    if (time_diff >= 6 && orgId) {
      GetBusiness_token();
    }
  }, [e_access_token, ass_token, time_diff]);

  useEffect(() => {
    // Calculate the time difference when AccessToken_Modifiedat changes
    if (AccessToken_Modifiedat) {
      var dateTime1 = new Date(AccessToken_Modifiedat);
      var dateTime2 = new Date(); // Current date-time
      console.log("AccessToken_Modifiedat------", AccessToken_Modifiedat)
      console.log("date time1---- ", dateTime1)
      console.log("date time2--- ", dateTime2)
      var timeDiff = Math.abs(dateTime2 - dateTime1);
      var diffHours = Math.floor(timeDiff / (1000 * 60 * 60));
      settime_diff(diffHours);
      console.log("time=====>>", diffHours, timeDiff); // Output: Number of hours between dateTime1 and current date-time
    }

  }, [AccessToken_Modifiedat]);


  return (
    <>
      <div
        style={{
          background: "#F0F0F0",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#F9D949",
            width: "15%",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            borderRadius: "10px",
            cursor:"pointer" 
          }}
          onClick={() => {
            navigate("/ewaybill/assignedEwaybill")
          }}
        >
          <div style={{ display: "flex", flexDirection: "column"}}>
            <div style={{ position: "relative", bottom: "24px", zIndex: "1000" }}>
              <img src={assign} width="80px" height="70px" />
            </div>
            <div style={{ color: "white", fontWeight: "bold", fontSize: "20px", marginLeft: "5vw" }}>{assigned}</div>
          </div>
          <div>Assigned Eway Bill For Last 48 hrs.</div>
        </div>
        <div style={{ width: "80%", marginLeft: "30px"}}>
          <div
            style={{
              color: "#F45050",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "30px",
              marginLeft: "10px",
            }}
          >
            Assigned Eway Bill To Us.
          </div>
          <div
            style={{
              color: "#3C486B",
              fontWeight: "bold",
              marginTop: "30px",
              marginLeft: "10px",
            }}
          >
            All Actionable Ewb `s
          </div>
        </div>
      </div>
      {/* loWERcARD bUTTOMMMMM */}
      {/* 1 row started */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {/* ! st Part */}

        <div
          style={{
            padding: "20px",
            display: "flex",
            marginTop: "30px",
            width: "27%",
          }}
        >
          <div
            style={{
              background: "white",
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#3C486B",
                width: "100%",
                height: "30%",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                cursor:"pointer"
              }}
              onClick={() => {
                navigate("/ewaybill/extendEway", { state: { type: "Expiring_Today", count: expiring_today} });
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Expiring Today :
              </h3>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                  fontSize: "20px"
                }}
              >
                {expiring_today}
              </h4>
              <div
                style={{
                  fontSize: "15px",
                  marginLeft: "4px",
                  marginTop: "30px",
                  fontWeight: "bold",
                }}
              >
                Available for extension from 4 p.m today
              </div>
            </div>
          </div>
        </div>
        {/* 2nd part */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            marginTop: "30px",
            width: "27%",
          }}
         
        >
          <div
            style={{
              background: "white",
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              borderRadius: "10px",
              cursor:"pointer"
            }}
            onClick={() => {
              navigate("/ewaybill/extendEway", { state: { type: "Expired_Yesterday", count: expire_ewb_yesterday } });
            }}
          >
            <span
              style={{
                backgroundColor: "#3C486B",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                height: "30%",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Ewb Expired Yesterday :
              </h3>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                  fontSize: "20px"
                }}
              >
                {expire_ewb_yesterday}
              </h4>
              <div
                style={{
                  fontSize: "15px",
                  marginLeft: "25px",
                  marginTop: "30px",
                  fontWeight: "bold",
                }}
              >
                Ewb Which Expired Yesterday
              </div>
            </span>

          </div>
        </div>

      </div>
      {/* 1 row Ended */}
      {/* 2nd row started */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}

      >
        {/* ! st Part */}

        <div
          style={{
            padding: "20px",
            display: "flex",
            marginTop: "30px",
            width: "27%",
          }}
        >
          <div
            style={{
              background: "white",
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#3C486B",
                width: "100%",
                height: "30%",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Pending Part B :
              </h3>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                  fontSize: "20px"
                }}
              >
                {part_b_12}
              </h4>
              <div
                style={{
                  fontSize: "15px",
                  marginLeft: "4px",
                  marginTop: "30px",
                  fontWeight: "bold",
                }}
              >
                {/* Update Pending For More Than 12 Days. */}
                Part B Not Updated For 12 Days.
              </div>
            </div>
          </div>
        </div>

        {/* 2nd part */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            marginTop: "30px",
            width: "27%",
          }}
        >
          <div
            style={{
              background: "white",
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              borderRadius: "10px",
            }}

          >
            <span
              style={{
                backgroundColor: "#3C486B",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                height: "30%",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                My Eway Bill :
              </h3>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                  fontSize: "20px"
                }}
              >
                {my_eway}
              </h4>
              <div
                style={{
                  fontSize: "15px",
                  marginLeft: "4px",
                  marginTop: "30px",
                  fontWeight: "bold",
                }}
              >
                Generated By You.
              </div>
            </span>

          </div>
        </div>

      </div>
      {/* 2nd row ended */}
    </>
  );
};

export default EwayDashboard;
