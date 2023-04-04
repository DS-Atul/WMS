import React from 'react';
import './BirthdayModal.css';

function BirthdayModal(props) {
  const { Img, name, Gender, DOB, Age } = props;

  return (
    <div className="person">
      <img src={Img} alt="Person" />
      <div className="emp_details">
        <h4>Name: {name}</h4>
        <h4>Gender: {Gender}</h4>
        <h4>DOB: {DOB}</h4>
        <h4>Age: {Age}</h4>
      </div>
    </div>
  );
}

export default BirthdayModal;
