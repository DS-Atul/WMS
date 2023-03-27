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

function RouteFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [page, setpage] = useState(1);

  const [route_filter, setroute_filter] = useState([]);
  const [route, setroute] = useState([]);
  const [route_search_item, setroute_search_item] = useState("");
  const [route_id, setroute_id] = useState([]);

  const getRoute = () => {
    let temp = [];
    let temp_list = [...route_filter];

    axios
      .get(
        ServerAddress +
          `master/get_routes/?search=${""}&p=${page}&records=${10}&name=&name_search=${route_search_item}&data=all`,
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
        alert(`Error Occur in Get ${err}`);
      });
  };

  const handleSubmit = () => {
    settoggle(true);
  };

  useEffect(() => {
    getRoute();
  }, [page, route_search_item]);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(route).toUpperCase()]));
  }, [route]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Name </Label>
          <MultiSelect
            list_a={route_filter}
            setlist_a={setroute_filter}
            list_b={route}
            setlist_b={setroute}
            show_search={true}
            setlist_id={setroute_id}
            page={page}
            setpage={setpage}
            setsearch_txt={setroute_search_item}
            type={"backend"}
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

export default RouteFilter;
