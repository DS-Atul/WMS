import React, { useEffect, useState,useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import Navigate from "../navigateTab/Navigate";
import PacketsDataFormat from "../../../data/manifests/packets/PacketsDataFormat";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { Button } from "reactstrap";

const BoxDetail = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
 const location_data=useLocation();
const [data, setdata] = useState([]);
  // // Permissions
  useEffect(() => {
    dispatch(setToggle(false));
  }, []);


  useEffect(() => {
   console.log("checking pass",location_data.state.order)
  }, [])
  
  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );

 const asd = (no) => {
  axios.get(ServerAddress+`booking/orderboxqrcodecheck/${no}`,{
    
      headers: { Authorization: `Bearer ${accessToken}`}
    
  }).then((res)=>{
    console.log("ress",res)
    setdata(res.data);
  }).catch((err)=>{
    console.log("errrrrr",err)
  })
 }

 useLayoutEffect(() => {
   console.log("asd",location_data.state.order.vehicle_no);
   
   asd(location_data.state.order.vehicle_no);
 }, [])

  return (
    <>
      <PageTitle page="PacketsDetail" />
      <Title title="Packets Detail" parent_title="PickedupOrders" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
              >
               
                {/* Filter Tool */}
                <Filter />
              </div>
            </div>
           
          </div>

          {/* DataTable */}
          <PacketsDataFormat
          data={data}
          />
          <Button>Cancel</Button>
          <Button>Recieved</Button>

        </div>
      </div>
    </>
  );
};
export default BoxDetail;
