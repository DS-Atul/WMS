import React from 'react'

import { FiCheckSquare, FiSquare } from "react-icons/fi";
const PacketTitle = [
    "Docket No.",
    "Packets",
    "Is Recieved",
  ];
  


const PacketsDataFormat = ({data}) => {

    console.log("datappppp",data)
  return (
    <>
      <div className="table">
      <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
            <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
                {/* {PacketTitle.map((item,index)=>)} */}
                {PacketTitle.map((i,j)=>{
                    return(
                        <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={j}
                  >
{i}
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
                ):(
                    data.map((pkt,index)=>{
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
                    <td>
                        <div>

<FiSquare/>
                        </div>
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