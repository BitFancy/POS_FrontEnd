import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Minus = () => {
  const [addons, setAddons] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await api.get('/product');
      console.log(res.data);
    })();
  })
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Minus</h5>
        <button
          type="button"
          className="close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-lg-6 col-sm-12 col-12">
            <div className="form-group">
              <label>Customer Name</label>
              
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-12">
            <div className="form-group">
              <label>Email</label>
              <input type="text" />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-12">
            <div className="form-group">
              <label>Phone</label>
              <input type="text" />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-12">
            <div className="form-group">
              <label>Country</label>
              <input type="text" />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-12">
            <div className="form-group">
              <label>City</label>
              <input type="text" />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-12">
            <div className="form-group">
              <label>Address</label>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <Link to="#" className="btn btn-submit me-2">
            Submit
          </Link>
          <Link to="#" className="btn btn-cancel" data-bs-dismiss="modal">
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default Minus;
