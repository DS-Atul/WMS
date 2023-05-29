import { Form, Label } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import React, { useState, useEffect } from "react";
import {
  setFilterA,
  // setFilterB,
  // setFilterC,
} from "../../../store/filterValue/FilterValue";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const LocationsFilter = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [name, setname] = useState("");
  const [name_filter, setname_filter] = useState([]);
  const [page_search, setpage_search] = useState("")
  const [name_id, setname_id] = useState(0)
  const [page, setpage] = useState(1);
  const [location_loaded, setlocation_loaded] = useState(false);
  const [location_count, setlocation_count] = useState(1);
  const [location_bottom, setlocation_bottom] = useState(100);


  const getLocationName = () => {
    let temp = [];
    let temp_list = [];

    axios
      .get(
        ServerAddress +
          `master/all_locality/?place_id=all&filter_by=all&search=${""}&p=${page}&records=${10}&name_search=${page_search}&state=&city=&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setlocation_loaded(false);
        } else {
          setlocation_loaded(true);
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
              ...name_filter,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setlocation_count(location_count + 2);
          setname_filter(temp_list);
        }
        else {
          setname_filter([])
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
    getLocationName();
  }, [page,page_search]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(name).toUpperCase()]));
  }, [name]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Locality</Label>
          <MultiSelect
            list_a={name_filter}
            setlist_a={setname_filter}
            list_b={name}
            setlist_b={setname}
            show_search={true}
            setlist_id={setname_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setpage_search}
            type={"backend"}
            loaded={location_loaded}
            count={location_count}
            bottom={location_bottom}
            setbottom={setlocation_bottom}

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
};

export default LocationsFilter;
