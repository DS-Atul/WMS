import React, { useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import {  useNavigate } from "react-router-dom";
import "./Profile.css";


const Profile = () => {
    const navigate = useNavigate();
  const [width, height] = useState();
  return (
    <>
      <div style={{ width: width, margin: "20px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "bold",
            display: "flex",
            postion: "relative",
            padding: "inherit",
            margin: "inherit",
          }}
        >
          User Profile
        </div>
        <Col lg="12">
          <Card style={{ background: "" }}>
            <CardBody>
              <div className="d-flex">
                <div className="ms-3">
                  <img
                    src="https://lh3.googleusercontent.com/ogw/AAEL6sjCYnZKga0Wg_cTIGoL6VzMWWQLLGzGkPKYT5SRJw=s32-c-mo"
                    alt="React Image"
                    className="round-image"
                  />
                </div>
                <div className="flex-grow-1 align-self-center">
                  <div className="text-muted">
                    <h5>Admin</h5>
                    <p className="mb-1">Rahul.tk.5217@gmail.com</p>
                    <p className="mb-0">Id no: #</p>
                    <div class="form-container">
                      <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input 
                          type="text"
                          id="firstName"
                          placeholder="Rahul"
                        />
                      </div>
                      <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input 
                          type="text"
                          id="lastName"
                          placeholder="Thakur"
                        />
                      </div>
                      <div class="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input 
                          type="tel"
                          id="phoneNumber"
                          placeholder="9234120001"
                        />
                      </div>
                      <div class="form-group">
                        <label for="emailAddress">Email Address</label>
                        <input
                          type="email"
                          id="emailAddress"
                          placeholder="Rahul@gmail.com"
                        />
                      </div>
                      <div class="form-group">
                        <label for="city">City</label>
                        <select id="city">
                          <option value="california">Jamshedpur</option>
                          <option value="washington">Delhi</option>
                          <option value="toronto">Noida</option>
                          <option value="newyork" selected>
                            Jamshedpur
                          </option>
                          <option value="london">London</option>
                          <option value="netherland">Netherland</option>
                          <option value="poland">Poland</option>
                        </select>
                      </div>
                      <div class="boxz">
                        <button onClick={() => {
                          navigate("/ems/users/Userinfo");
                        }} class="button-box">Update</button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default Profile;
