import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import NewHistoryTab from '../../../../components/historyTabComponents/NewHistoryTab';
import OrderOriginsHistoryCreatedPage from './OrderOriginsHistoryCreatedPage';
import OrderOriginsHistoryFormate from './OrderOriginsHistoryFormate';
import OrderOriginsHistoryTitle from './OrderOriginsHistoryTitle';

const OrderOriginsHistoryPage = () => {
    const location = useLocation();

    const [orderOrigin_id, setorderOrigin_id] = useState(location.state.orderorigin);
  return (
    <>
    <NewHistoryTab
    Page={OrderOriginsHistoryCreatedPage}
    Table_Data_Title={OrderOriginsHistoryTitle}
    Table_Data_Formate={OrderOriginsHistoryFormate}
    path={`analytic/get_masterdatahistory/?search=${""}&p=${1}&records=${10}&model_name=${["Shipper/Consignee"]}&app_name=${["masters"]}&object_id=${[orderOrigin_id]}`}
    />
    </>
  )
}

export default OrderOriginsHistoryPage