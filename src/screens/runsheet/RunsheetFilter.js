import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import "../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import MultiSelect from "../../components/formComponent/multiSelect/MultiSelect";
import { ServerAddress } from "../../constants/ServerAddress";
import { setFilterA } from "../../store/filterValue/FilterValue";
import toTitleCase from "../../lib/titleCase/TitleCase";
import { setToggle } from "../../store/parentFilter/ParentFilter";

function RunsheetFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [route_filter, setroute_filter] = useState([]);
  const [route, setroute] = useState([]);
  const [vehicle_no_filter, setvehicle_no_filter] = useState([]);
  const [vehicle_no, setvehicle_no] = useState([]);
  const [route_id, setroute_id] = useState([]);
  const [vehicle_no_id, setvehicle_no_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");

  const getRoute = () => {
    let temp = [];
    let temp_list = [...route_filter];
    let temp_list2 = [];
    axios
      .get(
        ServerAddress +
          `master/get_routes/?search=${""}&p=${page}&records=${10}&name=&name_search=${search_txt}&data=all`,
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
        setroute_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  const handleSubmit = () => {
    settoggle(true);
  };

  useEffect(() => {
    getRoute();
  }, [page,search_txt]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([route_id]));
  }, [route_id]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Route</Label>
          <MultiSelect
            list_a={route_filter}
            setlist_a={setroute_filter}
            list_b={route}
            setlist_b={setroute}
            setlist_id={setroute_id}
            show_search={true}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
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

export default RunsheetFilter;
