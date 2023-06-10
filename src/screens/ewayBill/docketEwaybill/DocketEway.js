import React, { useEffect, useState, useLayoutEffect} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import EwayDocDataFormat from "../../../data/ewayBill/EwayBillDataFormat";
import EwayDataTitle from "../../../data/ewayBill/EwayBillTitle";
import Navigate from "../ewayBillTab/Navigate";
import { setBusinesssAccessToken, setEAccessToken, setOrgs } from "../../../store/ewayBill/EwayBill";
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import { EServerAddress, ServerAddress } from "../../../constants/ServerAddress";


const DocketEway = () => {
  const dispatch = useDispatch();
  const commodity_type = useSelector((state) => state.filtervalue.data_a);
  const commodity_name = useSelector((state) => state.filtervalue.data_b);

  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);
  const accessToken = useSelector((state) => state.authentication.access_token);
  // // Pagination
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "eWaybill" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);
  
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
     <Navigate />
      <PageTitle page="Part A" />
      <Title title="Eway Bill Dockets's" parent_title="Eway Bill" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
{/*                
                  <Nav_Btn
                    btn_name="Add Part A"
                    icon={<MdAdd size={15} />}
                    form_path="/eway/add_parta"
                  /> */}
              
                {/* Filter Tool */}
                {/* <Filter type={"commodity"} /> */}
              </div>
            </div>
          
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={EwayDataTitle}
            Data_Format={EwayDocDataFormat}
            path={`analytic/all_eway/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default DocketEway;
