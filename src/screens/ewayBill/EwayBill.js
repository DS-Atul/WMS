import React from 'react'
import { Button } from 'reactstrap'
import axios from 'axios';
import { setBAccessToken, setEAccessToken, setOrgs, setSubrcption } from '../../store/ewayBill/EwayBill';
import { useDispatch,useSelector } from 'react-redux';



const EwayBill = () => {
    const dispatch = useDispatch();
    const e_acess_token = useSelector((state) => state.eway_bill.e_access_token);

    const login_in = () => {
        axios
          .post(
             "https://dev.api.easywaybill.in/ezewb/v1/auth/initlogin",

             {
                
                    "userid": "test.easywaybill@gmail.com",
                    "password": "Abcd@12345"
                    
             },
           
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(function (response) {
           console.log("response",response.data.response);
           console.log("token",response.data.response.token);
           dispatch(setEAccessToken(response.data.response.token));
           dispatch(setOrgs(response.data.response.orgs));
          })
          .catch((error) => {
            alert(`Error Happen while posting Order  Data ${error}`);
          });
      };

      const login = () => {
        axios
          .post(
             "https://dev.api.easywaybill.in/ezewb/v1/auth/completelogin",
             {
                
                    "token": `${e_acess_token}`,
                    "orgId": "4"
                    
             },
           
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(function (response) {
           console.log("response",response);
        //    console.log("token",response.data.response.token);
        //    dispatch(setEAccessToken(response.data.response.token));
        //    dispatch(setOrgs(response.data.response.orgs));
          })
          .catch((error) => {
            alert(`Error Happen while posting Order  Data ${error}`);
          });
      };
    //   const  business_login = () => {
    //     axios
    //       .post(
    //          "https://dev.api.easywaybill.in/ezewb/v1/auth/completelogin",
    //          {
    //             "token":"eyJhbGciOiJIUzI1NiJ9.eyJ1IjoxNTcsInYiOmZhbHNlLCJleHAiOjE2ODAyNjgzMzksIm0iOmZhbHNlLCJpYXQiOjE2ODAyNDY3Mzl9._B2GT7fdx7-mw_aQwUKUs630Om2lDrMX6LFizcE06iw",
    //             "orgId": "4"
    //          },
           
    //         {
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //         }
    //       )
    //       .then(function (response) {
    //        console.log("businesscompleteion",response);
           
    //       })
    //       .catch((error) => {
    //         console.log(`Error Happen while business data ${error}`);
    //       });
    //   };


  return (
    <>
       <div>EwayBill

</div>
<div>
    <Button onClick={()=>{
        login_in();
    }}>Login In</Button>
</div>
<div>
    <Button onClick={()=>{
     login();
    }}> Business Login In</Button>
</div>
    </>
 
  )
}

export default EwayBill