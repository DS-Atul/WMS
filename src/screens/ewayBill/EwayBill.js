import React from 'react'
import { Button } from 'reactstrap'
import axios from 'axios';
import { setBAccessToken, setEAccessToken, setOrgs, setSubrcption } from '../../store/ewayBill/EwayBill';
import { useDispatch,useSelector } from 'react-redux';



const EwayBill = () => {
    const dispatch = useDispatch();
    const e_acess_token = useSelector((state) => state.eway_bill.e_access_token);
    const b_acess_token = useSelector((state) => state.eway_bill.b_access_token);

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
                    "orgid": "4"
                    
             },
           
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(function (response) {
           console.log("responseblogin",response.data.response.token);
        //    console.log("token",response.data.response.token);
           dispatch(setBAccessToken(response.data.response.token));
        //    dispatch(setOrgs(response.data.response.orgs));
          })
          .catch((error) => {
            alert(`Error Happen while posting Order  Data ${error}`);
          });
      };

      const step3 = () => {
        axios
          .post(
             "https://dev.api.easywaybill.in/ezewb/v1/org/addbusiness",
             {
                
                  
                    "token": `${b_acess_token}`,
                      "gstn": "05AAAAT2562R1Z3",
                      "name": "HAI LOGICS",
                      "nicUser": "HAI LOGICS",
                      "nicPass": "Abcd@12345"
                     
                    
             },
           
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(function (response) {
           console.log("responseblogin",response.data.response.token);
        //    console.log("token",response.data.response.token);
           dispatch(setBAccessToken(response.data.response.token));
        //    dispatch(setOrgs(response.data.response.orgs));
          })
          .catch((error) => {
            alert(`Error Happen while posting Order  Data ${error}`);
          });
      };
     


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
<div>
    <Button onClick={()=>{
     step3();
    }}>Step 3</Button>
</div>
    </>
 
  )
}

export default EwayBill