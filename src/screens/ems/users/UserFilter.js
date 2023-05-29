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
  const [user_loaded, setuser_loaded] = useState(false);
  const [user_count, setuser_count] = useState(1);
  const [user_bottom, setuser_bottom] = useState(100);
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
      .then((response) => {
        if (response.data.next === null) {
          setuser_loaded(false);
        } else {
          setuser_loaded(true);
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
          setuser_count( user_count + 2);
          setbranch_name_filter(temp_list);
        }
        else {
          setbranch_name_filter([])
        }

        // for (let index = 0; index < temp.length; index++) {
        //   temp_list.push([temp[index].id, toTitleCase(temp[index].name)]);
        // }
        // temp_list = [...new Set(temp_list.map((v) => `${v}`))].map((v) =>
        //   v.split(",")
        // );
        // console.log("temp_list====", temp_list)
        // setbranch_name_filter(temp_list);
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
            loaded={user_loaded}
            count={user_count}
            bottom={user_bottom}
            setbottom={setuser_bottom}

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
