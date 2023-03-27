import React, { useState, useEffect } from "react";
import { getMonth } from "./util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import EventModal from "./EventModal";

function Calendar() {
const [currentMonth, setCurrentMonth] = useState(getMonth());
const [showEventModal, setShowEventModal] = useState();
const [monthIndex, setMonthIndex] = useState(0);

useEffect(() => {
setCurrentMonth(getMonth(monthIndex));
}, [monthIndex]);

const handleShowEventModal = () => {
setShowEventModal(true);
};

const handleHideEventModal = () => {
setShowEventModal(false);
};

return (
<React.Fragment>
{showEventModal && <EventModal onClose={handleHideEventModal} />}

  <div className="h-screen flex flex-col">
    <CalendarHeader />
    <div className="flex flex-1">
      <Sidebar onMonthIndexChange={setMonthIndex} />
      <Month month={currentMonth} onShowEventModal={handleShowEventModal} />
    </div>
  </div>
</React.Fragment>
);
}

export default Calendar;






