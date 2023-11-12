import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import { getOrder } from "../features/user/userSlice";
import {AiOutlineArrowLeft} from 'react-icons/ai'

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Order Items",
    render: (record) => (
      <React.Fragment>
        <p>Image: {record.image}</p>
        <p>Product Name: {record.name}</p>
        <p>Brand: {record.brand}</p>
        <p>Count: {record.count}</p>
        <p>Amount: {record.amount}</p>
        <br/>
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
  title: "Image",
  dataIndex: "image",
  render: (text, record) => <div>{record.image}</div>,
  responsive: ["sm"],
  },
  {
    title: "Product Name",
    dataIndex: "name",
    responsive: ["sm"],
  },
  {
    title: "Brand",
    dataIndex: "brand",
    responsive: ["sm"],
  },
  {
    title: "Count",
    dataIndex: "count",
    responsive: ["sm"],
  },
  {
    title: "Amount (ZAR)",
    dataIndex: "amount",
    responsive: ["sm"],
  },
  
];


const ViewOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
 

  const goBack = () => navigate('/orders');


  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);


  const orderState = useSelector((state) => state?.auth?.singleorder?.orderItems);
  console.log(orderState)
  const data1 = [];
  

 // Corrected loop to map over orderState array
if (orderState) {
  orderState.forEach((item, index) => {
    data1.push({
      key: index + 1,
      image: <img src={item.product.images[0]?.url} style={{ width: "50px" }} alt={item.product.title} />,
      name: item.product.title,
      brand: item.product.brand,
      count: item.quantity, // it should be quantity not count based on your provided state structure
      amount: item.price, // it should be price not amount based on your provided state structure
    });
  });




  }

  return (
    <div>
      
      <h3 className="mb-4 title text-center py-3">Order Summary</h3>
      <button onClick={goBack} className="go-back-button bg-transparent"><AiOutlineArrowLeft/>Go Back</button>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
