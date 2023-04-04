import React, { useState, useLayoutEffect, useEffect } from "react";
import HeaderCard from "../../components/dashboardComponents/card/HeaderCard";
import useWindowDimensions from "./ScreenSize";
import { FaTruck } from "react-icons/fa";
import { IoMdTrain } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import SpineAreaChart from "../../components/dashboardComponents/Charts/SpineAreaChart";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.css";

import BarChart from "../../components/dashboardComponents/Charts/BarChart";
import DonutChart from "../../components/dashboardComponents/Charts/DonutChart";
import PieChart from "../../components/dashboardComponents/Charts/PieChart";
import { Card } from "react-bootstrap";
import { CardBody, CardTitle, Col } from "reactstrap";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import { useSelector } from "react-redux";

const DashboardChartSection = () => {
  // To get Screen Size
  const { height, width } = useWindowDimensions();

  // FOr Donut Chart
 
 const colors= ['#609966', '#1F8A70', '#AACB73', '#4E6C50', '#81CACF'];

  const color = " rgb(136 , 132,216)";

  //  Spine Area Chart
  const seriesData1 = [
    { data: [30, 40, 35, 50, 49, 60, 70] },
    { data: [20, 35, 40, 60, 58, 70, 80] },
  ];

  const optionsData = {
    stroke: { curve: "smooth", width: 3 },
    colors: ["#4E6C50", "#1F8A70"],
   
  };

  
  //-------------------state for Donut Chart and Order card-----------------//
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [local_order_data, setlocal_order_data] = useState("");
  const [domestic_order_data, setdomestic_order_data] = useState("");
  const [international_order_data, setinternational_order_data] = useState("");
  const [billto_arr, setbillto_arr] = useState([]);
  const [billto_name_arr, setbillto_name_arr] = useState([]);
  const [client_arr, setclient_arr] = useState([]);
  const [client_name_arr, setclient_name_arr] = useState([]);
  const [shipper_arr, setshipper_arr] = useState([]);
  const [shipper_name_arr, setshipper_name_arr] = useState([]);
  const [consignee_arr, setconsignee_arr] = useState([]);
  const [consignee_name_arr, setconsignee_name_arr] = useState([]);

  //---------------------------------Async and await methods------------------//
  const [data, setdata] = useState("");
  const [Client_distribution, setClient_distribution] = useState("");
  const [Total_count, setTotal_count] = useState("");
  useLayoutEffect(() => {
    if (data) {
      console.log("first", data.billto);

      setClient_distribution(
        data.client_distribution.map((item) => item.client_name)
      );
      setTotal_count(data.client_distribution.map((item) => item.total_count));
    }
  }, [data]);
  console.log("billto dat", billto_name_arr);

  const getData1 = async () => {
    try {
      const resp = await axios.get(
        ServerAddress + "analytic/get_masterdashboardview/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("data-----", resp.data);
      const {
        delivery_type,
        billto,
        client_wise_distribution,
        shipper_wise_disribution,
        consignee_wise_disribution,
      } = resp.data;
      setlocal_order_data(delivery_type[0].total_count);
      setdomestic_order_data(delivery_type[1].total_count);
      setinternational_order_data(delivery_type[2].total_count);

      console.log("billto", billto);
      setbillto_arr(billto.map(({ total_count }) => total_count).slice(0, 5));
      setbillto_name_arr(billto.map(({ billto_name }) => billto_name).slice(0, 5));
      setclient_arr(client_wise_distribution.map(({ client }) => client).slice(0, 5));
      setclient_name_arr(
        client_wise_distribution.map(({ total_count }) => total_count).slice(0, 5)
      );
      setshipper_arr(shipper_wise_disribution.map(({ shiper }) => shiper).slice(0, 5));
      setshipper_name_arr(
        shipper_wise_disribution.map(({ total_count }) => total_count).slice(0, 5)
      );
      setconsignee_arr(
        consignee_wise_disribution.map(({ consignee }) => consignee).slice(0, 8)
      );
      setconsignee_name_arr(
        consignee_wise_disribution
          .map(({ total_count }) => total_count)
          .slice(0, 8)
      );
    } catch (err) {
      alert(`Error Occur in , ${err}`);
    }
  };

  useEffect(() => {
    getData1();
  }, []);

  return (
    <>
      {/* For HeaderCard */}
      <Col lg={12} md={4} sm={4}>
      <div className="header_card_container">
        <HeaderCard
          Headlogo={<FaTruck />}
          headColor={"#6D9886"}
          title={"Local"}
          description={local_order_data}
          naviLink={"/booking/orders"}
          filter_by_value={"Local"}
        />
        <HeaderCard
          Headlogo={<IoMdTrain />}
          headColor={"#6D9886"}
          title={"Domestic"}
          description={domestic_order_data}
          naviLink={"/booking/orders"}
        />
        <HeaderCard
          Headlogo={<GiCommercialAirplane />}
          headColor={"#6D9886"}
          title={"Air"}
          description={international_order_data}
          naviLink={"/booking/orders"}
        />
      </div>
        
  <style jsx>{`
    .header_card_container {
      display: flex;
      // flex-wrap: wrap;
      justify-content: space-between;
      margin-top:10px;
      // text-align: center;
    }
    
    @media only screen and (max-width: 767px) {
      .header_card_container {
        flex-direction: column;
        align-items: center;
      }
    }
  `}</style>
      </Col>
      <Col lg={12} md={6} sm={6}>
        <div
          style={{
            display: "flex",
            margin: "2px",
            flexDirection: width > 800 ? "row" : "column",
          }}
        >
          <Col lg={6} md={12} sm={12}>
            <Card className="shadow bg-white rounded" style={{ margin: "5px" ,backgroundColor:'yellow' }}>
              <CardTitle
                style={{
                  display: "flex",
                  justifyContent: "center",
                  
                  textAlign: "center",
                  fontWeight: '500',
                  fontFamily: 'Poppins, sansSerif'
                 
                }}
              >
                Top 5 Bill To
              </CardTitle>
              <CardBody>
                <DonutChart
                  // series={series}
                  labels={billto_name_arr}
                  series={billto_arr}
                  // labels={labels}
                  colors={colors}
                />
              </CardBody>
            </Card>
          </Col>

          <Col lg={6} md={12} sm={12}>
            <Card className="shadow bg-white rounded" style={{ margin: "5px" }}>
              <CardTitle
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  fontWeight: '500',
                  fontFamily: 'Poppins, sansSerif'
                }}
              >
                Top 5 Shipper
              </CardTitle>
              <CardBody style={{}}>
                <DonutChart
                  labels={client_arr}
                  series={client_name_arr}
                  colors={colors}
                />
              </CardBody>
            </Card>
          </Col>
        </div>
      </Col>

      {/* Pie Chart */}
      <Card className="shadow bg-white rounded">
        <CardTitle
          style={{
            display: "flex",
                  justifyContent: "center",
                  
                  textAlign: "center",
                  fontWeight: '500',
                  fontFamily: 'Poppins, sansSerif'
          }}
        >
          Top 5 Client
        </CardTitle>
        <CardBody>
          <PieChart
            series={shipper_name_arr}
            labels={shipper_arr}
            colors={colors}
          />
        </CardBody>
      </Card>

      {/* Horizontal Chart */}
      <div style={{ background: "white", margin: "2px" }}>
        <CardTitle
          style={{
            display: "flex",
                  justifyContent: "center",
                  
                  textAlign: "center",
                  fontWeight: '500',
                  fontFamily: 'Poppins, sansSerif'
          }}
        >
          Top 10 Consignee
        </CardTitle>
        <BarChart
          seriesData={consignee_name_arr}
          categories={consignee_arr}
          color={color}
          chartDirection={true}
        />
      </div>

      {/* Vertical Chart */}
      <div style={{ background: "white", margin: "2px" }}>
        <BarChart
          seriesData={consignee_name_arr}
          categories={consignee_arr}
          color={color}
          chartDirection={false}
        />
      </div>

      {/* Spine Area Chart */}
      <div style={{ background: "white", margin: "2px" }}>
        <SpineAreaChart
          seriesData={seriesData1}
          optionsData={optionsData}
          chartHeight={400}
        />
      </div>
    </>
  );
};

export default DashboardChartSection;
