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


  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  console.log(orderState)
  const data1 = [];
  

  for (let i = 0; i < orderState?.products.length; i++) {
  
    data1.push({
      key: i + 1,
      name: orderState?.products[i]?.product.title,
      brand: orderState?.products[i]?.product.brand,
      count: orderState?.products[i]?.count,
      amount: orderState?.products[i]?.product.price
    });

 // Log orderData to check its contents
console.log("orderState:", orderState);
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
