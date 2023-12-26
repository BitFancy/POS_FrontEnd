import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Table from '../../EntryFile/datatable';
import Tabletop from '../../EntryFile/tabletop';
import {
  PlusIcon,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import api from '../../utils/api';
import Spinner from '../Component/Spinner';
import alertify from 'alertifyjs';

const ProductList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState({});
  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const confirmDelete = (id) => {
    alertify.confirm(
      'Delete Product',
      'Are you sure you want to delete this product?',
      function () {
        api.delete(`/product/delete/${id}`).then((response) => {
          setData(data.filter((item) => item._id !== id));
        });
        alertify.success('Product deleted successfully');
      },
      function () {}
    );
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: 'Product type',
      dataIndex: 'productType',
      sorter: (a, b) => a.unit.length - b.unit.length,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: 'Action',
      render: (data) => {
        return (
          <>
            <Link
              className="me-3"
              onClick={() => handleViewProduct(data)}
              to={`/dream-pos/product/product-details/${data._id}`}
            >
              <img src={EyeIcon} alt="img" />
            </Link>
            <Link
              className="confirm-text"
              to="#"
              onClick={() => confirmDelete(data._id)}
            >
              <img src={DeleteIcon} alt="img" />
            </Link>
          </>
        );
      },
    },
  ];

  const handleViewProduct = (data) => {
    setProductData(data);
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function check() {
      const fetchData = await api.get('/product/');
      let inputData = fetchData.data;
      for (let i = 0; i < inputData.length; i++) {
        for (let j = 0; j < inputData[i].category.length; j++) {
          inputData[i].category[
            j
          ] = `${inputData[i].category[j].categoryName}, `;
        }
        inputData[i].category[inputData[i].category.length - 1] = inputData[
          i
        ].category[inputData[i].category.length - 1].slice(0, -2);
        for (let k = 0; k < inputData[i].productType.length; k++) {
          switch (inputData[i].productType[k]) {
            case 0:
              inputData[i].productType[k] = 'Main Product';
              break;
            case 1:
              inputData[i].productType[k] = 'Sub Product1';
              break;
            case 2:
              inputData[i].productType[k] = 'Sub Product2';
              break;
            case 3:
              inputData[i].productType[k] = 'Sub Product3';
              break;
            case 4:
              inputData[i].productType[k] = 'Addon';
              break;
            case 5:
              inputData[i].productType[k] = 'Minus';
              break;
          }
        }
      }
      setData(inputData);
    }
    check();
  }, []);

  useEffect(() => {
    console.log('data', data);
  });
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Products List</h4>
                <h6>Manage your Products</h6>
              </div>
              <div className="page-btn">
                <Link
                  to="/dream-pos/product/addproduct-product"
                  className="btn btn-added"
                >
                  <img src={PlusIcon} alt="img" className="me-1" />
                  Add New Product
                </Link>
              </div>
            </div>
            {/* /product list */}
            <div className="card">
              <div className="card-body">
                <Tabletop
                  inputfilter={inputfilter}
                  togglefilter={togglefilter}
                />
                {/* /Filter */}
                <div
                  className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
                  id="filter_inputs"
                  style={{ display: inputfilter ? 'block' : 'none' }}
                ></div>
                {/* /Filter */}
                <div className="table-responsive">
                  <Table columns={columns} dataSource={data} />
                </div>
              </div>
            </div>
            {/* /product list */}
          </div>
        </div>
      )}
    </>
  );
};
export default ProductList;
