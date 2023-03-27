import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
// import Search_list from "../../../components/List_Display/Search_list";
// import Nav_Btn from "../../../components/Btn/Nav_Btn";
// import Filter from "../../../components/List_Display/Filter";
// import Page_Title from "../../../components/Page_Title/Page_Title";
// import Charges_Data_Format from "../../../data/Masters/Charges/Charges_Data_format";
// import Charges_title from "../../../data/Masters/Charges/Charges_Data_Title";
import { useDispatch, useSelector } from "react-redux";
// import { Toggle } from "../../../store/Filter/Parent_Filter/action";
// import { setPageNumber } from "../../../store/Components/Pagination/action";
import DataList from "../../../components/listDisplay/dataList/DataList";
import Title from "../../../components/title/Title";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../../components/btn/NavBtn";
import Filter from "../../../components/listDisplay/filter/Filter";
import PageTitle from "../../../components/pageTitle/PageTitle";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import ChargesDataFormat from "../../../data/master/charges/ChargesDataFormat";
import ChargesDataTitle from "../../../data/master/charges/ChargesDataTitle";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import InvoiceDataTitle from "../../../data/billings/invoices/InvoiceDataTitle";
import InvoiceDataFormat from "../../../data/billings/invoices/InvoiceDataFormat";

const Invoices = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const primary_charges = useSelector((state) => state.filtervalue.data_a);
  const search = useSelector((state) => state.searchbar.search_item);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  // Permissions
  const user_permissions = useSelector(
    (state) => state.permissions.user_permissions
  );

  useEffect(() => {
    dispatch(setFilterA([]));
  }, []);

  return (
    <>
      <PageTitle page="Invoices" />

      <Title title="Invoices" parent_title="Billing" />
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
                <NavBtn
                  btn_name="Add Invoice"
                  icon={<MdAdd size={15} />}
                  form_path="/billing/invoices/addinvoice"
                />
                <Filter type={"invoices"} />
              </div>
            </div>
          </div>

          <DataList
            Data_Title={InvoiceDataTitle}
            Data_Format={InvoiceDataFormat}
            path={`billing/get_invoices/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};

export default Invoices;
