import React from "react";
import Notification from "./Notification";
import useWindowDimensions from "./ScreenSize";
import "./Dashboard.css";
import Birtday from "./Logo/Birtday.png";
import Gmail from "./Logo/Gmail.png";
import BookMarks from "./Logo/BookMarks.png";
import Calendar from "./Logo/Calendar.png";
import Whatsapp from "./Logo/Whatsapp.png";
import Attendance from "./Logo/Attendance.png";
import { useNavigate } from "react-router";

const DashboardNotificationSection = () => {
  const navigate = useNavigate();
  // To get Screen Size
  const { height} = useWindowDimensions();
  return (
    <>
      <div>
        <h4 className="timline_heading">Timeline</h4>
        <div
          className="custom-scrollbars__content"
          style={{
            height: height / 2.5,
            overflowY: "scroll",
            background: "white",
            padding: "20px",
          }}
        >
          <Notification
            avatarSrc={
              "https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1677715200&v=beta&t=aMOuRFwsQ8aDrGAvUMoAdrZQlZo2HMh22NbB_ApbAsA"
            }
            title={"Karan"}
            text={"Hello India"}
            author={"Karan"}
            date={"12 Jan 2022"}
          />
          <Notification
            avatarSrc={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lsMLSbq5aYnxUvJzPj3fjtu2Xnz511zDr_z1f8&usqp=CAE&s"
            }
            title={"Rahul"}
            text={"Hello India"}
            author={"rahul"}
            date={"12 Feb 2022"}
          />
          <Notification
            avatarSrc={
              "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTX-DHWR0ETaoFvP5zUNlt_hzxKfe2S0BnNlL16YMkU0bhzWqXwuNvzHpf-0ROGPEZ9O8-P9i_xbGkWfoo"
            }
            title={"Aman"}
            text={"Hello India"}
            author={"gaurav"}
            date={"12 March 2022"}
          />
          <Notification
            avatarSrc={
              "https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1677715200&v=beta&t=aMOuRFwsQ8aDrGAvUMoAdrZQlZo2HMh22NbB_ApbAsA"
            }
            title={"Raman"}
            text={"Hello India"}
            author={"raj"}
            date={"12 April 2022"}
          />
          <Notification
            avatarSrc={
              "data:image/png;base64,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"
            }
            title={"Suresh"}
            text={"Hello India"}
            author={"Karan"}
            date={"12 Jan 2022"}
          />
          <Notification
            avatarSrc={
              "https://yt3.ggpht.com/ytc/AAUvwnh7CHDDIuu6a87VwcIoDe-UeDb-Cfu8Ig8utAcGBDw=s900-c-k-c0x00ffffff-no-rj"
            }
            title={"N. Modi"}
            text={"Hello India"}
            author={"Modi"}
            date={"12 May 2022"}
          />
          <Notification
            avatarSrc={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAgiSk1b80SlUpBYGzak39z3voqLShJ9ef8jmGZaY&usqp=CAE&s"
            }
            title={"Rahul Gdhandi"}
            text={"Hello India"}
            author={"Rahul .."}
            date={"12 June 2022"}
          />
          <Notification
            avatarSrc={
              "https://upload.wikimedia.org/wikipedia/commons/0/02/Rajiv_Gandhi_%281987%29.jpg"
            }
            title={"Rajiv Gandhi"}
            text={"Hello India"}
            author={"Rajiv .."}
            date={"12/02/2022"}
          />
          <Notification
            title={"Raman"}
            text={"Hello India"}
            author={"Karan"}
            date={"12/02/2022"}
          />
          <Notification
            title={"Rahul"}
            text={"Hello India"}
            author={"Karan"}
            date={"12/02/2022"}
          />
        </div>

        <div className="notification_Card_container">
          <div className="notification_row">
            <span className="notity_card">
              <img  src={Birtday} alt="Birtday" width="100" />
            </span>

            <span className="notity_card">
              <img  onClick={() => {
navigate("/dashboard/Calendar/Calendar");
alert("Done loading")   
           }} src={Calendar} alt="Calendar" width="100" />
            </span>

            <span className="notity_card">
              <img src={Attendance} alt="Calendar" width="100" />
            </span>
          </div>
          <div className="notification_row1">
            <span className="notity_card">
              <img src={Gmail} alt="Gmail" width="100" />
            </span>

            <span className="notity_card">
              <img src={Whatsapp} alt="Whatsapp" width="100" />
            </span>

            <span className="notity_card">
              <img src={BookMarks} alt="BookMark" width="100" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNotificationSection;
