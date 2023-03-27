import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
// import HistoryTab from '../../../../components/historyTabComponents/HistoryTab';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import BilltoCreatedHistory from './BilltoCreatedHistory';
import BilltoHistoryTableTitle from './BilltoHistoryTableTitle';
import BilltoHistoryTableFormate from './BilltoHistoryTableFormate';

const BilltoHistoryPage = () => {
  const location = useLocation();
  const [billto_id, setbillto_id] = useState(location.state.client.id);
//   console.log("location",location.state.client);
//   let billto_data =Object.entries(location.state.client);
// console.log(billto_data)
// let billto_details = [
//   billto_data[10],
//   billto_data[11],
//   billto_data[12],
// ];

// let gst_info = [
//   billto_data[21]
// ]

// let address_info = [
//   billto_data[13],
//   billto_data[5],
//   billto_data[4],
//   billto_data[6],
//   billto_data[7],
// ]
// let authorised_info = [
//   billto_data[14],
//   billto_data[15],
//   billto_data[16],
// ]
  return (
    <>
      {/* <HistoryTab
       width={6}
       Number_OF_Card={4}
       Card_Title1={"Billto Details"}
       Card_Data1={billto_details}
       Card_Title2={"GST info"}
       Card_Data2={gst_info}
       Card_Title3={"Primary Address"}
       Card_Data3={address_info}
      Card_Title4={"Communication info authorised"}
      Card_Data4={authorised_info}
       Table_Data_Title={BilltoHistoryTableTitle}
       Table_Data_Formate={BilltoHistoryTableFormate}
       path={`analytic/get_masterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["BillTo"]}&app_name=${["master"]}&object_id=${[billto_id]}`}
       /> */}

       <NewHistoryTab
       Page={BilltoCreatedHistory}
       Table_Data_Title={BilltoHistoryTableTitle}
       Table_Data_Formate={BilltoHistoryTableFormate}
       path={`analytic/get_masterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["BillTo"]}&app_name=${["master"]}&object_id=${[billto_id]}`}
       />
    </>
  )
}

export default BilltoHistoryPage