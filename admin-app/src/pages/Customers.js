import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Orders",
    render: (record) => (
      <React.Fragment>
        <p>Name: {record.name}</p>
        <p>Email: {record.email}</p>
        <p>Mobile: {record.mobile}</p>
        <br/>
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    responsive: ["sm"],
  },
  {
    title: "Email",
    dataIndex: "email",
    responsive: ["sm"],
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    responsive: ["sm"],
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
