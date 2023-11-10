import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
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
  {
    title: "Action",
    dataIndex: "action",
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
      action: (
        <>
         <select name="" defaultValue={orderState[i]?.orderStatus} onChange={(e)=>updateOrderStatus(orderState[i]?._id,e.target.value )} className="form-control form-select" id="">
            <option value="Ordered" disabled selected> Ordered </option>
            <option value="Processed"> Processed </option>
            <option value="Shipped"> Shipped </option>
            <option value="Out For Delivery"> Out For Delivery </option>
            <option value="Delivered"> Delivered </option>
         </select>
        </>
      ),
      address: orderState[i]?.shippingInfo?.address, 
    });
  }


  const updateOrderStatus = (a,b) => {
    
    dispatch(updateAOrder({id:a,status:b}))
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
