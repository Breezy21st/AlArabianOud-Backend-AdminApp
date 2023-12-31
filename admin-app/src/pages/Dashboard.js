import React, { useEffect, useState } from "react";

import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getOrders, getYearlyData } from "../features/auth/authSlice";


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
        <p>Amount: {record.dprice}</p>
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
    title: "Product Count",
    dataIndex: "product",
    responsive: ["sm"],
  },
  {
    title: "Total Price",
    dataIndex: "price",
    responsive: ["sm"]
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
    responsive: ["sm"],
  },
  {
    title: "Status",
    dataIndex: "status",
    responsive: ["sm"],
  },
];

const Dashboard = () => {

  const dispatch = useDispatch()
  const monthlyDataState = useSelector(state=>state?.auth?.monthlyData)
  const yearlyDataState = useSelector(state=>state?.auth?.yearlyData)
  const orderState = useSelector((state) => state?.auth?.orders);
  const [dataMonthly, setDataMonthly] = useState([])
  const [dataMonthlySales, setDataMonthlySales] = useState([])
  const [orderData, setorderData] = useState([])
  

  useEffect(() => {
    dispatch(getMonthlyData())
    dispatch(getYearlyData())
    dispatch(getOrders())
  },[dispatch])

  useEffect(() => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let data = []
    let monthlyOrderCount = []
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({type: monthNames[element?._id?.month], income:element?.amount})
      monthlyOrderCount.push({type: monthNames[element?._id?.month], sales:element?.count})
    }


    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)

    const data1 = [];

    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i].shippingInfo?.firstName,
        product: orderState[i]?.OrderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus || "Ordered",
      });
    }
    
    

console.log("orderData:", data1); // Log orderData to check its contents
console.log("orderState:", orderState);
setorderData(data1);


  }, [monthlyDataState, yearlyDataState, orderState])

  
  
  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 ml-auto">
          <div>
            <p className="desc">Total Yearly Income</p>
            <h4 className="mb-0 sub-title">R{yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          
        </div>
        
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 mr-auto">
          <div>
            <p className="desc">Total Yearly Sales</p>
            <h4 className="mb-0 sub-title">{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Sales Statics</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>

      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
