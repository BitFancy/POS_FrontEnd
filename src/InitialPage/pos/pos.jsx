import { useState, useEffect } from 'react';
import React from 'react';
import Header from './posheader';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import POSLeft2 from './posleft2';
import Transactions from './transactions';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import {
  Product34,
  wallet1,
  transcation,
  trash12,
  Scan,
  Edit6,
  pause1,
  Debit,
  Cash,
  Product30,
  Product31,
  Product35,
  delete2,
  ellipise1,
  scanner1,
} from '../../EntryFile/imagePath';
import Addon from '../../MainPage/Component/AddOn';
import Minus from '../../MainPage/Component/Minus';
import api from '../../utils/api';
import {
  OrderContextProvider,
  useOrderContext,
} from '../../context/OrderContext';
import alertify from 'alertifyjs';
import { Button } from 'reactstrap';
import ButtonGroup from 'antd/lib/button/button-group';

const Pos = () => {
  const [dishes, setDishes] = useState([]);
  const [counter, setCounter] = useState(1);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [isActive, setIsActive] = useState('');

  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [totalProdutPrice, setTotalProdutPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  // const [dishName, setDishName] = useState('');
  const [productNameList, setProductNameList] = useState([]);
  const [status, setStatus] = useState('');
  const [activeState, setActiveState] = useState({});
  const [paymethod, setPaymethod] = useState('');
  const [productIdList, setProductIdList] = useState([]);
  const [isPayActive, setIsPayActive] = useState(false);
  const [isStatusActive, setIsStatusActive] = useState(false);

  // useEffect(() => {
  //   $('ul.tabs li').click(function () {
  //     var $this = $(this);
  //     var $theTab = $(this).attr('id');
  //     console.log('This is console tab name-----', $theTab);
  //     if ($this.hasClass('active')) {
  //     } else {
  //       $this
  //         .closest('.tabs_wrapper')
  //         .find('ul.tabs li, .tabs_container .tab_content')
  //         .removeClass('active');
  //       $(
  //         '.tabs_container .tab_content[data-tab="' +
  //           $theTab +
  //           '"], ul.tabs li[id="' +
  //           $theTab +
  //           '"]'
  //       ).addClass('active');
  //     }
  //   });
  //   $(document).on('click', '.productset', function () {
  //     $(this).toggleClass('active');
  //   });
  // });

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

  useEffect(() => {
    setTotalProdutPrice(
      productList.reduce((acc, product) => {
        if (product.productType.includes(6))
          return Number(acc) - Number(product.price);
        return Number(acc) + Number(product.price);
      }, 0)
    );
  }, [productList]);

  useEffect(() => {
    setTotalPrice(
      dishes.reduce((acc, dish) => {
        return Number(acc) + Number(dish.dishPrice * dish.counter);
      }, 0)
    );
  }, [dishes]);

  const deleteDish = (id) => {
    setDishes(dishes.filter((item) => item.id !== id));
  };

  const confirmText = (id, active) => {
    handleSelected(id, active);
  };

  useEffect(() => {
    (async () => {
      await api.get('/customer').then((res) => {
        console.log(res.data);
        res.data.forEach((row) => {
          setCustomers((prevCustomer) => [
            ...prevCustomer,
            { id: row._id, text: row.customerName },
          ]);
        });
      });
    })();
  }, []);

  const options = [
    { id: 1, text: 'Walk-in Customer', text: 'Walk-in Customer' },
    { id: 2, text: 'Chris Moris', text: 'Chris Moris' },
  ];
  const options1 = [
    { id: 1, text: 'Product', text: 'Product' },
    { id: 2, text: 'Barcode', text: 'Barcode' },
  ];
  const options2 = [
    { id: 1, text: 'Exclusive', text: 'Exclusive' },
    { id: 2, text: 'Inclusive', text: 'Inclusive' },
  ];

  const paymethods = ['Cash', 'Debit', 'Scan'];
  const orderStatus = [
    'New',
    'In Progress',
    'Completed',
    'Cancelled',
    'Refunded',
    'Hold On',
  ];

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...productList];
    updatedPrices[index].price = value;
    setProductList(updatedPrices);
  };

  // const { changeAction, setChangeAction } = useOrderContext();

  const handleSubmit = () => {
    const mainlist = productList.filter(
      (item) => item.productType.includes(1) || item.productType.includes(2)
    );
    const dishname = mainlist.reduce((acc, product) => {
      return acc + ' ' + product.productName;
    }, '');

    setDishes([
      ...dishes,
      {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        dishName: dishname,
        productList: productIdList,
        dishPrice: totalProdutPrice,
        counter: 1,
      },
    ]);
    setIsActive(false);
    setProductList([]);
  };

  useEffect(() => {
    setProductIdList(productList.map((product) => product._id));
  }, [productList]);

  useEffect(() => {
    console.log('This is dish list ------>>>>> ', dishes);
  }, [dishes]);

  const orderData = {
    customer,
    dishes,
    totalPrice,
    paymethod,
    status,
  };

  const handleMakeOrder = async () => {
    if (orderData.customer === '') {
      alertify.warning('Please select the customer!');
    } else if (orderData.paymethod === '') {
      alertify.warning('Please select the paymethod!');
    } else if (orderData.status === '') {
      alertify.warning('Please select the order status!');
    } else {
      await api
        .post('/order/add', orderData)
        .then((res) => {
          alertify.success('Successfully Order Added!');
          setDishes([]);
        })
        .catch((err) => {
          console.log(err);
          alertify.warning('Some error!');
        });
    }
  };

  const handleSelected = (id, isActive) => {
    if (isActive === true) {
      setProductList([
        ...productList,
        ...products.filter((item) => item._id === id),
      ]);
    } else {
      setProductList(productList.filter((item) => item._id !== id));
    }
  };

  const handlePayMethod = (paymethod) => {
    setPaymethod(paymethod);
    setIsPayActive(paymethod);
  };

  const handleStatus = (orderStatus) => {
    setStatus(orderStatus);
    setIsStatusActive(orderStatus);
  };

  const removeOrderList = () => {
    setDishes([]);
  };

  return (
    <>
      <div className="main-wrappers">
        <Header />
        <div className="page-wrapper ms-0">
          <div className="content">
            <div className="row">
              <POSLeft2
                categories={categories}
                products={products}
                productList={productList}
                setProductList={setProductList}
                activeState={activeState}
                setActiveState={setActiveState}
                handleSelected={handleSelected}
              />
              <div className="col-lg-2 col-sm-12">
                <div className="order-list">
                  <div className="orderid">
                    <h4>Dish</h4>
                  </div>
                </div>
                <div className="card card-order">
                  <div className="split-card"></div>
                  <div className="card-body pt-0">
                    <div className="totalitem">
                      <h4>Total items : {productList.length}</h4>
                    </div>
                    <div className="dish-table">
                      {productList.length > 0 &&
                        productList.map((product, index) => (
                          <div key={index}>
                            {product.productType.includes(5) && (
                              <span>Addon</span>
                            )}
                            {product.productType.includes(6) && (
                              <span>Minus</span>
                            )}
                            <div className="product-lists-dish">
                              <div className="row align-items-center">
                                <div className="col-lg-5">
                                  <div className="productimg">
                                    <div className="productcontent">
                                      <h4>{product.productName}</h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-5">
                                  <div className="input-group">
                                    <span className="input-group-text">£</span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      aria-label="Amount (to the nearest dollar)"
                                      value={product.price}
                                      onChange={(e) =>
                                        handlePriceChange(index, e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-2">
                                  <Link
                                    className="confirm-text"
                                    onClick={() =>
                                      confirmText(product._id, false)
                                    }
                                  >
                                    <img src={delete2} alt="img" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0 pb-2">
                    <div className="setvalue">
                      <ul>
                        <li className="total-value">
                          <h5>Total</h5>
                          <h6>£{totalProdutPrice}</h6>
                        </li>
                      </ul>
                    </div>
                    <div
                      onClick={handleSubmit}
                      className="btn-totallabel cursorHand"
                    >
                      <h5>Submit</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12">
                <div className="order-list">
                  <div className="orderid">
                    <h4>Order List</h4>
                  </div>
                </div>
                <div className="card card-order">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="select-split ">
                          <div className="select-group w-100">
                            <Select2
                              className="select"
                              data={customers}
                              options={{
                                placeholder: 'Select Customer',
                              }}
                              onChange={(e) => setCustomer(e.target.value)}
                              value={customer}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <Link
                          className="btn btn-adds"
                          data-bs-toggle="modal"
                          data-bs-target="#create"
                        >
                          <i className="fa fa-plus me-2" />
                          Add Customer
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0">
                    <div className="totalitem">
                      <h4>Total items : {dishes.length}</h4>
                      <h6 onClick={removeOrderList} className="cursorHand">
                        Clear all
                      </h6>
                    </div>
                    <div className="order-table">
                      {dishes.length > 0 &&
                        dishes.map((dish, index) => (
                          <ul className="product-lists" key={index}>
                            {console.log(dish, 'dish dish dish dish dish')}
                            <div className="row align-items-center">
                              <div className="col-lg-6">
                                <li>
                                  <div className="productimg">
                                    <div className="productcontent">
                                      <h4>{dish.dishName}</h4>
                                      <div className="increment-decrement">
                                        <div className="input-groups">
                                          <input
                                            onClick={() => {
                                              dish.counter--;
                                              setDishes([...dishes]);
                                            }}
                                            type="button"
                                            defaultValue="-"
                                            className="button-minus dec button"
                                          />
                                          <input
                                            type="text"
                                            name="child"
                                            value={dish.counter}
                                            className="quantity-field"
                                          />
                                          <input
                                            onClick={() => {
                                              dish.counter++;
                                              setDishes([...dishes]);
                                            }}
                                            type="button"
                                            defaultValue="+"
                                            className="button-plus inc button"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </div>
                              <div className="col-lg-4 align-items-center">
                                <div className="input-group">
                                  <span className="input-group-text">£</span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Amount (to the nearest dollar)"
                                    value={dish.dishPrice * dish.counter}
                                    onChange={(e) =>
                                      handlePriceChange(index, e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <li className="col-lg-2">
                                <Link
                                  className="confirm-text"
                                  onClick={() => deleteDish(dish.id)}
                                >
                                  <img src={delete2} alt="img" />
                                </Link>
                              </li>
                            </div>
                          </ul>
                        ))}
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0 pb-2">
                    <div className="setvalue">
                      <ul>
                        <li className="total-value">
                          <h5>Total</h5>
                          <h6>£{totalPrice}</h6>
                        </li>
                      </ul>
                    </div>
                    <div className="setvaluecash">
                      <ul>
                        {paymethods.map((pay, index) => (
                          <li
                            key={index}
                            className={isPayActive === pay ? 'active' : ''}
                          >
                            <a
                              className="paymentmethod"
                              onClick={() => handlePayMethod(pay)}
                            >
                              {pay}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="btn-pos">
                      <ul>
                        {orderStatus.map((orderStatus, index) => (
                          <li
                            key={index}
                            className={
                              isStatusActive === orderStatus ? 'active' : ''
                            }
                          >
                            <a
                              className="btn"
                              onClick={() => handleStatus(orderStatus)}
                            >
                              {orderStatus}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      onClick={handleMakeOrder}
                      className="btn-totallabel cursorHand"
                    >
                      <h5>Checkout</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addon"
        tabIndex={-1}
        aria-labelledby="create"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <Addon
              activeState={activeState}
              setActiveState={setActiveState}
              productList={productList}
              handleSelected={handleSelected}
            />
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="minus"
        tabIndex={-1}
        aria-labelledby="create"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <Minus
              activeState={activeState}
              setActiveState={setActiveState}
              productList={productList}
              handleSelected={handleSelected}
            />
          </div>
        </div>
      </div>
      <Transactions />
    </>
  );
};

export default Pos;
