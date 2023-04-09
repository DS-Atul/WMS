import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import BillTosDataFormat from "../../../data/master/clients/BillTosDataFormat";
import ClientsDataTitle from "../../../data/master/clients/BillTosDataTitles";
import AssetDataTitle from "../../../data/master/assets/AssetDataTitle";
import AssetsDataFormat from "../../../data/master/assets/AssetDataFormat";
import RoughDataTitle from "../../../data/manifests/roughManifest/RoughManifestDataTitle";
import RoughDataFormat from "../../../data/manifests/roughManifest/RoughManifestDataFormat";
import Navigate from "../navigateTab/Navigate";
import RoughTab from "../navigateTab/RoughManifestTab";
import HubManifestTab from "../navigateTab/HubManifestTab";
import HubAirDataTitle from "../../../data/manifests/hubAirForward/HubAirDataTitle";
import HubAirDataFormat from "../../../data/manifests/hubAirForward/HubAirDataFormat";

const HubAirForwarding = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const commodity_type = useSelector((state) => state.filtervalue.data_a);
  const commodity_name = useSelector((state) => state.filtervalue.data_b);

  // // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions
  const user_permissions = useSelector(
    (state) => state.permissions.user_permissions
  );

  let is_superuser = useSelector(
    (state) => state.authentication.userdetails.is_superuser
  );

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

    //Permission
    const userpermission = useSelector(
      (state) => state.authentication.userpermission
    );
    const [can_delete, setcan_delete] = useState(false);
  
    useEffect(() => {
      if (
        userpermission.some(
          (e) => e.sub_model === "Raugh Manifest" && e.delete === true
        )
      ) {
        setcan_delete(true);
      } else {
        setcan_delete(false);
      }
    }, [userpermission]);
  return (
    <>
      <PageTitle page="Hub Air Forward" />
      <Navigate />
      <HubManifestTab/>
      <Title title="Hub Air Forward" parent_title="Manifest" />
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
          <DataList
          can_delete={can_delete}
            Data_Title={HubAirDataTitle}
            Data_Format={HubAirDataFormat}
            path={`manifest/get_manifest/?search=${search}&p=${page_num}&records=${data_len}&is_scanned=False`}
            checkbox={"NO"}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default HubAirForwarding;