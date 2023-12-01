import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  Product62,
  Product63,
  } from "../../EntryFile/imagePath";
import MainProduct from "../../MainPage/Component/MainProduct";
import api from "../../utils/api";


const handleSubmit = (e) => {
  e.preventDefault();
  console.log("This is hanele click button-------");
  axios.get('http://localhost:5000/api/product').then(res => {
    console.log("This axios data response -------",res.data);
  });
}

const Posleft2 = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getCategoryType = async () => {
        await api.get("/category").then(res => {
            console.log("This is category -------> ", res.data);
            res.data.forEach((row) => {
                setCategories(prevCategory => [...prevCategory, { id: row._id, text: row.categoryName }]);
            });
        })
    }
    console.log("This is categories -------> ", categories);
    getCategoryType();
  }, []);

  return (
    <div className="col-lg-8 col-sm-12 tabs_wrapper">
      <div className="page-header ">
        <div className="page-title">
          <h4>Categories</h4>
          <h6>Manage customer purchases</h6>
        </div>
      </div>
      <ul className=" tabs owl-carousel owl-theme owl-product  border-0">
        <OwlCarousel
          className="owl-theme"
          items={8}
          margin={10}
          dots={false}
          nav
        >
          {categories.map((category, index) => (
            
            console.log("This is category -------> ", index),
            <li onClick={handleSubmit} id={category.text} className="item">
              <div className="product-details ">
                <img src={Product62} alt="img" />
                <h6>{category.text}</h6>
              </div>
            </li>
          ))}
          <li onClick={handleSubmit} id="Fruits" className="item">
            <div className="product-details">
              <img src={Product62} alt="img" />
              <h6>Fruits</h6>
            </div>
          </li>
          <li id="headphone" className="item">
            <div className="product-details ">
              <img src={Product63} alt="img" />
              <h6>Headphones</h6>
            </div>
          </li>
        </OwlCarousel>
      </ul>
      {/* <div className="tabs_container"> */}
        <div className="tab_content active" data-tab="fruits">
          <div className="productsetmain">
            <h4>Main Product</h4>
            <div className="row">
              <MainProduct name="orange" price="150.00"/>
            </div>
          </div>
          <div className="productsetsub1">
            <h4>Sub Product 1</h4>
            <div className="row ">
              <div className="col-lg-2 col-sm-6 d-flex ">
                <div className="productset flex-fill">
                  <div className="productsetmain">
                    <h4>Earphones</h4>
                    <h4>150.00</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="productsetsub2">
            <h4>Sub Product 2</h4>
            <div className="row ">
              <div className="col-lg-2 col-sm-6 d-flex ">
                <div className="productset flex-fill">
                  <div className="productsetsub2">
                    <h4>Earphones</h4>
                    <h4>150.00</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="productsetsub3">
            <h4>Sub Product 3</h4>
            <div className="row ">
              <div className="col-lg-2 col-sm-6 d-flex ">
                <div className="productset flex-fill">
                  <div className="productsetmain">
                    <h4>Earphones</h4>
                    <h4>150.00</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>    
  );
};

export default Posleft2;
