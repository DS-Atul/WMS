
import React, { useState, useEffect } from "react";
import { Form, Label, Input } from "reactstrap";
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { setFilterA, setFilterB } from "../../../store/filterValue/FilterValue";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";

function DeliveryInfoFilter() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.authentication.access_token);

    const [page, setpage] = useState(1);
    const [commodity_loaded, setcommodity_loaded] = useState(false);
    const [commodity_count, setcommodity_count] = useState(1);
  
    const [commodity_type_filter, setcommodity_type_filter] = useState([]);
    const [commodity_type_search_item, setcommodity_type_search_item] = useState("");
    const [commodity_type_id, setcommodity_type_id] = useState([]);
  
    const [from_date, setfrom_date] = useState("")
    const [to_date, setto_date] = useState("")
    console.log("from_date----", from_date)

    const handleSubmit = () => {
      settoggle(true);
    };
  
 
    const [toggle, settoggle] = useState(false);
  
    useEffect(() => {
      settoggle(false);
    }, []);
  
    useEffect(() => {
      dispatch(setToggle(toggle));
    }, [toggle]);
  
    useEffect(() => {
      dispatch(setFilterA([from_date]));
      dispatch(setFilterB([to_date]));
    }, [from_date,to_date]);
  
    return (
      <>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <Label className="filter-label">From Date</Label>
            <Input
              style={{ marginBottom: "10px" }}
              value={from_date}
              className="form-control-md"
              id="input"
              name="date"
              type="date"
              onChange={(val) => {
                setfrom_date(val.target.value);
              }}
            />
          </div>
          <div>
            <Label className="filter-label">To Date</Label>
            <Input
              style={{ marginBottom: "10px" }}
              value={to_date}
              className="form-control-md"
              id="input"
              name="date"
              type="date"
              onChange={(val) => {
                setto_date(val.target.value);
              }}
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

export default DeliveryInfoFilter
