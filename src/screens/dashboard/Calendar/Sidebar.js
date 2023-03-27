import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside style={{backgroundColor:"#d9e1df", color:"black",fontFamily:"roboto",fontSize:"18px"}} className="border p-1 w-62">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
