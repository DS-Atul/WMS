import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Nav_Btn from "../../../components/btn/NavBtn";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../../components/listDisplay/dataList/DataList";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setPageNumber } from "../../../store/pagination/Pagination";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import Filter from "../../../components/listDisplay/filter/Filter";
import NumPagination from "../../../components/listDisplay/numPagination/NumPagination";
import Navigate from "../../manifest/navigateTab/Navigate";
import OrderDeliveryDataTitle from "../../../data/booking/alldeliveryInfo/OrderDeliveryDataTitle";
import OrderDeliveryDataFormate from "../../../data/booking/alldeliveryInfo/OrderDeliveryDataFormate";
import { saveAs } from 'file-saver'
import axios from "axios";
const DeliveryInfo = () => {
  const dispatch = useDispatch();
  const commodity_type = useSelector((state) => state.filtervalue.data_a);
  const commodity_name = useSelector((state) => state.filtervalue.data_b);

  const user = useSelector((state) => state.authentication.userdetails);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  // // Pagination
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  // // Permissions

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_add, setcan_add] = useState(false);
  const [can_delete, setcan_delete] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Commodity" && e.write === true
      )
    ) {
      setcan_add(true);
    } else {
      setcan_add(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Commodity" && e.delete === true
      )
    ) {
      setcan_delete(true);
    } else {
      setcan_delete(false);
    }
  }, [userpermission]);

  console.log("user.user_department_name----", user.user_department_name)
  const downloadImage = () => {
    // saveAs('https://logcube-s3-test1.s3.amazonaws.com/bookings/delivery/pod_images/800001_2023-03-22_POD.jpg', 'https://logcube-s3-test1.s3.amazonaws.com/bookings/delivery/pod_images/800001_2023-03-22_POD.jpg.jpg') // Put your image url here.
    var element = document.createElement("a");
    var file = new Blob(
      [
        "https://logcube-s3-test1.s3.amazonaws.com/bookings/delivery/pod_images/800001_2023-03-22_POD.jpg"
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  }
  const handleClick = async () => {
    // axios({
    //   url: "https://logcube-s3-test1.s3.amazonaws.com/bookings/delivery/pod_images/800001_2023-03-22_POD.jpg",
    //   method: 'GET',
    //   responseType: 'blob'
    // })
    //   .then(response => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "file.jpg");
    //     document.body.appendChild(link);
    //     link.click();
    //   })

    let url = "https://logcube-s3-test1.s3.amazonaws.com/bookings/delivery/pod_images/800001_2023-03-22_POD.jpg"

    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "Ankit.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  function toDataURL(url) {
    return axios({
      url:url,
      method:"POST",
      // mode: 'no-cors',
      headers: {
        // authorization: '3JawyAd5JcSRSespUvWTSfplcFFAaDfMm+seyDYN',
        'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
      .then((response) => {
        console.log("Ankittttttttttttttttttttttresponse", response)
        return response.blob();
      })
      .then((blob) => {
        console.log("errrrrrrrrrrrrr", blob)
        return URL.createObjectURL(blob);
      });
  }


  return (
    <>
      <PageTitle page="Delivery Info" />
      <button onClick={handleClick}>Download Image</button>
      <Title title="Delivery Info" parent_title="Booking" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
                onClick={() => dispatch(setPageNumber(1))}
              >
                {/* {(can_add || user.is_superuser) && (
                  <Nav_Btn
                    btn_name="Update Delivery Info"
                    icon={<MdAdd size={15} />}
                    form_path="/booking/updatedeliveryinfo"
                  />
                )} */}
                {/* Filter Tool */}
                {/* <Filter type={"commodity"} /> */}
              </div>
            </div>
            {(user.user_department_name === "ADMIN" || user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER") &&
              (
                <Navigate />
              )
            }
          </div>

          {/* DataTable */}
          <DataList
            can_delete={can_delete}
            Data_Title={OrderDeliveryDataTitle}
            Data_Format={OrderDeliveryDataFormate}
            path={`booking/get_delivery_info/?search=${search}&p=${page_num}&records=${data_len}`}
          />
          <NumPagination path={"path"} />
        </div>
      </div>
    </>
  );
};
export default DeliveryInfo;