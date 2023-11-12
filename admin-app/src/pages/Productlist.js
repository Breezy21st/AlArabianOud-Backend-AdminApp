import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "No",
    dataIndex: "key",
    responsive: ["sm"],
  },
  {
    title: "Products",
    render: (record) => (
      <React.Fragment>
        {/* <Image // Use Image component to display the product image
          src={record.imageUrl} // Assuming 'image' is the property containing the image URL
          alt={record.title} // Provide alt text for the image
          width={80} // Adjust the width as needed
        /> */}
        <p>Name: {record.title}</p>
        <p>Brand: {record.brand}</p>
        <p>Category: {record.category}</p>
        <p>Action: {record.action}</p>
        <br/>
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    responsive: ["sm"],
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
    responsive: ["sm"],
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
    responsive: ["sm"],
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    responsive: ["sm"],
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    responsive: ["sm"],
  },
  {
    title: "Action",
    dataIndex: "action",
    responsive: ["sm"],
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      price: `${productState[i].price}`,
      quantity: productState[i].quantity,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
      </div>
    </div>
  );
};

export default Productlist;
