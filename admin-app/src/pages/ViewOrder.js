import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";
import { getOrder } from "../features/auth/authSlice";

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
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);


  const orderState = useSelector((state) => state?.auth?.singleorder?.orderItems);
  console.log(orderState)
  const data1 = [];
  

  if (orderState) {
    orderState.forEach((item, index) => {
      data1.push({
        key: index + 1,
        image: <img src={item.product.images[0]?.url} style={{ width: "50px" }} alt={item.product.title} />,
        name: item.product.title,
        brand: item.product.brand,
        count: item.quantity,
        amount: item.price, 
      });
    });


  }

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
