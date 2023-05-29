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

const AssetsFilter = () => {

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [toggle, settoggle] = useState(false);
  const [branch_name_filter, setbranch_name_filter] = useState([]);
  const [branch_name, setbranch_name] = useState([]);
  const [branch_name_id, setbranch_name_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [assets_loaded, setassets_loaded] = useState(false);
  const [assets_count, setassets_count] = useState(1);
  const [assets_bottom, setassets_bottom] = useState(100);

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
          ]}&branch_search=${search_txt}&vendor_search=${""}&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setassets_loaded(false);
        } else {
          setassets_loaded(true);
        }

        temp = response.data.results;
        if (temp.length > 0) {
          if (page === 1) {
            temp_list = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            temp_list = [
              ...branch_name_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setassets_count(assets_count + 2);
          setbranch_name_filter(temp_list);
        }
        else {
          setbranch_name_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const handleSubmit = () => {
    settoggle(true);  
  };

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    getBranch();
  }, [page, search_txt]);

  useEffect(() => {
    dispatch(setFilterA([String(branch_name).toUpperCase()]));
  }, [branch_name]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Current Branch</Label>
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
            loaded={assets_loaded}
            count={assets_count}
            bottom={assets_bottom}
            setbottom={setassets_bottom}
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
};

export default AssetsFilter;
