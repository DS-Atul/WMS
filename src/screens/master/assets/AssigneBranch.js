/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
// import "../../../multiassets/scss/forms/form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import TransferList from "../../../components/formComponent/transferList/TransferList";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";

function AssigneBranch() {
  const user = useSelector((state) => state.authentication.userdetails);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const page_num = useSelector((state) => state.pagination.page_number);
  const data_len = useSelector((state) => state.pagination.data_length);
  const dispatch = useDispatch();
  const multiasset_data = useLocation();
  const navigate = useNavigate();
  const [isupdating, setisupdating] = useState(false);

  // Location
  const [asset_list_1, setasset_list_1] = useState([]);
  const [asset_list_2, setasset_list_2] = useState([]);
  const [asset_page, setasset_page] = useState(1);
  const [asset_search, setasset_search] = useState("");

  //BranCh
  const [branch_id, setbranch_id] = useState("");
  const [branch_list, setbranch_list] = useState([]);
  const [branch, setbranch] = useState("");
  const [page, setpage] = useState(1);
  const [search_branch, setsearch_branch] = useState("");
  const [branch_err, setbranch_err] = useState("");

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/master/assets");
  };
  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      //   name: toTitleCase(routedata.name) || "",
    },

    validationSchema: Yup.object({
      //   name: Yup.string().required("Branch name is required"),
    }),

    onSubmit: (values) => {
      isupdating ? update_route(values) : add_route(values);
    },
  });

  const getBranches = () => {
    let temp3 = [];
    let data = [];
    axios
      .get(
        ServerAddress +
          `master/all-branches/?search=${""}&p=${page}&records=${10}&branch_name=${[
            "",
          ]}&branch_city=${[""]}&vendor=${[""]}&branch_search=${search_branch}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          data = response.data.results;
          for (let index = 0; index < data.length; index++) {
            temp3.push([data[index].id, toTitleCase(data[index].name)]);
          }
          temp3 = [...new Set(temp3.map((v) => `${v}`))].map((v) =>
            v.split(",")
          );
          setbranch_list(temp3);
        }
      })
      // .then((resp) => {
      //   setbranch_list(resp.data);
      // })
      .catch((err) => {
        alert(`Error Occur in Get`, err);
      });
  };

  useLayoutEffect(() => {
    getBranches();
  }, [page, search_branch]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          if (multiasset == "") {
            setmultiasset_error(true);
          }
          val;
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle
            page={isupdating ? "Update Assign Branch" : "Add Assign Branch"}
          />
          <Title
            title={isupdating ? "Update Assign Branch" : "Add Assign Branch"}
            parent_title="Masters"
          />
        </div>

        {/* Routes Info */}
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Asset Info
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle}>
                      {circle_btn ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn ? (
                <CardBody>
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Branch *</Label>
                        <SearchInput
                          data_list={branch_list}
                          setdata_list={setbranch_list}
                          data_item_s={branch}
                          set_data_item_s={setbranch}
                          page={page}
                          setpage={setpage}
                          set_id={setbranch_id}
                          setsearch_item={setsearch_branch}
                        />
                      </div>
                      <div className="mt-1 error-text" color="danger">
                        {branch_err ? "Please Select Any Branch" : null}
                      </div>
                    </Col>
                    <Label className="header-child">Asset *</Label>
                    <Col lg={12} md={12} sm={12}>
                      <TransferList
                        list_a={asset_list_1}
                        setlist_a={setasset_list_1}
                        list_b={asset_list_2}
                        setlist_b={setasset_list_2}
                        page={asset_page}
                        setpage={setasset_page}
                        error_message={"Please Select Any Option"}
                        setsearch_item={setasset_search}
                      />
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Footer */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <Button type="submit" className="btn btn-info m-1 cu_btn">
                {isupdating ? "Update" : "Save"}
              </Button>

              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={handleAction}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
}

export default AssigneBranch;
