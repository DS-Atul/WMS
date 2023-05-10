import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Label } from "reactstrap";
import MultiSelect from "../../../components/formComponent/multiSelect/MultiSelect";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import { useDispatch } from "react-redux";
import { setFilterA } from "../../../store/filterValue/FilterValue";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { BsCheckLg } from "react-icons/bs";

const UserFilter = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const [home_branch, sethome_branch] = useState([]);
  const [branch_name_filter, setbranch_name_filter] = useState([]);
  const [branch_name_id, setbranch_name_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const dispatch = useDispatch();
  const gethomeBranch = () => {
    let temp = [];
    let temp_list = [...branch_name_filter];
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page_num}&records=${data_len}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&branch_search=${search_txt}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        temp = resp.data.results;

        for (let index = 0; index < temp.length; index++) {
          temp_list.push([temp[index].id, toTitleCase(temp[index].name)]);
        }
        temp_list = [...new Set(temp_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );
        console.log("temp_list====", temp_list)
        setbranch_name_filter(temp_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get`);
      });
  };
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
    console.log("branch_name_id====", branch_name_id)
    dispatch(setFilterA([branch_name_id]));
  }, [home_branch]);

  useEffect(() => {
    gethomeBranch();
  }, [page, search_txt]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Label className="filter-label">Home branch</Label>
          <MultiSelect
            list_a={branch_name_filter}
            list_b={home_branch}
            setlist_b={sethome_branch}
            setlist_id={setbranch_name_id}
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
      </Form>
    </>
  );
};

export default UserFilter;
