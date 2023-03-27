import React from "react";
import "./BranchStatusCard.css";
import "./MyComponet"

const BranchStatusCard = ({
    CardHeading, Unit, Upper
}) => {
  return (
    
    <div class="brCard-container">
    <div class="brCard">
        <div className="container_upper">{Upper}</div>
      <h4>{CardHeading}</h4>
      <div class="row">
        <div class="column">
          <div class="box box-1">{Unit}</div>
          <div class="box box-2">{Unit}</div>
        </div>
        <div class="column">
          <div class="box box-3">{Unit}</div>
          <div class="box box-4">{Unit}</div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default BranchStatusCard;
