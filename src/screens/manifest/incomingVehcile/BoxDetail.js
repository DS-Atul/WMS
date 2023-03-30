import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import Navigate from "../navigateTab/Navigate";
import PacketsDataFormat from "../../../data/manifests/packets/PacketsDataFormat";

const BoxDetail = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.userdetails);


  // // Permissions

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );




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
          <PacketsDataFormat />
        </div>
      </div>
    </>
  );
};
export default BoxDetail;
