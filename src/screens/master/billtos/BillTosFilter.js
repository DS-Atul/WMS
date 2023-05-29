import React, { useState, useEffect } from "react";
import { Label } from 'reactstrap';
import "../../../assets/scss/filters/filter.scss";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import MultiSelect from '../../../components/formComponent/multiSelect/MultiSelect';
import { setFilterA,setFilterB, } from '../../../store/filterValue/FilterValue';
import { ServerAddress } from '../../../constants/ServerAddress';
import toTitleCase from '../../../lib/titleCase/TitleCase';
import { setToggle } from '../../../store/parentFilter/ParentFilter';

const BillTosFilter = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [pan_no_filter, setpan_no_filter] = useState([]);
  const [pan_no, setpan_no] = useState([]);
  const [pan_no_id, setpan_no_id] = useState([]);
  const [page, setpage] = useState(1);
  const [search_txt, setsearch_txt] = useState("");
  const [pan_no_loaded, setpan_no_loaded] = useState(false);
  const [pan_no_count, setpan_no_count] = useState(1);
  const [pan_no_bottom, setpan_no_bottom] = useState(100);

  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);


  const getPan =() =>{
    let temp = [];
    console.log("temp file 1=====",temp)
    let temp_list = [];
    console.log("temp file 2=====",temp_list)
    axios
    .get(
      ServerAddress +
      `master/all_billtoes/?search=${search_txt}&p=${page}&records=${10}&pan_no=${[]}&name=&name_search=${""}&data=all`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((response) => {
      console.log(" the response data is ====",response)
      if ( response.data.next === null){
        setpan_no_loaded(false);
      } else {
        setpan_no_loaded(true);
      }
      temp = response.data.results;
      if( temp.length > 0){
        if(page === 1){
          temp_list = response.data.results.map((v) =>[
            v.id,
            (v.pan_no),
          ]);
        } else{
          temp_list = [
            ...pan_no_filter,
            ...response.data.results.map((v) => [v.id, (v.pan_no)]),
          ];
        }
        setpan_no_count(  pan_no_count + 2);
        setpan_no_filter(temp_list);
      }
      else {
        setpan_no_filter([])
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
  getPan();
}, [page, search_txt])



const [toggle, settoggle] = useState(false);

useEffect(() => {
  settoggle(false);
}, [])
useEffect(() => {
  dispatch(setToggle(toggle));
}, [toggle]);
useEffect(() => {
  dispatch(setFilterA([pan_no]));
}, [pan_no]);

  return(
    <>
    <form
     onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
     }}
    >
      <div>
          <Label className="filter-label">PAN NO </Label>
          <MultiSelect
            list_a={pan_no_filter}
            setlist_a={setpan_no_filter}
            list_b={pan_no}
            setlist_b={setpan_no}
            setlist_id={setpan_no_id}
            show_search={true}
            page={page}
            setpage={setpage}
            setsearch_txt={setsearch_txt}
            type={"backend"}
            loaded={pan_no_loaded}
            count={pan_no_count}
            bottom={pan_no_bottom}
            setbottom={setpan_no_bottom}
          />
        </div>

        <div style={{ paddingTop: "10px" }}>
          <button type="submit" className="btn btn-primary m-1">
            Submit
          </button>
        </div>

    </form>
    </>
  )


}
export default BillTosFilter
