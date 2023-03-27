import React from 'react';

const BranchHistoryTableFormate = ({table_data}) => {
  return (
    <>
      {table_data.length === 0 ? (
        <tr>Data Not Found</tr>
      ) : (
        <>
          {table_data.map((item, idx) => {
            const new_data = JSON.parse(item.change_message);
            console.log(new_data);
          return (
            <tr key={idx}   style={{
              borderWidth: 1,
            }}>
              <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
              <td>{new_data.code}</td>
            <td>{new_data.type ? new_data.type : "-" }</td>
            <td>{new_data.vendor? new_data.vendor : "-"}</td>
            <td>{new_data.name ? new_data.name : "-"}</td>
            <td>{new_data.email ? new_data.email : "-"}</td>
            <td>{new_data.contact_number ? new_data.contact_number : "-"}</td>
            <td>{new_data.pan_no ? new_data.pan_no : "-"}</td>
            <td>{new_data.gst_no ? new_data.gst_no : "-"}</td>
            <td>{new_data.operating_city ? new_data.operating_city : "_"}</td>
            <td>{new_data.address_line_1 ? new_data.address_line_1 :"-"}</td>
            <td>{new_data.state_name ? new_data.state_name :"-"}</td>
            <td>{new_data.city_name ? new_data.city_name :"-"}</td>
            <td>{new_data.pincode_name ? new_data.pincode_name : "-"}</td>
            <td>{new_data.locality_name ? new_data.locality_name : "-"}</td>
            <td>{new_data.head ? new_data.head :"-"}</td>
            <td>{new_data.head_email ? new_data.head_email :"-"}</td>
            <td>{new_data.head_phone_number? new_data.head_phone_number :"-"}</td>
            <td>{new_data.created_by? new_data.created_by :"-"}</td>
            <td>{new_data.created_date}</td>
            <td>{new_data.modified_by}</td>
            <td>{new_data.updated_date}</td>
          </tr>
          )
           
          })}
        </>
      )}
    </>  )
}

export default BranchHistoryTableFormate