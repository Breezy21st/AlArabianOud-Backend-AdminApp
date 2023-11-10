import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders} from "../features/user/userSlice";
const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Orders",
    render: (record) => (
      <React.Fragment>
        <p>Name: {record.name}</p>
        <p>Products: {record.product}</p>
        <p>Amount: {record.amount}</p>
        <p>Date: {record.date}</p>
        <p>Address: {record.address}</p>
        <p>Action: {record.action}</p>
        <br/>
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
    title: "Name",
    dataIndex: "name",
    responsive: ["sm"],
  },
  {
    title: "Product",
    dataIndex: "product",
    responsive: ["sm"],
  },
  {
    title: "Amount (ZAR)",
    dataIndex: "amount",
    responsive: ["sm"],
  },
  {
    title: "Date",
    dataIndex: "date",
    responsive: ["sm"],
  },
  {
    title: "Shipping Address",
    dataIndex: "address",
    responsive: ["sm"],
  },
 
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state?.auth?.orders);
  
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.shippingInfo?.firstName,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>
          View Order
        </Link>
      ),
      amount: orderState[i]?.totalPriceAfterDiscount,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      
      address: orderState[i]?.shippingInfo?.address, 
    });
  }




  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
