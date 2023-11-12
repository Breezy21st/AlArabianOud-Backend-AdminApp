import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrdersByUserId} from "../features/user/userSlice";
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
        <p>Status: {record.status}</p>
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
  {
    title: "Status",
    dataIndex: "status",
    responsive: ["sm"],
  },
 
];

const Orders = () => {
  const dispatch = useDispatch();
  const { user, ordersByUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user._id) { // Check if user and user._id is not undefined
      dispatch(fetchOrdersByUserId(user._id));
    }
  }, [dispatch, user]);

  // This will ensure that data1 is always an array
  const data1 = ordersByUserId && ordersByUserId.length > 0 // Check if ordersByUserId is defined and has length
    ? ordersByUserId.map((order, index) => ({
        key: index + 1,
        name: `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
        product: <Link to={`/order/${order._id}`}>View Order</Link>,
        amount: order.totalPriceAfterDiscount.toFixed(2),
        date: new Date(order.createdAt).toLocaleString(),
        address: `${order.shippingInfo.address}, ${order.shippingInfo.city}`,
        status: `${order.orderStatus || "Ordered"}`, // Adjust according to your address structure
      }))
    : [];




  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
