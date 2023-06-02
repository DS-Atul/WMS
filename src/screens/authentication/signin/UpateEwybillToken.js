import React from 'react';
import axios from "axios";
import { ServerAddress } from '../../../constants/ServerAddress';
function UpateEwaybillToken({ gstin_no, Data, ewayTokenB, access_token }) {
    // alert("--------")
    console.log("Data----", Data)
    console.log("gstin_no-----", gstin_no)
    console.log("ewayTokenB----", ewayTokenB)
    useLayoutEffect(() => {
      getEwayAccessToken();
    }, []);
    
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
          console.log("first get res ===>>", response.data);
          if (response.data.results.length !== 0) {
            let res_data = response.data.results[0];
            setid_is(res_data.id);
            seteuser_name(res_data.username);
            setepass(res_data.password);
            setAccessToken_Modifiedat(res_data.AccessToken_Modifiedat);
            setBusinessToken_Modifiedat(res_data.BusinessToken_Modifiedat);
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
  // return EwayUpdate;



}
export default UpateEwaybillToken;