import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { GrPieChart } from "react-icons/gr";
import { AiOutlineAppstoreAdd, 
         AiOutlineShoppingCart,
         AiOutlineLogout,
        } 
from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ImBlog } from "react-icons/im";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import Logo from '../images/Logo.png';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const [user, setUser] = useState({}); //state to store user details
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
      //Retrive user information from local storage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }, []);

    //siders collapsed state based on screen sizer
    useEffect(() => {
      if (isMobile) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }, [isMobile]);

    const toggleSider = () => {
      if (isMobile) {
        setCollapsed(!collapsed);
      }
    };

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} className={`sider-mobile ${isMobile ? '' : 'not-mobile'}`}>
        <div className="logo" > 
        <img className= 'sm-logo' alt='' src = {Logo} height={35} />
        <img className= 'lg-logo' alt='' src = {Logo} /> 
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) =>{
            if(key === "signout"){
              localStorage.clear()
              window.location.reload()

            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <GrPieChart className='fs-5'/>,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <BsPeople className='fs-5'/>,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className='fs-5'/>,
              label: 'Catalog',
              children: [
                {
                  key: "product",
                  icon: <AiOutlineAppstoreAdd className='fs-5'/>,
                  label: "Add Product"
                },
                {
                  key: "list-product",
                  icon: <AiOutlineAppstoreAdd className='fs-5'/>,
                  label: "Product List"
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className='fs-5'/>,
                  label: "Brand"
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className='fs-5'/>,
                  label: "Brand List"
                },
                {
                  key: "Category",
                  icon: <BiCategoryAlt className='fs-5'/>,
                  label: "Category"
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className='fs-5'/>,
                  label: "Category List"
                },
                
                ],
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-5'/>,
              label: 'Orders',
            },
            {
              key: "marketing",
              icon: <RiCouponLine className='fs-4'/>,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4"/>,
                  label: "Add Coupon",

              },
              {
                key: "coupon-list",
                icon: <RiCouponLine className="fs-4"/>,
                label: "Coupon List",

            },
            ]
            },
            {
              key: 'blog',
              icon: <FaBloggerB className='fs-5'/>,
              label: 'Blog',
              children: [
                {
                  key: 'add-blog',
                  icon: <FaBloggerB className='fs-5'/>,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className='fs-5'/>,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <FaBloggerB className='fs-5'/>,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className='fs-5'/>,
                  label: 'Blog Category List',
                },
              ],
            },
            {
              key: 'enquiries',
              icon: <UploadOutlined className='fs-5'/>,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <AiOutlineLogout className='fs-5'/>,
              label: 'Sign Out',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header 
        className='d-flex justify-content-between ps-1 pe-5'
        style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
             onClick={toggleSider}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-4 align-items-center'>
            
            <div className='d-flex gap-3 align-items-center'>
              
              <div >
                  
                <h5 className='mb-0'>{user.firstname} {user.lastname}</h5>
                <p className='mb-0'>{user.email}</p>
              </div>
            </div>
          </div>
        </Header>
        <Content 
          style={{
            
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;