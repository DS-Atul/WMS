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

function ClientsFilter() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [commodity_type_filter, setcommodity_type_filter] = useState([
    ["1", "General"],
    ["2", "Pharmaceutical"],
    ["3", "Medical Equipment"],
    ["4", "Perishable"],
    ["5", "Temperature Sensitive"],
    ["6", "Others"],
  ]);
  const [commodity_type, setcommodity_type] = useState([]);
  const [commodity_type_id, setcommodity_type_id] = useState([]);

  const [commodity_name_filter, setcommodity_name_filter] = useState([]);
  const [commodity_name, setcommodity_name] = useState([]);
  const [commodity_name_id, setcommodity_name_id] = useState([]);

  const getCommodityName = () => {
    let temp = [];
    let temp_list = [];

    axios
      .get(
        ServerAddress +
          `master/all_commodities/?p=${page_num}&records=${data_len}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        temp = response.data.results;
        for (let index = 0; index < temp.length; index++) {
          temp_list.push([
            temp[index].id,
            toTitleCase(temp[index].commodity_name),
          ]);
        }
        setcommodity_name_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get ${err}`);
      });
  };

  const handleSubmit = () => {
    settoggle(true);
  };

  useEffect(() => {
    getCommodityName();
  }, []);

  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    settoggle(false);
  }, []);

  useEffect(() => {
    dispatch(setToggle(toggle));
  }, [toggle]);

  useEffect(() => {
    dispatch(setFilterA([String(commodity_type).toUpperCase()]));
    dispatch(setFilterB([String(commodity_name).toUpperCase()]));
  }, [commodity_type, commodity_name]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Commodity Type </Label>
          <MultiSelect
            list_a={commodity_type_filter}
            list_b={commodity_type}
            setlist_b={setcommodity_type}
            show_search={false}
            setlist_id={setcommodity_type_id}
          />
        </div>
        <div>
          <Label className="filter-label">Commodity Name</Label>
          <MultiSelect
            list_a={commodity_name_filter}
            list_b={commodity_name}
            setlist_b={setcommodity_name}
            setlist_id={setcommodity_name_id}
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

export default ClientsFilter;
