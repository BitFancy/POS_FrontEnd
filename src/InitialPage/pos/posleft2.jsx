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
import { useOrderContext } from '../../context/OrderContext';

const Posleft2 = (props) => {
  const [mainProducts, setMainProducts] = useState([]);
  const [subProductOne, setSubProductOne] = useState([]);
  const [subProductTwo, setSubProductTwo] = useState([]);
  const [subProductThree, setSubProductThree] = useState([]);
  const [addOn, setAddOn] = useState([]);
  const [minus, setMinus] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // const { changeAction, setChangeAction } = useOrderContext();

  const handleActiveClear = () => {
    Object.keys(props.activeState).map((key) => {
      props.activeState[key] = false;
    });
    props.setActiveState({ ...props.activeState });
    props.setProductList([]);
  };

  useEffect(() => {
    const tempActiveState = {};
    props.productList.map((product) => {
      tempActiveState[product._id] = true;
    });
    props.setActiveState({ ...tempActiveState });
  }, [props.productList]);

  const handleSubmit = async (id) => {
    console.log('category id -', id);

    await api.get('/product').then((res) => {
      console.log('Res daa===================', res.data);
      setMainProducts(
        res.data.filter(
          (item) =>
            item.category.map((category) => category._id).includes(id) &&
            item.productType.includes(1)
        )
      );
      setSubProductOne(
        res.data.filter(
          (item) =>
            item.category.map((category) => category._id).includes(id) &&
            item.productType.includes(2)
        )
      );
      setSubProductTwo(
        res.data.filter(
          (item) =>
            item.category.map((category) => category._id).includes(id) &&
            item.productType.includes(3)
        )
      );
      setSubProductThree(
        res.data.filter(
          (item) =>
            item.category.map((category) => category._id).includes(id) &&
            item.productType.includes(4)
        )
      );
      setAddOn(
        res.data.filter(
          (item) =>
            item.category.map((category) => category._id).includes(id) &&
            item.productType.includes(5)
        )
      );
      setMinus(
        res.data.filter(
          (item) =>
            item.category.map((category) => category._id).includes(id) &&
            item.productType.includes(6)
        )
      );
    });
  };

  useEffect(() => {
    console.log(props.products, 'props.products');
    console.log(props.categories, 'props.categories');
    const categoryIds = props.categories.map((category) => category.id);
    console.log('categoryIds---------', categoryIds);

    setMainProducts(
      props.products.filter(
        (item) =>
          item.category[0]._id === categoryIds[0] &&
          item.productType.includes(1)
      )
    );
    setSubProductOne(
      props.products.filter(
        (item) =>
          item.category[0]._id === categoryIds[0] &&
          item.productType.includes(2)
      )
    );
    setSubProductTwo(
      props.products.filter(
        (item) =>
          item.category[0]._id === categoryIds[0] &&
          item.productType.includes(3)
      )
    );
    setSubProductThree(
      props.products.filter(
        (item) =>
          item.category[0]._id === categoryIds[0] &&
          item.productType.includes(4)
      )
    );
    setAddOn(
      props.products.filter(
        (item) =>
          item.category[0]._id === categoryIds[0] &&
          item.productType.includes(5)
      )
    );
    setMinus(
      props.products.filter(
        (item) =>
          item.category[0]._id === categoryIds[0] &&
          item.productType.includes(6)
      )
    );
  }, [props.products]);

  // const handleSelected = (id, isActive) => {
  //   if (isActive === true) {
  //     setProductList([...productList, id]);
  //   } else {
  //     setProductList(productList.filter((item) => item !== id));
  //   }
  // };

  const showMainProducts = mainProducts.map((product, index) => {
    return (
      <MainProduct
        productId={product._id}
        activeState={props.activeState}
        setActiveState={props.setActiveState}
        key={index}
        name={product.productName}
        price={product.price}
        handleSelected={props.handleSelected}
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
        handleSelected={props.handleSelected}
        activeState={props.activeState}
        setActiveState={props.setActiveState}
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
        handleSelected={props.handleSelected}
        activeState={props.activeState}
        setActiveState={props.setActiveState}
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
        handleSelected={props.handleSelected}
        activeState={props.activeState}
        setActiveState={props.setActiveState}
      />
    );
  });

  return (
    <div className="col-lg-6 col-sm-12 tabs_wrapper">
      <div className="page-header ">
        <div className="page-title">
          <h4>Categories</h4>
          <h6>Manage customer purchases</h6>
        </div>
      </div>

      <ul className="tabs owl-carousel owl-theme owl-product  border-0">
        {/* <OwlCarousel
          className="owl-theme"
          items={8}
          margin={10}
          dots={false}
          nav
        > */}
        <div className="d-flex">
          {props.categories.map((category, index) => (
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
        {showMainProducts.length > 0 && (
          <div className="row">
            <div className="col-10">
              <h4>Main Product</h4>
            </div>
            <div className="col-2">
              {props.productList.length > 0 && (
                <div className="totalitem">
                  <Link onClick={handleActiveClear}>Clear all</Link>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="products">
          <div className="row">{showMainProducts}</div>
        </div>
        {showSubProductOne.length > 0 && <h4>Sub Product 1</h4>}
        <div className="products">
          <div className="row ">{showSubProductOne}</div>
        </div>
        {showSubProductTwo.length > 0 && <h4>Sub Product 2</h4>}
        <div className="products">
          <div className="row ">{showSubProductTwo}</div>
        </div>
        {showSubProductThree.length > 0 && <h4>Sub Product 3</h4>}
        <div className="products">
          <div className="row ">{showSubProductThree}</div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-6">
          <button
            className="btn btn-adds"
            data-bs-toggle="modal"
            data-bs-target="#addon"
          >
            <i className="fa fa-plus me-2" />
            AddOn
          </button>
        </div>
        <div className="col-6">
          <button
            to="#"
            className="btn btn-adds"
            data-bs-toggle="modal"
            data-bs-target="#minus"
          >
            <i className="fa fa-minus me-2" />
            Minus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posleft2;
