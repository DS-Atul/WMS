import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { Card, Col, Row, CardBody, CardTitle } from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CreateRunsheet from "./CreateRunsheet";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import UnrunsheetsDataFormat from "../../../data/runsheets/pendingToDelivery/Unrunsheets/UnrunsheetsDataFormat";
import Title from "../../../components/title/Title";
import PageTitle from "../../../components/pageTitle/PageTitle";
import { ServerAddress } from "../../../constants/ServerAddress";
import PendingDeliveryDataFormat from "../../../data/runsheets/pendingToDelivery/Runsheets/PendingDeliveryDataFormat";
import Navigate from "../runsheetTab/Navigate";

const PendingToDelivery = () => {
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  const username = useSelector((state) => state.authentication.username);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [local_list, setlocal_list] = useState([]);

  const [createRunsheet_list, setcreateRunsheet_list] = useState([]);

  const [awbno_list, setawbno_list] = useState([]);

  const remove_transfer_list = (index) => {
    let remove_list = createRunsheet_list;
    let remove = remove_list[index];

    let remove_list1 = local_list;
    remove_list1.push(remove);
    setlocal_list(remove_list1);
    setcreateRunsheet_list(
      createRunsheet_list.filter((data) => data !== remove)
    );
  };
  const transfer_list = (index) => {
    let temp_list = local_list;
    let item = temp_list[index];
    let temp_list1 = createRunsheet_list;
    temp_list1.push(item);
    setcreateRunsheet_list(temp_list1);
    setlocal_list(local_list.filter((data) => data !== item));
  };

  const getPendindOrders = () => {
    axios
      .get(ServerAddress + `runsheet/get_localorder/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setlocal_list(response.data);
      })
      .catch((err) => {
        alert(`Error Occur in Get state , ${err}`);
      });
  };
  useEffect(() => {
    getPendindOrders();
  }, []);

  useEffect(() => {
    if (createRunsheet_list.length !== 0) {
      let awb_no_list = [];
      for (let index = 0; index < createRunsheet_list.length; index++) {
        const loc = createRunsheet_list[index];
        awb_no_list.push(loc.id);
      }
      setawbno_list(awb_no_list);
    } else {
      setawbno_list([]);
    }
  }, [createRunsheet_list, local_list]);

  return (
    <>
      {/* <form> */}
      <Navigate />
      <Title title="Pending For Delivery" parent_title="Runsheet" />
      <PageTitle page="Pending For Delivery" />
      <div className="mt-0 m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle
              className="mb-1 header"
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Local Order
            </CardTitle>

            <CardBody style={{ paddingTop: "0px" }}>
              <Row>
                <div
                  className="container-fluid "
                  style={{ background: "white", height: "290px" }}
                >
                  <div className="mb-2 row ">
                    <div className="col-sm-4">
                      <SearchList />
                    </div>
                  </div>
                  <PendingDeliveryDataFormat
                    local_list={local_list}
                    check={transfer_list}
                  />
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
      <div className="m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle
              className="mb-1 header"
              style={{
                fontWeight: 600,
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Create Runsheet
            </CardTitle>

            <CardBody style={{ paddingTop: "5px" }}>
              <Row>
                <Col lg={4}>
                  <CreateRunsheet awb_numbers={awbno_list} />
                </Col>
              </Row>

              <Row>
                <div
                  className="container-fluid "
                  style={{
                    background: "white",
                    height: "290px",
                    marginTop: "20px",
                  }}
                >
                  {/* DataTable */}
                  <UnrunsheetsDataFormat
                    Manifest_list={createRunsheet_list}
                    remove_list={remove_transfer_list}
                  />
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
      {/* </form> */}
    </>
  );
};

export default PendingToDelivery;
