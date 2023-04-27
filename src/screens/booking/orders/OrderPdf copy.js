/* eslint-disable */
import React from "react";
import Logo003 from "../../../assets/images/Logo003.jpg";

const OrderPdf = () => {
    return (
        <div style={{padding:"16px"}}>
            <table
                className="table-grid">
                <tbody>
                    <tr><td colSpan={2}><h3>AIRWAYBILL NUMBER</h3><br></br><h1><b>102354</b></h1></td>
                        <td colSpan={4}>
                            <div style={{ display: "flex", alignItems: "center", marginLeft: 20, marginTop: 20 }}>
                                <img src={Logo003} width="250vw" height="60vh" />
                            </div>

                            <div style={{ float: "right", marginRight: 20 }}><b>Web:</b> www.ssciogistics.in<br></br><b>E-Mail: </b>info@ssciogistics.in</div></td>

                    </tr>
                    <tr>
                        <td colSpan={2}><b>DATE<br></br>28-02-2023</b></td>
                        <th colSpan={4}>&nbsp;<b>ISO 9001 2015 CERTIFIED COMPANY</b></th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Name</th><td rowSpan={2}>Shipper<br></br>Dr. Kalyaneswar Mandal</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;Shipper's Acct No.</th><td colSpan={3}>1091</td>
                    </tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Address</th>
                        <td rowSpan={2}>Tata Institute of Fundamental<br></br>Research<br></br>36/P,Gopanpally Village,Serilingampally Mandal<br></br>Ranga Reddy District</td>
                        <th colSpan={1}>&nbsp;Shipper,s Ref/Protocol No.</th><td colSpan={3}>NA</td>
                    </tr>
                    <tr><th colSpan={1}>&nbsp;Origin</th><td colSpan={3}>HYDERABAD</td></tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Contact No.</th><td rowSpan={2}><b>Phone:</b>+91-9777756339<br></br>&nbsp;</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;Destination</th><td colSpan={3}>CHANDIGARH</td>
                    </tr>
                    <tr>
                        <th rowSpan={2}>&nbsp;Name</th><td rowSpan={2}>Consignee<br></br>Dr.Rajesh P Ringe</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;No. of Pcs</th><td colSpan={3}>1</td>
                    </tr>
                    <tr>
                        <th rowSpan={3}>&nbsp;Address</th>
                        <td rowSpan={3}>CSIR - Institute of Microbial<br></br>Technology<br></br>39A, Sector 39A,<br></br>Chandigarh, 160036</td>
                        <th colSpan={1}>&nbsp;Actual Weight.</th><td colSpan={3}>25 KG</td>
                    </tr>
                    <tr><th colSpan={1}>&nbsp;Chargeable Weight</th><td colSpan={3}>25 KG</td></tr>

                    <tr><th colSpan={1}>&nbsp;Customs Values</th><td colSpan={3}>NA</td></tr>

                    <tr>
                        <th rowSpan={2}>&nbsp;Contact No.</th><td rowSpan={2}><b>Phone:</b>+91-9870159550<br></br>&nbsp;</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>&nbsp;Dimensions</th><td colSpan={3}>48 X 42 X 36 CM</td>
                    </tr>

                    <tr>
                        <th colSpan={2}>&nbsp;Content:: Pharmacutical sample.<br></br>&emsp;</th>
                        <th colSpan={4}>&nbsp;Special Instruction :<br></br>&nbsp;Dry ice with data logger.<br></br>&nbsp;<br></br>&emsp;</th>
                    </tr>

                    <tr>
                        <td rowSpan={3} colSpan={2}>Sensitive Supply Chain Logistics LTD liability is <br></br>limited. By tendering the shipment to Sensitive Supply Chain<br></br> Logistics LTD shipper agrees to the terms and conditions. <br></br>
                            Sensitive Supply Chain Logistics LTD liability for any loss or <br></br> damage of the shipment will not exceed more than $50 or <br></br>declared value for insurance where shown . This is the non <br></br>negotiable airway bill. </td>
                    </tr>
                    <tr colSpan={4}>
                        <td><input type="checkbox"></input><br></br>Ambient</td><td><input type="checkbox"></input><br></br>Frozen</td><td><input type="checkbox"></input><br></br>Refrigerated</td><td><input type="checkbox"></input><br></br>Other&emsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>Does this shipment contains dangerous goods &emsp;<input type="checkbox"></input>&emsp; By <br></br>Air   &emsp;&emsp;  UN Number <br></br>Expected </td>
                    </tr>

                    <tr>
                        <th rowSpan={2}>&nbsp;Shipper's Signature <br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th rowSpan={2}>Date<br></br>Time<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>&nbsp;Consignee Name<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th colSpan={2}>Date<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>

                    <tr>
                        <th rowSpan={2}>&nbsp;Pick up By <br></br>&emsp;<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th rowSpan={2}>Date<br></br>Time<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>&nbsp;Received in good order and condition.<br></br>&nbsp;Consignee Signature<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                        <th colSpan={2}>Date<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;<br></br>&emsp;</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default OrderPdf;