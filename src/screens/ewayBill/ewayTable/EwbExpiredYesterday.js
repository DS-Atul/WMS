import React,{useState,useEffect} from 'react'
import { gstin_no } from '../../../constants/CompanyDetails';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PageTitle from '../../../components/pageTitle/PageTitle';
import Title from '../../../components/title/Title';
import SearchList from '../../../components/listDisplay/searchList/SearchList';
import ExtendDataFormat from '../../../data/ewayBill/extendEwayBill/ExtendDataFormat';

const EwbExpiredYesterday = () => {

    const b_acess_token = useSelector((state) => state.eway_bill.b_access_token);
const [data, setdata] = useState([]);
    const get_expire_eway= () => {
        axios
          .post(
            `https://dev.api.easywaybill.in/ezewb/v1/ewb/search?gstin=${gstin_no}`,
            {
                "type": "EWB_EXPIRING_TODAY",
                "defaultquery": null,
                "page": "0",
                "size": 10,
                "sortfield": "ewbDate",
                "sortdir": "desc",
                "addlquery": {
                "operator": "and",
                "criterias": [
                {
                "p": "godownId",
                "o": "eq",
                "v": "-1"
                }
                ]
                }
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
            // setpart_b_12(response.data.response);
            setdata(response.data.response);
            
          })
          .catch((error) => {});
      };
      useEffect(() => {
      get_expire_eway();
      }, [])
      


  return (
    <>

    <PageTitle page="Extend EwayBill" />
      <Title title="Extend EwayBill" parent_title="EwayBill" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
           
          
          </div>

          {/* DataTable */}
          <ExtendDataFormat
          data={data}
          />
       
        </div>
      </div>
    
    </>
  )
}

export default EwbExpiredYesterday