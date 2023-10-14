import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import  moment from 'moment';

const BlogCard = (props) => {

  const blogState = useSelector ((state) => state?.blog?.blog)
  const dispatch = useDispatch();
  useEffect(() => {
     getBlogs() ;
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  const { id, title, description, date, image } = props;
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={image} className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p className="desc"
        dangerouslySetInnerHTML={{ __html: description + "..."}}
        >
        </p>
        <Link to={`/blog/${id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
