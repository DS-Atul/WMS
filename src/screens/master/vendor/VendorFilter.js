import React, { useState, useEffect } from "react";
import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setFilterA, setFilterB } from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

function VendorFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [vendor_filter, setvendor_filter] = useState([]);
  const [vendor, setvendor] = useState([]);
  const [vendor_id, setvendor_id] = useState([]);
  const [page, setpage] = useState(1);
  const [vendor_search, setvendor_search] = useState("");
  const [vendor_loaded, setvendor_loaded] = useState(false);
  const [vendor_count, setvendor_count] = useState(1);
  const [vendor_bottom, setvendor_bottom] = useState(100);

  const getvendor = () => {
    let temp = [];
    let temp_list = [...vendor_filter];

    axios
      .get(
        ServerAddress +
          `master/all_vendor/?search=${""}&p=${page}&records=${10}&name_search=${vendor_search}&vendor_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setvendor_loaded(false);
        } else {
          setvendor_loaded(true);
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
              ... vendor_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setvendor_count( vendor_count + 2);
          setvendor_filter(temp_list);
        }
        else {
          setvendor_filter([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };

  const handleSubmit = () => {
    settoggle(true);
  };

  useEffect(() => {
    getvendor();
  }, [page, vendor_search]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(vendor).toUpperCase()]));
  }, [vendor]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Vendor</Label>
          <MultiSelect
            list_a={vendor_filter}
            setlist_a={setvendor_filter}
            list_b={vendor}
            setlist_b={setvendor}
            setlist_id={setvendor_id}
            show_search={true}
            get_id={false}
            page={page}
            setpage={setpage}
            setsearch_txt={setvendor_search}
            type={"backend"}
            loaded={vendor_loaded}
            count ={vendor_count}
            bottom={vendor_bottom}
            setbottom={setvendor_bottom}
          />
        </div>

        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}

export default VendorFilter;
