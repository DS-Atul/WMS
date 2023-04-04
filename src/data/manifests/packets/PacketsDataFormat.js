import React,{useState} from 'react'

import { FiCheckSquare, FiSquare } from "react-icons/fi";
const PacketTitle = [
  "Docket No.",
  "Packets",
  "Not Recieved",
  // ["Not Recieved", false],
];



const PacketsDataFormat = ({ data, selected_id, setselected_id }) => {

  console.log("datappppp", data)

  // const [notreceived_packets, setnotreceived_packets] = useState([])
  // const [selected_id, setselected_id] = useState([]);
  // console.log("notreceived_packets----", notreceived_packets)
  console.log("selected_id------", selected_id)
  const handle_checked = (id) => {

    if (selected_id.includes(id)) {
      let lis = [...selected_id];
      setselected_id(lis.filter((e) => e !== id));
    } else {
      setselected_id([...selected_id, id]);
    }
  };

  return (
    <>
      <div className="table">
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {/* {PacketTitle.map((i,index)=>)} */}
              {PacketTitle.map((i, j) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={j}
                  >
                    {i}
                    {typeof i === "object" ? (
                    <span
                    onClick={() => {
                      i[1] = !i[1];
                        if (i[1]) {
                          let ord_list = data.map((v) => v.barcode_no);
                          setselected_id(ord_list);
                        } else {
                          setselected_id([]);
                        }
                      
                    }}
                    >
                    {i[1] ? (
                          <FiCheckSquare size={15} />
                        ) : (
                          <FiSquare size={15} />
                        )}
                    </span>
                     ) : null}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ?
              (
                <tr>
                  <td>No Data Found</td>
                </tr>
              ) : (
                data.map((pkt, index) => {
                  return (
                    <>
                      <tr
                        key={index}
                        style={{
                          borderWidth: 1,
                        }}
                      >
                      </tr>
                      <td>{pkt.docket_no}</td>
                      <td>{pkt.barcode_no}</td>
                      <td
                        onClick={() => {
                          handle_checked(
                            pkt.barcode_no,
                          );
                        }}
                      >
                        {selected_id.includes(pkt.barcode_no) ? (
                          <FiCheckSquare size={15} />
                        ) : (
                          <FiSquare size={15} />
                        )}
                      </td>
                    </>
                  )
                })
              )

            }
          </tbody>
        </table>
      </div>
    </>

  )
}

export default PacketsDataFormat