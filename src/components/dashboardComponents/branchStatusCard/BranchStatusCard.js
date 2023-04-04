import React from "react";
import "./BranchStatusCard.css";
import "./MyComponet";

const BranchStatusCard = ({
  CardHeading,
  Upper = "",
  Cold_chain = 0,
  Manifest_order = 0,
  Pending_order = 0,
  Total_count = 0,
}) => {
  return (
    <div class="brCard-container">
      <div class="brCard">
        <div className="container_upper" style={{ fontSize: "8px" }}>
          {Upper}
        </div>
       
        <div class="row">
          <div class="column">
            <div class="box box-1">{Cold_chain}</div>
            <div class="box box-2">{Manifest_order}</div>
          </div>
          <div class="column">
            <div class="box box-3">{Pending_order}</div>
            <div class="box box-4">{Total_count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchStatusCard;
