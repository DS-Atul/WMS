import React from 'react';
import axios from "axios";
import { ServerAddress } from '../../../constants/ServerAddress';
function UpateEwaybillPartB({ gstin_no, Data, ewayTokenB, access_token }) {
    alert("1111")
    console.log("Data----", Data)
    console.log("gstin_no-----", gstin_no)
    console.log("ewayTokenB----", ewayTokenB)
    const EwayUpdate = async () => {
        console.log("DATA-----------------------------------------------",Data)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", ewayTokenB);
        let li = 0;
        let li2 = 0;
        Data.forEach(async (e, i) => {
          console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbb");
          await axios
            .put(
              `https://dev.api.easywaybill.in/ezewb/v1/ewb/updatePartBByNo?gstin=${gstin_no}`,
              e,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${ewayTokenB}`,
                },
              }
            )
            .then((res) => {
              if (res.data.status == 1) {
                li = li + 1;
                axios.post(ServerAddress+`analytic/add_eway_partb/`,{
                  ewb_no:e.ewbNo,
                  vehicle_no:e.vehicleNo,
                  trans_mode:e.transMode
                },{
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }).then((res)=>{
                  console.log("resupdate eeweee",res.data)
                }).catch((err)=>{
                  console.log("errrrupdqatetee",err,)
                })
                console.log("li", li);
              }
              if (Data.length - 1 === i) {
                // setcount(li)
                alert("222222")
                li2 = li;
                console.log("li", li);
                alert(res.data.message)
                console.log("resEwayBillllll", res.data);
                return li
              }
            })
            .catch((err) => {
              alert("Eway Bill Not Updated ",err)
            });
        });
        return li2;
      };
  return EwayUpdate;
}
export default UpateEwaybillPartB;