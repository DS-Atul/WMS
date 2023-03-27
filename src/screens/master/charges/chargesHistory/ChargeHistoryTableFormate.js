import React from 'react';

const ChargeHistoryTableFormate = ({ table_data}) => {
  console.log("table data",table_data)
  return (
    <>
    {table_data.length === 0 ? (
      <tr>Data Not Found</tr>
    ) : (
      <>
        {table_data.map((item, idx) => {
          // console.log("CHnage msg", item.change_message);
          const new_data = JSON.parse(item.change_message);

        console.log("length",new_data)
        console.log(item)
        return (
          <tr key={idx}   style={{
            borderWidth: 1,
          }}>
            <td>{(item.action_flag === 1 ? "Created" : "Updated")}</td>
          <td>{(new_data.charge_category ? new_data.charge_category : "-")}</td>
          <td>{(new_data.charge_name ? new_data.charge_name : "-")}</td>
          <td>{item.name_r }</td>
          <td>{item.action_time}</td>
        </tr>
        )
         
        })}
      </>
    )}
  </>
  )
}

export default ChargeHistoryTableFormate