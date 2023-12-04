import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Product62, Product63 } from '../../EntryFile/imagePath';
import MainProduct from '../../MainPage/Component/MainProduct';
import SubProductOne from '../../MainPage/Component/SubProductOne';
import SubProductTwo from '../../MainPage/Component/SubProductTwo';
import SubProductThree from '../../MainPage/Component/SubProductThree';
import api from '../../utils/api';
import Addon from '../../MainPage/Component/AddOn';

const Posleft2 = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [mainProducts, setMainProducts] = useState([]);
  const [subProductOne, setSubProductOne] = useState([]);
  const [subProductTwo, setSubProductTwo] = useState([]);
  const [subProductThree, setSubProductThree] = useState([]);
  const [addOn, setAddOn] = useState([]);
  const [minus, setMinus] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    console.log('clicked add button');
    setOpenModal(true);
  };

  useEffect(() => {
    (async () => {
      const res = await api.get('/category/all');
      const tempData = [];

      for (let i = 0; i < res.data.length; i++) {
        tempData.push({ id: res.data[i]._id, text: res.data[i].categoryName });
        if (i === res.data.length - 1) {
          setCategories([...tempData]);
        }
        console.log(tempData, 'tempData');
      }

      const res2 = await api.get('/product');
      setProducts(res2.data);
    })();
  }, []);

  const handleSubmit = async (id) => {
    console.log('This is category id value', id);
    await api.get('/product').then((res) => {
      const filterProducts = res.data.filter(
        (item) => item.category.includes(id) && item.productType.includes(1)
      );
      console.log('products -------->>>>>>', filterProducts);
      setMainProducts(filterProducts);
      setSubProductOne(
        res.data.filter(
          (item) => item.category.includes(id) && item.productType.includes(2)
        )
      );
      setSubProductTwo(
        res.data.filter(
          (item) => item.category.includes(id) && item.productType.includes(3)
        )
      );
      setSubProductThree(
        res.data.filter(
          (item) => item.category.includes(id) && item.productType.includes(4)
        )
      );
      setAddOn(
        res.data.filter(
          (item) => item.category.includes(id) && item.productType.includes(5)
        )
      );
      setMinus(
        res.data.filter(
          (item) => item.category.includes(id) && item.productType.includes(6)
        )
      );
    });
  };

  useEffect(() => {
    const filterProducts = products.filter(
      (item) =>
        item.category.includes(categories[0].id) && item.productType.includes(1)
    );
    console.log('products -------->>>>>>', filterProducts);
    setMainProducts(filterProducts);
    setSubProductOne(
      products.filter(
        (item) =>
          item.category.includes(categories[0].id) &&
          item.productType.includes(2)
      )
    );
    setSubProductTwo(
      products.filter(
        (item) =>
          item.category.includes(categories[0].id) &&
          item.productType.includes(3)
      )
    );
    setSubProductThree(
      products.filter(
        (item) =>
          item.category.includes(categories[0].id) &&
          item.productType.includes(4)
      )
    );
    setAddOn(
      products.filter(
        (item) =>
          item.category.includes(categories[0].id) &&
          item.productType.includes(5)
      )
    );
    setMinus(
      products.filter(
        (item) =>
          item.category.includes(categories[0].id) &&
          item.productType.includes(6)
      )
    );
  }, [products]);

  const handleSelected = (id, isActive) => {
    console.log(
      'this is id value=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      id
    );
    console.log(
      'this is isActive value=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      isActive
    );
    if (isActive === true) {
      setDishes([...dishes, ...products.filter((item) => item._id === id)]);
    } else {
      setDishes(dishes.filter((item) => item._id !== id));
    }
  };

  useEffect(() => {
    console.log('this is dishes ------------------', dishes);
  }, [dishes]);

  const showMainProducts = mainProducts.map((product, index) => {
    return (
      <MainProduct
        productId={product._id}
        key={index}
        name={product.productName}
        price={product.price}
        handleSelected={handleSelected}
      />
    );
  });

  const showSubProductOne = subProductOne.map((product, index) => {
    return (
      <SubProductOne
        productId={product._id}
        key={index}
        name={product.productName}
        price={product.price}
        handleSelected={handleSelected}
      />
    );
  });
  const showSubProductTwo = subProductTwo.map((product, index) => {
    return (
      <SubProductTwo
        productId={product._id}
        key={index}
        name={product.productName}
        price={product.price}
        handleSelected={handleSelected}
      />
    );
  });
  const showSubProductThree = subProductThree.map((product, index) => {
    return (
      <SubProductThree
        productId={product._id}
        key={index}
        name={product.productName}
        price={product.price}
        handleSelected={handleSelected}
      />
    );
  });

  return (
    <div className="col-lg-8 col-sm-12 tabs_wrapper">
      <div className="page-header ">
        <div className="page-title">
          <h4>Categories</h4>
          <h6>Manage customer purchases</h6>
        </div>
      </div>
      <ul className=" tabs owl-carousel owl-theme owl-product  border-0">
        {/* <OwlCarousel
          className="owl-theme"
          items={8}
          margin={10}
          dots={false}
          nav
        > */}
        <div className="d-flex">
          {categories.map((category, index) => (
            <li
              onClick={() => {
                handleSubmit(category.id);
              }}
              key={index}
              id={category.text}
              className="item"
            >
              <div className="product-details ">
                <img src={Product62} alt="img" />
                <h6>{category.text}</h6>
              </div>
            </li>
          ))}
        </div>
        {/* </OwlCarousel> */}
      </ul>
      {/* <div className="tabs_container"> */}
      <div className="tab_content active">
        <h4>Main Product</h4>
        <div className="products">
          <div className="row">{showMainProducts}</div>
        </div>
        <h4>Sub Product 1</h4>
        <div className="products">
          <div className="row ">{showSubProductOne}</div>
        </div>
        <h4>Sub Product 2</h4>
        <div className="products">
          <div className="row ">{showSubProductTwo}</div>
        </div>
        <h4>Sub Product 3</h4>
        <div className="products">
          <div className="row ">{showSubProductThree}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          {/* <Link
            to="#"
            className="btn btn-adds"
            data-bs-toggle="modal"
            data-bs-target="#create"
          >
            <i className="fa fa-plus me-2" />
            AddOn
          </Link> */}

          <button
            onClick={handleClick}
            className="btn btn-adds"
            data-bs-toggle="modal"
            data-bs-target="#addon"
          >
            <i className="fa fa-plus me-2" />
            AddOn
          </button>
        </div>
        <div className="col-6">
          <Link
            to="#"
            className="btn btn-adds"
            data-bs-toggle="modal"
            data-bs-target="#minus"
          >
            <i className="fa fa-minus me-2" />
            Minus
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Posleft2;
