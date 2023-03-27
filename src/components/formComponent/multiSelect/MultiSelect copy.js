import React, { useState, useEffect, useLayoutEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiSquare, FiCheckSquare, FiX, FiTarget } from "react-icons/fi";
import "../../../assets/scss/forms/form.scss";
import { IconContext } from "react-icons";

const MultiSelect = ({
  list_a,
  setlist_b,
  show_search = true,
  setlist_id,
  get_id = true,
}) => {
  const [selected_a, setselected_a] = useState([]);
  const [data, setdata] = useState(false);
  const [multidata, setmultidata] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [filter_a, setfilter_a] = useState([]);
  const [search_a, setsearch_a] = useState("");

  const getselected = (selected, setselected, name, index) => {
    if (selected.includes(name)) {
      return (
        <div
          key={index}
          className=" m-1"
          style={{
            fontSize: "13px",
            background: "hsl(213, 100%, 95%)",
            padding: "2px",
            cursor: "default",
          }}
          onClick={() => {
            setselected(selected.filter((val) => val != name));
            setmultidata(false);
          }}
        >
          {" "}
          {name[1]}
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="m-1"
          style={{ fontSize: "13px", cursor: "copy" }}
          onClick={() => {
            setselected([...selected, name]);
            setmultidata(false);
          }}
        >
          {" "}
          {name[1]}
        </div>
      );
    }
  };
  useEffect(() => {
    if (selected_a.length >= 4) {
      setdata(true);
    } else {
      setdata(false);
    }
  }, [selected_a.length >= 4]);

  useLayoutEffect(() => {
    if (multidata == true) {
      setselected_a(list_a);
    } else {
      setselected_a(selected_a);
    }
  }, [multidata == true]);

  useEffect(() => {
    let temp = [];
    for (let index = 0; index < selected_a.length; index++) {
      temp.push(selected_a[index][1]);
    }
    setlist_b(temp);
  }, [selected_a]);

  useEffect(() => {
    let temp2 = [];
    for (let index = 0; index < selected_a.length; index++) {
      temp2.push(selected_a[index][0]);
    }
    if (get_id) {
      setlist_id(temp2);
    }
  }, [selected_a]);

  const removeAll = () => {
    setselected_a([]);
    setmultidata(false);
  };

  return (
    <>
      <div
        className="d-flex flex-wrap"
        style={{ height: showfilter == true ? "210px" : "" }}
      >
        <button
          type="button"
          style={{
            border: "1px solid #d3d3d3",
            height: "30.5px",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            background: "white",
            cursor: "default",
            overflow: "hidden",
          }}
          className="form-control-sm"
        >
          <div style={{ display: "flex" }}>
            {data === false ? (
              selected_a.map((data, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0px 3px 2px 3px",
                    fontSize: "12px",
                    background: "#E6F1FF",
                    margin: "2px",
                    alignItems: "center",
                    borderRadius: "15px",
                  }}
                >
                  {data[1]}
                  <FiTarget
                    style={{
                      fontSize: "10px",
                      marginLeft: "5px",
                      color: "gray",
                    }}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "0px 5px 3px 5px",
                  fontSize: "12px",
                  background: "#E6F1FF",
                  margin: "2px",
                  alignItems: "center",
                  borderRadius: "15px",
                }}
              >
                {selected_a.length} Items Are Selected{" "}
                <FiX
                  onClick={() => removeAll()}
                  style={{ fontSize: "14px" }}
                  className="d_icon"
                />
              </div>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{ borderLeft: "1px solid #d3d3d3", cursor: "pointer" }}
              onClick={() => {
                setshowfilter(!showfilter);
              }}
            >
              <IconContext.Provider
                value={{
                  className: "select-icon",
                }}
              >
                <MdOutlineKeyboardArrowDown />
              </IconContext.Provider>
              {/* )} */}
            </div>
          </div>
        </button>
        {showfilter == true ? (
          <div
            className="card"
            style={{
              overflow: "auto",
              height: "180px",
              width: "100%",
              border: "1px solid #d3d3d3",
              borderTop: "none",
            }}
          >
            <div className="" style={{ height: "180px", width: "100%" }}>
              {show_search === true ? (
                <div
                  style={{
                    height: "30px",
                    margin: "10px 10px 1px 10px",
                    position: "sticky",
                    top: "0px",
                  }}
                >
                  <input
                    type="search"
                    placeholder="Search..."
                    id="input"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "1px solid #D3D3D3",
                      borderRadius: "5px",
                    }}
                    value={search_a}
                    onChange={(event) => {
                      let val = event.target.value;
                      setsearch_a(val);
                      setfilter_a(
                        list_a.filter((item) => {
                          let name = item[1];
                          name = name.toLowerCase();
                          val = val.toLowerCase();
                          if (String(name).includes(String(val))) {
                            return name;
                          }
                        })
                      );
                    }}
                  />
                </div>
              ) : null}
              <div style={{ width: "100%", height: "180px" }}>
                {multidata == true ? (
                  <div
                    onClick={() => setmultidata(!multidata)}
                    style={{ paddingTop: "5px" }}
                  >
                    {" "}
                    <FiCheckSquare style={{ margin: "5px 5px" }} />
                    <span style={{ fontSize: "13px" }}>Select All</span>
                  </div>
                ) : (
                  <div
                    onClick={() => setmultidata(!multidata)}
                    style={{ paddingTop: "5px" }}
                  >
                    {" "}
                    <FiSquare style={{ margin: "5px 5px" }} />
                    <span style={{ fontSize: "13px" }}>Select All</span>
                  </div>
                )}

                {search_a != ""
                  ? filter_a.map((item, index) =>
                      getselected(selected_a, setselected_a, item, index)
                    )
                  : list_a.map((item, index) =>
                      getselected(selected_a, setselected_a, item, index)
                    )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MultiSelect;
