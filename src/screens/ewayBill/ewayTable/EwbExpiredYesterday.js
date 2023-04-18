import React,{useState,useEffect} from 'react'
import { gstin_no } from '../../../constants/CompanyDetails';
const EwbExpiredYesterday = () => {



    const get_expire_eway= () => {
        axios
          .get(
            `https://dev.api.easywaybill.in/ezewb/v1/ewb/count?gstin=${gstin_no}`,
           {
    "type":"EWB_EXPIRED_YESTERDAY",
    "page":"0",
    "size":100,
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
      useEffect(() => {
      get_expire_eway();
      }, [])
      

  return (
    <div>EwbExpiredYesterday</div>
  )
}

export default EwbExpiredYesterday