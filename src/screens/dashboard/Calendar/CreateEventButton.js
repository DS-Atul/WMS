import React, { useState } from "react";
// import plusImg from "../assets/plus.png.png";
import EventModal from "./EventModal";
export default function CreateEventButton() {
const [showEventModal, setShowEventModal] = useState(false);
return (
<React.Fragment>
{showEventModal && <EventModal setShowEventModal={setShowEventModal} />}
  <button  style={{backgroundColor:"white"}}
    onClick={() => setShowEventModal(true)}
    className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
  >
    {/* <img src={plusImg} alt="create_event" className="w-7 h-7" /> */}
    <span style={{fontFamily:"roboto", fontWeight:"bold"}} className="pl-3 pr-9"> Create</span>
  </button>
</React.Fragment>
);
}





