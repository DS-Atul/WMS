import React from 'react';
import axios from 'axios';
import { ServerAddress } from '../../../constants/ServerAddress';

async function UpateEwaybillPartB({ gstin_no, Data, ewayTokenB, access_token }) {
  console.log('Data=====', Data);
  console.log('ewayTokenB=====', ewayTokenB);

  const send_data = async (e, val) => {
    console.log('val------', val);
    try {
      const response = await axios.post(
        ServerAddress + 'analytic/add_eway_partb/',
        {
          ewb_no: e.ewbNo,
          vehicle_no: e.vehicleNo,
          trans_mode: e.transMode,
          is_updated: val,
          reason_code: 2,
          reason_remarks: "DUE TO TRANSSHIPMENT",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    
      console.log('response=========', response);
    } catch (error) {
      alert(`Error Happened while posting Commodity Type Data: ${error}`);
    }
  };

  const EwayUpdate = async (e, i) => {
    console.log('e=====', e);
    console.log('i=====', i);
    try {
      const resp = await axios.put(
        `https://dev.api.easywaybill.in/ezewb/v1/ewb/updatePartBByNo?gstin=${gstin_no}`,
        e,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ewayTokenB}`,
          },
        }
      );
      console.log('res=======', resp);
      await send_data(e, resp.data?.status === 1 ? true : false);
      alert(
        resp.data?.response?.ewbNo
          ? resp.data.message + ', ' + resp.data?.response?.ewbNo
          : resp.data.errorList[0].message + ', ' + e?.ewbNo
      );
    } catch (err) {
      alert(`Eway Bill Not Updated: ${err}`);
    }
  };

  // Call EwayUpdate function for each key-value pair in Data array
  if (ewayTokenB) {
    await Promise.all(Data.map((e, i) => EwayUpdate(e, i)));
  }

  return null; // or JSX element if needed
}

export default UpateEwaybillPartB;
