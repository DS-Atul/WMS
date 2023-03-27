import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import {
  setFilterA,
  setFilterB,
  setFilterC,
} from "../../../store/filterValue/FilterValue";
import { ServerAddress } from "../../../constants/ServerAddress";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setToggle } from "../../../store/parentFilter/ParentFilter";

function BranchesFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [branch_name_filter, setbranch_name_filter] = useState([]);
  const [branch_name, setbranch_name] = useState([]);
  const [branch_name_id, setbranch_name_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");

  const [vendor_filter, setvendor_filter] = useState([]);
  const [vendor, setvendor] = useState([]);
  const [vendor_id, setvendor_id] = useState([]);
  const [vendor_page, setvendor_page] = useState(1);
  const [search_vendor, setsearch_vendor] = useState("");

  const [branch_city_filter, setbranch_city_filter] = useState([]);
  const [branch_city, setbranch_city] = useState([]);
  const [branch_city_id, setbranch_city_id] = useState([]);
  const [branch_city_page, setbranch_city_page] = useState(1);
  const [search_branch_city, setsearch_branch_city] = useState("");

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);

  const getBranch = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&vendor=${[
            "",
          ]}&branch_search=${search_txt}&vendor_search=${search_vendor}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, toTitleCase(temp[index].name)]);
        }
        temp_list = [...new Set(temp_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setbranch_name_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  const getCity = () => {
    let temp = [];
    let temp_list = [];
    axios
      .get(
        ServerAddress +
          `master/all_cities/?search=${""}&p=${branch_city_page}&records=${10}&city_search=${search_branch_city}&place_id=all&filter_by=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, toTitleCase(temp[index].city)]);
        }
        temp_list = [...new Set(temp_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setbranch_city_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  const getVendor = () => {
    let temp = [];
    let temp_list = [];
    axios
      // .get(server_address + "masters/api/all-companies/", {
      .get(
        ServerAddress +
          `master/all_vendor/?p=${vendor_page}&records=${10}&vendor_name=${[
            "",
          ]}&name_search=${search_vendor}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        console.log("temp-----", temp);
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, toTitleCase(temp[index].name)]);
        }
        temp_list = [...new Set(temp_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        setvendor_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };
  const handleSubmit = () => {
    settoggle(true);
  
  };
  useEffect(() => {
    getBranch();
  }, [page, search_txt]);

  useEffect(() => {
    getVendor();
  }, [vendor_page, search_vendor]);

  useEffect(() => {
    getCity();
  }, [branch_city_page, search_branch_city]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(branch_name).toUpperCase()]));
    dispatch(setFilterB([vendor_id]));
    dispatch(setFilterC([branch_city_id]));
  }, [branch_name, vendor_id, branch_city_id]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Branch Name</Label>
          <MultiSelect
            list_a={branch_name_filter}
            setlist_a={setbranch_name_filter}
            list_b={branch_name}
            setlist_b={setbranch_name}
            setlist_id={setbranch_name_id}
            show_search={true}
            get_id={false}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            type={"backend"}
          />
        </div>

        <div>
          <Label className="filter-label">Vendor</Label>
          <MultiSelect
            list_a={vendor_filter}
            setlist_a={setvendor_filter}
            list_b={vendor}
            setlist_b={setvendor}
            setlist_id={setvendor_id}
            show_search={true}
            page={vendor_page}
            setpage={setvendor_page}
            setsearch_txt={setsearch_vendor}
            type={"backend"}
          />
        </div>

        <div>
          <Label className="filter-label">Branch City</Label>
          <MultiSelect
            list_a={branch_city_filter}
            setlist_a={setbranch_city_filter}
            list_b={branch_city}
            setlist_b={setbranch_city}
            setlist_id={setbranch_city_id}
            show_search={true}
            page={branch_city_page}
            setpage={setbranch_city_page}
            setsearch_txt={setsearch_branch_city}
            type={"backend"}
          />
        </div>
        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default BranchesFilter;
