import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import SearchList from "../../../components/listDisplay/searchList/SearchList";

const PickedUpOrders = () => {
  const dispatch = useDispatch();

  return (
    <>
      <PageTitle page="PickedOrders" />
      <Title title="PickedOrders" parent_title="Incoming" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row ">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
                {/* Filter Tool */}
                {/* <Filter type={"client"} /> */}
              </div>
            </div>
          </div>

          {/* DataTable */}
          {/* <DataList
          can_delete={can_delete}
            Data_Title={RoughDataTitle}
            Data_Format={RoughDataFormat}
            path={`manifest/get_manifest/?search=${search}&p=${page_num}&records=${data_len}`}
            checkbox={"NO"}
          /> */}
          {/* <NumPagination path={"path"} /> */}
        </div>
      </div>
    </>
  );
};
export default PickedUpOrders;
