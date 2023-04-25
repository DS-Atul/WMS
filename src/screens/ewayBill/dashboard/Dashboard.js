import React, { useLayoutEffect, useState, useEffect } from "react";
import assign from "../../../assets/images/eway/assignment.png";
import {
  setBAccessToken,
  setEAccessToken,
} from "../../../store/ewayBill/EwayBill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gstin_no } from "../../../constants/CompanyDetails";

const EwayDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const e_acess_token = useSelector((state) => state.eway_bill.e_access_token);
  const b_acess_token = useSelector((state) => state.eway_bill.b_access_token);


 
const [expire_ewb_yesterday, setexpire_ewb_yesterday] = useState("");
const [expiring_today, setexpiring_today] = useState("");
const [part_b_12, setpart_b_12] = useState("");
//  Get Expired Eway Bill 
  const get_expired_eway = () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
        {
          "type":"EWB_EXPIRED_YESTERDAY", 
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
      .catch((error) => {});
  };
// Get Expiring eway today
  const get_expiring_eway= () => {
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
      .catch((error) => {});
  };
  // get part b not updated for 12 days
  const get_partb_12= () => {
    axios
      .post(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
       {
"type":"PARTB_NOT_UPDATED_FOR_12D",
"defaultquery":null
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
      .catch((error) => {});
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



  const get_assigned_to_me= () => {
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
 "v":prev_date,
 },
 {
 "p": "ewbDt",
 "o": "lte",
 "v":today_date,
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
        console.log("assigned to me",response.data.response)
        setassigned(response.data.response)
      })
      .catch((error) => {});
  };
  useEffect(() => {
get_expired_eway();
get_expiring_eway();
get_partb_12();

  }, []);

useEffect(() => {
 if (today_date && prev_date) {
  get_assigned_to_me();
 }
}, [today_date && prev_date])


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
          }}
          onClick={()=>{
            navigate("/ewaybill/assignedEwaybill")
          }}
        >
            <div style={{display:"flex",flexDirection:"column"}}>      
                    <div style={{ position: "relative", bottom: "24px", zIndex: "1000" }}>
            <img src={assign} width="80px" height="70px" />
          </div>
          <div style={{color:"white",fontWeight:"bold",fontSize:"20px",marginLeft:"5vw"}}>{assigned}</div>
          </div>
<div>Assigned Eway Bill For Last 48 hrs.</div>
        </div>
        <div style={{ width: "80%", marginLeft: "30px" }}>
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
              }} 
              onClick={()=>{
                navigate("/ewaybill/extendEway")
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
                  fontSize:"20px"
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
                Pending Part B :
              </h3>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                  fontSize:"20px"
                }}
              >
                23
              </h4>
              <div
                style={{
                  fontSize: "15px",
                  marginLeft: "4px",
                  marginTop: "30px",
                  fontWeight: "bold",
                }}
              >
                Update Pending For More Than 12 hrs.
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
                  fontSize:"20px"
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
                Update Pending For More Than 12 Days.
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
                Ewb Expired Yesterday:
              </h3>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                  fontSize:"20px"
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
      {/* 2nd row ended */}
    </>
  );
};

export default EwayDashboard;
