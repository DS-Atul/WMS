import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import DataList from "../../../components/listDisplay/dataList/DataList";
import { setPageNumber } from "../../../store/pagination/Pagination";
import Filter from "../../../components/listDisplay/filter/Filter";
import Nav_Btn from "../../../components/btn/NavBtn";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
// import { setToggle } from "../../../store/parentFilter/ParentFilter";
import DepartmentsDataTitle from "../../../data/ems/departments/DepartmentsDataTitle";
import DepartmentsDataFormat from "../../../data/ems/departments/DepartmentsDataFormat";

const Users = () => {
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  // const toggle = useSelector((state) => state.parentfilter.toggle);
  // const home_branch = useSelector((state) => state.filtervalue.data_a);
  const search = useSelector((state) => state.searchbar.search_item);
  // const username = useSelector((state) => state.filtervalue.data_b);
  // const user_permissions = useSelector(
  //   (state) => state.permissions.user_permissions
  // );
  const dispatch = useDispatch();

  return (
    <>
      <PageTitle page="Depertments" />
      <Title title="Depertments" parent_title="Ems" />
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
                {/* {user_permissions.includes('Can add locations') || is_superuser &&( */}
                <Nav_Btn
                  btn_name="Add Department"
                  // icon={<MdAdd size={20}/>}
                  form_path="/ems/department/adddepartment"
                />
                {/* Filter Tool */}
                {/* <Filter type={""} /> */}
              </div>
            </div>
          </div>
          {/* DataTable */}
          <DataList
            Data_Title={DepartmentsDataTitle}
            Data_Format={DepartmentsDataFormat}
            path={`ems/all_departments/?search=${search}&p=${page_num}&records=${data_len}&name=${[
              "",
            ]}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Users;
