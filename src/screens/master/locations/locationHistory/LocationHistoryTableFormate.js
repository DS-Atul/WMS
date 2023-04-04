import React from 'react';

const AssetHistoryTableFormate = ({ table_data}) => {
  return (
    <>
    {table_data.length === 0 ? (  
      <tr>Data Not Found</tr>
    ) : (
      <>
        {table_data.map((item, idx) => {
          // console.log("CHnage msg", item.change_message);
          const new_data = JSON.parse(item.change_message);
          var time = new Date(item.action_time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
        console.log("length",new_data)
        console.log(item)
        return (
          <tr key={idx}   style={{
            borderWidth: 1,
          }}>
            <td>{idx +1}</td>
            <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
          <td>{(new_data.countary_name ? new_data.countary_name : "-")}</td>
          <td>{(new_data.state_name ? new_data.state_name : "-")}</td>
          <td>{(new_data.city_name ? new_data.city_name : "-")}</td>
          <td>{(new_data.pincode_name ? new_data.pincode_name : "-")}</td>
          <td>{(new_data.name ? new_data.name : "-")}</td>
          <td>{item.name_r }</td>
          <td>{time}</td>
        </tr>
        )
         
        })}
      </>
    )}
  </>
  )
}

export default AssetHistoryTableFormate