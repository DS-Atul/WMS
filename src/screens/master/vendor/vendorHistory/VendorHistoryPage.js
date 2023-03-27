import React, {useState} from 'react';
import NewHistoryTab from "../../../../components/historyTabComponents/NewHistoryTab";
// import VendorHistoryTableTitle from './VendorHistoryTableTitle';
// import VendorHistoryTableFormate from './VendorHistoryTableFormate';
import VendorCreatedHistory from './VendorCreatedHistory';
import VendorHistoryTableTitle from './VendorHistoryTableTitle';
import VendorHistoryTableFormate from './VendorHistoryTableFormate';
import { useLocation } from 'react-router-dom';

const VendorHistoryPage = () => {
  const location = useLocation();
  console.log(location)
  const [vendor_id, setvendor_id] = useState(location.state.vendor.id);
  return (
    <>
    <NewHistoryTab
    Page={VendorCreatedHistory}
    Table_Data_Title={VendorHistoryTableTitle}
    Table_Data_Formate={VendorHistoryTableFormate}
    path={`analytic/get_masterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Vendor"]}&app_name=${["masters"]}&object_id=${[vendor_id]}`}
    path1={`analytic/get_masterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Vendor"]}&app_name=${["masters"]}&object_id=${[vendor_id]}`}
    />
    </>
  )
}

export default VendorHistoryPage